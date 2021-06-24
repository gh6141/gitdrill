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

import FormatNumber exposing (format)
import FormatNumber.Locales exposing (Decimals(..), Locale, usLocale)


main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Mondai =
 {
     sa:Int
     ,sb:Int
     ,pattern:Int
 }

type alias Model =
  { 
    init:String
    ,mondai:Mondai
    ,ans:String
    ,ansLU:String
    ,ansRU:String
    ,ansLD:String
    ,ansRD:String
    ,inLU:String
    ,inRU:String
    ,inLD:String
    ,inRD:String
     
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mondai={sa=10,sb=2,pattern=1},ans="",ansLU="",ansRU="",ansLD="",ansRD=""
    ,inLU="",inRU="",inLD="",inRD=""}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int |ChangeS String String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
       mhenkan :Int -> Int -> Int -> Mondai
       mhenkan i1 i2 k1 = {sa=i1,sb= i2,pattern=k1} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map3  mhenkan (Random.int 11 199 ) (Random.int 2  99 ) (Random.int 1 3) 
  

 in
 
  case msg of


  
   Next ->
      ( model 
       ,   Random.generate Newmon monGenerator
       
      )
  
   Newmon mnd ->
   
      ( {model|mondai=mnd,inLD="",inRD="",inLU="",inRU=""}    ,Cmd.none)
  
   Btn si ->

      ( {model | ans=String.fromInt si
                 } ,Cmd.none)
  
   ChangeS snum lmr->
      let
        lrud = case lmr of
          "LU" -> {lu=snum,ru=model.inRU,ld=model.inLD,rd=model.inRD}
          "RU" -> {lu=model.inLU,ru=snum,ld=model.inLD,rd=model.inRD}
          "LD" -> {lu=model.inLU,ru=model.inRU,ld=snum,rd=model.inRD}
          "RD" -> {lu=model.inLU,ru=model.inRU,ld=model.inLD,rd=snum}
          _ -> {lu="",ru="",ld="",rd=""}
      


      in
       ( {model|inLU=lrud.lu,inLD=lrud.ld ,inRU=lrud.ru ,inRD=lrud.rd}, Cmd.none)
 


handlerLU selectedText = ChangeS selectedText "LU"
handlerLD selectedText = ChangeS selectedText "LD"
handlerRU selectedText = ChangeS selectedText "RU"
handlerRD selectedText = ChangeS selectedText "RD"

view : Model -> Html Msg
view model =
 let
        sList = case  model.mondai.pattern of
          1 -> ["?","1",tenmjo model.mondai.sa,tenmjo2 model.mondai.sa model.mondai.sb]
          2 -> ["?","1",tenmjo model.mondai.sa,tenmjo2 model.mondai.sa model.mondai.sb]
          3 -> ["?","1",tenmjo model.mondai.sa,tenmjo model.mondai.sb]
          _ -> ["?","",""]

 
      
        cboxlu inLRUD handler=select [style "font-size" "20px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==inLRUD),value s][text (s)]) sList)  
        dcbx xx yy cbx=div [Html.Attributes.style "position" "absolute", Html.Attributes.style "top" ((String.fromInt yy)++"px"), Html.Attributes.style "left" ((String.fromInt xx)++"px")] [cbx]
        dvx=30
        dvy=30
        cblu=dcbx (100+dvx) (100+dvy) (cboxlu model.inLU handlerLU)
        cbru=dcbx (300+dvx) (100+dvy) (cboxlu model.inRU handlerRU)
        cbld=dcbx (100+dvx) (180+dvy) (cboxlu model.inLD handlerLD)
        cbrd=dcbx (300+dvx) (180+dvy) (cboxlu model.inRD handlerRD)
         

        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [Html.Attributes.style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(buttoncaption ii)++" ")])

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
             ,tr [] [
               td [] [sbutton 0]
               ,td [] [sbutton 10]
               ,td [] [sbutton 11]
             ]                  
            ]  

        linex =Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
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
              ,stext 400 110 "(km)"
              ,stext 400 170 "(L)"



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
    tr [] [
      td [style "font-size" "20px" ] [text (
       case model.mondai.pattern of
         1 -> "1Lのガソリンで"++(tenmjo model.mondai.sa)++"km走る自動車があります。"++(tenmjo2 model.mondai.sa model.mondai.sb ) ++"km走るためには何L使いますか?"
         2 -> (tenmjo model.mondai.sa)++"Lのガソリンで"++(tenmjo2 model.mondai.sa model.mondai.sb) ++"km走る自動車があります。1Lのガソリンで何km走りますか?"
         3 -> "1Lのガソリンで"++(tenmjo model.mondai.sa)++"km走る自動車があります。"++(tenmjo model.mondai.sb) ++"Lでは何km走れますか?"
         _ -> ""
      )]
    ]

    ,tr []
    [
     td [Html.Attributes.style "position" "relative",Html.Attributes.style "padding" "3em"] [
       linex
       ,cblu,cbru,cbld,cbrd
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
    _  -> String.fromInt ii