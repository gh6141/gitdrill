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
   ,seikai:Yurisu
 }

type alias Yurisu =
 {
   bunsi:Int
   ,bunbo:Int
   ,enzan:Enzan
   ,katex:String
  }

type Enzan = Waru | Kakeru | Sento |Eq

ysCreate ax = 
       let
           enzant=
              case [String.contains "×" ax,String.contains "÷" ax,String.contains "=" ax] of
               [True,False,False] -> Kakeru
               [False,True,False] -> Waru
               [False,False,True] -> Eq
               _ -> Sento

       in

        if (String.contains "分の" ax) then
           let
             bL= String.split "分の" ax
             bsi= Maybe.withDefault "1" (List.head (List.reverse bL))
             bbot= Maybe.withDefault "1" (List.head bL)
             ktx=
              case [String.contains "×" bbot,String.contains "÷" bbot,String.contains "=" bbot] of
               [True,False,False] -> "×\\dfrac{"++bsi++"}{"++(String.replace "×" "" bbot)++"}"
               [False,True,False] -> "÷\\dfrac{"++bsi++"}{"++(String.replace "÷" "" bbot)++"}"
               [False,False,True] -> "=\\dfrac{"++bsi++"}{"++(String.replace "=" "" bbot)++"}"
               _ -> "\\dfrac{"++bsi++"}{"++bbot++"}"



           in
            { bunsi=toint bsi,bunbo=toint bbot,enzan=enzant,katex=ktx  }
        else
          {bunsi=toint ax,bunbo=1,enzan=enzant,katex=ax}

yLCreate gyo= 
 let

     xlist=String.split "×" gyo
     xlistx=List.indexedMap  (sento "×") xlist
 in
   List.concat (List.map (\ss->  ( List.indexedMap (sento "÷")    (String.split "÷" ss)    ) )  xlistx)

sento moji idx ss=    
      if (idx==0) then
       ss
      else 
       moji++ss


viewCreate ans=  
  let  
     ansL=List.indexedMap (sento "=")  (String.split "=" ans)
     gl=  List.map (\gyo-> 
          div [style "margin" "20px"]  

         (  (List.map (\ax->
           let
            bns= ysCreate ax
           in
            spankatex bns.katex       
           ) )

          ( yLCreate gyo) )
       
        ) ansL   
  in
      gl

viewCreateMaru ans yuseikai
  =
   let
     ml=List.map (\flg ->  div [style "margin" "20px"]  [text (if flg then "〇" else "*")]   )    ( yuriCheck ans yuseikai)
   in
     ml

viewCreateSiki ans 
  =
   let
     ml=List.map (\siki ->  div [style "margin" "20px"]  [spankatex siki]   )    ( yuriCheckSiki ans )
   in
     ml
      

yuriL ans =  
 let  
     ansL=List.indexedMap (sento "=")  (String.split "=" ans)
     kl=  List.map (\gyo->  
         (  (List.map  (\ax->
          ( ysCreate ax )  --ここで、YurisuのList作成           
           ) )
          ( yLCreate gyo) )       
        ) ansL   
  in
      kl

yuriKeisanL ans =
 let
   yl=yuriL ans
   ykl=
    let
      func yu yuacl = 
       let
        test=Debug.log "bo bs=" ((String.fromInt yu.bunsi)++"/"++(String.fromInt yu.bunbo))
        acbs=if yu.enzan==Waru then yu.bunbo*yuacl.bunsi else yu.bunsi*yuacl.bunsi
        acbb=if yu.enzan==Waru then yu.bunsi*yuacl.bunbo else yu.bunbo*yuacl.bunbo
       in
        {bunsi= acbs ,bunbo=acbb  ,enzan=Sento,katex="\\dfrac{"++(String.fromInt acbs)++"}{"++(String.fromInt acbb)++"}"}
    in
     List.map  (\ylst ->      
       List.foldl func {bunsi=1,bunbo=1,enzan=Sento,katex=""} ylst   
     )  yl
 in
  ykl

yuriCheck ans yuans=
 let
   ykL=yuriKeisanL ans 

 in
   List.map (\yus->   ( hikaku yus yuans)   )   ykL

