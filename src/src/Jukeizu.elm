module Jukeizu exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json

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
    dlist:List String
    ,dlist1:List String
    ,dlist2:List String
    ,dlist3:List String
    ,stage:String   
    ,stage1:String
    ,stage2:String
    ,stage3:String
  }

init : () -> (Model, Cmd Msg)
init _ =
  ({dlist=["?","あ","い","う","え"]
    ,dlist1=["?","あ","い","う","え"]
    ,dlist2=["?","あ","い","う","え"]
    ,dlist3=["?","あ","い","う","え"]
   ,stage="?",stage1="?",stage2="?",stage3="?"},Cmd.none)

type Msg
    = Change String |Change1 String |Change2 String |Change3 String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
   let
      chikan lst src = List.map (\x-> (if x==src && src/="?" then ("*"++x) else x))  lst

   in
  case msg of
   Change st ->
      let
        dlt= model.dlist
        dlt1=chikan model.dlist1 st
        dlt2=chikan model.dlist2 st
        dlt3=chikan model.dlist3 st
        --st を消したdltが　できるが、もし、stが空白（実際は＊がついている）なら、復活させる

      in 
     ( { model |dlist=dlt,dlist1=dlt1,dlist2=dlt2,dlist3=dlt3,stage=st}
     , Cmd.none
     )
   Change1 st ->
      let
        dlt=chikan model.dlist st
        dlt1= model.dlist1
        dlt2=chikan model.dlist2 st
        dlt3=chikan model.dlist3 st
      in 
     ( { model |dlist=dlt,dlist1=dlt1,dlist2=dlt2,dlist3=dlt3,stage1=st}
     , Cmd.none
     )
   Change2 st ->
      let
        dlt=chikan model.dlist st
        dlt1=chikan model.dlist1 st
        dlt2=model.dlist2
        dlt3=chikan model.dlist3 st
      in 
     ( { model |dlist=dlt,dlist1=dlt1,dlist2=dlt2,dlist3=dlt3,stage2=st}
     , Cmd.none
     )
   Change3 st ->
      let
        dlt=chikan model.dlist st
        dlt1=chikan model.dlist1 st
        dlt2=chikan model.dlist2 st
        dlt3=model.dlist3
      in 
     ( { model |dlist=dlt,dlist1=dlt1,dlist2=dlt2,dlist3=dlt3,stage3=st}
     , Cmd.none
     )
  

view : Model -> Html Msg
view model =
  let

         handler selectedText =
            Change selectedText
         handler1 selectedText =
            Change1 selectedText
         handler2 selectedText =
            Change2 selectedText
         handler3 selectedText =
            Change3 selectedText


  in

  div [style "font-size" "70px",style "margin" "10px"]
    [
      div []
      [span [style "font-size" "20px"] [text ("どんな並べ方がある？")
      ,select [style "font-size" "50px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==model.stage),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlist))
      ,select [style "font-size" "50px" ,onChange handler1 ] (List.map (\s -> Html.option [selected (s==model.stage1),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlist1))
      ,select [style "font-size" "50px" ,onChange handler2 ] (List.map (\s -> Html.option [selected (s==model.stage2),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlist2))
      ,select [style "font-size" "50px" ,onChange handler3 ] (List.map (\s -> Html.option [selected (s==model.stage3),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlist3))
      ]
       
      ]
      ,
      div []
      [text (model.stage++model.stage1++model.stage2++model.stage3)]
    ]
    

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)


toint st=  Maybe.withDefault 0 (String.toInt st) 

fst tuple =
    let
        (value1, _) = tuple
    in
    value1

snd tuple =
    let
        (_, value2) = tuple
    in
    value2