module Main exposing (..)

import Browser
import Html exposing (Html, div, h1, img, text)
import Html.Attributes exposing (src, style)
import MiniLatex.EditSimple
import Strings

import MiniLatex.Driver as MiniLatex


---- MODEL ----


type alias Model =
    {}


init : ( Model, Cmd Msg )
init =
    ( {}, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp
    | LatexMsg MiniLatex.EditSimple.LaTeXMsg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
   let
    text = "\\begin{itemize}\n\\item Eggs\n\\item Milk\n\\item Bread\n\\end{itemize}"
    macroDefinitions = ""
   in
    div [ style "margin" "50px" ]
        [ h1 [] [ text "Example" ]
       -- , div [ style "font-size" "18px" ]    (MiniLatex.EditSimple.render Strings.miniLaTeX |> List.map (Html.map LatexMsg))           
       
         MiniLatex.render marcroDefinitions text
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }