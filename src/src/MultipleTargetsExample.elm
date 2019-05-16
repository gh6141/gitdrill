module MultipleTargetsExample exposing (main)

import Browser
import Draggable
import Draggable.Events exposing (onClick, onDragBy, onDragStart)
import Html exposing (Html)
import Html.Attributes
import Math.Vector2 as Vector2 exposing (Vec2, getX, getY)
import Svg exposing (..)
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

type alias Atom =
    {
     gensoname: String
    , size : String
    , relposition : (Float,Float)
    }



type alias Box =
    { id : Id
    , position : Vec2
    , clicked : Bool
    , atoms: List Atom
    , name : String
    }


type alias Id =
    String


makeBox : Id -> Vec2 -> List Atom -> String -> Box
makeBox id position atoms name =
    Box id position False atoms name


dragBoxBy : Vec2 -> Box -> Box
dragBoxBy delta box =
    { box | position = box.position |> Vector2.add delta }


toggleClicked : Box -> Box
toggleClicked box =
    { box | clicked = not box.clicked }


type alias BoxGroup =
    { uid : Int
    , movingBox : Maybe Box
    , idleBoxes : List Box
    }


emptyGroup : BoxGroup
emptyGroup =
    BoxGroup 0 Nothing []


addBox :  (String,Vec2) -> BoxGroup  -> BoxGroup
addBox position ({ uid, idleBoxes } as group)  =
     { group
        | idleBoxes = makeBox (String.fromInt uid) (Tuple.second position)
          ( case uid of
            0 -> [{ gensoname = "O" , size = "50" , relposition=(0.0,0.0) },{ gensoname = "O" , size = "50" , relposition=(100.0,0.0) }]

            1 ->  [{ gensoname = "H" , size = "40" , relposition=(0.0,0.0) },{ gensoname = "H" , size = "40" , relposition=(80.0,0.0) } ]
            2 ->  [{ gensoname = "H" , size = "40" , relposition=(0.0,0.0) },{ gensoname = "H" , size = "40" , relposition=(80.0,0.0) } ]

            3 -> [{ gensoname = "H" , size = "40" , relposition=(0.0,40.0) },{ gensoname = "H" , size = "40" , relposition=(150.0,40.0) } ,{ gensoname = "O" , size = "50" , relposition=(75.0,0.0)}]
            4 -> [{ gensoname = "H" , size = "40" , relposition=(0.0,40.0) },{ gensoname = "H" , size = "40" , relposition=(150.0,40.0) } ,{ gensoname = "O" , size = "50" , relposition=(75.0,0.0)}]

            
            _ -> []
          )  (Tuple.first position)
         :: idleBoxes
        , uid = uid + 1 
     }


makeBoxGroup : List (String,Vec2) -> BoxGroup
makeBoxGroup positions =
    positions
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


toggleBoxClicked : Id -> BoxGroup -> BoxGroup
toggleBoxClicked id group =
    let
        possiblyToggleBox box =
            if box.id == id then
                toggleClicked box

            else
                box
    in
    { group | idleBoxes = group.idleBoxes |> List.map possiblyToggleBox }


type alias Model =
    { boxGroup : BoxGroup
    , drag : Draggable.State Id
    , notify1 : String
    , notify2 : String
    , notify3 : String
    }


type Msg
    = DragMsg (Draggable.Msg Id)
    | OnDragBy Vec2
    | StartDragging String
    | ToggleBoxClicked String
    | StopDragging


boxPositions : List (String,Vec2)
boxPositions =
    let
        
        indexToPosition = ( \ii -> (
            case ii of
             0 -> "O2"
             1 -> "H2"
             2 -> "H2"
             3 -> "H2O"
             4 -> "H2O"
             _ -> ""
            
            , Vector2.vec2  ((toFloat ii)*250+60)  500))
           -- toFloat >> (*) 110 >> (+) 60 >> Vector2.vec2 80
    in
    List.range 0 4 |> List.map indexToPosition


init : flags -> ( Model, Cmd Msg )
init _ =
    ( { boxGroup = makeBoxGroup boxPositions
      , drag = Draggable.init
      , notify1=""
      , notify2=""
      , notify3=""
      }
    , Cmd.none
    )


dragConfig : Draggable.Config Id Msg
dragConfig =
    Draggable.customConfig
        [ onDragBy (\( dx, dy ) -> Vector2.vec2 dx dy |> OnDragBy)
        , onDragStart StartDragging
        , onClick ToggleBoxClicked
        ]

