module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = Int

init : Model
init =
  0


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1


-- VIEW

view : Model -> Html Msg
view model =
 let
     takasa =modBy 5 model +5
     kaisu=
      if takasa == 0 then
         model//5+2
      else
         model//5 +1
  
 in
 div [] [text "根の生長"]
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    ,td [ style "border" "solid thin", style "width" (String.fromInt 30 ++ "px") ] []
            |> List.repeat 1
            |> tr [ style "height" (String.fromInt (takasa*10) ++ "px") ]
            |> List.repeat (kaisu)
            |> table [ style "border" "solid thin", style "border-collapse" "collapse" ]

   , button [ onClick Increment ] [ text "+" ]
    ]