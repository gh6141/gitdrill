port module AudioP exposing (main)

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
import Bootstrap.Utilities.Spacing as Spacing

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Form as Form

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
    ,msg:String
    
    }
 
type MaruBatu 
    = None | Maru | Batu

type UserState
    = Init
    | Waiting
    | Loaded Mondl
    | Failed Http.Error
    | Hyoka

minit: Model
minit =Model [] Nothing "" Init [] -1 "" ["","",""] 0 None "" [] [] ""  Time.utc (Time.millisToPosix 0 )  ""

init : () -> ( Model, Cmd Msg )
init _ = ( minit 
         ,Cmd.batch [ 
                Http.get
                 { --url = "https://safe-wave-89074.herokuapp.com/list"
                    url = "https://rasp.cld9.work/list"
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
                   Nothing -> {model | mondai=(hyoka model)++"<a href='https://rasp.cld9.work/py/Dlabo_Youtube.mp4'>動画をみよう</a>",ans=["","",""],ansn=0,url="",maru=None}
              
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
     "ぜんもんせいかい！！すばらしい"
    else if (toFloat seikai+1)/(toFloat kei+1) > 0.7 then
     (
      if (List.length model.missl)>0  then
       "よくできています。あと少しでぜんぶできますね。　<b>もういっかいやってみよう↓<b><br>"++(String.join "<br>" (List.reverse model.missl))
      else
       "よくできています。あとすこしです。"
     )
    else 
     (
         if (List.length model.missl)>0 then
          "またやてみよう！ <b>たしかめてね↓<b><br>"++(String.join "<br>" (List.reverse model.missl))
         else
           "もういっかいやってみよう！ "
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
    | Message String
    | StartSound |StartSound2


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg
port startSound2: () -> Cmd msg




update : Msg -> Model -> (Model,Cmd Msg)
update msg ({num,marubatul,selected} as model) =
  case msg of
    Select s ->  ({ model |
     --userState = Init ,selected = s, input=Maybe.withDefault "" s
     userState = Waiting ,missl=[],maru=None, selected = s, input=Maybe.withDefault "" s
     
     }, 
     Http.post
                {
                  url = "https://rasp.cld9.work/disp2/read"
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
                          "https://rasp.cld9.work/hyoka"
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
            cl=(model.mondai++"<font color='green'>(いいね！："++(Maybe.withDefault "" (getAt model.ansn model.ans))++")</font>")
            btf =  not  (List.member cl model.missl)
              
          in                
          
           if model.ansn /= numi && btf then cl::model.missl else model.missl
      
      )}
      ,
       --Cmd.none
       (if (model.ansn==numi) then (startSound()) else (startSound2()))
    
      )
    Input newInput ->
            ( { model | user = newInput }, Cmd.none )

    Send ->
            ( { model
                |  userState = Waiting ,missl=[],maru=None
              }
            , Http.post
                { --url = "/disp2/"++(Maybe.withDefault "" (urlEncode model.selected) )
                  url = "https://rasp.cld9.work/disp2/read"
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
            ( { model | num=0,  userState = Loaded mondl, mdl=mondl,marubatul=List.repeat (List.length mondl) None ,maru=None
                    , mondai = (Maybe.withDefault mdinit (List.head mondl)).mondai
                    , ans =  [(Maybe.withDefault mdinit (List.head mondl)).ans1,
                              (Maybe.withDefault mdinit (List.head mondl)).ans2,
                              (Maybe.withDefault mdinit (List.head mondl)).ans3
                              ]
                    , ansn= ( Maybe.withDefault  0 ( String.toInt (Maybe.withDefault mdinit (List.head mondl)).ansn ) )-1
                    , url =  (Maybe.withDefault mdinit (List.head mondl)).url
           }
                   
            , Cmd.none )

    Receive (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
    
    Receive2 (Ok lst) ->
            ({model | flist ="select"::List.sort ( String.split "," lst ) ,maru=None } ,Cmd.none)
    Receive2 (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
    GotText result ->
      case result of
        Ok fullText ->
          ({model|userState=Hyoka}, Cmd.none)

        Err e ->
          ({ model | userState = Failed e }, Cmd.none)

    SetSystemTime ( zone, time ) ->
            ( {model | zone = zone, posix = time   }, Cmd.none )

    SetCurrentTime time ->
            ( { model | posix = time }, Cmd.none )

    Message str -> ({model|msg = str },Cmd.none)
    StartSound -> (model,startSound())
    StartSound2 -> (model,startSound2())


-- VIEW

view : Model -> Html Msg
view model =
  let

    selectEvent = on "change" (Json.Decode.map Select targetValueMaybe )

    textr raw=  Markdown.toHtmlWith {  defaultOptions | sanitize = False  }  [ ] raw
    op dmy = List.map (\fname -> Html.option [value fname][text fname]) model.flist
    --bt numi xs =button [Html.Attributes.style "background-color" "whitesmoke",Html.Attributes.style "font-size" "24pt",Html.Attributes.style "height" "80pt",Html.Attributes.style "margin" "5pt",onClick (Answer numi) ] [ textr xs]
    bt numi xs =Button.button [Button.large ,Button.outlinePrimary, Button.attrs [Spacing.m1 ,onClick (Answer numi)] ] [ textr xs]

    gazo=  img [src model.url ] [] 
    
    btn1=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Decrement]] [ text "もどる" ]
    btn2=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Increment]] [text "つぎへ"]
     

    hform =Form.form [ onSubmit Send ]
            [
              select [selectEvent, name "filelist",Spacing.m1] (op model.flist)
              , input [placeholder "User", onInput Input,value model.user,Spacing.m1][]
            ]
    dmsg = case model.userState of
           -- Init ->  [div [] [text ""]]
            Init ->  [div [] [text "もんだいをえらんでね"]]
            Waiting ->  [div [] [text "ちょっとまってね..."]]
            Loaded mondl ->
               ( case mondl of
                   mond::tail -> [dmon,dansl]
                   _ -> [div [] [text "error"]]  )     
            Failed e -> [div [] [text (Debug.toString e)]]
            Hyoka -> [dmon]

  
    dmon=div [ Html.Attributes.style "font-size" "22pt" ] [ textr ( model.mondai) ]
    dansl=div [] (model.ans |> List.indexedMap bt)
    dhyoka= div [Html.Attributes.style "font-size" "22pt", Html.Attributes.style "color" "red"][text ( (seikairitu model)++(if model.maru==Maru then " 〇正解！！" else if model.maru==Batu then "✖" else "") )]
    
  

  in
      

    Grid.container [Spacing.mt4Md]
    [ CDN.stylesheet 
      ,Grid.row 
        [Row.middleMd]
        [Grid.col
          [Col.md11]
          [div[] [hform,btn1,btn2,dhyoka]]
        ]
      
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            [ Col.md7 ]
            [ (div [] dmsg) ]
        , Grid.col
            [ Col.md4 ]
            [  if model.url /= "" && model.url /="http://"  then   
               gazo
             else
               div [] []  ]
        ]
    
    ]


     
      
   
          
        

   -- DATA
type alias Mond ={mondai:String,ans1:String,ans2:String,ans3:String,ansn:String,url:String}

mdinit:Mond
mdinit=Mond "" "" "" "" "" ""

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

