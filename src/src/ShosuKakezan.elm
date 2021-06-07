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

type alias Mondai =
 {
     sa:String
     ,sb:String
     ,k1:Int
     ,k2:Int
 }


type alias Model =
  { 
      init:String
    ,mon1:String
    ,mon2:String
    ,mon1o:String
    ,mon2o:String
    ,k1:Int
    ,k2:Int
    ,bail:String
    ,baim:String
    ,bair:String
    ,displ:Bool
    ,dispm:Bool
    ,dispr:Bool
 
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mon1="2.0",mon2="1.0",mon1o="2",mon2o="1",k1=0,k2=0,bail="",baim="",bair=""
     ,displ=False,dispm=False,dispr=False}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int |ChangeS String String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
   let
       mhenkan :Int -> Int -> Int -> Int -> Mondai
       mhenkan i1 i2 k1 k2= {sa=String.fromInt i1,sb=String.fromInt i2,k1=k1,k2=k2} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map4  mhenkan (Random.int 12 299 ) (Random.int 12  59 ) (Random.int 1 2) (Random.int 1 2)

   
   
   in
 
  case msg of


  
   Next ->
      ( model 
       ,   Random.generate Newmon monGenerator 
      )
  
   Newmon mnd ->
   
      ( {model |  mon1 =waru mnd.sa mnd.k1,mon2=waru mnd.sb mnd.k2
                ,  mon1o=mnd.sa,mon2o=mnd.sb,k1=mnd.k1,k2=mnd.k2}    ,Cmd.none)
  
   Btn si ->
    let
      m1=String.fromInt si
      m2=String.fromInt si

    in
     ( {model | mon1=m1  ,mon2=m2
                 } ,Cmd.none)
   ChangeS snum ichi->
      ({model|bail=if ichi=="L" then snum else ""
             ,baim=if ichi=="M" then snum else ""
             ,bair=if ichi=="R" then snum else ""
             ,displ=10^model.k1==(toint model.bail)
             ,dispm=10^model.k2==(toint model.baim)
             ,dispr=10^(model.k1+model.k2)==(toint model.bair)
             },Cmd.none)



view : Model -> Html Msg
view model =
 let   

        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(String.fromInt ii)++" ")])

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
                  
        cbox val hdl=select [style "font-size" "30px",onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100"]) 
        cbox2 val hdl=select [style "font-size" "30px" ,onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100","1000","10000"]) 

 in

   table [align "center"]
   [
    tr []
    [
      td [] 
      [
        tr [] [
          td [style "font-size" "30px"] [ text (model.mon1++"　×　"++model.mon2++"　=　"++( waru  (String.fromInt ((toint model.mon1o)*(toint model.mon2o)))  (model.k1+model.k2)  )  )
             ]
        ]
        ,tr [] [
          td [style "font-size" "20px"] [
             text "↓×",cbox "" handlerl,text " ↓×",cbox "" handlerm, text " ÷",cbox2 "" handlerr,text "↑"
          ]

        ]      
        ,tr [] [
            td [style "font-size" "30px"] [
               text ((if model.displ then model.mon1o else "  ")++"　×　"++(if model.dispm then model.mon2o else "  ")++"　=　"++(if model.displ&&model.dispm then String.fromInt ((toint model.mon1o)*(toint model.mon2o)) else " " ) )
            ]
        ]
      ]
   
     ,td []
     [
                Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
                   ,
       sujibutton       
     ]
    ]
   ]


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)

handlerl selectedText = ChangeS selectedText "L"
handlerm selectedText = ChangeS selectedText "M"
handlerr selectedText = ChangeS selectedText "R"


toint st=  Maybe.withDefault 0 (String.toInt st) 
tofloat st = Maybe.withDefault 0 (String.toFloat st) 

waru st keta= String.fromFloat ((tofloat st)/(toFloat (10^keta)))

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

