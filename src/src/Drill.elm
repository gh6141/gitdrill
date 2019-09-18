module Main exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode  exposing (Decoder)


getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
        

-- MODEL
type alias Model =
    { input : String
    , userState : UserState
    , mdl:Mondl
    ,num:Int,mondai:String,ans:List String,ansn:Int,maru:Bool,url:String
    }

type UserState
    = Init
    | Waiting
    | Loaded Mondl
    | Failed Http.Error


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model "" Init [] -1 "" ["","",""] 0 False ""
    , Cmd.none
    )


shutudai: Int -> Model -> Model
shutudai num model=  case num of
         100 -> {model | mondai="**",ans=["","",""],ansn=0,url=""}
         _-> (
              let
                  mondl=model.mdl           

              in
                case getAt num mondl of
                   Just mond -> 
                    {model | mondai=mond.mondai
                    ,ans=[mond.ans1,mond.ans2,mond.ans3]
                    ,ansn=(
                      case  String.toInt mond.ansn of
                       Just  ani ->  ani-1
                       Nothing -> 0
                        )
                    ,url=mond.url}
                   Nothing -> {model | mondai="**",ans=["","",""],ansn=0,url=""}
              
               )




-- UPDATE

type Msg = Increment | Decrement | Answer Int |Input String
    | Send
    | Receive (Result Http.Error Mondl) --(Result Http.Error String) 



update : Msg -> Model -> (Model,Cmd Msg)
update msg ({num} as model) =
  case msg of
    Increment -> 
     (
      {model | num=num + 1 
      , mondai = (shutudai (num+1) model).mondai
      , ans = (shutudai (num+1) model).ans
      , ansn= (shutudai (num+1) model).ansn
      , maru=False
      , url = (shutudai (num+1) model).url
      }
      ,Cmd.none
     )

    Decrement ->
      (
      {model | num=num - 1
      , mondai = (shutudai (num+1) model).mondai
      , ans = (shutudai (num+1) model).ans
      , ansn= (shutudai (num+1) model).ansn
      , maru=False
      , url= (shutudai (num+1) model).url
      }
      ,Cmd.none
      )
    Answer numi->
      (    
      {model | maru=(model.ansn==numi)
      }
      ,Cmd.none
      )
    Input newInput ->
            ( { model | input = newInput }, Cmd.none )

    Send ->
            ( { model
                | input = ""
                , userState = Waiting
              }
            , Http.get
                { url = "https://safe-wave-89074.herokuapp.com/disp2/"++model.input
                , expect = --Http.expectString Receive
                 Http.expectJson Receive mondlDecoder
                }
            )

    Receive (Ok mondl) ->
            ( { model | userState = Loaded mondl, mdl=mondl}, Cmd.none )

    Receive (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )

-- VIEW

view : Model -> Html Msg
view model =
  let
    
    

    bt numi xs = button [Html.Attributes.style "font-size" "40pt",Html.Attributes.style "margin" "5pt", onClick (Answer numi) ] [ text xs]
  in
  
   div []
   ([
      Html.form [ onSubmit Send ]
            [ input
                [ onInput Input
                , autofocus True
                , placeholder "File Name?"
                , value model.input
                ]
                []
            , button
                [ disabled
                    ((model.userState == Waiting)
                        || String.isEmpty (String.trim model.input)
                    )
                ]
                [ text "Submit" ]
            ]
        , case model.userState of
            Init ->
                text ""

            Waiting ->
                text "Waiting..."

            Loaded mondl ->
                div [] [text(
                  case mondl of
                   mond::tail -> "最初の問題:"++mond.mondai
                   _ -> "error"

                )]

            Failed e ->
                div [] [ text (Debug.toString e) ]
   
     
    ,button [  Html.Attributes.style "font-size" "26pt", Html.Attributes.style "background-color" "green",onClick Decrement ] [ text "もどる" ]
    ,button [ Html.Attributes.style "font-size" "26pt" ,Html.Attributes.style "background-color" "green", onClick Increment ] [ text "つぎへ" ]
    , div [ Html.Attributes.style "font-size" "30pt" ] [ text ( model.mondai) ]
    , (
     if model.url == "" || model.url=="http://"  then   
       div [] []
     else
       img [src model.url ,width 200 , height 150] [] 
    )
    , div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text (if model.maru then "〇正解！！" else "　　")]
    ] ++
      (model.ans |> List.indexedMap bt)
    )   
   
          
        

   -- DATA
type alias Mond ={mondai:String,ans1:String,ans2:String,ans3:String,ansn:String,url:String}

type alias Mondl = List Mond

mondDecoder : Decoder Mond
mondDecoder =
    Json.Decode.map6 Mond
        (Json.Decode.field "mondai" Json.Decode.string)
        (Json.Decode.field "ans1" Json.Decode.string)
        (Json.Decode.field "ans2" Json.Decode.string)
        (Json.Decode.field "ans3" Json.Decode.string)
        (Json.Decode.field "ansn" Json.Decode.string)
        (Json.Decode.field "url" Json.Decode.string)


mondlDecoder : Decoder Mondl
mondlDecoder = Json.Decode.list mondDecoder

