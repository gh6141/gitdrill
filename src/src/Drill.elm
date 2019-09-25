module Main exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode  exposing (Decoder)


--import Markdown exposing (defaultOptions)



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
    { selected : String
    , input : String
    , userState : UserState
    , mdl:Mondl
    ,num:Int,mondai:String,ans:List String,ansn:Int,maru:Bool,url:String
    , marubatul:List MaruBatu
    }
 
type MaruBatu 
    = None | Maru | Batu

type UserState
    = Init
    | Waiting
    | Loaded Mondl
    | Failed Http.Error


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model "" "" Init [] -1 "" ["","",""] 0 False "" []
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
                   Nothing -> {model | mondai=hyoka model,ans=["","",""],ansn=0,url=""}
              
               )

seikairitu: Model -> String
seikairitu model =
 let
    kei=List.length model.marubatul
    seikai=List.length (List.filter (\bl->if bl==Maru then True else False) model.marubatul)
 in   
    (String.fromInt seikai)++"/"++(String.fromInt kei)

hyoka: Model -> String
hyoka model =
 let
    kei=List.length model.marubatul
    seikai=List.length (List.filter (\bl->if bl==Maru then True else False) model.marubatul)
 in   
    if kei==seikai && kei>0 then
     "全問正解！！すばらしい"
    else if (toFloat seikai+1)/(toFloat kei+1) > 0.7 then
     "よくできています。あと少しで全問正解です。"
    else 
     "繰り返すことで正答率がアップします。「読み出し」をクリックし再トライ！"
   


-- UPDATE

type Msg =  Increment | Decrement | Answer Int |Input String
    | Send
    | Receive (Result Http.Error Mondl) --(Result Http.Error String) 



update : Msg -> Model -> (Model,Cmd Msg)
update msg ({num,marubatul,selected} as model) =
  case msg of
   -- Select s ->  { model | selected = s }

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
      , mondai = (shutudai (num-1) model).mondai
      , ans = (shutudai (num-1) model).ans
      , ansn= (shutudai (num-1) model).ansn
      , maru=False
      , url= (shutudai (num-1) model).url
      }
      ,Cmd.none
      )
    Answer numi->
      (    
      {model | maru=(model.ansn==numi) ,marubatul= (
         let
             first2 : ( a, b ) -> a
             first2 ( value1, _ ) = value1
             second :(a,b)->b
             second(_,val)=val
             marubatult=List.indexedMap Tuple.pair marubatul
             marubatult2= List.map (
              \ xi -> 
              (case xi of
                (ci, None) -> (first2(xi),                           
                 if ci==num then
                  if model.ansn==numi then
                   Maru
                  else
                   Batu
                 else
                  None)
                (ci, Batu) -> (first2(xi),Batu)
                (ci, Maru) -> (first2(xi),Maru)
               )) marubatult
         in
           List.map (\ tp -> second(tp)) marubatult2
      
      )  
      }
      ,Cmd.none
      )
    Input newInput ->
            ( { model | input = newInput }, Cmd.none )

    Send ->
            ( { model
                |  userState = Waiting
              }
            , Http.get
                { url = "https://safe-wave-89074.herokuapp.com/disp2/"++model.input
                , expect = --Http.expectString Receive
                 Http.expectJson Receive mondlDecoder
                }
            )

    Receive (Ok mondl) ->
            ( { model | num=-1, userState = Loaded mondl, mdl=mondl,marubatul=List.repeat (List.length mondl) None }, Cmd.none )

    Receive (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )

-- VIEW

view : Model -> Html Msg
view model =
  let

    --selectEvent = on "change" (Html.map Select targetValue)

    dummy=["ion","shoka"]
    --textr raw=  Markdown.toHtmlWith {  defaultOptions | sanitize = False }  [] raw
    op dmy = List.map (\fname -> Html.option [value fname][text fname]) dmy
    bt numi xs = button [Html.Attributes.style "height" "80pt",Html.Attributes.style "font-size" "30pt",Html.Attributes.style "margin" "5pt", onClick (Answer numi) ] [ text xs]
  in
  
   div []
   ([
      Html.form [ onSubmit Send ]
            [

              select [ name "filelist"] (op dummy)
         

                
            , input
                [ onInput Input
                , autofocus True
                , placeholder "問題のファイル名を入力"
                , value model.input
                ]
                [text model.selected]
            , button
                [ disabled
                    ((model.userState == Waiting)
                        || String.isEmpty (String.trim model.input)
                    )
                ]
                [ text "出題" ]
            ]
        , case model.userState of
            Init ->
                text ""

            Waiting ->
                text "しばらくお待ちください..."

            Loaded mondl ->
                div [] [text(
                  case mondl of
                   mond::tail -> "問題の準備ができました。「次へ」をクリックしてください。"
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
    , div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text ( (seikairitu model)++(if model.maru then " 〇正解！！" else "　　") )]
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

