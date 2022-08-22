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
    { img1:String,
      img2:String,
      mondai:String,
      ans:String
 
    }
 


minit: Model
minit =Model ["","","",""]

init : () -> ( Model, Cmd Msg )
init _ = ( minit  ,Cmd.none   )



-- UPDATE

type Msg =  Inc | Dec | StartSound |StartSound2


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg
port startSound2: () -> Cmd msg




update : Msg -> Model -> (Model,Cmd Msg)
update msg model=
  case msg of
    Inc -> (model,Cmd.none)
    Dec -> (model,Cmd.none)

    StartSound -> (model,startSound())
    StartSound2 -> (model,startSound2())


-- VIEW

view : Model -> Html Msg
view model =
  let  
    
    btn1=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Dec]] [ text "もどる" ]
    btn2=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Inc]] [text "つぎへ"]
     


  in
      

    Grid.container [Spacing.mt4Md]
    [ CDN.stylesheet 
      ,Grid.row 
        [Row.middleMd]
        [ Grid.col
          [Col.md4]
          [div[] [btn1]]

          ,Grid.col
          [Col.md4]
          [div[] []]
        ]
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            [ Col.md4 ]
            [ div [] [btn2]]     
         , Grid.col
            [ Col.md4 ]
            [ div [style "font-size" "50px"] [text model.mondai]   ]
        ]
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            [ Col.md4 ]
            [ img [src ("py/"++model.img1++".jpg")] []  ]
        , Grid.col
            [ Col.md4 ]
           [ img [src ("py/"++model.img2++".jpg")] []  ]
        , Grid.col
            [ Col.md4 ]
            [ img [src ("py/"++model.img3++".jpg")] []  ]
       
        ]
    
    ]




