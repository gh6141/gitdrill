module Tokei exposing (..)

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

import FormatNumber exposing (format)
import FormatNumber.Locales exposing (Decimals(..), Locale, usLocale)


main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }




type alias Model =
  { 
     ji:Int
    ,hun:Int
    ,pattern:Int
    ,ans:String
    ,dispans:Bool
    
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {ji=10,hun=10,pattern=1,ans="",dispans=False}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Model | Btn Int 

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
       mhenkan :Int -> Int -> Int -> Model
       mhenkan i1 i2 k1 = {ji=i1,hun= i2,pattern=k1,ans="",dispans=False} 

       monGenerator : Random.Generator Model   
       monGenerator = Random.map3  mhenkan (Random.int 1 12 ) (Random.int 0  59 ) (Random.int 1 1) 
  

 in
 
  case msg of

   Next ->
      ( {model|ans="",dispans=False}
       ,   Random.generate Newmon monGenerator       
      )
  
   Newmon mdl ->   
      ( mdl    , 
         Cmd.none)
  
   Btn si ->


      ( {model |  dispans=if si==14 then True else model.dispans
                 } ,Cmd.none)
  
 

view : Model -> Html Msg
view model =
 let
        sbutton ii = (Button.button [Button.attrs [Html.Attributes.style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(buttoncaption ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
               ,td [] [sbutton 12]
             ]
             ,tr [] [
               td [] [sbutton 4]
               ,td [] [sbutton 5]
               ,td [] [sbutton 6]
               ,td [] [sbutton 13]
             ]
             ,tr [] [
               td [] [sbutton 1]
               ,td [] [sbutton 2]
               ,td [] [sbutton 3]
               ,td [] [sbutton 14]
             ]     
             ,tr [] [
               td [] [sbutton 0]
               ,td [] [sbutton 10]
               ,td [] [sbutton 11]
               ,td [] [sbutton 15]
                    ,td [] [sbutton 16]
             ]                  
            ]  

        tokei ji hun =Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
         , Svg.Attributes.height "400"
         ]
          ([
           scircle 120 160 150
           ,chosin ji hun
           ,tansin ji hun
 
          ]++(List.map (\n-> (shankei 120 160 ((toFloat n)*pi/6) 140.0 150.0) )  (List.range 0 11)) 
           ++(List.map (\n-> (shankei 120 160 ((toFloat n)*pi/30) 147.0 150.0) )  (List.range 0 59)) 
           ++(List.map (\n-> (tmoji 120 160 n 120.0))  (List.range 1 12))
    
          )

        shankei xx yy th str enr = sline  ((round (str*(cos (-th+pi/2))))+xx)  ((round (str*(-1*sin (-th+pi/2)))) +yy)
          ((round (enr*(cos (-th+pi/2))))+xx)  ((round (enr*(-1*sin (-th+pi/2))))+yy) 3

        tmoji xx yy nn rr = stext ((round (rr*(cos (-(toFloat nn)*pi/6+pi/2))))+xx-10+(if nn==12 then -5 else 0))
          ((round (rr*(-1*sin (-(toFloat nn)*pi/6+pi/2)))) +yy+10)
           (String.fromInt nn)

        tansin jix hunx = shankei 120 160 ((toFloat jix)/12.0*2.0*pi+(toFloat hunx)/60.0/12.0*2.0*pi) 0 80
        chosin jix hunx = shankei 120 160 ((toFloat hunx)/60.0*2.0*pi)  0 110
        
        scircle xx yy radius = Svg.circle [ 
          Svg.Attributes.cx (String.fromInt xx)
          , Svg.Attributes.cy (String.fromInt yy)
          , Svg.Attributes.r (String.fromInt radius) 
          , Svg.Attributes.fill "white"
          , Svg.Attributes.stroke "black"
          , Svg.Attributes.strokeWidth "3"] []
         
        stext xx yy moji = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill "black"   
         ,Svg.Attributes.fontSize "26"       
         ]
         [ Svg.text moji
         ]
        
        sline x1 y1 x2 y2 wd =Svg.line
          [ Svg.Attributes.x1 (String.fromInt x1)
         , Svg.Attributes.y1 (String.fromInt y1)
         , Svg.Attributes.x2 (String.fromInt x2)
         , Svg.Attributes.y2 (String.fromInt y2)
         , Svg.Attributes.stroke "blue"
         , Svg.Attributes.strokeWidth (String.fromInt wd)
         , Svg.Attributes.strokeLinecap "round"
          ] []
                  
 in

   table [align "center",style "width" "80%"]
   [
    tr []
    [
     td [Html.Attributes.style "position" "relative",Html.Attributes.style "padding" "3em"] [
       tokei model.ji model.hun
      
      ]   
     ,td [] [
       tr [] [
       td [] [Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Next]] [ Html.text "つぎへ" ] ]
        ]
      ,tr [] [
        td [] [sujibutton]
      ]
      ,tr [] [
        td [] [
          span [style "font-size" "30px"] [text ( if model.dispans then ((String.fromInt model.ji)++"じ"++(String.fromInt model.hun)++"ふん") else "")  ]
         ]
       ]
         
      ]
    ]
   ]
   


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


onChange : (String -> msg) -> Html.Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)


toint st=  Maybe.withDefault 0 (String.toInt st) 
tofloat st=  Maybe.withDefault 0 (String.toFloat st) 



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

tenmjo ii=format sharesLocale ((toFloat ii)*0.1)


tenmjo2 ii jj = format sharesLocale  ( (toFloat ii)*0.1*(toFloat jj)*0.1 )

sharesLocale : Locale
sharesLocale =
    { usLocale
        | decimals = Max 4
     
    }

buttoncaption ii = 
  case ii of
    10 -> "."
    11 -> "C"
    12 -> "時"
    13 -> "分"    
    14 -> "答"
    15 -> "Lv1"
    16 -> "Lv2"
    _  -> String.fromInt ii