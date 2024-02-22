port module Gojuon exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

import Html.Attributes exposing (style)


-- ひらがなリスト
hiraganaListo : List (List String)
hiraganaListo = [
    [ "あ", "い", "う", "え", "お","　"]
    ,[ "か",  "き", "く",  "け",  "こ"]
    , ["さ", "し",  "す", "せ", "そ"]
    ,[ "た",  "ち",  "つ", "て",  "と"]
    ,[ "な", "に", "ぬ", "ね", "の","　"]
    ,[ "は", "ひ",  "ふ", "へ", "ほ"]
    , ["ま", "み", "む", "め", "も"]
    , ["や", "ゆ", "よ"]
    , ["ら", "り", "る", "れ", "ろ"]
    , [ "わ", "を", "ん","　"]
    ]

hiraganaListd = [
    [ "が",  "ぎ", "ぐ",  "げ",  "ご","　"]
    , ["ざ", "じ",  "ず", "ぜ", "ぞ"]
    , ["だ",  "ぢ",  "づ", "で",  "ど"]
    ,[ "ば", "び",  "ぶ", "べ", "ぼ","　" ]
    ]

hiraganaListh = [
    ["ぱ", "ぴ", "ぷ","ぺ","ぽ","　"] ]

hiraganaListy =[
    [   "っ","　"  ] 
    ,[ "ゃ", "ゅ", "ょ","　" ] 
    ]

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none  
        }


-- メッセージ型
type Msg
    = ClickHiragana String | Allplay | Allclear | Backspace | Dakuten | Handakuten | Yoon


-- モデル
type alias Model =
    { output : String
     ,hiraganaList: List (List String)
    }



init : () -> ( Model, Cmd Msg )
init _ = (   { output = "" ,hiraganaList=hiraganaListo} ,Cmd.none   )

port speak: String -> Cmd msg


-- ボタンを作成する
buttonForHiragana : String -> Html Msg
buttonForHiragana hiragana =
    button [ onClick (ClickHiragana hiragana) ] [ text hiragana ]


-- メッセージハンドラ
update : Msg -> Model -> (Model,Cmd Msg)
update msg mdl =
    case msg of
        ClickHiragana h ->
           ( { mdl | output = mdl.output ++ h ,hiraganaList = hiraganaListo}, if h/="　" then speak(h) else Cmd.none)
        Allplay ->
           ( mdl,  speak(mdl.output))
        Allclear ->
            ( { mdl | output = "" }, Cmd.none)
        Backspace ->
           let
             removeLastCharacter str =
                      if String.length str > 0 then
                          String.left (String.length str - 1) str
                      else
                           str          
           in
            ( {mdl | output = removeLastCharacter mdl.output } ,Cmd.none)

        Dakuten ->
           ( {mdl | hiraganaList = hiraganaListd } ,Cmd.none)
        Handakuten ->
            ( {mdl |  hiraganaList = hiraganaListh } ,Cmd.none)
        Yoon ->
             ( {mdl |  hiraganaList = hiraganaListy  } ,Cmd.none)
         
 

-- ビュー
view : Model -> Html Msg
view model =
    let
     customStyle =
            [ style "font-size" "60px"
            , style "background-color" "#e6e6fa"
            ]

     customStyle2 =
            [ style "font-size" "60px"
            , style "background-color" "#00ff00"
            ]
    
     buttonForHiraganaWithStyle customStylex hiragana =
      button (customStylex ++ [ onClick (ClickHiragana hiragana) ]) [ text hiragana ]

     buttonCreate msg caption color = button [style "font-size" "60px", style "background-color" color,onClick msg ] [text caption]
    
     listCreate list= div [] (List.map (buttonForHiraganaWithStyle customStyle) list )

    in
    div []
        [   div customStyle2 [ text model.output ] , buttonCreate Allplay "はなす" "#ff0000"
        ,buttonCreate Dakuten "\"" "#009900",buttonCreate Handakuten "。" "#009900",buttonCreate Yoon "っゃゅょ" "#009900"
       -- ,div [] (List.map (buttonForHiraganaWithStyle customStyle) model.hiraganaList)
        ,div [] (List.map listCreate model.hiraganaList)
        ,buttonCreate Allclear "クリア" "#0000ff",buttonCreate Backspace "けす" "#0000ff"
           
        ]
