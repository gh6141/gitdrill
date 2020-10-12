module Seiza exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Task

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Utilities.Spacing as Spacing

main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model =
  {
    line:String
    ,fname:String
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( { line="_line" ,fname="n_star"
    }
  , Cmd.none
  )

type Msg
  = Line | Noline | Kita | Striangle | Sasori

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 case msg of
   Line ->
    ( { model |  line="_line"   }
    , Cmd.none
    )
   Noline ->
    ( { model |   line=""      }
    , Cmd.none)
   Kita ->
    ( {model | fname="n_star"}
    , Cmd.none)
   Striangle ->
    ( {model | fname="s_triangle"}
    , Cmd.none)
   Sasori ->
    ( {model | fname="sasori"}
    , Cmd.none)
  

view : Model -> Html Msg
view model =
  div []
    [
      div [] [Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Kita]] [ text "北の空" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Striangle]] [ text "夏の大三角" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Sasori]] [ text "さそり座" ]
      ]
      ,
      div []
      [Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Line]] [ text "線でむすぶ" ]
      ,Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Noline]] [ text "線なし" ]
      ]
      ,
      img [src ("/py/" ++ model.fname ++ model.line ++ ".jpg")] []
    ]

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none