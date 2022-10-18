port module Nitaku exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http


import Url
import Platform.Cmd

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Utilities.Spacing as Spacing

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Form as Form

type alias Toi =
    { img1:String,
      img2:String,
      mondai:String 
    }
 

shutudai: Int -> Toi
shutudai num = case num of
         0-> {img1="suika",img2="taburetto",mondai="すいか"}
         1-> {img1="meron",img2="mikan",mondai="みかん"}
         2-> {img1="ringo",img2="tamago",mondai="りんご"}
         3-> {img1="budo",img2="taiikukan",mondai="ぶどう"}
         4-> {img1="youtube",img2="taiikukan",mondai="たいいくかん"}
         5-> {img1="youtube",img2="budo",mondai="ゆーちゅーぶ"}
         6-> {img1="tamago",img2="ringo",mondai="たまご"}
         7-> {img1="mikan",img2="taburetto",mondai="たぶれっと"}
         8-> {img1="suika",img2="meron",mondai="めろん"}
         _-> {img1="",img2="",mondai=""}

zenkaku hk = case hk of
         "suika" -> "すいか"
         "mikan" -> "みかん"
         "ringo" -> "りんご"
         "budo" -> "ぶどう"
         "taiikukan" -> "たいいくかん"
         "youtube" -> "ゆーちゅーぶ"
         "tamago" -> "たまご"
         "taburetto" -> "たぶれっと"
         "meron" -> "めろん"
         _ -> ""

getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none  
        }
        

-- MODEL
type alias Model =
    { 
        num:Int,
        toi:Toi,
        seikaiflg:Bool,
        flghyoji:Bool
    }
 


minit: Model
minit =Model 0  {img1="meron",img2="suika",mondai="すいか"} False False

init : () -> ( Model, Cmd Msg )
init _ = ( minit  ,Cmd.none   )



-- UPDATE

type Msg =  Inc |  StartSound |StartSound2 |Btn1 | Btn2 | BtnMondai


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg
port startSound2: () -> Cmd msg

port speak: String -> Cmd msg




update : Msg -> Model -> (Model,Cmd Msg)
update msg model=
  let 
    sflg1=if model.toi.mondai==(zenkaku model.toi.img1) then True else False
    sflg2=if model.toi.mondai==(zenkaku model.toi.img2) then True else False    
  in
  case msg of
    Inc -> ({model|num=if model.num<8 then model.num+1 else 1 ,toi=shutudai model.num,flghyoji=False},speak((shutudai model.num).mondai++"を、えらんでください"))
   --Dec -> ({model|num=if model.num>0 then model.num-1 else 9 ,toi=shutudai model.num,flghyoji=False},speak((shutudai model.num).mondai++"を、えらんでください"))

    Btn1 -> ({model|
                seikaiflg=sflg1

               ,num=if sflg1 then (if model.num<8 then model.num+1 else 1 ) else model.num
               ,toi=if sflg1 then (shutudai model.num) else model.toi
               ,flghyoji=if sflg1 then False else True
               
               } ,
            --Cmd.none
            if sflg1 then
             Cmd.batch [startSound() , speak((shutudai model.num).mondai++"を、えらんでください")]
             
            else
              Cmd.batch [startSound2() ,speak((shutudai (model.num-1)).mondai++"を、えらんでね")]
            )


    Btn2 -> ({model|
              seikaiflg=   sflg2      
              
               ,num=if sflg2 then (if model.num<8 then model.num+1 else 1 ) else model.num
               ,toi=if sflg2 then (shutudai model.num) else model.toi
               ,flghyoji=if sflg2 then False else True
             
              } ,
           --Cmd.none
           if sflg2 then 
            Cmd.batch [startSound() ,speak((shutudai model.num).mondai++"を、えらんでください")]
           else 
            Cmd.batch [startSound2() ,speak((shutudai (model.num-1)).mondai++"を、えらんでね")]
      
           )

    BtnMondai -> (model,
                speak((shutudai (model.num-1)).mondai++"を、えらんでください")
                 )

    StartSound -> (model,startSound())
    StartSound2 -> (model,startSound2())



-- VIEW

view : Model -> Html Msg
view model =
  let  
    
   -- btn1=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Dec]] [ text "←" ]
    btn2=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Inc]] [text "→"]
    btnMondai=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick BtnMondai]] [text (model.toi.mondai)]
    marubatu=span [style "font-size" "10vw",style "color" (if model.seikaiflg then "red" else "blue")] [text (if model.seikaiflg then "〇" else "ｘ")]

  in
      

    Grid.container [Spacing.mt4Md]
    [ CDN.stylesheet 
      ,Grid.row 
        []
        [      
           Grid.col
          []
          [
            div [style "text-align" "center"] [ btnMondai]           
          ]            
        ]
      
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            []
            [ img [src ("https://rasp.cld9.work/py/"++model.toi.img1++".jpg"),onClick Btn1,style "width" "20vw"] []  ]
          , Grid.col
            [ ]
           [ div [] [if model.flghyoji then marubatu else (span [] []) ] ]
        , Grid.col
            [  ]
           [ img [src ("https://rasp.cld9.work/py/"++model.toi.img2++".jpg"),onClick Btn2,style "width" "20vw"] []  ]
    
       
        ]
    
    ]




