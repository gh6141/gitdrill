module MultipleTargetsExample exposing (main)

import Browser
import Draggable
import Draggable.Events exposing (onClick, onDragBy, onDragStart)
import Html exposing (Html,button,select)
import Html.Attributes exposing(selected,value)
import Math.Vector2 as Vector2 exposing (Vec2, getX, getY)
import Svg exposing (..)
import Svg.Attributes as Attr
import Svg.Events exposing (onMouseUp,on)
import Html.Events exposing (onClick,on)
import Svg.Keyed
import Svg.Lazy exposing (lazy)
import Json.Decode exposing (..)

import Random






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
    , ok : Bool
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


toggleOk : Box -> Box
toggleOk box =
    { box | ok = True }

toggleOff : Box -> Box
toggleOff box =
    { box | ok = False }


type alias BoxGroup =
    { uid : Int
    , movingBox : Maybe Box
    , idleBoxes : List Box
    }


emptyGroup : BoxGroup
emptyGroup =
    BoxGroup 0 Nothing []


makeAtomList : Int -> List Atom
makeAtomList ix = List.map (
  \ii 
   ->
    let 
     ixx= if (ii>4) then (ii-5) else ii
     iyy= if (ii>4) then 1 else 0   
    in
     { gensoname = " " , size = "25" , relposition=((toFloat ixx)*50.0,(toFloat iyy)*50.0) }  
 
 ) (List.range 0 (ix-1))


