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

type Lrud = Lu | Ru | Ld | Rd
type Motome = K | L | AK | M

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
    ,dispSiki:Bool
    ,inA:String
    ,inEz:String
    ,inB:String
    ,dispAns:Bool
    ,ansLRUD:Lrud
    ,ludIchi:Int
    ,ichiikaflg:Bool
    ,motome:Motome
    ,hintDisp:Bool
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mondai={sa=1,sb=1,pattern=1},ans="1.0",ansLU="10",ansRU="1",ansLD="1",ansRD="1.0"
    ,inLU="",inRU="",inLD="1",inRD="",dispSiki=False,inA="",inEz="",inB="",dispAns=False,ansLRUD=Rd,ludIchi=150,ichiikaflg=True,motome=K
    ,hintDisp=False}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int |ChangeS String String |IchiIka |Kmotome |Lmotome |AKmotome |Matome |Hint

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
       mhenkan :Int -> Int -> Int -> Mondai
       mhenkan i1 i2 k1 = {sa=i1,sb= i2,pattern=k1} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map3  mhenkan (Random.int 2 4 ) (Random.int 2  4 ) (Random.int 1 3) 
  

 in
 
  case msg of


  
   Next ->
      ( model 
       ,   Random.generate Newmon monGenerator
       
      )
  
   Newmon mnd ->
     let

           km1=tofloat (tenmjo mnd.sa)
           km=tofloat (tenmjo2 mnd.sa mnd.sb )
           lt=toFloat mnd.sb

           (ansm,ansx)=
            case mnd.pattern of
             1 -> (if km1<km then
                   {lu=(String.fromFloat km1),ru=(String.fromFloat km),ld="1",rd=(String.fromFloat lt),lrud=Rd}
                  else
                   {lu=(String.fromFloat km),ru=(String.fromFloat km1),ld=(String.fromFloat lt),rd="1",lrud=Ld}
                 , String.fromFloat lt)

             2 -> (if 1.0<lt then
                   {lu=(String.fromFloat km1),ru=(String.fromFloat km),ld="1",rd=(String.fromFloat lt),lrud=Lu}
                  else
                   {lu=(String.fromFloat km),ru=(String.fromFloat km1),ld=(String.fromFloat lt),rd="1",lrud=Ru}
                   , String.fromFloat km1)
             3 -> (if 1.0<lt then
                   {lu=(String.fromFloat km1),ru=(String.fromFloat km),ld="1",rd=(String.fromFloat lt),lrud=Ru}
                   else
                   {lu=(String.fromFloat km),ru=(String.fromFloat km1),ld=(String.fromFloat lt),rd="1",lrud=Lu}
                   , String.fromFloat km )
             _ -> ( {lu="",ru="",ld="",rd="1",lrud=Lu}, "")

           lichi= if km1<km then 1/lt  else lt
           
           motomeflg= case model.motome of
             K -> if (mnd.pattern==1 || mnd.pattern==2) then True else False
             L -> if (mnd.pattern==2 || mnd.pattern==3) then True else False
             AK -> if (mnd.pattern==1 || mnd.pattern==3) then True else False
             M -> False

     in
   
      ( {model|mondai=mnd,inLD="1",inRD="",inLU="",inRU="",inA="",inB="",inEz=""
      ,ansLU=ansm.lu  ,ansRU=ansm.ru   ,ansLD=ansm.ld   ,ansRD=ansm.rd
      ,dispAns=False ,ans=ansx ,ansLRUD=ansm.lrud,ludIchi=(round (300.0*lichi))
      ,hintDisp=False
      }    ,
       if (lt>0.5 && lt<2.0) || (model.ichiikaflg && (km1>km)) || motomeflg then --LRUDの位置が近づきすぎないように
         Random.generate Newmon monGenerator
       else
         Cmd.none)
  
   Btn si ->

      ( {model | ans=String.fromInt si
                 } ,Cmd.none)
  
   ChangeS snum lmr->
      let
        (lrud ,abez)= case lmr of
          "LU" -> ({lu=snum,ru=model.inRU,ld=model.inLD,rd=model.inRD},{aa=model.inA,bb=model.inB,ez=model.inEz})
          "RU" -> ({lu=model.inLU,ru=snum,ld=model.inLD,rd=model.inRD},{aa=model.inA,bb=model.inB,ez=model.inEz})
          "LD" -> ({lu=model.inLU,ru=model.inRU,ld=snum,rd=model.inRD},{aa=model.inA,bb=model.inB,ez=model.inEz})
          "RD" -> ({lu=model.inLU,ru=model.inRU,ld=model.inLD,rd=snum},{aa=model.inA,bb=model.inB,ez=model.inEz})
          "A" -> ({lu=model.inLU,ru=model.inRU,ld=model.inLD,rd=model.inRD},{aa=snum,bb=model.inB,ez=model.inEz})
          "Ez" -> ({lu=model.inLU,ru=model.inRU,ld=model.inLD,rd=model.inRD},{aa=model.inA,bb=model.inB,ez=snum})
          "B" -> ({lu=model.inLU,ru=model.inRU,ld=model.inLD,rd=model.inRD},{aa=model.inA,bb=snum,ez=model.inEz})
          _ ->  ({lu=model.inLU,ru=model.inRU,ld=model.inLD,rd=model.inRD},{aa=model.inA,bb=model.inB,ez=model.inEz})
     
        dpAns=
          case model.mondai.pattern of
           1 -> (abez.ez=="÷") && (abez.aa==(tenmjo2 model.mondai.sa model.mondai.sb )) && (abez.bb==(tenmjo model.mondai.sa))
           2 -> (abez.ez=="÷") && (abez.aa==(tenmjo2 model.mondai.sa model.mondai.sb )) && (abez.bb==(String.fromInt model.mondai.sb))
           3 -> (abez.ez=="×") && ( (abez.aa==(tenmjo model.mondai.sa)) && (abez.bb==(String.fromInt model.mondai.sb)) )|| ( (abez.aa==(String.fromInt model.mondai.sb)) && (abez.bb==(tenmjo model.mondai.sa)) )
           _ -> False
  
      in
       ( {model|inLU=lrud.lu,inLD=lrud.ld ,inRU=lrud.ru ,inRD=lrud.rd,inA=abez.aa,inB=abez.bb,inEz=abez.ez,dispAns=dpAns}, Cmd.none)
   IchiIka ->   ( {model|ichiikaflg=False}, Cmd.none)
   Kmotome ->  ( {model|motome=K}, Cmd.none)
   Lmotome -> ( {model|motome=L}, Cmd.none)
   AKmotome -> ( {model|motome=AK}, Cmd.none)
   Matome -> ( {model|motome=M}, Cmd.none)
   Hint -> ({model|hintDisp=True}, Cmd.none)
 


