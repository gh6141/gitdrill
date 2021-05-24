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
    , inline "s=\\dfrac{a}{b}"
    , human " *** "
    , display "s=\\dfrac{a}{b}"
    ,display "s=a\\dfrac{a}{b}"
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


        sbutton : Int -> Html Msg
        sbutton ii = (button [style "font-size" "50px"   ,onClick (Btn (btnLabel ii))] [ text (" "++(btnLabel ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
               ,td [] [sbutton 12]
             ]
             ,tr [] [
               td [] [sbutton 4]
               ,td [] [sbutton 5]
               ,td [] [sbutton 6]
             ]
             ,tr [] [
               td [] [sbutton 1]
               ,td [] [sbutton 2]
               ,td [] [sbutton 3]
               
             ]
             ,tr [] [
               td [] [sbutton 0]
                ,td [] [sbutton 13]
                ,td [] [sbutton 11]
             ]
            
            ]

    in
        passage
            |> List.map (K.generate htmlGenerator)
            |> H.div []


type alias Model={}

init:flags ->  Model
init flags ={}

type Msg
  =ABC | Btn String

update: Msg-> Model -> (Model,Cmd Msg)
update msg model =
             case msg of
               ABC -> ({},Cmd.none)

               Btn si ->
                 ({model|              } ,Cmd.none)
                 

main : Program () {} Msg
main =
     Browser.sandbox { init={},update=update, view = view }