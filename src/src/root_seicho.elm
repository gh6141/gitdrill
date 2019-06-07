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
 --nobikittara tomaru
     tlim = 10
     hsaki=5 + modBy 5 model 
   
     kaisu= model//5
     
    
     div_tr taka=   tr [ style "height" (String.fromInt (taka*7) ++ "px") ] [td [ style "border" "solid thin", style "width" (String.fromInt 30 ++ "px") ] [text "●"]]
       
  
 in
  div [] [
  div [style "font-size" "30pt"] [text "根の生長"]
  ,
   button [ style "font-size" "40pt" ,onClick Increment ] [ text "+" ]
  ,
  div [style "text-align" "center"]
    [ 
            [div_tr hsaki]
            |> List.append [div_tr hsaki]
            |> List.append ( div_tr tlim |> List.repeat (kaisu) )
            |> table [ style "border" "solid thin", style "border-collapse" "collapse" , align "center"]

 
    ]
  ]