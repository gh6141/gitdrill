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
  ( {init="9",mon1="4",mon2="5"}
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
      

        img1=img [src "https://rasp.cld9.work/py/car3.jpg",width 50, height 50,style "opacity" "0.5"] []
        
        list1 = List.repeat (toint model.mon2) (img1)
  
     
        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "60px"   ,onClick (Btn ii)]] [ text (" "++(String.fromInt ii)++" ")])

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
                  
 in
   table [align "center"]
   [
    tr []
    [ 
     td [style "font-size" "30px"  ] 
     [text ("ありました。"++"たべると　いくつ　のこる？")]
    ]
    ,tr []
    [ 

     td [] list1  
     ,td []
     [
       Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
      ,sujibutton       
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