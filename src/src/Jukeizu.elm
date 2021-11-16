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
    dlst:{fst:List String,snd:List String,thd:List String,fot:List String}
    ,clist:{fst:String,snd:String,thd:String,fot:String}
    ,rlist:List String
  }

type Junjo= Fst | Snd | Thd | Fot

smojil=["?","あ","い","う","え"]

init : () -> (Model, Cmd Msg)
init _ =
  ({dlst={fst=smojil,snd=smojil,thd=smojil,fot=smojil}
    ,clist={fst="?",snd="?",thd="?",fot="?"},rlist=[]},Cmd.none)

type Msg
    = Change String |Change1 String |Change2 String |Change3 String |Add

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
   let
      chikan lst src = List.map (\x-> (if x==src then ("*"++x) else x))  lst

       --?のときは、現在のmodel.listを参考に、復活させる

      

      dlcreate  clstx junjox stx= 
     
          case junjox of
           Fst -> {fst=model.dlst.fst,snd=chikan model.dlst.snd stx,thd=chikan model.dlst.thd stx,fot=chikan model.dlst.fot stx}
           Snd -> {fst=chikan model.dlst.fst stx ,snd=model.dlst.snd ,thd=chikan model.dlst.thd stx,fot=chikan model.dlst.fot stx}
           Thd -> {fst=chikan model.dlst.fst stx,snd=chikan model.dlst.snd stx,thd=model.dlst.thd ,fot=chikan model.dlst.fot stx}
           Fot -> {fst=chikan model.dlst.fst stx,snd=chikan model.dlst.snd stx,thd=chikan model.dlst.thd stx,fot=model.dlst.fot}

   in
  case msg of
   Change st ->
    
     ( { model |dlst= dlcreate  model.clist Fst st   ,clist={ fst= (if (String.left 1 st)=="*" then "?" else st)
       ,snd=model.clist.snd,thd=model.clist.thd,fot=model.clist.fot}}
     , Cmd.none
     )
   Change1 st ->
      
     ( { model |dlst= dlcreate  model.clist Snd st ,clist={fst=model.clist.fst  ,snd=(if (String.left 1 st)=="*" then "?" else st),
      thd=model.clist.thd,fot=model.clist.fot}}
     , Cmd.none
     )
   Change2 st ->
      
     ( { model |dlst= dlcreate  model.clist Thd  st ,clist={fst=model.clist.fst  ,snd=model.clist.snd   ,thd=(if (String.left 1 st)=="*" then "?" else st),fot=model.clist.fot }}
     , Cmd.none
     )
   Change3 st ->
  
     ( { model |dlst= dlcreate  model.clist Fot st  ,clist={fst=model.clist.fst  ,snd=model.clist.snd,thd=model.clist.thd,fot=(if (String.left 1 st)=="*" then "?" else st)}}
     , Cmd.none
     )
   Add ->
    ({model |rlist=(model.clist.fst++model.clist.snd++model.clist.thd++model.clist.fot)::model.rlist},Cmd.none)
  

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
      ,select [style "font-size" "50px" ,onChange handler ] (List.map (\s -> Html.option [selected (s==model.clist.fst),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlst.fst))
      ,select [style "font-size" "50px" ,onChange handler1 ] (List.map (\s -> Html.option [selected (s==model.clist.snd),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlst.snd))
      ,select [style "font-size" "50px" ,onChange handler2 ] (List.map (\s -> Html.option [selected (s==model.clist.thd),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlst.thd))
      ,select [style "font-size" "50px" ,onChange handler3 ] (List.map (\s -> Html.option [selected (s==model.clist.fot),value s][text (if ((String.left 1 s)=="*") then "　" else s)]) (model.dlst.fot))
      ]
       
      ]
      ,
      div []
      (List.map (\s->(div [] [text s] )) model.rlist)
    ]
    

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)


toint st=  Maybe.withDefault 0 (String.toInt st) 

fstf tuple =
    let
        (value1, _) = tuple
    in
    value1

sndf tuple =
    let
        (_, value2) = tuple
    in
    value2

getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs