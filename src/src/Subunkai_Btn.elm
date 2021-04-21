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
    ,marubatu:String
    ,mon1:String
    ,mon2:String
    ,imgdisp:Bool
    ,ldisp:Bool
    ,rdisp:Bool
    ,imgl:Array Bool
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",marubatu="　",mon1="2",mon2="1",imgdisp=True,
     ldisp=True,rdisp=True,imgl=Array.fromList (List.repeat 11 True)}
  , Cmd.none
  )

type Msg
    = Change String| Disp | Hide |HideL | HideR| Next | Newface Int | Btn Int | Img Int

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


   Disp ->
      ( { model | imgdisp=True }
    , Cmd.none
     )

   Hide ->
      ( { model | imgdisp=False }
    , Cmd.none
     )


   HideL ->
      ( { model | ldisp=if model.ldisp then False else True ,mon1=if model.ldisp then "" else model.mon1}
    , Cmd.none
     )

   HideR ->
      ( { model | rdisp=if model.rdisp then False else True ,mon2=if model.rdisp then "" else model.mon2}
    , Cmd.none
     )
  
   Next ->
      ( {model |  marubatu="　" ,imgl=Array.fromList (List.repeat 11 True)
         
      }
       ,   Random.generate Newface (Random.int 1 ((toint model.init)-1))
      )
  
   Newface su ->
     if model.mon1== (String.fromInt su) then        
      ( {model |  mon1 =String.fromInt su ,mon2=String.fromInt ((toint model.init)- su)} , Random.generate Newface (Random.int 1 ((toint model.init)-1)))
     else
       ( {model |  mon2=if (not model.rdisp) then "" else (String.fromInt ((toint model.init)- su) )
       ,mon1=if (not model.ldisp) then "" else (String.fromInt su )
        } ,Cmd.none)
  
   Btn si ->
    let
      m1=if (not model.ldisp) then (String.fromInt si) else model.mon1
      m2=if (not model.rdisp) then (String.fromInt si) else model.mon2

    in
     ( {model | mon1=m1  ,mon2=m2
                , marubatu=(mb model.init m1 m2) } ,Cmd.none)

   Img si ->
           ( {model | imgl=(Array.set (si-1) (if (Maybe.withDefault True (Array.get (si-1) model.imgl)) then False else True) model.imgl)} ,Cmd.none)
     


view : Model -> Html Msg
view model =
 let
        handler selectedText =
            Change selectedText

        isizex="90px"
        isizey="60px"
        img1=img [src ("https://rasp.cld9.work/py/car1.jpg"),style "width" isizex, style "height" isizey] []
        img2=img [src ("https://rasp.cld9.work/py/car2.jpg") ,style "width" isizex, style "height" isizey] []
        img3=img [src ("https://rasp.cld9.work/py/cari1.jpg"),style "width" isizex, style "height" isizey] []
        img4=img [src ("https://rasp.cld9.work/py/cari2.jpg"),style "width" isizex, style "height" isizey] []
        list1 = List.map  (\ii -> 
          let
            nakami=  img [onClick (Img ii),id (String.fromInt ii)
                     ,src (if (Maybe.withDefault True (Array.get (ii-1) model.imgl)) then "https://rasp.cld9.work/py/cari1.jpg" else "https://rasp.cld9.work/py/car1.jpg") 
                     ,style "width" isizex, style "height" isizey] []
          in
            if ii==6 then
             span[][text "|",nakami]
            else 
             nakami
         
         
          )  (List.range 1 (toint model.init) )

        --list1=List.repeat (toint model.init) (img3)
        --list2=List.repeat (toint model.mon2) (img3)
  
        contents=  div [style "font-size" "70px",style "margin" "10px"]
          [
      
    
          div [align "center"]
           [
            div [style "font-size" "70px",style "color" "#ff0000"] [text (model.marubatu)]
           ,select [style "text-align-last" "center",style "font-size" "50px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==model.init),value s][text ("　"++s++"　")]) ["?","3","4","5","6","7","8","9","10"])
           ,text "は"
             
            ]
            ,
           div [align "center"]
            [    
           input [style "background-color" (if (not model.ldisp) then "green" else "white"),style "text-align" "center",style "font-size" "50px", type_ "text",maxlength 1,size 1 ,value model.mon1] []
    
            ,text "と"
            ,input [style "background-color" (if (not model.rdisp) then "green" else "white"),style "text-align" "center",style "font-size" "50px", type_ "text",maxlength 1,size 1 ,value model.mon2] []
            
            
            ]
            
          ]

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
    ,
    tr [align "center"] [
      td [colspan 2]
       [ div [style "display" (if model.imgdisp==False then "none" else "")] list1 ]]
    ,tr [align "center"]
     [ td [colspan 2]
       [ 
             div []
              [Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Disp]] [ text "みる" ]
              ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Hide]] [ text "かくす" ]
              ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick HideL]] [ text "ひだり" ]
             ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick HideR]] [ text "みぎ" ]
              ]]
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