notify : Float -> Float -> Float -> Float -> String -> BoxGroup -> String
notify xs xe ys ye namex boxGroup =
               let
                  dfb:Box
                  dfb=Box "" (Vector2.vec2 0.0 0.0) False [] ""
            
                  mbx=boxGroup.movingBox
                  bx=Maybe.withDefault dfb mbx
                  -- ll= bx.name++":"++ (String.fromFloat (Vector2.getX bx.position) )++ " "++(String.fromFloat (Vector2.getY bx.position) )
                  xx=Vector2.getX bx.position
                  yy=Vector2.getY bx.position
                  
               in
                  if xs<xx && xx<xe && ys<yy && yy<ye && bx.name==namex then
                   "Ok"
                  else
                   ""        
               


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ boxGroup} as model) =
    case msg of
        OnDragBy delta ->
            ( { model | boxGroup = boxGroup |> dragActiveBy delta }, Cmd.none )

        StartDragging id ->
            ( { model | boxGroup = boxGroup |> startDragging id }, Cmd.none )

        StopDragging ->
            ( { model | 
                 notify1= boxGroup |> notify 41.0 157.0 54.0 318.0 "H2O"
                ,notify2= boxGroup |> notify 480.0 677.0 52.0 359.0 "H2"
                ,notify3= boxGroup |> notify 952.0 1110.0 52.0 349.0 "O2"
                , boxGroup = boxGroup |> stopDragging               
                
                }, Cmd.none )

        ToggleBoxClicked id ->
            ( { model | boxGroup = boxGroup |> toggleBoxClicked id }, Cmd.none )

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
view { boxGroup,notify1,notify2,notify3 } =
    Html.div
        []
        [ Html.p
            [ Html.Attributes.style "padding-left" "8px" ]
            [ Html.text "Drag substance . " ]
        , Svg.svg
            [ Attr.style "height: 100vh; width: 100vw; position: fixed;"
            ]
            [ background
            , boxesView boxGroup
            , waku boxGroup notify1 notify2 notify3
            ]
        ]


boxesView : BoxGroup -> Svg Msg
boxesView boxGroup =
    boxGroup
        |> allBoxes
        |> List.reverse
        |> List.map boxView
        |> Svg.node "g" []

circlecreate : Vec2 -> Atom -> Svg Msg
circlecreate position atom =
       Svg.g
       []
       [
        Svg.circle
        [
          Attr.r atom.size
        , num Attr.cx (getX position +(Tuple.first atom.relposition))
        , num Attr.cy (getY position +(Tuple.second atom.relposition))
        , Attr.fill (
            case atom.gensoname of
             "H" -> "blue"
             "O" -> "red"
             _ -> "white"
        )
        , Attr.stroke "black"
   
        ]
        [ ]
        ,
        Svg.text_ [
         num Attr.x (getX position +(Tuple.first atom.relposition)-18.0)
        , num Attr.y (getY position +(Tuple.second atom.relposition)+14.0)
         ,  Attr.stroke "black"
         , Attr.fontSize "36pt"
        ]
         [Svg.text atom.gensoname] 
       ]
boxView : Box -> Svg Msg
boxView { id, position, clicked ,atoms} =
    
       Svg.g
       [     Attr.cursor "move"
        , Draggable.mouseTrigger id DragMsg
        , onMouseUp StopDragging]
        ( 
            atoms |> List.map(\atom -> circlecreate position atom)            
        )



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

waku : BoxGroup -> String -> String -> String -> Svg msg
waku boxGroup notify1 notify2 notify3 =
   Svg.g []
    [
     moji "50" "50" "水"
     ,Svg.rect
       [ Attr.x "0"
       , Attr.y "0"
       , Attr.width "350"
       , Attr.height "400"
       , Attr.fill "none"
       , Attr.stroke "black"
       ]
       []
    ,moji "50" "350" notify1
    ,
     moji "380" "200" "→"
     
     ,
     moji "500" "50" "水素"
    ,Svg.rect
       [ Attr.x "450"
       , Attr.y "0"
       , Attr.width "350"
       , Attr.height "400"
       , Attr.fill "none"
       , Attr.stroke "black"
       ]
       []
    
    , moji "500" "350" notify2
    , moji "820" "200" "+"
    ,
    moji "950" "50" "酸素"
    ,Svg.rect
       [ Attr.x "900"
       , Attr.y "0"
       , Attr.width "350"
       , Attr.height "400"
       , Attr.fill "none"
       , Attr.stroke "black"
       ]
       []  
     ,moji "950" "350" notify3

    ]
    
moji : String -> String -> String -> Svg msg
moji xs ys txt =
     Svg.text_
     [
         Attr.x xs
        , Attr.y ys
        ,  Attr.fill
         (
          case txt of
            "Ok" -> "red"
            _ -> "black"
         )

        , Attr.fontSize "36pt"
     ]
     [Svg.text txt] 
    

num : (String -> Svg.Attribute msg) -> Float -> Svg.Attribute msg
num attr value =
    attr (String.fromFloat value)