port module Gojuon exposing (main)

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
    , "わ", "を", "ん","　"
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
    = ClickHiragana String | Allplay | Allclear


-- モデル
type alias Model =
    { output : String
    }



init : () -> ( Model, Cmd Msg )
init _ = (   { output = "" } ,Cmd.none   )

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
           ( { mdl | output = mdl.output ++ h }, if h=="　" then speak(h) else Cmd.none)
        Allplay ->
           ( mdl,  speak(mdl.output))
        Allclear ->
            ( { mdl | output = "" }, Cmd.none)


-- ビュー
view : Model -> Html Msg
view model =
    let
     customStyle =
            [ style "font-size" "40px"
            , style "background-color" "#e6e6fa"
            ]

     customStyle2 =
            [ style "font-size" "40px"
            , style "background-color" "#00ff00"
            ]
    
     buttonForHiraganaWithStyle customStylex hiragana =
      button (customStylex ++ [ onClick (ClickHiragana hiragana) ]) [ text hiragana ]

     buttonCreate msg caption = div [style "font-size" "40px", style "background-color" "#0000ff",onClick msg ] [text caption]
    in
    div []
        [ div [] (List.map (buttonForHiraganaWithStyle customStyle) hiraganaList)
        , div customStyle2 [ text model.output ]
        , buttonCreate Allplay "ぜんぶ はなす"
        , buttonCreate Allclear "ぜんぶ けす"
        ]
