module Subunkai exposing (..)

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
    wa:Int
    
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( {wa=1}
  , Cmd.none
  )

type Msg
  = Line

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 case msg of
   Line ->
    ( { model |  wa=1   }
    , Cmd.none
    )


  

view : Model -> Html Msg
view model =
  div []
    [
    select [ style "font-size" "20px" ] (List.map (\s -> Html.option [value s][text s]) ["1","2","3","4","5"])
    ]

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none