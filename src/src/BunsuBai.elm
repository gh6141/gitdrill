module BunsuBai exposing (..)

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

import Katex as K
    exposing
        ( Latex
        , human
        , inline
        , display
        )
import Bootstrap.Button as Button

--opassage : List Latex
--opassage =
 --   [ human "等式の変形 "
 --   , inline "s=\\dfrac{a}{b}"
 --   , human " *** "
 --   , display "s=\\dfrac{a}{b}"

 --   ]


main =
  Browser.element
    { init = init
    , update = update
    , view =  view
    , subscriptions = subscriptions
    }

type alias Mondai =
 {
   si1:Int
   ,bo1:Int
   ,si2:Int
   ,bo2:Int
   ,si3:Int
   ,bo3:Int
   ,pattern:Int
 }


type alias Model =
  { 
  ludIchi:Int
  ,mondai:Mondai
  ,ans:String
  ,bun1:String
  ,bun2:String
  
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {mondai={si1=1,bo1=2,si2=1,bo2=4,si3=1,bo3=8,pattern=1},ludIchi=1,ans="",bun1="\\frac{1}{2}",bun2="*"}
  , Cmd.none
  )

type Msg    =  Next | Newmon Mondai | Btn Int |Kmotome

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
       mhenkan :Int -> Int -> Int -> Int -> Mondai
       mhenkan i1 i2 i3 i4 = {si1=i1,si2= i2,si3=i3,bo1=model.mondai.bo1,bo2=model.mondai.bo2,bo3=model.mondai.bo3,pattern=i4} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map4  mhenkan (Random.int 1 9 ) (Random.int 1  9 ) (Random.int 1 9) (Random.int 1 3)
  

 in
 
  case msg of


  
   Next ->
      ( model 
       ,   Random.generate Newmon monGenerator
       
      )
  
   Newmon mnd ->

      let
       xbun1=bun mnd.si1 model.mondai.bo1
       xbun2=bun mnd.si2 model.mondai.bo2

      in
  
   
      ( {model|bun1=xbun1,bun2=xbun2,mondai={bo1=model.mondai.bo1,bo2=model.mondai.bo2,bo3=model.mondai.bo3,si1=mnd.si1,si2=mnd.si2,si3=mnd.si3,pattern=mnd.pattern}},      Cmd.none)
  
   Btn si ->

      ( {model | ans=String.fromInt si
                 } ,Cmd.none)

   Kmotome ->
      
            ( model ,Cmd.none)

  
 
 


view : Model -> Html Msg
view model =
 let

   
      
        cboxlu flg km =button [style "font-size" "20px" ,onClick km] [ spankatex "\\dfrac{a}{b}" ]
      
        cboxez flg km=button [style "font-size" "30px" ,onClick km ]  [ spankatex "\\dfrac{a}{b}" ]
        dcbx xx yy cbx=div [Html.Attributes.style "position" "absolute", Html.Attributes.style "top" ((String.fromInt yy)++"px"), Html.Attributes.style "left" ((String.fromInt xx)++"px")] [cbx]
        dvx=30
        dvy=30

        maruspan=(span [style "color" "red",style "font-size" "30px"] [text "〇"])
        --cblu=dcbx (100+dvx) (50+dvy) (cboxlu model.inLU Kmotome)
        --marulu=if model.inLU==model.ansLU then (dcbx (100+dvx) (90+dvy) maruspan) else (span [] [])
       -- cbru=dcbx (300+dvx) (50+dvy) (cboxlu model.inRU Kmotome)
        --maruru=if model.inRU==model.ansRU then (dcbx (300+dvx) (90+dvy) maruspan) else (span [] [])
       -- cbld=dcbx (100+dvx) (180+dvy) (cboxlu model.inLD Kmotome)
        --maruld=if model.inLD==model.ansLD then (dcbx (100+dvx) (170+dvy) maruspan) else (span [] [])
        --cbrd=dcbx (300+dvx) (180+dvy) (cboxlu model.inRD Kmotome)
        --marurd=if model.inRD==model.ansRD then (dcbx (300+dvx) (170+dvy) maruspan) else (span [] [])

        greenans=span [Html.Attributes.style "font-size" "30px",style "color" "green"] [text  model.ans]

        linex =Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
         , Svg.Attributes.height "400"
         ]
          [
              sline 20 120 400 120 3 
              ,sline 20 150 400 150 3 

              ,sline model.ludIchi 115 model.ludIchi 125 2 
              ,sline 300 115 300 125 2
              ,sline model.ludIchi 145 model.ludIchi 155 2 
              ,sline 300 145 300 155 2 

              ,sline 20 115 20 155 1 
              ,stext 15 110 "0"
              ,stext 15 170 "0"
              ,stext 400 110 "(m)"
              ,stext 400 170 "(倍)"

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
                  

        katexl=case model.mondai.pattern of
         1 -> divkatex [human "赤リボンの長さが",inline model.bun1,human "mです。青リボンの長さは", inline model.bun2,human "mです。赤リボンの長さをもと（１）にすると、青リボンの長さは何倍?" ]
         2 -> divkatex [human "青リボンの長さは赤リボンの",inline model.bun1,human "倍です。青リボンは",inline model.bun2,human "mです。赤リボンは何m?"]
         3 -> divkatex [human "赤リボンの長さが",inline model.bun1 ,human "mです。青リボンの長さは赤リボンの",inline model.bun2,human "倍です。青リボンの長さは?"]
         _ -> divkatex [human ""] 

 in

   table [align "center",style "width" "80%"]
   [
    tr [] [    
       td [colspan 2,style "font-size" "30px" ] [katexl]       
      
      
    ]

    ,tr []
    [
     td [Html.Attributes.style "position" "relative",Html.Attributes.style "padding" "3em"] [
       linex
  
      ]   
     ,td [] [
      tr [] [
       td [] [Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Next]] [ Html.text "つぎへ" ] ]
       
      ]

      ,tr [] [td [Html.Attributes.style "font-size" "20px",style "color" "red" ] [
        
      ]]
      ,tr [] [td [] []]
      , tr [] [
         td [] [
             Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick Kmotome]] 
             [ if model.mondai.pattern==1 then
                (spankatex "\\dfrac{a}{b}") 
               else 
                (spankatex "\\dfrac{c}{d}")
            ]

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
    _  -> String.fromInt ii


htmlGenerator isDisplayMode stringLatex =
            case isDisplayMode of
                Just True ->
                    div [style "font-size" "30px"] [ text stringLatex ]

                _ ->
                    span [style "font-size" "30px"] [ text stringLatex ]

spankatex siki= span [] [K.generate htmlGenerator (display siki)]
spanhuman moji=span [] [K.generate htmlGenerator (human moji)]
divkatex lstkatex= lstkatex |> List.map (K.generate htmlGenerator)  |> div []

bun a b="\\dfrac{"++(String.fromInt a)++"}{"++(String.fromInt b)++"}"
