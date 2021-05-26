module Examples.Simple exposing (main)

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
 ,seikai:Bool
 ,siki:String
 }




init:() -> (Model,Cmd Msg)
init _ =({passage=[],seikai=False,siki=""},Cmd.none)

type Msg
  =ABC | Btn String

btnLabel : Int -> String
btnLabel xi = case xi of
               13 -> "C"
               11 -> "-"
               12 -> "x"
               _  -> String.fromInt xi

update: Msg-> Model -> (Model,Cmd Msg)
update msg model =
             case msg of
               ABC -> (model,Cmd.none)

               Btn si ->
                let
                   ctl = (display ("s"++si++"=\\dfrac{x}{y}"))
                in
                 ({model |  
                    siki = model.siki++si
                  } ,Cmd.none)


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
    
        tailadd item lst = List.reverse  (item :: (List.reverse lst))
                

    in
       H.table []
       [ H.tr []
         [         
          H.td [ style "vertical-align" "top" ]  [
           (tailadd (display model.siki) model.passage) 
            |> List.map (K.generate htmlGenerator)
            |> H.div []
          ]
          , H.td [style "vertical-align" "top"]  [sujibutton]
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