yuriCheckSiki ans =
 let
   ykL=yuriKeisanL ans 

 in
   List.map (\yus->  yus.katex  )   ykL



gcm a b =
  let
   (dai,sho)=  if a>b then (a,b) else (b,a)
   r=modBy sho dai
  in
   if r==0 then sho else (gcm sho r)

yakubun ysu=
 let  
  ww=if (ysu.bunsi==0||ysu.bunbo==0) then 1 else (gcm ysu.bunsi ysu.bunbo )
  bs=ysu.bunsi//ww
  bb=ysu.bunbo//ww
 in
  {bunsi=bs,bunbo=bb,enzan=Sento,katex="\\dfrac{"++(String.fromInt bs)++"}{"++(String.fromInt bb)++"}"}

hikaku ysu1 ysu2=
 let
   y1=yakubun ysu1
   y2=yakubun ysu2
 in
  ( y1.bunsi==y2.bunsi && y1.bunbo==y2.bunbo)

type alias Model =
  { 
  ludIchi:Int
  ,mondai:Mondai
  ,ans:String
  ,bun1:String
  ,bun2:String
  ,luflg:Bool
  ,lu:String
  ,ruflg:Bool
  ,ru:String
  ,rdflg:Bool
  ,rd:String
  
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {mondai={si1=1,bo1=4,si2=1,bo2=8,si3=1,bo3=1,pattern=1,seikai={bunsi=1,bunbo=1,enzan=Sento,katex=""}},ludIchi=1,ans="1",bun1="\\frac{1}{2}",bun2="1"
     ,luflg=False,lu="",ruflg=False,ru="",rdflg=False,rd=""}
  , Cmd.none
  )

type Msg    =  Next | Newmon Mondai | Btn String |Kmotome |Lu |Ru |Rd

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let
       mhenkan :Int -> Int -> Int -> Int -> Mondai
       mhenkan i1 i2 i3 i4 = {si1=i1,si2= i2,si3=i3,bo1=model.mondai.bo1,bo2=model.mondai.bo2,bo3=model.mondai.bo3,pattern=i4
        ,seikai=
          let
           (kaisi,kaibo) = case i4 of
            1 -> (i2*model.mondai.bo1,i1*model.mondai.bo2)
            2 -> (i2*model.mondai.bo1,i1*model.mondai.bo2)
            3 -> (i1*i2,model.mondai.bo1*model.mondai.bo2)
            _ -> (1,1)
       
          in
           yakubun  {
            bunsi=kaisi
           ,bunbo=kaibo
           ,enzan=Sento
           ,katex="\\dfrac{"++(String.fromInt kaisi)++"}{"++(String.fromInt kaibo)++"}"           
           }
        } 

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
       xbun1=bunsu mnd.si1 model.mondai.bo1
       xbun2=bunsu mnd.si2 model.mondai.bo2

      in
  
   
      ( {model|bun1=xbun1,bun2=xbun2,
        mondai=mnd
        ,luflg=False,ruflg=False,rdflg=False,ans=""},      Cmd.none)
  
   Btn si ->     

      ( {model | ans= model.ans++si
                 } ,Cmd.none)

   Kmotome ->
      
            ( model ,Cmd.none)
   Lu -> 
     let
      lut= case model.mondai.pattern of
       1 -> model.bun1
       2 -> "?"
       3 -> model.bun1
       _ -> "*"
     in
      ({model|lu= lut ,luflg=True},Cmd.none)
   Ru ->
    let
      rut= case model.mondai.pattern of
       1 -> model.bun2
       2 -> model.bun2
       3 -> "?"
       _ -> "*"
    in
      ({model|ru= rut ,ruflg=True},Cmd.none)
   Rd ->
    let
      rdt= case model.mondai.pattern of
       1 -> "?"
       2 -> model.bun1
       3 -> model.bun2
       _ -> "*"
    in
      ({model|rd= rdt ,rdflg=True},Cmd.none)


  
 
 


