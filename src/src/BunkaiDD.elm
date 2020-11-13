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
    , visible : Bool
    }


type alias Id =
    String

type alias Mondai=
  {
      wa:Int
      ,left:Int
      ,right:Int
  }


makeBox : Id -> Vec2 -> List Atom -> String -> Bool -> Box
makeBox id position atoms name visible=
    Box id position False atoms name visible


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


makeAtomList : Bool -> Int -> List Atom
makeAtomList sujiflg ix = List.map (
  \ii 
   ->
    let 
     ixx= if (ii>4) then (ii-5) else ii
     iyy= if (ii>4) then 1 else 0   
     gname=if (ii==0) then (String.fromInt ix) else " "
    in
     if sujiflg then
     { gensoname = gname , size = "30" , relposition=((toFloat ixx)*36.0,(toFloat iyy)*36.0) }  
     else 
     { gensoname = gname , size = "18" , relposition=((toFloat ixx)*36.0,(toFloat iyy)*36.0) }  
 
 ) (if sujiflg then (List.range 0 0) else (List.range 0 (ix-1)))


type alias Func = Int -> Int

--ドラッグする●の並びを指定する関数
func1 : Func

func1 uid = uid+1

--分解の問題の●の並びを指定する関数
func2 : Mondai -> Func
func2 mond = (\uid -> ( case uid of
                         0 -> mond.wa    -- 0上,1左,2右は位置を表す
                         1 -> mond.left
                         2 -> mond.right
                         _ -> 0
                      ) )




addBox : Bool -> String -> Func -> (String,Vec2) -> BoxGroup -> BoxGroup
addBox sujiflg leftright func position  ({ uid, idleBoxes } as group)   =
     { group
        | idleBoxes = makeBox (String.fromInt uid) (Tuple.second position)
           (makeAtomList sujiflg (func uid))          --ここで各●の並びを決定
           (Tuple.first position)
           (if (Tuple.first position) ==leftright then False else True)
         :: idleBoxes
        , uid = uid + 1 
     }


makeBoxGroup : Bool -> String -> Func -> List (String,Vec2) -> BoxGroup
makeBoxGroup sujiflg leftright func positions =
    positions
        |> List.foldl (addBox sujiflg leftright func) emptyGroup


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
                  dfb=Box "0" (Vector2.vec2 10.0 10.0) False [ {gensoname="N"  , size="5" , relposition = (5.0,5.0) }] "N" True
            
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
    ,boxGroupM :BoxGroup
    , drag : Draggable.State Id
    , notify1 : String
    ,notify2:String
    ,notify3:String
    , seikai : Bool
    , kazu:Int
    , waku1 :Wakul
    , waku2 :Wakul
    , waku3 :Wakul
    , mondai: Mondai
    , hide:String
    , circle: Bool
      }


type Msg
    = DragMsg (Draggable.Msg Id)
    | OnDragBy Vec2
    | StartDragging String
    | ToggleBoxOk String
    | StopDragging String
    | Next
    | Newface Int
    | Changestg String
    | Left
    | Right
    | Circle
    | Multi


