module Main exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode  exposing (Decoder)
import Markdown exposing (defaultOptions)
import Url
import Task
import Time exposing (Month(..), Posix, Weekday(..), Zone)
import Platform.Cmd

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN


urlEncode:Maybe String -> Maybe String
urlEncode ma =
    case ma of
     Nothing -> Just "" 
     Just a -> Just (Url.percentEncode a)

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
        , --subscriptions = \_ -> Sub.none
         subscriptions=subscriptions
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
    ,zone : Time.Zone
    ,posix : Time.Posix
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
    ( Model [] Nothing "" Init [] -1 "" ["","",""] 0 None "" [] [] ""  Time.utc (Time.millisToPosix 0 )
  
     ,Cmd.batch [ 
                Http.get
                 { --url = "https://safe-wave-89074.herokuapp.com/list"
                    url = "/list"
                 , expect = Http.expectString Receive2
                   --Http.expectJson Receive mondlDecoder
                 }
                , setSystemTime
               ]
    
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
    | SetSystemTime ( Time.Zone, Time.Posix )
    | SetCurrentTime Time.Posix




update : Msg -> Model -> (Model,Cmd Msg)
update msg ({num,marubatul,selected} as model) =
  case msg of
    Select s ->  ({ model |
     --userState = Init ,selected = s, input=Maybe.withDefault "" s
     userState = Waiting ,missl=[],maru=None, selected = s, input=Maybe.withDefault "" s
     
     }, 
     Http.post
                {
                  url = "/disp2/read"
                , body =  Http.stringBody "application/x-www-form-urlencoded"
                        (
                        --  "mondaimei="++ (Maybe.withDefault "" (urlEncode model.selected))
                         "mondaimei="++ (Maybe.withDefault "" (urlEncode s))
                        )
                , expect =  Http.expectJson Receive mondlDecoder
                }
    
    --Cmd.none
    
     )

    Increment -> 
     (
      {model | num=num + 1 
      , mondai = (shutudai (num+1) model).mondai
      , ans = (shutudai (num+1) model).ans
      , ansn= (shutudai (num+1) model).ansn
      , maru=None
      , url = (shutudai (num+1) model).url
        ,
             user=  
              let
                  year=Time.toYear model.zone model.posix
                --month=Time.toMonth model.zone model.posix
                  month = Time.toMonth model.zone model.posix |> toMonthNumber
                  day=Time.toDay model.zone model.posix
                  h = Time.toHour model.zone model.posix
                  m = Time.toMinute model.zone model.posix

              in
               (String.fromInt year)++"-"++month++"-"++(String.fromInt day)++"-"++(String.fromInt h) ++ ":" ++ (String.fromInt m)

      }
      ,
        if (List.length model.mdl) <= model.num+1 then
            (  Http.post
                { 
                  -- url = "/hyoka"
                  url = --"https://safe-wave-89074.herokuapp.com/hyoka"
                          "/hyoka"
                  ,body= Http.multipartBody
                         [ Http.stringPart "hyoka" ((seikairitu model)++"\n"++(String.join "\n" (List.reverse model.missl)))
                          , Http.stringPart "fname"  ((Maybe.withDefault "" (urlEncode model.selected))++"_"++(model.user))]
                
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
            , Http.post
                { --url = "/disp2/"++(Maybe.withDefault "" (urlEncode model.selected) )
                  url = "/disp2/read"
                  --url = "https://safe-wave-89074.herokuapp.com/disp2/"++(Maybe.withDefault "" model.selected)
                , body =  Http.stringBody "application/x-www-form-urlencoded"
                        (
                          "mondaimei="++ (Maybe.withDefault "" (urlEncode model.selected))
                        )
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

    SetSystemTime ( zone, time ) ->
            ( {model | zone = zone, posix = time   }, Cmd.none )

    SetCurrentTime time ->
            ( { model | posix = time }, Cmd.none )

-- VIEW

view : Model -> Html Msg
view model =
  let

    selectEvent = on "change" (Json.Decode.map Select targetValueMaybe )

    textr raw=  Markdown.toHtmlWith {  defaultOptions | sanitize = False  }  [ ] raw
    op dmy = List.map (\fname -> Html.option [value fname][text fname]) model.flist
    --bt numi xs =button [Html.Attributes.style "background-color" "whitesmoke",Html.Attributes.style "font-size" "24pt",Html.Attributes.style "height" "80pt",Html.Attributes.style "margin" "5pt",onClick (Answer numi) ] [ textr xs]
    bt numi xs =Button.button [Button.outlineSecondary, Button.attrs [onClick (Answer numi)] ] [ textr xs]

    gazo=  img [src model.url ] [] 
    
    hform =Html.form [ onSubmit Send ]
            [
              select [selectEvent, name "filelist"] (op model.flist)
              , input [placeholder "User", onInput Input,value model.user][]

            ]
    dmsg = case model.userState of
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
   
    --btn1=button [  Html.Attributes.style "font-size" "18pt", Html.Attributes.style "background-color" "green",onClick Decrement ] [ text "もどる" ]
    btn1=Button.button [Button.outlinePrimary ,Button.attrs [onClick Decrement]] [ text "もどる" ]
  
    --btn2=Button.button [ Html.Attributes.style "font-size" "18pt" ,Html.Attributes.style "background-color" "green", onClick Increment ] [ text "つぎへ" ]
    btn2=Button.button [Button.outlinePrimary ,Button.attrs [onClick Increment]] [text "つぎへ"]
      
       
    dmon=div [ Html.Attributes.style "font-size" "22pt" ] [ textr ( model.mondai) ]
    dansl=div [] (model.ans |> List.indexedMap bt)
    dhyoka= div [Html.Attributes.style "font-size" "22pt", Html.Attributes.style "color" "red"][text ( (seikairitu model)++(if model.maru==Maru then " 〇正解！！" else if model.maru==Batu then "✖" else "") )]
    
  

  in
      
      table [] [tr [] [
         td [Html.Attributes.style "valign" "top"] [div [] [
           CDN.stylesheet,
           hform,dmsg,btn1,btn2,dmon,dansl,dhyoka]] 
        ,td [] [
           if model.url /= "" && model.url /="http://"  then   
             gazo
           else
             div [] []
          ]
       ]]

     
      
   
          
        

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

setSystemTime : Cmd Msg
setSystemTime =
    Task.perform SetSystemTime <| Task.map2 Tuple.pair Time.here Time.now


toMonthNumber : Time.Month -> String
toMonthNumber month =
    case month of
        Jan ->            "1"
        Feb ->            "2"
        Mar ->            "3"
        Apr ->            "4"
        May ->            "5"
        Jun ->            "6"
        Jul ->            "7"
        Aug ->            "8"
        Sep ->            "9"
        Oct ->            "10"
        Nov ->            "11"
        Dec ->            "12"
   

subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every 60000 SetCurrentTime

