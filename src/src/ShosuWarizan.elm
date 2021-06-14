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
    ,ans1o:String
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
    , keisiki:Keisiki
 
  }

type Keisiki= Hyojun |Junshosu |Junshosu100|HijosuSeisu

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mon1="2.0",mon2="1.0",mon1o="20",mon2o="10",ans1o="2",k1=1,k2=1,bail="",baim="",bair=""
     ,displ=False,dispm=False,dispr=False,ans="",dispans=False,keisiki=Hyojun}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int | ChangeS String String | Rightx |Leftx | TypeK Keisiki

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
   let
       mhenkan :Int -> Int -> Int -> Int -> Mondai
       mhenkan i1 i2 k1 k2= {sa=String.fromInt i1,sb=String.fromInt i2,k1=k1,k2=k2} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map4  mhenkan (Random.int 2 75 ) (Random.int 2  60 ) (Random.int 1 3) (Random.int 1 3)
  
   in
 
  case msg of
 
   Next ->
      ( {model |bail="",baim="",bair=""}
       ,   Random.generate Newmon monGenerator 
      )
  
   Newmon mnd ->
      let
       -- recalflg=(String.right 1 (mojikake mnd.sa mnd.sb))=="0" || (String.right 1 mnd.sb)=="0"
       -- recalflg=(String.right 1 mnd.sb)=="0"
       
       recalflg=
        case model.keisiki of
          Hyojun -> False
          Junshosu ->not ( (mnd.k1==2 && (String.length mnd.sa)==1 ) && (mnd.k2==1 && (String.length mnd.sb)==2)   )
          Junshosu100 -> not ( ((String.right 1 mnd.sb)/="0")&&(String.right 1 (mojikake mnd.sa mnd.sb)=="0")&&(mnd.k1==3 && (String.length mnd.sa)==2 ) && (mnd.k2==1 && (String.length mnd.sb)==2)   )
          HijosuSeisu -> not ((mnd.k1==1 && (String.length mnd.sa)==2 ) && (mnd.k2==1 && (String.length mnd.sb)==2)   )
      in
      ( {model |  mon1 =waru (mojikake mnd.sa mnd.sb) mnd.k1,mon2=waru mnd.sb mnd.k2
                ,  mon1o=waru (mojikake mnd.sa mnd.sb) (-mnd.k2+mnd.k1),mon2o=mnd.sb
                ,ans1o=mnd.sa                
                ,k1=mnd.k1,k2=mnd.k2
                ,bail="",baim="",bair="",displ=False,dispm=False,dispr=False,ans="",dispans=False}    
                ,if recalflg then (Random.generate Newmon monGenerator)  else Cmd.none)
  
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

        disprflg=((10^model.k2==(toint bl)) && model.dispm)||((10^model.k2==(toint bm))&&model.displ)

       in
      ({model|bail=bl
             ,baim=bm
             ,bair=br
             ,displ=10^model.k2==(toint bl)
             ,dispm=10^model.k2==(toint bm)
             ,dispr=disprflg
             ,dispans=disprflg
             },Cmd.none)
   Leftx ->  (model,Cmd.none)
   Rightx ->  (model,Cmd.none)

   TypeK keisik ->  ({model|keisiki=keisik},Cmd.none)
                  
  


view : Model -> Html Msg
view model =
 let   




        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(buttoncaption ii)++" ")])


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
                  
        cbox val hdl=select [style "font-size" "30px",onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100","1000"]) 
        cbox2 val hdl=select [style "font-size" "30px" ,onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100","1000","10000"]) 

        tbox str color= span [] [input [  size 7,placeholder "?", style "font-size" "26px",style "background-color" color,value str] [] ] 
        -- kotae =  waru  (String.fromInt ((toint model.mon1o)*(toint model.mon2o)))  (model.k1+model.k2)  
        anso=waru model.ans1o (-model.k2+model.k1)
        seikaiflg=(anso==model.ans)

 in

   table [align "center"]
   [
    tr []
    [
      td [] 
      [
        tr [] [
         td [style "text-align" "right"][span [style "font-size" "50px",style "color" "red"][text (if seikaiflg then "〇" else "　")]  ]
        ] 
        ,tr [] [
          td [style "font-size" "30px"] [ text (model.mon1++"　÷　"++model.mon2++"　=　")
          ,if model.dispans then (tbox model.ans "coral") else (text "") 
          
             ]
        ]
        ,tr [] [
          td [style "font-size" "20px"] [
             text "↓×",cbox model.bail handlerl,text " ↓×",cbox model.baim handlerm
             --, text "　　÷",cbox2 model.bair handlerr,text "↑"
          ]

        ]      
        ,tr [] [
            td [style "font-size" "30px"] [
               text ((if model.displ then model.mon1o else "")++"　÷　"++(if model.dispm then model.mon2o else "")
                ++"　=　"++(if (model.displ&&model.dispm) then anso else "") )
            ]
        ]
      ]
   
     ,td []
     [
       tr [] [
         td [] [
                Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
     -- ,Button.button [Button.attrs [style "font-size" "30px"   ,onClick Leftx]] [ text "←" ]
     -- ,Button.button [Button.attrs [style "font-size" "30px"   ,onClick Rightx]] [ text "→" ]
      ,sujibutton       
         ]

       ]
       ,tr [] [
         td [] [
           Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK Hyojun)]] [ text "標準" ]
          ,Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK Junshosu)]] [ text "商が純小数" ]
          ,Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK Junshosu100)]] [ text "商が1/100純小数" ]
         ,Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK HijosuSeisu)]] [ text "被除数は整数" ]
         ]
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
mojikake st1 st2 = String.fromInt ((toint st1) * (toint st2))

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
