module Examples.Simple exposing (main)

import Browser
import Html as H exposing (Html)
import Html.Attributes exposing (..)
import Katex as K
    exposing
        ( Latex
        , human
        , inline
        , display
        )


passage : List Latex
passage =
    [ human "等式の変形 "
    , inline "s"
    , human " = "
    , display "s=\\dfrac{a}{b}"
    ]


view : Model -> Html a
view model =
    let
        htmlGenerator isDisplayMode stringLatex =
            case isDisplayMode of
                Just True ->
                    H.div [style "font-size" "40px"] [ H.text stringLatex ]

                _ ->
                    H.span [style "font-size" "40px"] [ H.text stringLatex ]
    in
        passage
            |> List.map (K.generate htmlGenerator)
            |> H.div []
type alias Model={}

init:flags ->  Model
init flags ={}

type Msg
  =ABC

update: Msg-> Model -> Model
update msg model =
             case msg of
               ABC -> {}

main : Program () {} Msg
main =
     Browser.sandbox { init={},update=update, view = view }