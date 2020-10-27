module Subunkai exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json

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
    selectedwa:String
    ,selected1:String
    ,selected2:String
    ,init:String
    ,marubatu:String
    ,mon1:String
    ,mon2:String
    ,ans:String
    ,imgdisp:Bool
    ,sdisp:Bool
    ,ldisp:Bool
    ,rdisp:Bool
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {selectedwa="2",selected1="1",selected2="1",init="",marubatu="",mon1="1",mon2="1",ans="2",imgdisp=True
     ,sdisp=True,ldisp=True,rdisp=True}
  , Cmd.none
  )

type Msg
    = Change String | Change1 String | Change2 String | Disp | Hide |HideS |HideL | HideR| Next | Newface Int | Newface2 Int

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
   mb wa s1 s2 = if (toint wa)*(toint s1)*(toint s2)==0 then "" else  (if ((toint wa)==(toint s1)+(toint s2)) then "〇" else "✖" )
  
 in
  case msg of
   Change st ->
     ( { model |init=st, selectedwa=st, marubatu=(mb st model.selected1 model.selected2)    }
     , Cmd.none
     )

   
   Change1 st ->
     ( { model | init=st, selected1=st, marubatu=(mb model.selectedwa st model.selected2)  }
     , Cmd.none
     )

 
   Change2 st ->
     ( { model | init=st, selected2=st,  marubatu=(mb model.selectedwa model.selected1 st) }
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
   HideS ->
      ( { model | sdisp=False }
    , Cmd.none
     )

   HideL ->
      ( { model | ldisp=False }
    , Cmd.none
     )

   HideR ->
      ( { model | rdisp=False }
    , Cmd.none
     )
  
   Next ->
      ( {model |  marubatu="",init="?"}
       ,   Random.generate Newface (Random.int 2 5)
      )
  
   Newface su ->
     if model.ans== (String.fromInt su) then        
      ( {model |  ans =String.fromInt su ,selectedwa=String.fromInt su} , Random.generate Newface (Random.int 2 5))
     else
       ( {model |  ans =String.fromInt su ,selectedwa=String.fromInt su } , Random.generate Newface2 (Random.int 1 (su-1) ))
  
   Newface2 su ->
     --if model.mon1== (String.fromInt su) then        
     -- ( {model | mon1 =String.fromInt su , mon2=String.fromInt ( (toint model.ans)-su ) 
      --,selected1=String.fromInt su, selected2=String.fromInt ( (toint model.ans)-su ) 
    -- } , Random.generate Newface2 (Random.int 1 ((toint model.ans)-1) ))
     --else
       ( {model | mon1 =String.fromInt su , mon2=String.fromInt  ( (toint model.ans)-su ) 
         , selected1 =String.fromInt su , selected2=String.fromInt  ( (toint model.ans)-su ) 
        }, Cmd.none)


view : Model -> Html Msg
view model =
 let
        handler selectedText =
            Change selectedText
        handler1 selectedText =
            Change1 selectedText
        handler2 selectedText =
            Change2 selectedText

        img1=img [src "/py/car1.jpg"] []
        img2=img [src "/py/car2.jpg"] []
        list1=List.repeat (toint model.mon1) img1
        list2=List.repeat (toint model.mon2) img2
        -- model.selectedwa

       -- sumdisp =  if model.sdisp==True then      else
       
       -- leftdisp=  if model.ldisp == True then     else
                 
       -- rightdisp = if model.rdisp == True then     else
                  
 in
  div [style "font-size" "70px",style "margin" "10px"]
    [
      div []
      [Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
  
      ]
    ,
    
    div [align "center"]
    [
     input [hidden (not model.sdisp)  ,style "text-align" "center",style "font-size" "50px", type_ "text",maxlength 1,size 1 ,value model.ans] []
    ,select [hidden model.sdisp,style "text-align-last" "center",style "font-size" "50px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==model.init),value s][text ("　"++s++"　")]) ["?","1","2","3","4","5"])
     ,text "は　"
    ]
    ,
    div [align "center"]
    [    
     input [hidden  (not model.ldisp) ,style "text-align" "center",style "font-size" "50px", type_ "text",maxlength 1,size 1 ,value model.mon1] []
    ,select [hidden model.ldisp,style "text-align-last" "center",style "font-size" "50px" ,onChange handler1 ] (List.map (\s -> Html.option [selected (s==model.init),value s][text ("　"++s++"　")]) ["?","1","2","3","4","5"])
    ,text "と"
    ,input [hidden  (not model.rdisp) ,style "text-align" "center",style "font-size" "50px", type_ "text",maxlength 1,size 1 ,value model.mon2] []
    ,select [hidden model.rdisp,style "text-align-last" "center",style "font-size" "50px" ,onChange handler2 ] (List.map (\s -> Html.option [selected (s==model.init),value s][text ("　"++s++"　")]) ["?","1","2","3","4","5"])
    ,span [style "font-size" "120px",style "color" "#ff0000"] [text model.marubatu],
    div [style "display" (if model.imgdisp==False then "none" else "")] (list1 ++ list2)
    ]
    ,
    div []
      [Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Disp]] [ text "All Disp" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Hide]] [ text "Image Hide" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick HideS]] [ text "Sum Hide" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick HideL]] [ text "Left Hide" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick HideR]] [ text "Right Hide" ]
      ]
    ]

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)


toint st=  Maybe.withDefault 0 (String.toInt st) 