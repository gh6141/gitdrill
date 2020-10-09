module Seiza exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Task

main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model =
  {
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {
    }
  , Cmd.none
  )

type Msg
  = Msg

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  ( model
  , Cmd.none
  )

view : Model -> Html Msg
view model =
  div []
    [
    ]

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none