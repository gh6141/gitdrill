port module Onegai exposing (main)


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
    { img:String,
      mondai:String 
    }


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
        ans:Toi
    }
 


minit: Model
minit =Model 0  {img1="meron",mondai="すいか"} False {img=""}

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
  
  case msg of
    Inc -> 
     --({model|num=if model.num<((List.length shutudaiL)-1) then model.num+1 else 1 ,toi=shutudai model.num,flghyoji=False},speak((shutudai model.num).mondai++"は、どれかな"))
  
    Btn1 -> ({model|
                seikaiflg=sflg1

               ,num=if sflg1 then (if model.num<((List.length shutudaiL)-1) then model.num+1 else 1 ) else model.num
               ,toi=if sflg1 then (shutudai model.num) else model.toi
               ,flghyoji=if sflg1 then False else True
               
               } ,
            --Cmd.none

            if sflg1 then
              startSound()           
             
            else
               startSound2() 
            )


    Btn2 -> ({model|
              seikaiflg=   sflg2      
              
               ,num=if sflg2 then (if model.num<((List.length shutudaiL)-1) then model.num+1 else 1 ) else model.num
               ,toi=if sflg2 then (shutudai model.num) else model.toi
               ,flghyoji=if sflg2 then False else True
             
              } ,
           --Cmd.none
           if sflg2 then 
               startSound() 
           else 
             startSound2() 
           )

    BtnMondai -> (model,
                speak((shutudai (model.num-1)).mondai++"わ、どれ？")
                 )

    StartSound -> (model,startSound())
    StartSound2 -> (model,startSound2())


-- VIEW

view : Model -> Html Msg
view model =
  let  
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
            div [style "text-align" "center"]
             [ btnMondai
             ]           
          ]            
        ]
      
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            []
            [ img [src ("https://rasp.cld9.work/py/"++model.toi.img1++(if (String.contains ".gif" model.toi.img1) then "" else ".jpg")),onClick Btn1,style "width" "25vw"] []  ]
          , Grid.col
            [ ]
           [ div [] [if model.flghyoji then marubatu else (span [] []) ] ]
        , Grid.col
            [  ]
           [ img [src ("https://rasp.cld9.work/py/"++model.toi.img2++(if (String.contains ".gif" model.toi.img2) then "" else ".jpg")),onClick Btn2,style "width" "25vw"] []  ]
    
       
        ]
    
    ]
