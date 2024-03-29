module WarizanH exposing (..)

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

main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model =
  { 
    hijosu:String
    ,josu:String
    ,ans:String
    ,nyuryoku:String
    ,ansdisp:Bool
    ,seed:Sd
  }
type alias Sd={s1:Int,e1:Int,s2:Int,e2:Int}

init : () -> (Model, Cmd Msg)
init _ =
  ( {hijosu="100",josu="2",ans="50",nyuryoku="",ansdisp=False,seed={s1=19,e1=99,s2=19,e2=99}}
  , Cmd.none
  )

type Msg
    =  Next | Newmon (Int,Int) | Btn Int |Btn2 Sd

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let

      mhenkan i1 i2 = (i1,i2)
      monGenerator = Random.map2  mhenkan (Random.int model.seed.s1 model.seed.e1 ) (Random.int model.seed.s2  model.seed.e2 ) 
 in
 
  case msg of
  
   Next ->
      ( model 
       ,   Random.generate Newmon monGenerator
      )
  
   Newmon tpl ->
     let
       m1=fst tpl
       m2=snd tpl
       hij=m1*m2

     in
   
      ( {model |  hijosu =String.fromInt hij ,josu=String.fromInt  m2,ans=String.fromInt m1
      ,nyuryoku="" ,ansdisp=False}    ,Cmd.none)
  
   Btn si ->
    let
      mans=
        case si of
         10 -> String.dropRight 1 model.nyuryoku
         11 -> model.nyuryoku
         _ ->  model.nyuryoku++(String.fromInt si)

    in
     ( {model | nyuryoku=mans , ansdisp=if si==11 then True else model.ansdisp
                 } ,Cmd.none)
   Btn2 sed ->
          ( {model | seed=sed
                 } ,Cmd.none)


view : Model -> Html Msg
view model =
 let
 
        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "40px"   ,onClick (Btn ii)]] 
         [ text (" "++(
             case ii of
              10-> "C"
              11-> "答"
              _ -> String.fromInt ii 
           
           )++" ")])

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

        x0=100
        y0=80
        hwidth=200
        tatekankaku=44

        ansL=String.length model.ans
        --hijosuL=String.length model.hijosu
        hijos1 ke = toint (
           if ke<0 then model.hijosu++"0" else (String.dropRight ke model.hijosu )
                    
          )        

        kake idx=(toint model.josu)*(toint (suchushutu (idx-1) model.nyuryoku))

        fcr ix acc= (acc+(kake ix))*10
        ruiseki ii= List.foldl fcr 0 (List.range 1 ii)

        optionsu ii= if (ii==(String.length model.ans) && ( (hijos1 (ansL-ii-1)) - (ruiseki ii) ) ==0 ) then -1 else 0
        tochukeisanL ii=
                     (sjtext (x0+150) (y0+44) (String.fromInt (kake ii) ) ((ansL-ii)*(-1)) (ii*2-1) )
           ++[ sline x0 (y0+2*tatekankaku*(ii)+6) (x0+hwidth) (y0+2*tatekankaku*(ii)+6) 1 "blue" ]
           ++(sjtext (x0+150) (y0+44) (String.fromInt ( (hijos1 (ansL-ii-1)) - (ruiseki ii) ) ) (ii+(ansL-1)*(-1)+(optionsu ii)) (ii*2) ) 

        svgview=       
          Svg.svg [ Svg.Attributes.viewBox "0 0 400 600"
          , Svg.Attributes.width "480"
          , Svg.Attributes.height "600"
          ]
          (
           [
          sline x0 y0 (x0+hwidth) y0 3 "black" 
          ,stext x0 (y0+40) ")" "black" "50px"
          ,stext (x0+0) (y0+120) (if (model.ans==model.nyuryoku) then "◎" else "　") "red" "300px"
           ]++(sjtext (x0-50) (y0+44) model.josu 0 0)
           ++(sjtext (x0+150) (y0+44) model.hijosu 0 0)
           ++(rsjtext (x0+150) (y0-4) model.nyuryoku ((ansL-1)*(-1)) 0) 


           ++ (List.concat ( List.map (\xi-> tochukeisanL xi )  (List.range 1 (String.length model.nyuryoku))  )) 
          )


        fc idx chr = (idx,chr)
        fc2 ix (idx,chr) = if ix==idx then True else False
        suchushutu ic suji=String.fromList ( List.map (\tpl->(snd tpl))  (List.filter (fc2 ic)  (List.indexedMap fc  (String.toList suji) ) ) )

        sline x1 y1 x2 y2 wd color =Svg.line
          [ Svg.Attributes.x1 (String.fromInt x1)
         , Svg.Attributes.y1 (String.fromInt y1)
         , Svg.Attributes.x2 (String.fromInt x2)
         , Svg.Attributes.y2 (String.fromInt y2)
         , Svg.Attributes.stroke color
         , Svg.Attributes.strokeWidth (String.fromInt wd)
         , Svg.Attributes.strokeLinecap "round"
          ] []
        
        stext xx yy moji color fs = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill color   
         ,Svg.Attributes.fontSize fs       
         ]
         [ Svg.text moji
         ]
        
        func txx tyy tdivx tdivy idx chr = stext (txx+(-idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" 
        --indexedMap : (Int -> a -> b) -> List a -> List b
        sjtext xx yy moji divx divy =
          List.indexedMap (func xx yy divx divy)  (List.reverse (String.toList moji))
        
        rfunc txx tyy tdivx tdivy idx chr = stext (txx+(idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" 
        rsjtext xx yy moji divx divy =
          List.indexedMap (rfunc xx yy divx divy)  (String.toList moji)
          
                  
 in

   table [align "center"]
   [
    tr []
    [
     td []
     [
       svgview
     ]
      ,
   
     td []
     [
                Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
                   ,
       sujibutton       
       ,div [style "font-size" "40px"] [text (if model.ansdisp then model.ans else "　")]
       ,div [][
          Button.button [Button.attrs [style "font-size" "16px"   ,onClick (Btn2 {s1=111,e1= 1499,s2= 2,e2= 5})]] [ text "*/1=4" ]
         , Button.button [Button.attrs [style "font-size" "16px"   ,onClick (Btn2 {s1=11,e1= 99 ,s2=11,e2= 99})]] [ text "*/2=2" ]
         , Button.button [Button.attrs [style "font-size" "16px"   ,onClick (Btn2 {s1=111,e1= 299,s2= 11,e2= 29})]] [ text "*/2=3" ]
       ]
     ]
    ]
   ]


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


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