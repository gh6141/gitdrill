module Main exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode  exposing (Decoder)
import Markdown exposing (defaultOptions)


customDecoder : Decoder a -> (a -> Result String b) -> Decoder b
customDecoder d f =
    let
        resultDecoder x =
            case x of
                Ok a ->
                    Json.Decode.succeed a

                Err e ->
                    Json.Decode.fail e
    in
    Json.Decode.map f d |> Json.Decode.andThen resultDecoder

{-| String or empty target value.
-}
targetValueMaybe : Decoder (Maybe String)
targetValueMaybe =
    customDecoder targetValue
        (\s ->
            Ok <|
                if s == "" then
                    Nothing

                else
                    Just s
        )



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
    { flist: List String
    , selected : Maybe String
    , input : String
    , userState : UserState
    , mdl:Mondl
    ,num:Int,mondai:String,ans:List String,ansn:Int,maru:MaruBatu,url:String
    , marubatul:List MaruBatu
    , missl:List String
    ,user:String
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
    ( Model [] Nothing "" Init [] -1 "" ["","",""] 0 None "" [] [] ""
    
         , Http.get
                { url = "https://safe-wave-89074.herokuapp.com/list"
                , expect = Http.expectString Receive2
                 --Http.expectJson Receive mondlDecoder
                }
    
    )


shutudai: Int -> Model -> Model
shutudai num model=  case num of
         100 -> {model | mondai="**",ans=["","",""],ansn=0,url="",maru=None}
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
                    ,url=mond.url,maru=None}
                   Nothing -> {model | mondai=hyoka model,ans=["","",""],ansn=0,url="",maru=None}
              
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
     (
      if (List.length model.missl)>0  then
       "よくできています。あと少しで全問正解です。　<b>もう一度確認しよう↓<b><br>"++(String.join "<br>" (List.reverse model.missl))
      else
       "よくできています。あと少しで全問正解です。"
     )
    else 
     (
         if (List.length model.missl)>0 then
          "繰り返すことで正答率がアップします。「出題」をクリックし再トライ！ <b>再確認しよう↓<b><br>"++(String.join "<br>" (List.reverse model.missl))
         else
           "繰り返すことで正答率がアップします。「出題」をクリックし再トライ！ "
      )


-- UPDATE

type Msg =  Increment | Decrement | Answer Int |Input String
    | Send
    | Receive (Result Http.Error Mondl) 
    | Receive2 (Result Http.Error String) 
    | Select (Maybe String)
    | GotText (Result Http.Error String)



update : Msg -> Model -> (Model,Cmd Msg)
update msg ({num,marubatul,selected} as model) =
  case msg of
    Select s ->  ({ model | userState = Init ,selected = s, input=Maybe.withDefault "" s}, Cmd.none )

    Increment -> 
     (
      {model | num=num + 1 
      , mondai = (shutudai (num+1) model).mondai
      , ans = (shutudai (num+1) model).ans
      , ansn= (shutudai (num+1) model).ansn
      , maru=None
      , url = (shutudai (num+1) model).url
      }
      ,
        if (List.length model.mdl) <= model.num+1 then
            (  Http.post
                { 
                  -- url = "/hyoka"
                  url = "https://safe-wave-89074.herokuapp.com/hyoka"
                          --"http://192.168.1.103:8888/hyoka"
                  ,body= Http.multipartBody
                         [ Http.stringPart "hyoka" ((seikairitu model)++"\n"++(String.join "\n" (List.reverse model.missl)))
                          , Http.stringPart "fname"  ((Maybe.withDefault "" model.selected)++"_"++(model.user))]
                
                  ,expect=Http.expectString GotText
                }
             )  else 
              Cmd.none
     )

    Decrement ->
      (
      {model | num=num - 1
      , mondai = (shutudai (num-1) model).mondai
      , ans = (shutudai (num-1) model).ans
      , ansn= (shutudai (num-1) model).ansn
      , maru= None
      , url= (shutudai (num-1) model).url
      }
      ,
           Cmd.none

      )
    Answer numi->
      (    
      {model | maru=if (model.ansn==numi) then Maru else Batu ,marubatul= (
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
      ,missl=(
          let
            cl=(model.mondai++"<font color='green'>(正解："++(Maybe.withDefault "" (getAt model.ansn model.ans))++")</font>")
            btf =  not  (List.member cl model.missl)
              
          in                
          
           if model.ansn /= numi && btf then cl::model.missl else model.missl
      
      )}
      ,
       Cmd.none
    
      )
    Input newInput ->
            ( { model | user = newInput }, Cmd.none )

    Send ->
            ( { model
                |  userState = Waiting ,missl=[],maru=None
              }
            , Http.get
                { --url = "https://safe-wave-89074.herokuapp.com/disp2/"++model.input
                  url = "https://safe-wave-89074.herokuapp.com/disp2/"++(Maybe.withDefault "" model.selected)
                , expect = --Http.expectString Receive
                 Http.expectJson Receive mondlDecoder
                }
            )

    Receive (Ok mondl) ->
            ( { model | num=-1, userState = Loaded mondl, mdl=mondl,marubatul=List.repeat (List.length mondl) None ,maru=None}, Cmd.none )

    Receive (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
    
    Receive2 (Ok lst) ->
            ({model | flist ="select"::List.sort ( String.split "," lst ) ,maru=None } ,Cmd.none)
    Receive2 (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
    GotText result ->
      case result of
        Ok fullText ->
          ({model|userState=Init}, Cmd.none)

        Err e ->
          ({ model | userState = Failed e }, Cmd.none)

-- VIEW

view : Model -> Html Msg
view model =
  let

    selectEvent = on "change" (Json.Decode.map Select targetValueMaybe )

    --dummy=["ion","shoka"]
    textr raw=  Markdown.toHtmlWith {  defaultOptions | sanitize = False  }  [ ] raw
    op dmy = List.map (\fname -> Html.option [value fname][text fname]) model.flist
    bt numi xs =button [Html.Attributes.style "background-color" "whitesmoke",Html.Attributes.style "font-size" "30pt",Html.Attributes.style "height" "80pt",Html.Attributes.style "margin" "5pt",onClick (Answer numi) ] [ textr xs]
    --bt numi xs =textr xs
   --background-color:white;
  in
  
   div []
   ([
      Html.form [ onSubmit Send ]
            [
              select [selectEvent, name "filelist"] (op model.flist)
           -- , input
           --     [ onInput Input
           --     , autofocus True
           --     , placeholder "問題のファイル名を入力"
           --     , value model.input
                --,value (Maybe.withDefault "" model.selected)
           --     ]
           --     []
            , button
                [ disabled
                    ((model.userState == Waiting)
                        || String.isEmpty (String.trim model.input)
                    )
                ]
                [ text "出題"]
            , input [placeholder "User", onInput Input][]
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
    , div [ Html.Attributes.style "font-size" "30pt" ] [ textr ( model.mondai) ]

   ]
   ++(model.ans |> List.indexedMap bt)++
   [
     div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text ( (seikairitu model)++(if model.maru==Maru then " 〇正解！！" else if model.maru==Batu then "✖" else "") )]
    ] ++
    [
     (

     if model.url == "" || model.url=="http://"  then   
       div [] []
     else
       img [src model.url ] [] 

     )
    ]
      


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

