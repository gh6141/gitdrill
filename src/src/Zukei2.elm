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
import Html exposing (Attribute)
import Random



import Svg exposing (svg, polygon)
import Svg.Attributes exposing (fill, points)


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


--makeBox : Id -> Vec2 -> Color -> Zukei ->Box
--makeBox id position col zu=
 --   Box id position col zu

makeBox : Id ->Zokusei->Box
makeBox id zoku=
    Box id zoku.position zoku.color zoku.zukei






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


--addBox : Color -> Zukei ->Vec2 ->  BoxGroup -> BoxGroup
--addBox col zuk position  ({ uid, idleBoxes } as group) =
  --  { group
  --      | idleBoxes = makeBox (String.fromInt uid) position col zuk :: idleBoxes
  --      , uid = uid + 1
  --  }

--addBox : Zokusei ->  BoxGroup -> BoxGroup
addBox zoku ({uid,idleBoxes} as group) = {group| idleBoxes =  makeBox (String.fromInt uid) zoku :: idleBoxes , uid = uid + 1 }


--makeBoxGroup : List Vec2 -> BoxGroup
--makeBoxGroup positions =
--    positions
--        |> List.foldl (addBox Green Triangle) emptyGroup

makeBoxGroup attributes =
    attributes
       |> List.foldl addBox emptyGroup


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


fixedYCoordinate y = \x -> Vector2.vec2 x y

boxPositions : List Vec2
boxPositions =
    let
        indexToPosition =
          --  toFloat >> (*) 60 >> (+) 10 >> Vector2.vec2 10
          toFloat >> (*) 60 >> (+) 90 >> fixedYCoordinate 330
    in
    List.range 0 10 |> List.map indexToPosition

type alias Zokusei = {position:Vec2,color:Color,zukei:Zukei}

boxAttributes : List Zokusei
boxAttributes  =
    let
        indexToAttribute =
          --  toFloat >> (*) 60 >> (+) 10 >> Vector2.vec2 10
          toFloat >> (*) 60 >> (+) 90 >> fixedYCoordinateAndAttribute 330
    in
    List.range 0 10 |> List.map indexToAttribute

rcol: Int -> Color
rcol rn =   case rn of
       0 -> Red
       1 -> Green
       2 -> Yellow
       _ -> Yellow

rzukei rn = case rn of
       0 -> Circle
       1 -> Triangle
       2 -> Cube
       _ -> Cube

fixedYCoordinateAndAttribute y =
   (\x -> {position=(Vector2.vec2 x y),color=rcol (modBy 2 (((x-90)/60)|>floor) ),zukei=rzukei (modBy 3 (((x-90)/60)|>floor) )} )


--  (randomNumber, newSeed) = generateRandomInt 0 10 Random.initialSeed


       



init : flags -> ( Model, Cmd Msg )
init _ =
    ( {         
        --boxGroup = makeBoxGroup boxPositions
        boxGroup = makeBoxGroup boxAttributes
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
            , boxView {id="0",position=Vector2.vec2 120 110  ,color=Yellow,zukei=Triangle}
             , boxView {id="0",position=Vector2.vec2 330 110  ,color=Yellow,zukei=Circle}
             , boxView {id="0",position=Vector2.vec2 550 110  ,color=Yellow,zukei=Cube}
     
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
boxView { id, position,color,zukei } =
   let
      --  color =          "red"
    colorx col=case col of
              Red -> "red"
              Green -> "green"
              Yellow -> "yellow"



    hyoji zuk=case zuk of
     Cube ->
      Svg.rect
       ( [ num Attr.width <| getX boxSize
        , num Attr.height <| getY boxSize
        , num Attr.x (getX position)
        , num Attr.y (getY position)
        , Attr.fill (colorx color)
        , Attr.stroke "black"
        , Attr.cursor "move"
        , Draggable.mouseTrigger id DragMsg
        , onMouseUp StopDragging
        ]++ (Draggable.touchTriggers id DragMsg) )
        []




     Triangle ->
      let
         bai=0.7
         dx=21
         dy=32
         topPoint = (String.fromFloat ((getX position)+0+dx))++","++(String.fromFloat ((getY position)-50*bai+dy))
         --leftPoint = "-43.3, 25"
         leftPoint = (String.fromFloat ((getX position)-43.3*bai+dx))++","++(String.fromFloat ((getY position)+25*bai+dy))
         --rightPoint = "43.3, 25"
         rightPoint = (String.fromFloat ((getX position)+43.3*bai+dx))++","++(String.fromFloat ((getY position)+25*bai+dy))

         posS=topPoint++" "++leftPoint++" "++rightPoint
      in
         Svg.polygon ([ 
         Attr.stroke "black"
        , Attr.cursor "move"
        , Draggable.mouseTrigger id DragMsg
        , onMouseUp StopDragging            
        ,fill  (colorx color), points  posS  ]++ (Draggable.touchTriggers id DragMsg)) []
  


     Circle ->
            Svg.circle
       ( [
         numh Attr.r <| getY boxSize
        , num Attr.cx ((getX position)+25.0)
        , num Attr.cy ((getY position)+25.0)
        , Attr.fill (colorx color)
        , Attr.stroke "black"
        , Attr.cursor "move"
        , Draggable.mouseTrigger id DragMsg
        , onMouseUp StopDragging
        ]++ (Draggable.touchTriggers id DragMsg) )
        []
   
        
     in
       hyoji zukei

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

numh attr value =

    attr (String.fromFloat (value/2))