handlerLU selectedText = ChangeS selectedText "LU"
handlerLD selectedText = ChangeS selectedText "LD"
handlerRU selectedText = ChangeS selectedText "RU"
handlerRD selectedText = ChangeS selectedText "RD"

handlerA selectedText = ChangeS selectedText "A"
handlerEz selectedText = ChangeS selectedText "Ez"
handlerB selectedText = ChangeS selectedText "B"

view : Model -> Html Msg
view model =
 let
        sList = case  model.mondai.pattern of
          1 -> ["?","1",tenmjo model.mondai.sa,tenmjo2 model.mondai.sa model.mondai.sb]
          2 -> ["?","1",String.fromInt model.mondai.sb,tenmjo2 model.mondai.sa model.mondai.sb]
          3 -> ["?","1",tenmjo model.mondai.sa,String.fromInt model.mondai.sb]
          _ -> ["?","",""]
      
        cboxlu inLRUD handler=select [style "font-size" "26px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==inLRUD),value s][text (s)]) sList)  
        cboxez inLRUD handler=select [style "font-size" "26px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==inLRUD),value s][text (s)]) ["?","×","÷"])  
        dcbx xx yy cbx=div [Html.Attributes.style "position" "absolute", Html.Attributes.style "top" ((String.fromInt yy)++"px"), Html.Attributes.style "left" ((String.fromInt xx)++"px")] [cbx]
        dvx=30
        dvy=30
        maruspan=(span [style "color" "red",style "font-size" "30px"] [text "〇"])
        cblu=dcbx (model.mondai.sa*24+dvx+30) (80+dvy) (cboxlu model.inLU handlerLU)
        -- (20+ix*model.mondai.sb*22)
        marulu=if model.inLU==model.ansLU then (dcbx (100+dvx) (80+dvy) maruspan) else (span [] [])
        cbru=dcbx (model.mondai.sb*model.mondai.sa*24+dvx+30) (80+dvy) (cboxlu model.inRU handlerRU)

        maruru=if model.inRU==model.ansRU then (dcbx (300+dvx) (80+dvy) maruspan) else (span [] [])

        cbld=dcbx (90+dvx) (200+dvy) (cboxlu model.inLD handlerLD)
        --maruld=if model.inLD==model.ansLD then (dcbx (100+dvx) (200+dvy) maruspan) else (span [] [])
        cbrd=dcbx ((if model.mondai.sb==2 then 170 else model.mondai.sb*60)+dvx-10) (200+dvy) (cboxlu model.inRD handlerRD)
        
        marurd=if model.inRD==model.ansRD then (dcbx (300+dvx) (200+dvy) maruspan) else (span [] [])

        greenans=span [Html.Attributes.style "font-size" "30px",style "color" "green"] [text  model.ans]

        cans=case model.ansLRUD of
         Lu -> dcbx (model.mondai.sa*24+dvx+30) (50+dvy) greenans
         Ru -> dcbx (model.mondai.sb*model.mondai.sa*24+dvx+30) (50+dvy) greenans
         Ld -> dcbx (100+dvx) (300+dvy) greenans
         Rd -> dcbx (model.mondai.sb*60+dvx+30) (300+dvy) greenans


        cba=dcbx (90)  (300)  (cboxlu model.inA handlerA)
        cbz=dcbx (200)  (300)  (cboxez model.inEz handlerEz)
        cbb=dcbx (270)  (300)  (cboxlu model.inB handlerB)
        eans=dcbx 380 300 (span [Html.Attributes.style "font-size" "30px"] [text "=",span [style "color" "green"] [text model.ans]])
        maru=dcbx 350 300 (span [style "color" "red",style "font-size" "100px"] [text "〇"])
         

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

        icu xx=sline xx 115 xx 125 2 "yellow"
        icd xx=sline xx 145 xx 155 2 "red"
        naname ix=sline  (20+ix*model.mondai.sa*22)  120  ( 20+ix*40 )   150 1 "black"

        upL= List.map (\ix-> ( icu (20+ix*model.mondai.sa*22) )  ) (List.range 1 model.mondai.sb)
        downL= List.map (\ix-> ( icd (20+ix*40) )  ) (List.range 1 model.mondai.sb)
        nanameL= List.map (\ix-> (naname ix )  ) (List.range 1 model.mondai.sb)


        linex =Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
         , Svg.Attributes.height "400"
         ]
          ([
              sline 20 120 500 120 3 "yellow"
              ,sline 20 150 500 150 3 "red"

              ,stext 15 110 "0"
              ,stext 15 170 "0"
              ,stext 500 110 "(km)"
              ,stext 500 170 "(L)"

          ]++downL++upL++nanameL)
         
        stext xx yy moji = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill "black"          
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
    tr [] [
      td [colspan 2,style "font-size" "30px" ] [text (
       case model.mondai.pattern of
         1 -> "1Lのガソリンで"++(tenmjo model.mondai.sa)++"km走る自動車があります。"++(tenmjo2 model.mondai.sa model.mondai.sb ) ++"km走るためには何L使いますか?"
         2 -> (String.fromInt model.mondai.sb)++"Lのガソリンで"++(tenmjo2 model.mondai.sa model.mondai.sb) ++"km走る自動車があります。1Lのガソリンで何km走りますか?"
         3 -> "1Lのガソリンで"++(tenmjo model.mondai.sa)++"km走る自動車があります。"++(String.fromInt model.mondai.sb) ++"Lでは何km走れますか?"
         _ -> ""
      )]
    ]

    ,tr []
    [
     td [Html.Attributes.style "position" "relative",Html.Attributes.style "padding" "3em"] [
       linex
       ,if model.dispAns&&model.ansLRUD==Lu then  (span [] [text ""])  else cblu
       ,if model.dispAns&&model.ansLRUD==Ru then  (span [] [text ""])  else cbru
       ,if model.dispAns&&model.ansLRUD==Ld then  (span [] [text ""])  else cbld
       ,if model.dispAns&&model.ansLRUD==Rd then  (span [] [text ""])  else cbrd
       ,if model.dispAns then cans else (span [] [text ""]) 
       ,marulu,maruru
       --,maruld
       ,marurd
       ,div [] [cba,cbz,cbb,if model.dispAns then eans else (span [] [text ""]) ]
       ,div [] [if model.dispAns then maru else (span [] [text ""])]
      ]   
     ,td [] [
      tr [] [
       td [] [Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Next]] [ Html.text "つぎへ" ] ]
       
      ]
      ,tr [] [td [] [Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick Hint]] [ Html.text "ヒント" ] ]]
      ,tr [] [td [Html.Attributes.style "font-size" "20px",style "color" "red" ] [
         let
          shint =
           case model.mondai.pattern of
            1 -> (tenmjo model.mondai.sa)++"×□="++(tenmjo2 model.mondai.sa model.mondai.sb ) ++"(km)"
            2 -> "□×"++(String.fromInt model.mondai.sb)++"="++(tenmjo2 model.mondai.sa model.mondai.sb) ++"(km)"
            3 -> (tenmjo model.mondai.sa)++"kmの"++(String.fromInt model.mondai.sb) ++"倍は？"
            _ -> ""
         in
          text (if model.hintDisp then shint else "")
      ]]
      ,tr [] [td [] []]
      , tr [] [
         td [] [
           
             Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick Kmotome]] [ Html.text "Stage1(km)" ]
           ,  Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick Lmotome]] [ Html.text "Stage2(L)" ]
           ,   Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick AKmotome]] [ Html.text "Statge3(Lあたり)" ]          
           ,  Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick Matome]] [ Html.text "Stage4(まとめ)" ]
           --,Button.button [Button.attrs [Html.Attributes.style "font-size" "20px" ,onClick IchiIka]] [ Html.text "Stage5(1以下)" ]

         ]
       ]
       
     -- ,sujibutton       
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

tenmjo ii=format sharesLocale ((toFloat ii)*10.0)


tenmjo2 ii jj = format sharesLocale  ( (toFloat ii)*10.0*(toFloat jj)*1.0)

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