boxPositions : Int -> Int -> List (String,Vec2)
boxPositions xi yi =
    let        
        indexToPosition = 
           ( \ii -> 
              (
               String.fromInt (ii+1)
              ,     
                Vector2.vec2  (toFloat ((modBy 2 ii)*220+xi))  (toFloat (yi+(ii // 2)*90))   
               )    
            )
    in
    List.range 0 (5+3) |> List.map indexToPosition

boxPositionsM : Wakul -> Wakul -> Wakul -> List (String,Vec2)
boxPositionsM wk1 wk2 wk3 =
    let        
        indexToPosition = 
           ( \ii -> 
              (
               case ii of
                0 -> "wa"
                1 -> "left"
                2 -> "right"
                _ -> ""
              ,  case ii of 
                  0 -> Vector2.vec2  (wk1.xss+50)  (wk1.yss+50)
                  1 -> Vector2.vec2  (wk2.xss+50) (wk2.yss+50)
                  2 -> Vector2.vec2  (wk3.xss+50) (wk3.yss+50)
                  _ -> Vector2.vec2  0.0  0.0 
                  
               )    
            )

        
    in
      List.range 0 2 |> List.map indexToPosition


init : flags -> ( Model, Cmd Msg )
init _ =
    let
      wk1={ xss=160.0 ,xee=360.0,yss= 10.0,yee= 150.0,nm= "3"} --wa
      wk2={ xss=10.0 ,xee=210.0,yss= 200.0,yee= 350.0,nm= "2"} --left
      wk3={ xss=310.0 ,xee=510.0,yss= 200.0,yee= 350.0,nm= "1"} --right
    in
    ( { boxGroup = makeBoxGroup False "" func1 (boxPositions 550 50)
       , boxGroupM = makeBoxGroup False "left" (func2 {wa=3,left=2,right=1}) (boxPositionsM  wk1 wk2 wk3)
      , drag = Draggable.init
      , notify1="",notify2="",notify3=""
      , seikai = False
      ,kazu=4
      ,waku1=wk1
      ,waku2=wk2
      ,waku3=wk3
      ,mondai={wa=3,left=2,right=1}
      ,hide="left"
      ,circle=False
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
                  dfb=Box "" (Vector2.vec2 0.0 0.0) False [] "" True
            
                  mbx=boxGroup.movingBox
                  bx=Maybe.withDefault dfb mbx
                  xx=Vector2.getX bx.position
                  yy=Vector2.getY bx.position
                  
               in
                  if wkl.xss<xx && xx<wkl.xee && wkl.yss<yy && yy<wkl.yee && bx.name==wkl.nm then                
                    "◎"
                  else
                   ""        

type alias Wakul =
  {
    xss : Float , xee : Float , yss : Float , yee : Float ,nm : String
  }



update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ boxGroup,seikai,waku1,waku2,waku3,mondai,kazu,hide,circle} as model) = 
  let

    wkl1=waku1
    wkl2=waku2
    wkl3=waku3

  in
    ( case msg of
        OnDragBy delta ->
            ( { model | boxGroup = boxGroup |> dragActiveBy delta }, Cmd.none )

        StartDragging id ->
            ( { model | boxGroup = boxGroup |> startDragging id }, Cmd.none )

        StopDragging id ->
           let
               wk1={ xss=160.0 ,xee=360.0,yss= 10.0,yee= 150.0,nm= String.fromInt mondai.wa} --wa
               wk2={ xss=10.0 ,xee=210.0,yss= 200.0,yee= 350.0,nm= String.fromInt mondai.left} --left
               wk3={ xss=310.0 ,xee=510.0,yss= 200.0,yee= 350.0,nm= String.fromInt mondai.right} --right


           in


            ( { model | 
                  notify1= boxGroup |> notify wk1
                  , notify2= boxGroup |> notify wk2
                  , notify3= boxGroup |> notify wk3
                , boxGroup = boxGroup |> stopDragging id wkl1     
                
                }, Cmd.none )

        ToggleBoxOk id ->
            ( model , Cmd.none )

        DragMsg dragMsg ->
            Draggable.update dragConfig dragMsg model

        Next ->
            ( {model |
                seikai = False

            },Random.generate Newface (Random.int 1 (mondai.wa-1)))    
        
        Left ->
            ( {model |  hide = "left" },Cmd.none)    
        Right ->
            ( {model |  hide = "right" },Cmd.none)    
        
        Circle ->
            ( {model | 
              circle=True
              ,boxGroup = makeBoxGroup True "" func1 (boxPositions 550 50)
             ,boxGroupM = makeBoxGroup True hide (func2 {wa=mondai.wa,left=mondai.wa-kazu,right=kazu}) (boxPositionsM  wkl1 wkl2 wkl3)
            
            },Cmd.none)    

        Multi ->
          ( {model | 
              circle=False
              ,boxGroup = makeBoxGroup False "" func1 (boxPositions 550 50)
             ,boxGroupM = makeBoxGroup False hide (func2 {wa=mondai.wa,left=mondai.wa-kazu,right=kazu}) (boxPositionsM  wkl1 wkl2 wkl3)
            
            },Cmd.none)    


        Newface su ->
         let
           tmondai={wa=mondai.wa,left=mondai.wa-su,right=su}


         in
           if model.kazu== su then        
            ( {model |  mondai=tmondai } , Random.generate Newface (Random.int 1 (mondai.wa-1)))
           else    

            ( {model |  kazu =su  ,seikai=False ,mondai=tmondai
              ,notify1= boxGroup |> notify wkl1
              ,notify2= boxGroup |> notify wkl2
              ,notify3= boxGroup |> notify wkl3
             ,boxGroup = makeBoxGroup circle "" func1 (boxPositions 550 50)
             ,boxGroupM = makeBoxGroup circle hide (func2 tmondai) (boxPositionsM  wkl1 wkl2 wkl3)
            } , Cmd.none )
        Changestg st ->
              let
                  tmondai={wa=(toint st),left=(toint st)-1,right=1}
              in
               ({model | mondai=tmondai},Random.generate Newface (Random.int 1 (tmondai.wa-1)))
  
      )
    

subscriptions : Model -> Sub Msg
subscriptions { drag } =
    Draggable.subscriptions DragMsg drag



-- VIEW


boxSize : Vec2
boxSize =
    Vector2.vec2 50 50


view : Model -> Html Msg
view { boxGroup,boxGroupM,notify1,notify2,notify3,seikai,kazu,waku1,waku2,waku3,mondai} =
   let
             handlerstg selectedText =
                  Changestg selectedText

   in


    Html.div
        []
        [ Html.p
            [ Html.Attributes.style "padding-left" "8px" ]
            [ Html.button [ Html.Attributes.style "fontSize" "30px",onClick Next ] [ text "つぎへ" ]  
              ,Html.text "　　　　あわせて" 
              ,select [Html.Attributes.style "font-size" "50px",onChange handlerstg  ] (List.map (\s -> Html.option [selected (s==(String.fromInt mondai.wa)), Html.Attributes.value s][text s]) (["?","3","4","5","6","7","8","9","10"]))
               ,Html.text "にしよう　　Hide:" 

                  ,Html.button [ Html.Attributes.style "fontSize" "20px",onClick Left ] [ text "Left" ]  
                  ,Html.button [ Html.Attributes.style "fontSize" "20px",onClick Right ] [ text "Right" ]  
                   ,Html.text "　　Circle:" 
                  ,Html.button [ Html.Attributes.style "fontSize" "20px",onClick Circle ] [ text "Single" ] 
                  ,Html.button [ Html.Attributes.style "fontSize" "20px",onClick Multi ] [ text "Multiple" ]  

            ] 

            
        , Svg.svg
            [ Attr.style "height: 100vh; width: 100vw; position: fixed;"
            ]
            [
                background
            , boxesView False boxGroup
            , boxesView True boxGroupM --True:固定
            , waku boxGroup notify1 waku1
            , waku boxGroup notify2 waku2
            , waku boxGroup notify3 waku3
            , sen waku1 waku2 waku3
            ]
     
        ]

boxesView : Bool -> BoxGroup -> Svg Msg
boxesView kotei boxGroup =
    boxGroup
        |> allBoxes
        |> List.reverse
        |> List.map (boxView kotei)
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

boxView : Bool -> Box -> Svg Msg
boxView kotei { id, position, ok ,atoms,visible} =
    let
       idt=if kotei then "" else id
    in


       Svg.g
       ( [ Attr.cursor "move"        
        , Draggable.mouseTrigger idt DragMsg       
        , onMouseUp (StopDragging idt) 
        , on "touchend" (succeed ( StopDragging idt))
        , ( case ok of
                True ->  Attr.strokeWidth "5"
                _ -> Attr.strokeWidth "1"
            
            )] ++ (Draggable.touchTriggers idt DragMsg) )
        ( 
            if visible then
             atoms |> List.map(\atom -> circlecreate position atom)  
            else
             []
                      
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

waku : BoxGroup -> String  -> Wakul -> Svg msg
waku boxGroup ntfy wkl =
   Svg.g []
    [
      Svg.rect
       [ Attr.x (String.fromFloat wkl.xss)
       , Attr.y (String.fromFloat wkl.yss)
       , Attr.width (String.fromFloat (wkl.xee-wkl.xss))
       , Attr.height (String.fromFloat (wkl.yee-wkl.yss))
       , Attr.fill "none"
       , Attr.stroke "black"
       ]
       []
    ,moji (String.fromFloat wkl.xss) (String.fromFloat wkl.yee) ntfy

    ]

sen : Wakul -> Wakul -> Wakul -> Svg msg
sen wkl1 wkl2 wkl3 =
    Svg.g []
    [
      Svg.line
       [ Attr.x1 (String.fromFloat ((wkl1.xss+wkl1.xee)/2-10))
        ,Attr.y1 (String.fromFloat wkl1.yee)
        ,Attr.x2 (String.fromFloat ((wkl2.xss+wkl2.xee)/2) )
        ,Attr.y2 (String.fromFloat wkl2.yss)
          , Attr.stroke "black"
       ]
       []
       ,
       Svg.line
       [ Attr.x1 (String.fromFloat ((wkl1.xss+wkl1.xee)/2+10))
        ,Attr.y1 (String.fromFloat wkl1.yee)
        ,Attr.x2 (String.fromFloat ((wkl3.xss+wkl3.xee)/2))
        ,Attr.y2 (String.fromFloat wkl3.yss)
          , Attr.stroke "black"
       ]
       []
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
            "◎" -> "red"
            _ -> "black"
         )

        , Attr.fontSize "100pt"
     ]
     [Svg.text txt] 
    



num : (String -> Svg.Attribute msg) -> Float -> Svg.Attribute msg
num attr value =
    attr (String.fromFloat value)

onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.Decode.map handler Html.Events.targetValue)

toint st=  Maybe.withDefault 0 (String.toInt st) 