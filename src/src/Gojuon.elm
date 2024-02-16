module Main exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

import Html.Attributes exposing (style)


-- ひらがなリスト
hiraganaList : List String
hiraganaList =
    [ "あ", "い", "う", "え", "お"
    , "か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご"
    , "さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ"
    , "た", "だ", "ち", "ぢ", "つ", "づ", "て", "で", "と", "ど"
    , "な", "に", "ぬ", "ね", "の"
    , "は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ"
    , "ま", "み", "む", "め", "も"
    , "や", "ゆ", "よ"
    , "ら", "り", "る", "れ", "ろ"
    , "わ", "を", "ん"
    ]


-- メイン
main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }


-- メッセージ型
type Msg
    = ClickHiragana String


-- モデル
type alias Model =
    { output : String
    }


initialModel : Model
initialModel =
    { output = "" }


-- ボタンを作成する
buttonForHiragana : String -> Html Msg
buttonForHiragana hiragana =
    button [ onClick (ClickHiragana hiragana) ] [ text hiragana ]


-- メッセージハンドラ
update : Msg -> Model -> Model
update msg mdl =
    case msg of
        ClickHiragana h ->
            { mdl | output = mdl.output ++ h }


-- ビュー
view : Model -> Html Msg
view model =
    let
     customStyle =
            [ style "font-size" "40px"
            , style "background-color" "#771177"
            ]

     customStyle2 =
            [ style "font-size" "40px"
            , style "background-color" "#00ff00"
            ]
    
     buttonForHiraganaWithStyle customStylex hiragana =
      button (customStylex ++ [ onClick (ClickHiragana hiragana) ]) [ text hiragana ]
    in
    div []
        [ div [] (List.map (buttonForHiraganaWithStyle customStyle) hiraganaList)
        , div customStyle2 [ text model.output ]
        ]