view : Model -> Html Msg
view model =
 let
        sbutton : Int -> Html Msg
        sbutton ii = (button [style "font-size" "30px"   ,onClick (Btn (btnLabel ii))] [ text (" "++(btnLabel ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
               ,td [] [sbutton 14]
             ]
             ,tr [] [
               td [] [sbutton 4]
               ,td [] [sbutton 5]
               ,td [] [sbutton 6]
               ,td [] [sbutton 15]
             ]
             ,tr [] [
               td [] [sbutton 1]
               ,td [] [sbutton 2]
               ,td [] [sbutton 3]
               ,td [] [sbutton 16]
             ]
             ,tr [] [
               td [] [sbutton 0]
               ,td [] [sbutton 13]
               ,td [] [sbutton 12]
             ]
            
            ]



   
      
        cboxlu flg km =button [style "font-size" "20px" ,onClick km] [ spankatex "\\dfrac{a}{b}" ]
      
        cboxez flg km=button [style "font-size" "30px" ,onClick km ]  [ spankatex "\\dfrac{a}{b}" ]
        dcbx xx yy ob=div [Html.Attributes.style "position" "absolute", Html.Attributes.style "top" ((String.fromInt yy)++"px"), Html.Attributes.style "left" ((String.fromInt xx)++"px")] [ob]
        
        
        dvx=30
        dvy=30

        maruspan=(span [style "color" "red",style "font-size" "30px"] [text "〇"])


        greenans=span [Html.Attributes.style "font-size" "30px",style "color" "green"] [text  model.ans]

        linex =Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
         , Svg.Attributes.height "400"
         ]
          [
              sline 20 120 400 120 3 
              ,sline 20 150 400 150 3 

              ,sline (20+100) 115 (20+100) 125 2 
              ,sline 300 115 300 125 2
              ,sline (20+100) 145 (20+100) 155 2 
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
       ,dcbx  190 80  (Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Lu]] [  (if model.luflg then (spankatex model.lu) else (text "?")) ])
       ,dcbx  200 220 (span [Html.Attributes.style "font-size" "30px"] [text "1"])
       ,dcbx  350 80  (Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Ru]] [  (if model.ruflg then (spankatex model.ru) else (text "?")) ])
       ,dcbx  350 220  (Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Rd]] [  (if model.rdflg then (spankatex model.rd) else (text "?")) ])
       ,dcbx  20 300 (span [Html.Attributes.style "font-size" "30px"]
        (
         let
          siki=model.ans
         in
          viewCreate siki          
        )
       )
       ,dcbx  0 300 (span [Html.Attributes.style "font-size" "30px",style "color" "red"]        
        --  ( viewCreateMaru model.ans model.mondai.seikai )           
        (viewCreateSiki model.ans)
       )
       ,spankatex model.mondai.seikai.katex

  
      ]   
     ,td [] [
      tr [] [
       td [] [Button.button [Button.attrs [Html.Attributes.style "font-size" "30px" ,onClick Next]] [ Html.text "つぎへ" ] ]
       
      ]

      ,tr [] [td [Html.Attributes.style "font-size" "20px",style "color" "red" ] [
        
      ]]
  
      , tr [] [
         td [] [
           sujibutton

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

btnLabel : Int -> String
btnLabel xi = case xi of
               12 -> "分の"
               13 -> "C"
               14 -> "="
               15 -> "×"
               16 -> "÷"
               _  -> String.fromInt xi


htmlGenerator isDisplayMode stringLatex =
            case isDisplayMode of
                Just True ->
                    div [style "font-size" "30px"] [ text stringLatex ]

                Just False ->
                    span [style "font-size" "30px",class "inline"] [ text stringLatex ]

                Nothing ->
                    span [style "font-size" "30px",class "human"] [ text stringLatex ]

spankatex siki= span [class "katexl"] [K.generate htmlGenerator (inline siki)]
spanhuman moji=span [class "katexl"] [K.generate htmlGenerator (human moji)]
divkatex lstkatex= lstkatex |> List.map (K.generate htmlGenerator)  |> div [class "katexl"]

bunsu a b="\\dfrac{"++(String.fromInt a)++"}{"++(String.fromInt b)++"}"
