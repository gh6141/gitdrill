module Tokei exposing (..)

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




type alias Model =
  { 
     ji:Int
    ,hun:Int
    ,pattern:Int
    ,ans:String
    ,dispans:Bool
    ,hundisp:Hun
    ,jidisp:Bool
    ,maru :Bool
    ,fmin:Int
    
  }

type Hun= Five |Ten | All | None

init : () -> (Model, Cmd Msg)
init _ =
  ( {ji=10,hun=10,pattern=1,ans="",dispans=False,hundisp=All,jidisp=True,maru=False,fmin=2}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Model | Btn Int 

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
       mhenkan :Int -> Int -> Int -> Model
       mhenkan i1 i2 k1 = {ji=i1,hun= i2,pattern=k1,ans="",dispans=False,jidisp=model.jidisp,hundisp=model.hundisp,maru=False,fmin=1} 

       monGenerator : Random.Generator Model   
       monGenerator = Random.map3  mhenkan (Random.int 1 12 ) (Random.int 0  59 ) (Random.int 1 1) 
  

 in
 
  case msg of

   Next ->
      ( {model|ans="",dispans=False}
       ,   Random.generate Newmon monGenerator       
      )
  
   Newmon mdl ->   
      ( {model| ji=mdl.ji,hun=mdl.hun,pattern=mdl.pattern,dispans=False,maru=False}    , 
         if ( model.fmin==2 && ( (modBy 5 mdl.hun) /=0)     ) then ( Random.generate Newmon monGenerator ) else    Cmd.none)
  
   Btn si ->
     let
      suji= case (buttoncaption si) of
             "5分" -> ""
             "C" -> String.dropRight 1 model.ans
             "答" -> ""
             "長針" -> ""
             "短針" -> ""
             _  -> model.ans++(
                 case si of
                  12 -> "時"
                  13 -> "分"
                  _  ->   (String.fromInt si)
               )
  
     in

      ( {model |  dispans=if si==14 then True else model.dispans
                  ,
                   hundisp=
                    if si==15 then
                    (case model.hundisp of
                     Five -> Ten
                     Ten -> None
                     All -> Five
                     None -> All )
                    else
                     model.hundisp

                  ,jidisp=if si==16 && model.jidisp then 
                             False 
                            else if si==16 && (not model.jidisp) then
                             True
                            else 
                             model.jidisp

                  ,ans=suji
                  ,fmin=if (buttoncaption si)=="5分" && model.fmin==1 then 
                          2 
                        else if (buttoncaption si)=="5分" && model.fmin==2 then 
                          1
                        else 
                          model.fmin
                 } ,Cmd.none)
  
 

view : Model -> Html Msg
view model =
 let
        sbutton ii = (Button.button [Button.attrs [Html.Attributes.style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(buttoncaption ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
               ,td [] [sbutton 12]
             ]
             ,tr [] [
               td [] [sbutton 4]
               ,td [] [sbutton 5]
               ,td [] [sbutton 6]
               ,td [] [sbutton 13]
             ]
             ,tr [] [
               td [] [sbutton 1]
               ,td [] [sbutton 2]
               ,td [] [sbutton 3]
               ,td [] [sbutton 14]
             ]     
             ,tr [] [
               td [] [sbutton 0]               
               ,td [] [sbutton 11]
               ,td [] [sbutton 15]
                    ,td [] [sbutton 16]
             ]     
             ,tr [] [
               td [] []
               ,td [] []
               ,td [] [sbutton 10]
             ]             
            ]  

        tokei ji hun jidisp hundisp maruflg=Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
         , Svg.Attributes.height "400"
         ]
          ([
           scircle 140 165 150
           ,chosin ji hun
           ,tansin ji hun
           , if maruflg then scircleMaru else (stext  0 0 "")

 
          ]++(List.map (\n-> (shankei 140 165 ((toFloat n)*pi/6) 140.0 150.0 "black" 3) )  (List.range 0 11)) 
           ++(List.map (\n-> (shankei 140 165 ((toFloat n)*pi/30) 147.0 150.0 "black" 3) )  (List.range 0 59)) 
           ++(List.map (\n-> (tmoji 140 165 n 120.0))  (List.range 1 12))
           ++(if jidisp then (List.map (\n-> (tmojim 140 165 n 120.0))  (List.range 1 12)) else [])
           ++(
              case hundisp of
               Five ->  List.map (\n-> (tmoji3 135 165 n 170.0))  (List.range 1 11)
               Ten ->  List.map (\n-> (tmoji4 135 165 n 170.0))  (List.range 1 5)
               All -> List.map (\n-> (tmoji2 140 165 n 165.0))  (List.range 1 59)
               None -> []            
             
             )
    
          )

        shankei xx yy th str enr color width= sline  ((round (str*(cos (-th+pi/2))))+xx)  ((round (str*(-1*sin (-th+pi/2)))) +yy)
          ((round (enr*(cos (-th+pi/2))))+xx)  ((round (enr*(-1*sin (-th+pi/2))))+yy) width color 

        tmoji xx yy nn rr = stext ((round (rr*(cos (-(toFloat nn)*pi/6+pi/2))))+xx-10+(if nn==12 then -5 else 0))
          ((round (rr*(-1*sin (-(toFloat nn)*pi/6+pi/2)))) +yy+10)
           (String.fromInt nn)
        
        tmojim xx yy nn rr = stextm ((round (rr*(cos (-((toFloat nn)+0.5)*pi/6+pi/2))))+xx-10+(if nn==12 then -5 else 0))
          ((round (rr*(-1*sin (-((toFloat nn)+0.5)*pi/6+pi/2)))) +yy+10)
           (String.fromInt nn)
        
        tmoji2 xx yy nn rr = stext3 ((round (rr*(cos (-(toFloat nn)*pi/30+pi/2))))+xx-5)
           ((round (rr*(-1*sin (-(toFloat nn)*pi/30+pi/2)))) +yy+5)  
           (String.fromInt nn) 
           (
             case (modBy 10 nn ) of
             5 -> "14"
             0 -> "18"
             _ -> "10"

           )

        tmoji3 xx yy nn rr = stext3 ((round (rr*(cos (-(toFloat nn)*pi/6+pi/2))))+xx-5)
          ((round (rr*(-1*sin (-(toFloat nn)*pi/6+pi/2)))) +yy+5)
           (String.fromInt (nn*5))
            (
             case (modBy 10 (nn*5) ) of
             5 -> "15"
             0 -> "20"
             _ -> "10"

           )


        tmoji4 xx yy nn rr = stext3 ((round (rr*(cos (-(toFloat nn)*pi/3+pi/2))))+xx-5)
          ((round (rr*(-1*sin (-(toFloat nn)*pi/3+pi/2)))) +yy+5)
           (String.fromInt (nn*10))
            (
             case (modBy 10 (nn*10) ) of
             5 -> "15"
             0 -> "20"
             _ -> "10"

           )


        tansin jix hunx = shankei 140 165 ((toFloat jix)/12.0*2.0*pi+(toFloat hunx)/60.0/12.0*2.0*pi) 0 80 "red" 8
        chosin jix hunx = shankei 140 165 ((toFloat hunx)/60.0*2.0*pi)  0 120 "green" 8
        
        scircle xx yy radius = scircleorg xx yy radius "black"
        scircleMaru = scircleorg 70 70 68 "red"

        scircleorg xx yy radius color = Svg.circle [ 
          Svg.Attributes.cx (String.fromInt xx)
          , Svg.Attributes.cy (String.fromInt yy)
          , Svg.Attributes.r (String.fromInt radius) 
          , Svg.Attributes.fill "white"
          , Svg.Attributes.stroke color
          , Svg.Attributes.strokeWidth "5"] []
         
        stext xx yy moji = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill "black"   
         ,Svg.Attributes.fontSize "26"       
         ]
         [ Svg.text moji
         ]

        stextm xx yy moji = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill "red"   
         ,Svg.Attributes.fontSize "14"       
         ]
         [ Svg.text moji
         ]

        stext2 xx yy moji = stext3 xx yy moji "9"

        stext3 xx yy moji fxz=  Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill "green"   
         ,Svg.Attributes.fontSize fxz
         ]
         [ Svg.text moji
         ]
        
        sline x1 y1 x2 y2 wd color =Svg.line
          [ Svg.Attributes.x1 (String.fromInt x1)
         , Svg.Attributes.y1 (String.fromInt y1)
         , Svg.Attributes.x2 (String.fromInt x2)
         , Svg.Attributes.y2 (String.fromInt y2)
         , Svg.Attributes.stroke color
         , Svg.Attributes.strokeWidth (String.fromInt wd)
         , Svg.Attributes.strokeLinecap "round"
          ] []
                  
 in

   table [align "center",style "width" "80%"]
   [
    tr []
    [
     td [Html.Attributes.style "position" "relative",Html.Attributes.style "padding" "3em"] [
      tr [] [td [] [span [Html.Attributes.style "font-size" "30px"] [text ("　"++model.ans)]]]
      ,tr [] [td [] [ tokei model.ji model.hun model.jidisp model.hundisp (model.ans==((String.fromInt model.ji)++"時"++(String.fromInt model.hun)++"分"))

      
      ]]
      
      
      ]   
     ,td [] [
       tr [] [
       td [] [Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Next]] [ Html.text "つぎへ" ] ]
        ]
      ,tr [] [
        td [] [sujibutton]
      ]
      ,tr [] [
        td [] [
          span [style "font-size" "30px"] [text ( if model.dispans then ((String.fromInt model.ji)++"時"++(String.fromInt model.hun)++"分") else "")  ]
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
    10 -> "5分"
    11 -> "C"
    12 -> "時"
    13 -> "分"    
    14 -> "答"
    15 -> "長針"
    16 -> "短針"
    _  -> String.fromInt ii