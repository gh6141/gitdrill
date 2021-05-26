module Examples.Simple exposing (main)

import Debug
import Browser
import Html as H exposing (Html)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Katex as K
    exposing
        ( Latex
        , human
        , inline
        , display
        )
import Bootstrap.Button as Button


opassage : List Latex
opassage =
    [ human "等式の変形 "
    , inline "s=\\dfrac{a}{b}"
    , human " *** "
    , display "s=\\dfrac{a}{b}"

    ]




type alias Model=
 {
  passage:List Latex
  ,passage2:List String
 ,seikai:Bool
 ,siki:String
 }




init:() -> (Model,Cmd Msg)
init _ =({passage=[human "等式の変形"],passage2=["Test"],seikai=False,siki=""},Cmd.none)

type Msg
  =Ret | Btn String

btnLabel : Int -> String
btnLabel xi = case xi of
               13 -> "C"
               11 -> "-"
               12 -> "x"

               _  -> String.fromInt xi

update: Msg-> Model -> (Model,Cmd Msg)
update msg model =
             case msg of
               Ret -> 
                         
                 ({model|passage=(model.passage++[display ""])},Cmd.none)

               Btn si ->
                let                       
                  tppsg=model.passage
 

                in
                ({model |  passage=(model.passage++[inline si]) , siki = model.siki++si } ,Cmd.none)


view : Model -> Html Msg
view model =
    let
        htmlGenerator isDisplayMode stringLatex =
            case isDisplayMode of
                Just True ->
                    H.div [style "font-size" "40px"] [ H.text stringLatex ]

                _ ->
                    H.span [style "font-size" "40px"] [ H.text stringLatex ]

        



        sbutton : Int -> Html Msg
        sbutton ii = ( H.button [style "font-size" "50px"   ,onClick (Btn (btnLabel ii))] [ H.text (" "++(btnLabel ii)++" ")])

        sujibutton=
           H.table []
            [
             H.tr [] [
               H.td [] [sbutton 7]
               ,H.td [] [sbutton 8]
               ,H.td [] [sbutton 9]
               ,H.td [] [sbutton 12]
             ]
             ,H.tr [] [
               H.td [] [sbutton 4]
               ,H.td [] [sbutton 5]
               ,H.td [] [sbutton 6]
             ]
             ,H.tr [] [
               H.td [] [sbutton 1]
               ,H.td [] [sbutton 2]
               ,H.td [] [sbutton 3]
               
             ]
             ,H.tr [] [
               H.td [] [sbutton 0]
                ,H.td [] [sbutton 13]
                ,H.td [] [sbutton 11]
             ]
            
            ]
 

    in
       H.table []
       [ H.tr []
         [         
          H.td [ style "vertical-align" "top" ]  [
           model.passage 
            |> List.map (K.generate htmlGenerator)
            |> H.div []
         

          ]
          , H.td [style "vertical-align" "top"]  [sujibutton]
          ,  Button.button [Button.attrs [style "font-size" "30px"   ,onClick Ret]] [ H.text "Ret" ]
         ] 
          
     
       ]

                 
main=Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none