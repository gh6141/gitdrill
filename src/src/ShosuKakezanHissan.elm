module ShosuKakezanHissan exposing (..)

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
    ,ans:String
    ,dispans:Bool
    ,pointlocation:Int
    ,dispmaru:Bool
 
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mon1="2.0",mon2="1.0",mon1o="20",mon2o="10",k1=1,k2=1,bail="",baim="",bair=""
     ,displ=False,dispm=False,dispr=False,ans="",dispans=False,pointlocation=0,dispmaru=False}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int |ChangeS String String | Right | Left |Tashikame

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
      ( {model |bail="",baim="",bair=""}
       ,   Random.generate Newmon monGenerator 
      )
  
   Newmon mnd ->
      let
        recalflg=(String.right 1 mnd.sa)=="0" || (String.right 1 mnd.sb)=="0"

      in
      ( {model |  mon1 =waru mnd.sa mnd.k1,mon2=waru mnd.sb mnd.k2
                ,  mon1o=mnd.sa,mon2o=mnd.sb,k1=mnd.k1,k2=mnd.k2
                ,bail="",baim="",bair="",displ=False,dispm=False,dispr=False,ans="",dispans=False
                ,pointlocation=0,dispmaru=False}    ,if recalflg then (Random.generate Newmon monGenerator)  else Cmd.none)
  
   Btn si ->
    let
      bcap=buttoncaption si
      anst=(if bcap=="C" then (String.dropRight 1 model.ans) else (model.ans++bcap))

    in
     ( {model | ans=anst
                 } ,Cmd.none)
   ChangeS snum ichi->
       let
        bl=if ichi=="L" then snum else model.bail
        bm=if ichi=="M" then snum else model.baim
        br=if ichi=="R" then snum else model.bair

        disprflg=10^(model.k1+model.k2)==(toint br)

       in
      ({model|bail=bl
             ,baim=bm
             ,bair=br
             ,displ=10^model.k1==(toint bl)
             ,dispm=10^model.k2==(toint bm)
             ,dispr=disprflg
             ,dispans=disprflg
             },Cmd.none)
   Right -> 
     ({model|pointlocation=if model.pointlocation>0 then model.pointlocation-1 else model.pointlocation },Cmd.none)

   Left -> 
    let
      kotae =  waru  (String.fromInt ((toint model.mon1o)*(toint model.mon2o)))  (model.k1+model.k2)  

    in
     ({model|pointlocation=if model.pointlocation<((String.length kotae)-1) then model.pointlocation+1 else model.pointlocation},Cmd.none)

   Tashikame ->
     ({model|dispmaru=True},Cmd.none)

view : Model -> Html Msg
view model =
 let   

        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(buttoncaption ii)++" ")])

        
                  
        cbox val hdl=select [style "font-size" "30px",onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100"]) 
        cbox2 val hdl=select [style "font-size" "30px" ,onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100","1000","10000"]) 

        tbox str color= span [] [input [  size 3,placeholder "?", style "font-size" "26px",style "background-color" color,value str] [] ] 
        
        kotaeo=(String.fromInt ((toint model.mon1o)*(toint model.mon2o)))
        kotae =  waru kotaeo   (model.k1+model.k2)  

        kotaepoint=
         if (String.length kotaeo)<=model.pointlocation then
          "0"++(String.left ((String.length kotaeo)-model.pointlocation)  kotaeo)++"."++(String.right model.pointlocation kotaeo) 
         else 
          (String.left ((String.length kotaeo)-model.pointlocation)  kotaeo)++"."++(String.right model.pointlocation kotaeo)

        seikaiflg=((tofloat kotae)==(tofloat kotaepoint))

        kiseki = String.repeat model.pointlocation "←"
 in

   table [align "center"]
   [
    tr []
    [
      td [] 
      [
        tr [] [
         td [style "text-align" "right"][span [style "font-size" "50px",style "color" "red"][text (if (seikaiflg&&model.dispmaru) then "〇" else "　")]  ]
        ] 
        ,tr [] [
          td [style "font-size" "30px",style "text-align" "right"] [ text (model.mon1)]
        ]
        ,tr [] [
          td [style "font-size" "30px",style "text-align" "right"] [ text ("×"++model.mon2) ]
        ]
        ,tr [] [ 
         --   td [] [tbox model.ans "coral"  ]
          td [] [text "－－－－－－"  ]
        ]


        ,tr [] [
          td [style "font-size" "20px"] [
         --    text "↓×",cbox model.bail handlerl,text " ↓×",cbox model.baim handlerm, text "　　÷",cbox2 model.bair handlerr,text "↑"
          ]

        ]      
        ,tr [] [
            td [style "font-size" "30px",style "text-align" "right"] [
               text kotaepoint 
            ]
        ]
        ,tr [] [
            td [style "font-size" "18px",style "text-align" "right"] [
               text kiseki 
            ]
        ]
      ]
   
     ,td []
     [
       tr [] [
         td [] [ Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]]
       ]
       ,tr [] [
         td [] [Button.button [Button.attrs [style "font-size" "30px"   ,onClick Left]] [ text "←" ]
                , Button.button [Button.attrs [style "font-size" "30px"   ,onClick Right]] [ text "→" ]]
       ]
       ,tr [] [
         td [] [Button.button [Button.attrs [style "font-size" "30px"   ,onClick Tashikame]] [ text "たしかめ" ]]
       ]
 
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

buttoncaption ii = 
  case ii of
    10 -> "."
    11 -> "C"
    _  -> String.fromInt ii

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

