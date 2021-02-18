-- A text input for reversing text. Very useful!
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/text_fields.html
--

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Random
import Json.Decode as Json


-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }

-- MODEL


type alias Model =
  { denatsu : String
    ,denryu :String
    ,teiko :String
    ,siki :String
    ,mode :String
    ,rmode : Bool
    ,maru : Bool
    ,left : String
    ,mid :String
    ,right :String

  }


init : () -> (Model,Cmd Msg)
init _ =
  ( { denatsu = "10",denryu ="5",teiko="2" ,siki="",mode="V",rmode=False,maru=False,left="",mid="",right=""} , Cmd.none )



-- UPDATE


type Msg
  = Change String |ChangeS String String  | NewAns (Int,Int) | Btn Int |Mode String 

btnLabel : Int -> String
btnLabel xi = case xi of
               10 -> "×"
               11 -> "÷"
               12 -> "="
               13 -> "C"
               _  -> String.fromInt xi

type alias SikiNaiyo =
 {
  x:Int
  ,enzan :String
  ,y :Int
 }

sikiParse : String -> SikiNaiyo
sikiParse txt =
  let 

    tmpnaiyo enz =
       let 
          lst=String.split enz txt
          tpl=case lst of 
               xs :: ys ::[] -> Tuple.pair (toint xs) (toint ys)
               _ -> Tuple.pair 0 0
    
       in
         {x=  Tuple.first tpl
          ,enzan=enz
          ,y = Tuple.second tpl
        }

  in
    if (String.contains "×" txt)   then
      tmpnaiyo "×"      
    else if  (String.contains "÷" txt) then
      tmpnaiyo "÷"
    else
     {x=0,enzan="",y=0}

kotae snaiyo =
  if snaiyo.enzan=="×" then
    String.fromInt (snaiyo.x * snaiyo.y)
  else if snaiyo.enzan=="÷" then
    String.fromInt (snaiyo.x // snaiyo.y)
  else
   "0"
 



update : Msg -> Model -> ( Model,Cmd Msg)
update msg model =
 let
   hanbetu snum =
      if model.mode=="V" then
         if snum==model.denatsu then True else False
      else if model.mode=="I" then
         if snum==model.denryu then True else False
      else
         if snum==model.teiko then True else False 


 in



  case msg of
    Change newContent ->
      ({ model | maru=False ,left="",mid="",right=""}, Random.generate NewAns ansGenerator)
    ChangeS snum lmr->
      let
        sikip l m r s= case lmr of
          "L" -> s++m++r
          "M" -> l++s++r
          "R" -> l++m++s
          _ -> ""

      in
       ({ model |
       left= if lmr=="L" then snum else model.left
       ,mid= if lmr=="M" then snum else model.mid
       ,right= if lmr=="R" then snum else model.right
       ,maru=hanbetu(kotae(sikiParse (sikip model.left model.mid model.right snum)))
        }, Cmd.none)
 
    NewAns (x,y) ->
      ( {model | siki="",denatsu=String.fromInt x,denryu=String.fromInt y ,teiko=String.fromInt (x//y)
       ,mode=
        case (modBy 3 x) of
          0 -> "I"
          1 -> "R"
          2 -> "V"
          _ -> "V"       
       }  
      , if (modBy y x) ==0 && not (x//y ==1) then  Cmd.none else ( Random.generate NewAns ansGenerator) )
    Btn ii ->
     if ii==12 then
      ({model | siki=model.siki++(btnLabel ii)++kotae(sikiParse model.siki) ,maru=hanbetu(kotae(sikiParse model.siki))  },Cmd.none) 
     else
      ({model | siki=if ii/=13 then model.siki++(btnLabel ii) else "" },Cmd.none)
    Mode md ->
     if md=="FREE" then 
       ( {model | rmode=True}   ,   Cmd.none )
     else
     ( {model | rmode=False}   ,  Cmd.none )
 

ansGenerator : Random.Generator (Int, Int)
ansGenerator =
  Random.map2 Tuple.pair
    (Random.int 2 30)
    (Random.int 2 30)




toint st=  Maybe.withDefault 0 (String.toInt st) 

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)

handlerl selectedText = ChangeS selectedText "L"
handlerm selectedText = ChangeS selectedText "M"
handlerr selectedText = ChangeS selectedText "R"

-- VIEW


view : Model -> Html Msg
view model =

  let


     

        sList = case model.mode of
          "I" -> ["",model.denatsu,model.teiko]
          "V" -> ["",model.denryu,model.teiko]
          "R" -> ["",model.denryu,model.denatsu]
          _ -> ["","",""]


        sbutton : Int -> Html Msg
        sbutton ii = (button [style "font-size" "60px"   ,onClick (Btn ii)] [ text (" "++(btnLabel ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
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
               ,td [] [sbutton 13]
             ]
             ,tr [] [
               td [] [sbutton 0]
               ,td [] [sbutton 10]
               ,td [] [sbutton 11]
               ,td [] [sbutton 12]
             ]
            
            ]

  in

  div [style "position" "relative"]
    [     Html.img [src "py/teiko_kairo.jpg"][]
        , div [style "position" "absolute", style "top" "100px", style "left" "210px",style "font-size" "30px",style "color" "red"] [text (if model.mode=="V" then "?" else model.denatsu)]
        , div [style "position" "absolute", style "top" "260px", style "left" "430px",style "font-size" "30px",style "color" "red"] [text (if model.mode=="I" then "?" else model.denryu)]
        , div [style "position" "absolute", style "top" "300px", style "left" "190px",style "font-size" "30px",style "color" "red"] [text (if model.mode=="R" then "?" else model.teiko)]

        ,div[style "position" "absolute", style "top" "380px", style "left" "50px"][
          button [ style "font-size" "12px",onClick (Mode "FREE")][text "自由入力"]
         , button [ style "font-size" "12px",onClick (Mode "SELECT")][text "選択入力"]
          ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "360px", style "left" "320px"] [input [ placeholder "式?", value model.siki,style "font-size" "36px",style "color" "red"] [] ]
        ,div[style "position" "absolute", style "top" "30px", style "left" "400px"][button [ style "font-size" "30px",onClick (Change "")][text "つぎへ"]]
        ,div[style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "30px", style "left" "600px"][sujibutton]
        ,div[style "position" "absolute", style "top" "180px", style "left" "480px",style "font-size" "120px",style "color" "red",style "visibility" (if model.maru==True then "visible" else "hidden")][text "〇"]

        ,div[style "visibility" (if model.rmode/=True then "visible" else "hidden"),style "position" "absolute", style "top" "360px", style "left" "340px"][
          select [style "font-size" "50px" ,onChange handlerl ] (List.map (\s -> Html.option [selected (s==model.left),value s][text ("　"++s++"　")]) sList)        
          ,select [style "font-size" "50px" ,onChange handlerm ] (List.map (\s -> Html.option [selected (s==model.mid),value s][text ("　"++s++"　")]) ["","×","÷"])        
          ,select [style "font-size" "50px" ,onChange handlerr ] (List.map (\s -> Html.option [selected (s==model.right),value s][text ("　"++s++"　")]) sList)
          ,span [style "font-size" "50px" ][text (if model.maru==True then "="++(kotae (sikiParse (model.left++model.mid++model.right))) else "")]
        ]
      
    ]