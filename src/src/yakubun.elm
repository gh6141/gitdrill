module Yakubun exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json
import Array exposing (Array)

import Task

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Utilities.Spacing as Spacing

import Random

import Svg
import Svg.Attributes



main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model =
  { 
     bunsi:Int
     ,bunbo:Int
     ,baisu:Int
     
 
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {bunsi=1,bunbo=2,baisu=1}
  , Cmd.none
  )

type Msg
    =   Pl | Mi | Pls| Mis |Ya |B2 |B3

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =

  case msg of 
   
  Pl ->
       ( (mgcm {model|bunbo=model.bunbo+1}),Cmd.none)
  Mi ->
       ( (mgcm {model|bunbo=if model.bunbo>2 then model.bunbo-1  else model.bunbo }),Cmd.none)
  Pls ->
       ( ( {model|bunsi=if model.bunsi<model.bunbo then model.bunsi+1 else model.bunsi}),Cmd.none)
  Mis ->
       ( (mgcm {model|bunsi=if model.bunsi>1 then model.bunsi-1  else model.bunsi }),Cmd.none)
  Ya ->
       ( (mgcm {model|baisu=1}),Cmd.none)
  B2 ->
       ( (mgcm {model|baisu=2}),Cmd.none)
  B3 ->
       ( (mgcm {model|baisu=3}),Cmd.none)


view : Model -> Html Msg
view model =

  let
    sline x1 y1 x2 y2 wd color =Svg.line
          [ Svg.Attributes.x1 (String.fromInt x1)
         , Svg.Attributes.y1 (String.fromInt y1)
         , Svg.Attributes.x2 (String.fromInt x2)
         , Svg.Attributes.y2 (String.fromInt y2)
         , Svg.Attributes.stroke color
         , Svg.Attributes.strokeWidth (String.fromInt wd)
         , Svg.Attributes.strokeLinecap "round"
          ] []
    srect xx yy wd ht rxx ryy fcolor scolor op wdx= Svg.rect
        [ Svg.Attributes.x (String.fromInt xx)
        , Svg.Attributes.y (String.fromInt yy)
        , Svg.Attributes.width (String.fromInt wd)
        , Svg.Attributes.height (String.fromInt ht)
        , Svg.Attributes.rx (String.fromInt rxx)
        , Svg.Attributes.ry (String.fromInt rxx)
        , Svg.Attributes.fill fcolor
        , Svg.Attributes.stroke scolor
        ,Svg.Attributes.fillOpacity op
        , Svg.Attributes.strokeWidth (String.fromInt wdx)
        ]
        []

    srectl bunkatu color wd= List.map (\su ->(srect ((600//bunkatu)*(su-1)) 0 (600//bunkatu) 100 5 5 "white" color "0.4" wd)) (List.range 1 bunkatu ) 

  in
 
   table [align "left"]
   [
    tr []
    [
   
     td [Html.Attributes.style "font-size" "20px",style "color" "black" ]
     [
         tr[][td[][  Button.button [Button.attrs [style "font-size" "24px"   ,onClick Pls]] [ text "分子をふやす" ]
                ,  Button.button [Button.attrs [style "font-size" "24px"   ,onClick Mis]] [ text "へらす" ]]]    
        ,tr[][td [] [Button.button [Button.attrs [style "font-size" "24px"   ,onClick Pl]] [ text "分母をふやす" ]
                ,  Button.button [Button.attrs [style "font-size" "24px"   ,onClick Mi]] [ text "へらす" ] ]]    
                
     
     ],
     td[] [
           tr[] [td[Html.Attributes.style "font-size" "26px",style "color" "blue"  ] [text ("　　"++(String.fromInt (model.bunsi*model.baisu)))]] 
           ,tr[] [td[Html.Attributes.style "font-size" "30px",style "color" "blue"  ] [text ("　－－  ="++(String.fromFloat ((toFloat model.bunsi)/(toFloat model.bunbo))))]] 
           ,tr[] [td[Html.Attributes.style "font-size" "26px",style "color" "blue" ] [text ("　　"++String.fromInt (model.bunbo*model.baisu))]]
          ]


    ]
    ,tr [] [
      td [] [ ],
    
     td [] [ Button.button [Button.attrs [style "font-size" "24px"   ,onClick B2]] [ text "2で倍分" ]
            , Button.button [Button.attrs [style "font-size" "24px"   ,onClick B3]] [ text "3で倍分" ]
            ,Button.button [Button.attrs [style "font-size" "24px"   ,onClick Ya]] [ text "約分" ] ]

    ]

    ,tr [] [td[colspan 2] [Svg.svg [width 800] ([ 
      srect 0 0 600 100 5 5 "white" "black" "1.0" 3--sotowaku
      ,srect 2 2 ((600*model.bunsi)//model.bunbo) 100 5 5 "red" "black" "0.7" 2 --nakami
     -- ,srect 0 0 30 80 5 5 "white" "black" "0.4" --kugiri 
     -- ,srect 0 0 30 80 5 5 "white" "black" "0.4"--baibun kugiri
      ]
      ++ (srectl model.bunbo  "black" 4)
      ++ (srectl (model.bunbo*model.baisu) "red" 1) )
      
      ]
    ]

   ]


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)


toint st=  Maybe.withDefault 0 (String.toInt st) 
fst tuple =
    let
        (value1, _) = tuple
    in
    value1

snd tuple =
    let
        (_, value2) = tuple
    in
    value2


gcm a b =
  let
   (dai,sho)=  if a>b then (a,b) else (b,a)
   r=modBy sho dai
  in
   if r==0 then sho else (gcm sho r)

mgcm mdl= 
          let
           gc=gcm (mdl.bunbo*mdl.baisu) (mdl.bunsi*mdl.baisu)

          in
          {
           bunsi= mdl.bunsi*mdl.baisu//gc
          ,bunbo= mdl.bunbo*mdl.baisu//gc
          ,baisu= gc
          }

