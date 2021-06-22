module Subunkai exposing (..)

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
      init:String
    ,mon1:String
    ,mon2:String
 
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mon1="2",mon2="1"}
  , Cmd.none
  )

type Msg
    =  Next | Newface Int | Btn Int 

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 
  case msg of


  
   Next ->
      ( model 
       ,   Random.generate Newface (Random.int 1 ((toint model.init)-1))
      )
  
   Newface su ->
   
      ( {model |  mon1 =String.fromInt su ,mon2=String.fromInt  su}    ,Cmd.none)
  
   Btn si ->
    let
      m1=String.fromInt si
      m2=String.fromInt si

    in
     ( {model | mon1=m1  ,mon2=m2
                 } ,Cmd.none)



view : Model -> Html Msg
view model =
 let
      

  
        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [Html.Attributes.style "font-size" "60px"   ,onClick (Btn ii)]] [ Html.text (" "++(String.fromInt ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
             ]
             ,tr [] [
               td [] [sbutton 4]
               ,td [] [sbutton 5]
               ,td [] [sbutton 6]
             ]
             ,tr [] [
               td [] [sbutton 1]
               ,td [] [sbutton 2]
               ,td [] [sbutton 3]
             ]            
            ]

        linex =Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "400"
         , Svg.Attributes.height "400"
         ]
          [
              sline 20 120 400 120 3 
              ,sline 20 150 400 150 3 

              ,sline 100 115 100 125 2 
              ,sline 300 115 300 125 2
              ,sline 100 145 100 155 2 
              ,sline 300 145 300 155 2 

              ,sline 20 115 20 155 1 
              ,stext 15 110 "0"
              ,stext 15 170 "0"

              ,stext 100 110 "lu" ,stext 300 110 "ru"
              ,stext 100 170 "ld" ,stext 300 170 "rd"
          ]
         
        stext xx yy moji = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill "black"          
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

   table [align "center"]
   [
    tr []
    [
     td [Html.Attributes.style "padding" "3em"] [
       linex

      ]   
     ,td [] [
       Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Next]] [ Html.text "つぎへ" ]
      ,sujibutton       
      ]
    ]
   ]


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


onChange : (String -> msg) -> Html.Attribute msg
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