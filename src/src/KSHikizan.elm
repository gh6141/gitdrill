module KSHikizan exposing (..)

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
 }

type alias Model =
  { 
      init:String
    ,mon1:String
    ,mon2:String
    ,ans1:String
    ,ans2:String
    ,seikai1:Bool
    ,seikai2:Bool
 
  }



init : () -> (Model, Cmd Msg)
init _ =
  ( {init="19",mon1="11",mon2="9",ans1="",ans2="",seikai1=False,seikai2=False}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int 

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
       mhenkan :Int -> Int -> Mondai
       mhenkan i1 i2 = {sa=String.fromInt i1,sb=String.fromInt i2} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map2  mhenkan (Random.int 11  (toint model.init) ) (Random.int 2  9 )

  in
 
  case msg of  
   Next ->
      ( {model|ans1="",ans2="",seikai1=False,seikai2=False}
       ,   (Random.generate Newmon monGenerator  )
      )
  
   Newmon mnd ->   
      ( {model |  mon1 = mnd.sa ,mon2=mnd.sb}    ,
      
      (if ( ((toint mnd.sa)-10) < (toint mnd.sb)) then
        Cmd.none
      else 
        (Random.generate Newmon monGenerator) )
      )
  
   Btn si ->
     let
       kotae1=10-(toint model.mon2)
       kotae2=(toint model.mon1)- (toint model.mon2)
       

     in
      if model.seikai1==False then
       ( {model |    ans1=(String.fromInt si)  ,seikai1=(si==kotae1)          } ,Cmd.none)
      else 
        ( {model |    ans2=(String.fromInt si)  ,seikai2=(si==kotae2)          } ,Cmd.none)


view : Model -> Html Msg
view model =
 let
      

        img1=img [src "https://gh6141.github.io/gitdrill/src/py/apple.png",width 50, height 50] []
        img1o=img [src "https://gh6141.github.io/gitdrill/src/py/apple.png",width 50, height 50,style "opacity" "0.5"] []
       
        list1o = (List.repeat (10-(toint model.mon2)) (img1))++(List.repeat (toint model.mon2) (img1o))
        list1 = (List.take 5 list1o) ++[text "　" ]++ (List.drop 5 list1o)
        list2o =(List.repeat ((toint model.mon1)-10) (img1))
        list2 = if (List.length list2o >5) then ( (List.take 5 list2o) ++[text "　" ]++ (List.drop 5 list2o) ) else list2o
     
        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(String.fromInt ii)++" ")])

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

        tbox str color= span [] [input [  size 3,placeholder "?", style "font-size" "26px",style "background-color" color,value str] [] ] 
                  
 in
   table [align "center"]
   [
    tr []
    [ 
     td [style "font-size" "30px"  ] 
     [text (model.mon1++"こ　ありました。"++model.mon2++"こ　たべると　いくつ　のこる？")]
    ]
    ,tr []
    [ 

     td [] 
      [
          tr [] [td [] ([text "10"]++list1)]
          ,tr [] [td []  ([text ("_"++(String.fromInt ((toint model.mon1)-10)))]++list2)]  
          ,tr [] [td [style "font-size" "30px"] [text ("10から"++model.mon2++"をひくと")
          , tbox model.ans1 "white" ]  ]
          ,tr [] [td [style "font-size" "30px"] 
           [text "のこりは"
           ,(tbox (if model.seikai1 then model.ans1 else "") "white")
           ,text ("と"++(String.fromInt ((toint model.mon1)-10))++"をたして")
           , tbox model.ans2 "coral" 
           ,span [style "font-size" "70px",style "color" "red"] [text (if model.seikai2==True then "〇" else "")]
           ]  
          ]  
      ]



     ,td []
     [
       Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
      ,sujibutton       
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