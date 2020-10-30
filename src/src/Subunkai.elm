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
    ,stage:Int
    ,count:Int
    ,limit:Int
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {selectedwa="2",selected1="1",selected2="1",init="",marubatu="",mon1="1",mon2="1",ans="2",imgdisp=True
     ,sdisp=True,ldisp=True,rdisp=True,stage=1,count=0,limit=3}
  , Cmd.none
  )

type Msg
    = Change String | Change1 String | Change2 String | Changestg String | Disp | Hide |HideS |HideL | HideR| Next | Newface Int | Newface2 Int

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let

   mb wa s1 s2 =
    if (toint wa)*(toint s1)*(toint s2)==0 then
        ""
    else
           if  (toint wa)==(toint s1)+(toint s2) then
            "〇"   
           else 
            "✖"

  
   cd wa s1 s2= if  ((toint wa)==(toint s1)+(toint s2) &&  (not ( (toint wa)*(toint s1)*(toint s2)==0)) )then
         if model.count>4 then
          0
         else
          model.count+1
       else
        0
   stg wa s1 s2= if  ((toint wa)==(toint s1)+(toint s2) &&  (not ( (toint wa)*(toint s1)*(toint s2)==0)) )then
         if model.count>4 then
          model.stage+1
         else
          model.stage
       else
        model.stage
   
   lim stgx = case stgx of
               1 -> 3
               2 -> 3
               3 -> 3
               4 -> 4
               5 -> 4
               6 -> 4
               7 -> 5
               8 -> 5
               9 -> 5
               10 -> 3
               11 -> 3
               12 -> 3
               13 -> 5
               14 -> 5
               15 -> 5
               _ -> 6
   stagecfg stgx2 = case stgx2 of
               1 -> {sdp=False,ldp=True,rdp=True,idp=True}
               2 -> {sdp=True,ldp=False,rdp=True,idp=True}
               3 -> {sdp=True,ldp=True,rdp=False,idp=True}
               4 -> {sdp=False,ldp=True,rdp=True,idp=True}
               5 -> {sdp=True,ldp=False,rdp=True,idp=True}
               6 -> {sdp=True,ldp=True,rdp=False,idp=True}
               7 -> {sdp=False,ldp=True,rdp=True,idp=True}
               8 -> {sdp=True,ldp=False,rdp=True,idp=True}
               9 -> {sdp=True,ldp=True,rdp=False,idp=True}
               10 -> {sdp=False,ldp=True,rdp=True,idp=False}
               11 -> {sdp=True,ldp=False,rdp=True,idp=False}
               12 -> {sdp=True,ldp=True,rdp=False,idp=False}
               13 -> {sdp=False,ldp=True,rdp=True,idp=False}
               14 -> {sdp=True,ldp=False,rdp=True,idp=False}
               15 -> {sdp=True,ldp=True,rdp=False,idp=False}
               _ -> {sdp=True,ldp=False,rdp=False,idp=False}


 in
  case msg of
   Change st ->
     ( { model |init=st, selectedwa=st, marubatu=(mb st model.selected1 model.selected2) 
     ,count=(cd  st model.selected1 model.selected2)

       }
     , Cmd.none
     )

   
   Change1 st ->
     ( { model | init=st, selected1=st, marubatu=(mb model.selectedwa st model.selected2) 
     ,count=(cd  model.selectedwa st model.selected2) 

     }
     , Cmd.none
     )

 
   Change2 st ->
     ( { model | init=st, selected2=st,  marubatu=(mb model.selectedwa model.selected1 st)
      ,count=(cd model.selectedwa model.selected1 st) 

       }
    , Cmd.none
     )
  
   Changestg st ->
     ({model | stage=(toint st)},Cmd.none)

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
      ( {model |  marubatu="",init="?"
            ,stage=(stg model.selectedwa model.selected1 model.selected2)
      ,limit=lim (stg model.selectedwa model.selected1 model.selected2)
      ,sdisp=(stagecfg (stg model.selectedwa model.selected1 model.selected2)).sdp
      ,ldisp=(stagecfg (stg model.selectedwa model.selected1 model.selected2)).ldp
      ,rdisp=(stagecfg (stg model.selectedwa model.selected1 model.selected2)).rdp
      ,imgdisp=(stagecfg (stg model.selectedwa model.selected1 model.selected2)).idp
      
      }
       ,   Random.generate Newface (Random.int 2 model.limit)
      )
  
   Newface su ->
     if model.ans== (String.fromInt su) then        
      ( {model |  ans =String.fromInt su ,selectedwa=String.fromInt su} , Random.generate Newface (Random.int 2 model.limit))
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
        handlerstg selectedText =
            Changestg selectedText

         
        img1=img [src ("/py/car1.jpg")] []
        img2=img [src ("/py/car2.jpg")] []
        img3=img [src ("/py/cari1.jpg")] []
        img4=img [src ("/py/cari2.jpg")] []
        list1=List.repeat (toint model.mon1) (if (modBy 2 model.stage ) == 0 then img1 else img3)
        list2=List.repeat (toint model.mon2) (if (modBy 2 model.stage ) == 0 then img2 else img4)
  
                  
 in
  div [style "font-size" "70px",style "margin" "10px"]
    [
      div []
      [Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
      ,span [style "font-size" "20px"] [text ("　ステージ")
      ,select [style "font-size" "50px" ,onChange handlerstg ] (List.map (\s -> Html.option [selected ((toint s)==model.stage),value s][text s]) (["?","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]))
      ,text ((String.repeat model.stage "〇")++" "++(String.fromInt model.count))]
  
      ]
    ,
    
    div [align "left"]
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