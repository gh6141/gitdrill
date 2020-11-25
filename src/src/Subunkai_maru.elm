module Subunkai_maru exposing (..)

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

--import Random
import List.Extra exposing (getAt, removeAt)
import Random exposing (Seed, int, step)

main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Sentakusi =
 {
    id:Int
   , kazu:Int
   ,hyoji:Bool
 }

type alias Wakumaru =
  {
    id:Int
    ,kazu:Int
    ,iro:Bool
  }

type alias Model =
  { 
    init:String
    ,marubatu:String
    ,mon1:String
    ,mon2:String
    ,imgdisp:Bool
    ,ldisp:Wakumaru
    ,rdisp:Wakumaru
    ,sentakusil:List Sentakusi
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",marubatu="　",mon1="1",mon2="2",imgdisp=True,
     ldisp={id=0,kazu=0,iro=False},rdisp={id=0,kazu=0,iro=False},sentakusil=[{id=0,kazu=1,hyoji=True},{id=1,kazu=2,hyoji=True},{id=2,kazu=3,hyoji=True}]}
  , Cmd.none
  )

type Msg
    = Change String|  Next | Newface Int | Btn Int 

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let

   mb wa s1 s2 =
    if (toint wa)*(toint s1)*(toint s2)==0 then
        "　"
    else
           if  (toint wa)==(toint s1)+(toint s2) then
            "◎"   
           else 
            "✖"

 in
  case msg of
   Change st ->
     ( { model |init=st  
     
       }
     , Cmd.none
     )


  


  
  
   Next ->
      ( {model |  marubatu="　" ,ldisp={kazu=0,iro=False,id=0},rdisp={kazu=0,iro=False,id=0}
         
      }
       ,   Random.generate Newface (Random.int 1 ((toint model.init)-1))
      )
  
   Newface su ->
     if model.mon1== (String.fromInt su) then        
      ( model  ,  Random.generate Newface (Random.int 1 ((toint model.init)-1))   )
     else
      let
        m1=String.fromInt su 
        m2=String.fromInt ((toint model.init)- su) 
        sentaku= [{id=0,kazu=toint m1,hyoji=True},{id=1,kazu=toint m2,hyoji=True},{id=2,kazu=(toint m1)+1,hyoji=True},{id=3,kazu=(toint m2)+1,hyoji=True}]
      in

       ( {model |  mon2=m2  ,mon1=m1
       ,sentakusil=shuffleList (Random.initialSeed su) sentaku
        } ,Cmd.none)
  
   Btn si ->
    let

      sentakusu=  ( Maybe.withDefault {id=0,kazu=0,hyoji=True} (List.head  ( List.filter (\xx -> xx.id==si ) model.sentakusil) ) ).kazu
      
      m1= 
       if model.ldisp.kazu==0 then
        sentakusu
       else
        model.ldisp.kazu
      
      
      m2=
        if (model.rdisp.kazu==0 && model.ldisp.kazu/=0) then
         sentakusu
        else
         model.rdisp.kazu

      stkl=
       List.map (\xx -> if si==xx.id then {id=xx.id,kazu=xx.kazu,hyoji=False} else {id=xx.id,kazu=xx.kazu,hyoji=xx.hyoji} ) model.sentakusil



    in
     ( {model | ldisp={kazu=m1,iro=False,id=0}  ,rdisp={kazu=m2,iro=False,id=0}
                , marubatu=(mb model.init (String.fromInt m1) (String.fromInt m2))
                , sentakusil=stkl
                 } ,Cmd.none)


     


view : Model -> Html Msg
view model =
 let
        handler selectedText =
            Change selectedText

        isizex="90px"
        isizey="60px"

        listrct =
         let
              lstsuji=List.range 1 (toint model.init)
         in
          if model.ldisp.kazu==0 && model.rdisp.kazu==0 then
             List.repeat (toint model.init) (td [style "border" "solid thin", style "width" "1em"] [text "　"])    
          else if model.rdisp.kazu==0  then
              List.map (\xx -> 
                td [style "border" "solid thin", style "width" "1em"] [text (if xx<=model.ldisp.kazu then "●" else "　")]              
              ) (List.range 1 (toint model.init))     
          else 
              List.map (\xx ->
               if xx <= (toint model.init)  && xx <= (model.ldisp.kazu+model.rdisp.kazu) then
                td [style "border" "solid thin", style "width" "1em"] [text "●" ] 
               else if xx <= (model.ldisp.kazu+model.rdisp.kazu) then
                td [] [text "●" ] 
               else
                td [style "border" "solid thin", style "width" "1em"] [text "　" ]               
              ) (List.range 1 (Basics.max (model.ldisp.kazu+model.rdisp.kazu) (toint model.init)))

  
        contents=  div [style "font-size" "40px",style "margin" "10px"]
          [         
          div [align "center"]
           [
            div [style "font-size" "70px",style "color" "#ff0000"] [text (model.marubatu)]
           ,select [style "text-align-last" "center",style "font-size" "50px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==model.init),value s][text ("　"++s++"　")]) ["?","3","4","5","6","7","8","9","10"])
     
            ]
            ,
           div [align "center"]
            [    
              table [] 
              [
               tr []
                listrct
              ]
            ]            
          ]

        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "60px"   ,onClick (Btn ii)]] [ text (" "++(String.fromInt ii)++" ")])

        listmaru = List.map (\xx->tr [] [td [onClick (Btn xx.id),colspan xx.kazu,style "font-size" "40px" ] [text  (String.repeat xx.kazu (if xx.hyoji then "●" else "　")  )]])   model.sentakusil

        sujibutton=
           table []  listmaru
                  
 in

   table [align "left"]
   [
    tr []
    [
     td []
      [
       contents
     ]
     ,
     td []
     [      
          Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]         
          ,
       sujibutton
        
         
     ]
    ]


   ]

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


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

shuffleList : Seed -> List a -> List a
shuffleList seed list =
    shuffleListHelper seed list []


shuffleListHelper : Seed -> List a -> List a -> List a
shuffleListHelper seed source result =
    if List.isEmpty source then
        result
    else
        let
            indexGenerator =
                int 0 ((List.length source) - 1)

            ( index, nextSeed ) =
                step indexGenerator seed

            valAtIndex =
                getAt index source

            sourceWithoutIndex =
                removeAt index source
        in
            case valAtIndex of
                Just val ->
                    shuffleListHelper nextSeed sourceWithoutIndex (val :: result)

                Nothing ->
                    --Debug.crash "generated an index outside list"
                     []