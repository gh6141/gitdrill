module Nijo exposing (main)

import Browser
import Draggable
import Draggable.Events exposing (onClick, onDragBy, onDragStart)
import Html exposing (Html,button,select,div)
import Html.Attributes exposing(selected,value)
import Math.Vector2 as Vector2 exposing (Vec2, getX, getY)
import Svg exposing (..)
import Svg.Attributes as Attr exposing(strokeWidth,stroke,fill,r,cx,cy,height,width,viewBox,x1,x2,y1,y2,x,y,color)
import Svg.Events exposing (onMouseUp,on)
import Html.Events exposing (onClick,on)
import Svg.Keyed
import Svg.Lazy exposing (lazy)


main =
  Browser.sandbox { init = init, update = update, view = view }

type alias Circle =
    {
      id:Int
      , xi :Float
      , yi :Float
    }


ciCreate : String -> String -> Svg ms
ciCreate xs ys = Svg.circle [Attr.cx xs ,Attr.cy ys, Attr.r "2" , Attr.fill "red" , Attr.stroke "red" , Attr.strokeWidth "1" ] []   



-- MODEL

type alias Model = 
  { 
   cid: Int
   ,x : String
   ,y : String
   ,cl :List Circle 
   ,plus: Bool
   ,kizami :Float
   ,ichi :Int
   ,sayu:Float
  }



init : Model
init = {cid=0,x="0",y="0",cl=[],plus=True,kizami=0.1,ichi=50,sayu=1.0}


-- UPDATE

type Msg
  = Increment
  | Decrement
  | X2
  | Mx2 | Kizami01 | Kizami001 | Kakudai | Shukusho |Genten


update : Msg -> Model -> Model
update msg model =
 let
         idx=model.cid+1
         kizami=model.kizami
         plusminus=if model.plus then 1.0 else -1.0
 in
  case msg of
    Increment ->
      {model|cid=idx
      ,x=String.fromFloat ((toFloat idx)*kizami)
      ,y=String.fromFloat ((toFloat (idx^2))*kizami^2)
      ,cl= {id=idx,xi=(toFloat idx)*kizami,yi=plusminus*((toFloat idx)*kizami)^2} :: model.cl
      ,sayu=1.0
      }

    Decrement ->
      {model|cid=idx
      ,x=String.fromFloat ((toFloat idx)*kizami)
      ,y=String.fromFloat ((toFloat (idx^2))*kizami^2)
      ,cl= {id=idx,xi=-(toFloat idx)*kizami,yi=plusminus*((toFloat idx)*kizami)^2} :: model.cl
      ,sayu=-1.0}

    X2 ->
      {model|plus=True,cid=0,x="0",y="0",cl=[]}
    Mx2 ->
      {model|plus=False,cid=0,x="0",y="0",cl=[]}
    
    Kizami01 ->
       {model|cid=0,x="0",y="0",cl=[],kizami=0.1}
    Kizami001 ->
       {model|cid=0,x="0",y="0",cl=[],kizami=0.05}
    Kakudai ->
       {model|ichi=model.ichi+10}

    Shukusho ->
       {model|ichi=if model.ichi>10 then model.ichi-10 else 10}

    Genten ->
        {model|cid=0,x="0",y="0",cl=[]}


-- VIEW


view : Model -> Html Msg
view model =
  let
   plusminus=if model.plus then 1.0 else -1.0
   fsize=10  --gusu
   ichi=model.ichi --1の値　倍率
   x0=200
   y0=200
   xjiku= 
    line [x1 (String.fromInt 0) ,y1 (String.fromInt y0)
        , x2 (String.fromInt (x0*2)), y2 (String.fromInt y0),stroke "black"][]
   yjiku= 
    line [x1 (String.fromInt x0) ,y1 (String.fromInt 0)
        , x2 (String.fromInt x0), y2 (String.fromInt (y0*2)),stroke "black"][]
   mojidisp xi yi moji=  Svg.text_ [x (String.fromInt xi) ,y (String.fromInt yi),color "black"][Svg.text moji]
   xmoji= mojidisp (x0*2+10) y0 "x"
   ymoji= mojidisp (x0+10) 10 "y"
   ichix= mojidisp (x0+ichi-fsize//2) (y0+15) "1"
   ichiy= mojidisp (x0+5) (y0-ichi+fsize//2) "1"
   ichimx= mojidisp (x0-ichi-fsize//2) (y0+15) "-1"
   ichimy= mojidisp (x0+5) (y0+ichi+fsize//2) "-1"

   tofloat xs=Maybe.withDefault 0 (String.toFloat xs)
   -- ++":   "++"x="++(String.left 4 model.x)++"  y="++(String.left 4 model.y) 
   xichi=x0+(round (model.sayu*(toFloat ichi)*(tofloat model.x)))
   yichi=y0-(round (plusminus*(toFloat ichi)*(tofloat model.y)))
   xzahyo= mojidisp  (xichi-fsize//2) (y0+15) ((if model.sayu<0 then "-" else "")++(String.left 4 model.x))
   yzahyo= mojidisp  (x0+5) (yichi+fsize//2) ((if model.plus then "" else "-")++(String.left 4 model.y))
   xline= 
    line [x1 (String.fromInt 0) ,y1 (String.fromInt yichi)
        , x2 (String.fromInt (x0*2)), y2 (String.fromInt yichi),stroke "green"][]
   yline= 
    line [x1 (String.fromInt xichi) ,y1 (String.fromInt 0)
        , x2 (String.fromInt xichi), y2 (String.fromInt (y0*2)),stroke "green"][]



   zahyojiku=[xjiku,yjiku,xmoji,ymoji,xzahyo,yzahyo,xline,yline]

   
   circleMsg ci = ciCreate (String.fromInt (x0+(round ((toFloat ichi)*ci.xi) )))  (String.fromInt (y0-(round ((toFloat ichi)*ci.yi))) ) 

   pointDisp = List.map circleMsg model.cl  
  
  in
   div []
    [ div [] [button [ onClick Decrement ] [ text "マイナス" ] ,button [ onClick Genten ] [ text "原点" ] ,button [ onClick Increment ] [ text "プラス" ]   ]
    , div [] [ text ((if model.plus then "y=x^2" else "y=-x^2")) ]
    , div [] [ button [onClick X2] [text "y=x^2"]  , button [onClick Mx2] [text "y=-x^2"]      ]
    , div [] [ button [onClick Kizami01] [text "きざみ０．１"]  , button [onClick Kizami001] [text "きざみ０．０５"]      ]
    , div [] [ button [onClick Shukusho] [text "縮小"]  , button [onClick Kakudai] [text "拡大"]      ]
    , svg
    [ viewBox "0 0 800 600"
    , width "1000"
    , height "600"
    ]
    
    (zahyojiku++pointDisp)

    ]


 