addBox :  (String,Vec2) -> BoxGroup  -> BoxGroup
addBox position ({ uid, idleBoxes } as group)  =
     { group
        | idleBoxes = makeBox (String.fromInt uid) (Tuple.second position)
          ( case uid of
            0 -> makeAtomList 4
            1 -> makeAtomList 5
            2 -> makeAtomList 6
            3 -> makeAtomList 7
            4 -> makeAtomList 8
            5 -> makeAtomList 9          
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


stopDragging : Id -> Wakul ->  BoxGroup -> BoxGroup
stopDragging id wkl1 group =
   let
                  dfb:Box
                  dfb=Box "0" (Vector2.vec2 10.0 10.0) False [ {gensoname="N"  , size="5" , relposition = (5.0,5.0) }] "N"
            
                  mbx=group.movingBox
                  bx=Maybe.withDefault dfb mbx
                  -- ll= bx.name++":"++ (String.fromFloat (Vector2.getX bx.position) )++ " "++(String.fromFloat (Vector2.getY bx.position) )
                  xx=Vector2.getX bx.position
                  yy=Vector2.getY bx.position


   in
    { group
        | idleBoxes = allBoxes group |> toggleBoxOk id wkl1  |> toggleBoxOff id wkl1 
        , movingBox = Nothing
    }


dragActiveBy : Vec2 -> BoxGroup -> BoxGroup
dragActiveBy delta group =
    { group | movingBox = group.movingBox |> Maybe.map (dragBoxBy delta) }


toggleBoxOk : Id -> Wakul ->  List Box -> List Box
toggleBoxOk id wkl1 lbox =
    let
              
        possiblyToggleBox box =
          let
                          
                 
                  bx=box
                  -- ll= bx.name++":"++ (String.fromFloat (Vector2.getX bx.position) )++ " "++(String.fromFloat (Vector2.getY bx.position) )
                  xx=Vector2.getX bx.position
                  yy=Vector2.getY bx.position   
          in
          
            if bx.id == id then
             (
              if wkl1.xss<xx && xx<wkl1.xee && wkl1.yss<yy && yy<wkl1.yee && bx.name==wkl1.nm then
                toggleOk bx
              else
                bx
             )
            else
                bx
    in
     lbox |> List.map possiblyToggleBox 

toggleBoxOff : Id -> Wakul ->  List Box -> List Box
toggleBoxOff id  wkl1  lbox =
    let
      
        possiblyToggleBox box =
          let
                  bx=box
                  -- ll= bx.name++":"++ (String.fromFloat (Vector2.getX bx.position) )++ " "++(String.fromFloat (Vector2.getY bx.position) )
                  xx=Vector2.getX bx.position
                  yy=Vector2.getY bx.position   
          in
            if box.id == id then
               (
              if not (wkl1.xss<xx && xx<wkl1.xee && wkl1.yss<yy && yy<wkl1.yee && bx.name==wkl1.nm)  
                  then
                  toggleOff bx
              else
                bx
             )
              
            else
                bx
    in
     lbox |> List.map possiblyToggleBox 


type alias Model =
    { boxGroup : BoxGroup
    , drag : Draggable.State Id
    , notify1 : String
    , seikai : Bool
    , kazu:Int
      }


type Msg
    = DragMsg (Draggable.Msg Id)
    | OnDragBy Vec2
    | StartDragging String
    | ToggleBoxOk String
    | StopDragging String
    | Next
    | Newface Int


boxPositions : Int -> List (String,Vec2)
boxPositions ichi =
    let
        
        indexToPosition = ( \ii -> (
             if ii==(ichi-4) then "icchi" else "" 
            , Vector2.vec2  ((toFloat (modBy 2 ii))*350+420)  (toFloat (50+(ii // 2)*120))) )

    in
    List.range 0 5 |> List.map indexToPosition


init : flags -> ( Model, Cmd Msg )
init _ =
    ( { boxGroup = makeBoxGroup (boxPositions 4)
      , drag = Draggable.init
      , notify1=""
      , seikai = False
      ,kazu=4
      
      }
    , Cmd.none
    )


dragConfig : Draggable.Config Id Msg
dragConfig =
    Draggable.customConfig
        [ onDragBy (\( dx, dy ) -> Vector2.vec2 dx dy |> OnDragBy)
        , onDragStart StartDragging
        
        ]

notify : Wakul -> BoxGroup -> String
notify wkl boxGroup =
               let
                  dfb:Box
                  dfb=Box "" (Vector2.vec2 0.0 0.0) False [] ""
            
                  mbx=boxGroup.movingBox
                  bx=Maybe.withDefault dfb mbx
                  -- ll= bx.name++":"++ (String.fromFloat (Vector2.getX bx.position) )++ " "++(String.fromFloat (Vector2.getY bx.position) )
                  xx=Vector2.getX bx.position
                  yy=Vector2.getY bx.position
                  
               in
                  if wkl.xss<xx && xx<wkl.xee && wkl.yss<yy && yy<wkl.yee && bx.name==wkl.nm then                
                    "Ok"
                  else
                   ""        

type alias Wakul =
  {
    xss : Float , xee : Float , yss : Float , yee : Float ,nm : String
  }

       

update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ boxGroup,seikai} as model) = 
  let 
    wkl : Float -> Float -> Float -> Float  -> String -> Wakul 
    wkl x1 x2 y1 y2 st={xss=x1,xee=x2,yss=y1,yee=y2,nm=st}

    wkl1= wkl 41.0 257.0 54.0 338.0 "icchi"

 
  in
    ( case msg of
        OnDragBy delta ->
            ( { model | boxGroup = boxGroup |> dragActiveBy delta }, Cmd.none )

        StartDragging id ->
            ( { model | boxGroup = boxGroup |> startDragging id }, Cmd.none )

        StopDragging id ->
            ( { model | 
                  notify1= boxGroup |> notify wkl1
                , boxGroup = boxGroup |> stopDragging id wkl1        
                
                }, Cmd.none )

        ToggleBoxOk id ->
            ( model , Cmd.none )

        DragMsg dragMsg ->
            Draggable.update dragConfig dragMsg model

        Next ->
            ( {model |
                seikai = False

            },Random.generate Newface (Random.int 4 9))    

        Newface su ->
          if model.kazu== su then        
            ( {model |  kazu =su } , Random.generate Newface (Random.int 4 9))
           else
            ( {model |  kazu =su  ,seikai=False
              ,notify1= boxGroup |> notify wkl1
             --   , boxGroup = boxGroup |> stopDragging id wkl1   
             ,boxGroup = makeBoxGroup (boxPositions su)
            } , Cmd.none )
  
      )
    

subscriptions : Model -> Sub Msg
subscriptions { drag } =
    Draggable.subscriptions DragMsg drag



-- VIEW


boxSize : Vec2
boxSize =
    Vector2.vec2 50 50


view : Model -> Html Msg
view { boxGroup,notify1,seikai,kazu} =
    Html.div
        []
        [ Html.p
            [ Html.Attributes.style "padding-left" "8px" ]
            [ Html.button [ Html.Attributes.style "fontSize" "30px",onClick Next ] [ text "つぎへ" ]  
              ,Html.text "　　　　" 
              ,select [Html.Attributes.style "font-size" "50px"  ] (List.map (\s -> Html.option [selected (s==(String.fromInt kazu)), Html.Attributes.value s][text s]) (["?","4","5","6","7","8","9"]))
               ,Html.text "をしかくのなかへ " 
            ] 

            
        , Svg.svg
            [ Attr.style "height: 100vh; width: 100vw; position: fixed;"
            ]
            [
                background
            , boxesView boxGroup
            , waku boxGroup notify1 
          
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
             _ -> "green"
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
boxView { id, position, ok ,atoms} =
    
       Svg.g
       ( [ Attr.cursor "move"
        , Draggable.mouseTrigger id DragMsg        
        , onMouseUp (StopDragging id) 
        , on "touchend" (succeed ( StopDragging id))
        , ( case ok of
                True ->  Attr.strokeWidth "5"
                _ -> Attr.strokeWidth "1"
            
            )] ++ (Draggable.touchTriggers id DragMsg) )
        ( 
            atoms |> List.map(\atom -> circlecreate position atom)            
        )



background : Svg msg
background =
    Svg.rect
        [ Attr.x "0"
        , Attr.y "0"
        , Attr.width "1300"
        , Attr.height "430"
        , Attr.fill "#eee"
        ]
        []

waku : BoxGroup -> String  -> Svg msg
waku boxGroup notify1 =
   Svg.g []
    [
      Svg.rect
       [ Attr.x "0"
       , Attr.y "0"
       , Attr.width "350"
       , Attr.height "400"
       , Attr.fill "none"
       , Attr.stroke "black"
       ]
       []
    ,moji "50" "350" notify1

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