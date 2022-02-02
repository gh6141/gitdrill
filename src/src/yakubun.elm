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
    =   Pl | Mi | Pls| Mis |Ba |Ya

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 
  case msg of 
   
  Pl ->
       ( {model|bunbo=model.bunbo+1},Cmd.none)
  Mi ->
       ( {model|bunbo=if model.bunbo>2 then model.bunbo-1  else model.bunbo },Cmd.none)
  Pls ->
       ( {model|bunsi=if model.bunsi<model.bunbo then model.bunsi+1 else model.bunsi},Cmd.none)
  Mis ->
       ( {model|bunsi=if model.bunsi>1 then model.bunsi-1  else model.bunsi },Cmd.none)
  Ba ->
       ( {model|baisu=model.baisu+1 },Cmd.none)
  Ya ->
       ( {model|baisu=if model.baisu>1 then model.baisu-1 else model.baisu},Cmd.none)


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
    srect xx yy wd ht rxx ryy fcolor scolor op= Svg.rect
        [ Svg.Attributes.x (String.fromInt xx)
        , Svg.Attributes.y (String.fromInt yy)
        , Svg.Attributes.width (String.fromInt wd)
        , Svg.Attributes.height (String.fromInt ht)
        , Svg.Attributes.rx (String.fromInt rxx)
        , Svg.Attributes.ry (String.fromInt rxx)
        , Svg.Attributes.fill fcolor
        , Svg.Attributes.stroke scolor
        ,Svg.Attributes.fillOpacity op
        ]
        []

    srectl bunkatu color= List.map (\su ->(srect ((600//bunkatu)*(su-1)) 0 (600//bunkatu) 100 5 5 "white" color "0.4" )) (List.range 1 bunkatu ) 

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
    
     td [] [ Button.button [Button.attrs [style "font-size" "24px"   ,onClick Ba]] [ text "倍分" ]
            ,Button.button [Button.attrs [style "font-size" "24px"   ,onClick Ya]] [ text "約分" ] ]

    ]

    ,tr [] [td[colspan 2] [Svg.svg [width 800] ([ 
      srect 0 0 600 100 5 5 "white" "black" "1.0"--sotowaku
      ,srect 2 2 ((600*model.bunsi)//model.bunbo) 100 5 5 "red" "black" "0.7"  --nakami
     -- ,srect 0 0 30 80 5 5 "white" "black" "0.4" --kugiri 
     -- ,srect 0 0 30 80 5 5 "white" "black" "0.4"--baibun kugiri
      ]
      ++ (srectl model.bunbo  "black")
      ++ (srectl (model.bunbo*model.baisu) "red") )
      
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

