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
 
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {hijosu="100",josu="2",ans="50",nyuryoku=""}
  , Cmd.none
  )

type Msg
    =  Next | Newmon (Int,Int) | Btn Int 

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let

      mhenkan i1 i2 = (i1,i2)
      monGenerator = Random.map2  mhenkan (Random.int 2 99 ) (Random.int 2  99 ) 


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
      ,nyuryoku="" }    ,Cmd.none)
  
   Btn si ->
    let
      mans=
        case si of
         10 -> String.dropRight 1 model.nyuryoku
         _ ->  model.nyuryoku++(String.fromInt si)


    in
     ( {model | nyuryoku=mans
                 } ,Cmd.none)



view : Model -> Html Msg
view model =
 let
      

      --  img1=img [src ("https://rasp.cld9.work/py/car3.jpg"),style "width" isizex, style "height" isizey] []

      --  list1 = List.map  (\ii -> 
      --    let
       --     nakami=  img [onClick (Img ii),id (String.fromInt ii)
      --               ,src (if (Maybe.withDefault True (Array.get (ii-1) model.imgl)) then "https://rasp.cld9.work/py/car3.jpg" else "https://rasp.cld9.work/py/car1.jpg") 
      --               ,style "width" isizex, style "height" isizey] []
     

        --list1=List.repeat (toint model.init) (img3)
        --list2=List.repeat (toint model.mon2) (img3)
  
      --  contents=  div [style "font-size" "70px",style "margin" "10px"]
       --   [     
        --  div [align "center"]
        --   [            
        --   select [style "text-align-last" "center",style "font-size" "50px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==model.init),value s][text ("　"++s++"　")]) ["?","3","4","5","6","7","8","9","10"])
        --   ,text "は"             
        --    ]
        --    ,
         --  div [align "center"]
         --   [    
         --  input [style "background-color"  "green" ,style "text-align" "center",style "font-size" "50px", type_ "text",maxlength 1,size 1 ,value model.mon1] []
          
          --  ]
          --]

        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "40px"   ,onClick (Btn ii)]] 
         [ text (" "++(
           if ii>9 then
            "C"
           else 
            String.fromInt ii
           
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
               
             ]                   
            ]

        x0=100
        y0=80
        hwidth=200


        svgview mdl=Svg.svg 
         [ Svg.Attributes.viewBox "0 0 400 400"
         , Svg.Attributes.width "480"
         , Svg.Attributes.height "400"
         ]
         (
          [
          sline x0 y0 (x0+hwidth) y0 3 "black" 
          ,stext x0 (y0+40) ")" "black" "50px"
      --    ,stext (x0-80) (y0+44) mdl.josu "black" "46px"
      --     ,stext (x0+40) (y0+44) mdl.hijosu "black" "46px"
          ]++(sjtext (x0-50) (y0+44) mdl.josu 0 0)
           ++(sjtext (x0+150) (y0+44) mdl.hijosu 0 0)
           ++([stext (x0+150) (y0-4) mdl.nyuryoku "black" "46px"]) 
           ++(sjtext (x0+200) (y0+200) mdl.ans 0 0) 
         )

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
        
        func txx tyy tdivx tdivy idx chr = stext (txx+(-idx+tdivx)*40)   (tyy+tdivy*40)  (String.fromChar chr) "black" "46px" 

        --indexedMap : (Int -> a -> b) -> List a -> List b
        sjtext xx yy moji divx divy =
          List.indexedMap (func xx yy divx divy)  (List.reverse (String.toList moji))
          
                  
 in

   table [align "center"]
   [
    tr []
    [
     td []
     [
       svgview model
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