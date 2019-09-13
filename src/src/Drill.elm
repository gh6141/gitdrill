module Main exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder)


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
    ,num:Int,mondai:String,ans:List String,ansn:Int,maru:Bool,url:String
    }

type UserState
    = Init
    | Waiting
    | Loaded Mondl
    | Failed Http.Error


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model "" Init 0 "" ["","",""] 0 False ""
    , Cmd.none
    )


shutudai: Int -> Model -> Model
shutudai num model=  case num of
         0-> {model | mondai="**",ans=["","",""],ansn=0,url=""}
         1-> {model | mondai="１　細胞分裂のときに核の中にあらわれるひも状のものは何か"
              ,ans=["染色体","ミトコンドリア","細胞質"]
              ,ansn=0
              ,url=""}
         2-> {model | mondai="２　植物で細胞分裂のさかんなところはどこか"
              ,ans=["表皮","茎の中心","根の先端"]
              ,ansn=2
              ,url=""}
         3-> {model | mondai="３　酢酸オルセイン溶液は何を染める染色液"
              ,ans=["染色体","細胞壁","葉緑体"]
              ,ansn=0
              ,url=""}
                                                      
         _-> {model | mondai="",ans= ["","",""],ansn=0,url=""}




-- UPDATE

type Msg = Increment | Decrement | Answer Int |Input String
    | Send
    | Receive (Result Http.Error Mondl)



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
                { url = "http://101.128.234.240:8888/disp2/" ++ model.input
                , expect = Http.expectJson Receive userDecoder
                }
            )

    Receive (Ok mondl) ->
            ( { model | userState = Loaded mondl }, Cmd.none )

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
                , placeholder "GitHub name"
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
                a
                    [ href mondl.name
                    , target "_blank"
                    ]
                    [ img [ src mondl.name, width 200 ] []
                   
                    ]

            Failed e ->
                div [] [ text (Debug.toString e) ]
   
     
    ,button [  Html.Attributes.style "font-size" "26pt", Html.Attributes.style "background-color" "green",onClick Decrement ] [ text "もどる" ]
    ,button [ Html.Attributes.style "font-size" "26pt" ,Html.Attributes.style "background-color" "green", onClick Increment ] [ text "つぎへ" ]
    , div [ Html.Attributes.style "font-size" "30pt" ] [ text ( model.mondai) ]
    , (
     if model.url == ""   then   
       div [] []
     else
       img [src model.url ,width 200 , height 150] [] 
    )
    , div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text (if model.maru then "〇正解！！" else "　　")]
    ] ++
      (model.ans |> List.indexedMap bt)
    )   
   
          
        

   -- DATA
type alias Mond ={mondai:String,ans:List String,ansn:Int,url:String}


type alias Mondl =
    { name : String
      , mondl: List Mond
    }


userDecoder : Decoder Mondl
userDecoder =
    Json.Decode.map2 Mondl
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "mondl" Json.Decode.mondl)


