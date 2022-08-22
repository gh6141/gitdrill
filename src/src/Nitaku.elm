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

type Msg =  Inc | Dec | StartSound |StartSound2 |Btn1 | Btn2


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg
port startSound2: () -> Cmd msg




update : Msg -> Model -> (Model,Cmd Msg)
update msg model=
  case msg of
    Inc -> ({model|num=if model.num<8 then model.num+1 else 1 ,toi=shutudai model.num,flghyoji=False},Cmd.none)
    Dec -> ({model|num=if model.num>0 then model.num-1 else 9 ,toi=shutudai model.num,flghyoji=False},Cmd.none)

    Btn1 -> ({model|seikaiflg=if model.toi.mondai==(zenkaku model.toi.img1) then True else False,flghyoji=True  } ,
            --Cmd.none
            if model.toi.mondai==(zenkaku model.toi.img1) then startSound() else startSound2()
            )
    Btn2 -> ({model|seikaiflg=if model.toi.mondai==(zenkaku model.toi.img2) then True else False ,flghyoji=True  } ,
           --Cmd.none
           if model.toi.mondai==(zenkaku model.toi.img2) then startSound() else startSound2()
           )

    StartSound -> (model,startSound())
    StartSound2 -> (model,startSound2())


-- VIEW

view : Model -> Html Msg
view model =
  let  
    
    btn1=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Dec]] [ text "←" ]
    btn2=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Inc]] [text "→"]
     
    marubatu=span [style "font-size" "20vw",style "color" (if model.seikaiflg then "red" else "blue")] [text (if model.seikaiflg then "〇" else "ｘ")]

  in
      

    Grid.container [Spacing.mt4Md]
    [ CDN.stylesheet 
      ,Grid.row 
        [Row.middleMd]
        [ Grid.col
            [ Col.md4 ]
           [ div [style "text-align" "center"] [btn1] ]
          
           ,Grid.col
          [Col.md4]
          [div[style "font-size" "3vw",style "text-align" "center"] [text (model.toi.mondai)]]
           
           , Grid.col
            [ Col.md4 ]
           [ div [style "text-align" "center"] [btn2] ]
    
        ]
      
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            [ Col.md4 ]
            [ img [src ("py/"++model.toi.img1++".jpg"),onClick Btn1,style "width" "30vw"] []  ]
          , Grid.col
            [ Col.md4 ]
           [ div [] [if model.flghyoji then marubatu else (span [] []) ] ]
        , Grid.col
            [ Col.md4 ]
           [ img [src ("py/"++model.toi.img2++".jpg"),onClick Btn2,style "width" "30vw"] []  ]
    
       
        ]
    
    ]




