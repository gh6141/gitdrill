module Zukei2 exposing (..)



import Browser
import Draggable
import Draggable.Events exposing (onClick, onDragBy, onDragStart)
import Html exposing (Html)
import Html.Attributes
import Math.Vector2 as Vector2 exposing (Vec2, getX, getY)
import Svg exposing (Svg)
import Svg.Attributes as Attr
import Svg.Events exposing (onMouseUp)
import Svg.Keyed
import Svg.Lazy exposing (lazy)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }

type Color = Red | Green |Yellow
type Zukei = Circle | Triangle | Cube


type alias Box =
    { id : Id
    , position : Vec2
    , color : Color
    , zukei : Zukei
    }


type alias Id =
    String


makeBox : Id -> Vec2 -> Color -> Zukei ->Box
makeBox id position col zu=
    Box id position col zu


dragBoxBy : Vec2 -> Box -> Box
dragBoxBy delta box =
    { box | position = box.position |> Vector2.add delta }





type alias BoxGroup =
    { uid : Int
    , movingBox : Maybe Box
    , idleBoxes : List Box
    }


emptyGroup : BoxGroup
emptyGroup =
    BoxGroup 0 Nothing []


addBox : Vec2 -> Color -> Zukei -> BoxGroup -> BoxGroup
addBox position col zuk ({ uid, idleBoxes } as group) =
    { group
        | idleBoxes = makeBox (String.fromInt uid) position col zuk :: idleBoxes
        , uid = uid + 1
    }


makeBoxGroup : List Vec2 -> BoxGroup
makeBoxGroup positions =
    positions
        |> List.foldl addBox Red Circle emptyGroup


allBoxes : BoxGroup -> List Box
allBoxes { movingBox, idleBoxes } =
    movingBox
        |> Maybe.map (\a -> a :: idleBoxes)
        |> Maybe.withDefault idleBoxes


startDragging : Id -> BoxGroup -> BoxGroup
startDragging id ({ idleBoxes, movingBox } as group) =
    let
        ( targetAsList, others ) =
            List.partition (.id >> (==) id) idleBoxes
    in
    { group
        | idleBoxes = others
        , movingBox = targetAsList |> List.head
    }


stopDragging : BoxGroup -> BoxGroup
stopDragging group =
    { group
        | idleBoxes = allBoxes group
        , movingBox = Nothing
    }


dragActiveBy : Vec2 -> BoxGroup -> BoxGroup
dragActiveBy delta group =
    { group | movingBox = group.movingBox |> Maybe.map (dragBoxBy delta) }




type alias Model =
    { boxGroup : BoxGroup
    , drag : Draggable.State Id
    }


type Msg
    = DragMsg (Draggable.Msg Id)
    | OnDragBy Vec2
    | StartDragging String
    | StopDragging


boxPositions : List Vec2
boxPositions =
    let
        indexToPosition =
            toFloat >> (*) 60 >> (+) 10 >> Vector2.vec2 10
    in
    List.range 0 10 |> List.map indexToPosition


init : flags -> ( Model, Cmd Msg )
init _ =
    ( { boxGroup = makeBoxGroup boxPositions
      , drag = Draggable.init
      }
    , Cmd.none
    )


dragConfig : Draggable.Config Id Msg
dragConfig =
    Draggable.customConfig
        [ onDragBy (\( dx, dy ) -> Vector2.vec2 dx dy |> OnDragBy)
        , onDragStart StartDragging

        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ boxGroup } as model) =
    case msg of
        OnDragBy delta ->
            ( { model | boxGroup = boxGroup |> dragActiveBy delta }, Cmd.none )

        StartDragging id ->
            ( { model | boxGroup = boxGroup |> startDragging id }, Cmd.none )

        StopDragging ->
            ( { model | boxGroup = boxGroup |> stopDragging }, Cmd.none )


        DragMsg dragMsg ->
            Draggable.update dragConfig dragMsg model


subscriptions : Model -> Sub Msg
subscriptions { drag } =
    Draggable.subscriptions DragMsg drag



-- VIEW


boxSize : Vec2
boxSize =
    Vector2.vec2 50 50



view : Model -> Html Msg
view { boxGroup } =
    Html.div
        []
        [ Html.p
            [ Html.Attributes.style "padding-left" "8px" ]
            [ Html.text "おなじかたちを　あつめよう" ]
        , Svg.svg
            [ Attr.style "height: 100vh; width: 100vw; position: fixed;"
            ]
            [ background
            ,(boxwaku "100" "100"),(boxwaku "320" "100"),boxwaku "540" "100"
            , boxesView boxGroup
     
            ]
        ]


boxesView : BoxGroup -> Svg Msg
boxesView boxGroup =
    boxGroup
        |> allBoxes
        |> List.reverse
        |> List.map boxView
        |> Svg.node "g" []


boxView : Box -> Svg Msg
boxView { id, position } =
    let
        color =          "red"

           
    in
    Svg.rect
       ( [ num Attr.width <| getX boxSize
        , num Attr.height <| getY boxSize
        , num Attr.x (getX position)
        , num Attr.y (getY position)
        , Attr.fill color
        , Attr.stroke "black"
        , Attr.cursor "move"
        , Draggable.mouseTrigger id DragMsg
        , onMouseUp StopDragging
        ]++ (Draggable.touchTriggers id DragMsg) )
        []


background : Svg msg
background =
    Svg.rect
        [ Attr.x "0"
        , Attr.y "0"
        , Attr.width "100%"
        , Attr.height "100%"
        , Attr.fill "#eee"
        ]
        []

boxwaku : String->String->Svg msg
boxwaku xs ys=
    Svg.rect
        [ Attr.x xs
        , Attr.y ys
        , Attr.width "200"
        , Attr.height "200"
        , Attr.stroke "black"
        , Attr.fill "gray"
        ]
        []



num : (String -> Svg.Attribute msg) -> Float -> Svg.Attribute msg
num attr value =
    attr (String.fromFloat value)
