port module McsIine exposing (main)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode  exposing (Decoder)
import Json.Encode  exposing (..)
import Url

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Utilities.Spacing as Spacing

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row

urlEncode:Maybe String -> Maybe String
urlEncode ma =
    case ma of
     Nothing -> Just "" 
     Just a -> Just (Url.percentEncode a)


getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs

main : Program (String,String) Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
        
type alias Match={approaching:Int,approached:Int,approved:Bool,craated_at:String}
-- MODEL
type alias Model =
    { sendMlist:List Match
      ,receiveMlist:List Match
      ,selected : Maybe String
    , userState : UserState
    ,msg:String
    ,sendid:String
    ,receiveid:String
    }
 
type UserState
    = Init
    | Waiting
    | Loaded Matchl
    | Failed Http.Error

init : (String,String) -> ( Model, Cmd Msg )
init (sendid,receiveid) = ( Model [][] Nothing Init "" sendid receiveid 
         ,Cmd.batch [ 
                Http.get
                 { url = "/api/matching_new/"
                   -- url = "https://rasp.cld9.work/list"
                 , --expect = Http.expectString Receive2
                   expect= Http.expectJson Receive2 matchlDecoder
                 }
                ,Http.get
                 { url = "/api/matching_new/"
                   -- url = "https://rasp.cld9.work/list"
                 , --expect = Http.expectString Receive2
                   expect= Http.expectJson Receive3 matchlDecoder
                 }
               ]    
    )


type Msg =   Send
    | Receive (Result Http.Error String) 
    | Receive2 (Result Http.Error Matchl) 
    | Receive3 (Result Http.Error Matchl) 
    | StartSound 


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg


update : Msg -> Model -> (Model,Cmd Msg)
update msg model=
  case msg of
    
    Send ->
            ( model
            , Http.post
                { --url = "/disp2/"++(Maybe.withDefault "" (urlEncode model.selected) )
                  url = "/api/matching_new/"
                  --url = "https://safe-wave-89074.herokuapp.com/disp2/"++(Maybe.withDefault "" model.selected)
                , body =  Http.stringBody "application/json"    ( "data={approaching:"++model.sendid++",approached:"++  model.receiveid ++"}") 
        
               -- ,        body=        Http.jsonBody   (Json.Encode.object   [ ( "approaching", Json.Encode.string  model.sendid )  , ( "approached", Json.Encode.string model.receiveid ) ])
                , expect = Http.expectString Receive
         
                 --Http.expectJson Receive mondlDecoder
                }
            )

    Receive (Ok st) ->
            (  {model |msg=st}  , Cmd.none )

    Receive (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
    
    Receive2 (Ok matchl) ->
            ({model|sendMlist=matchl
             ,msg=(if ((Maybe.withDefault {approaching=0,approached=0,approved=False,craated_at=""} (List.head matchl)).approached)>0 
                  then "相手の方に「いいね」を送っています。" else "")} 
              ,Cmd.none)
    Receive2 (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
    Receive3 (Ok matchl) ->
            ({model|receiveMlist=matchl
             ,msg=(if ((Maybe.withDefault {approaching=0,approached=0,approved=False,craated_at=""} (List.head matchl)).approached)>0 
                   then "相手の方から「いいね」を受け取っています。" else "")} ,Cmd.none)
    Receive3 (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )
            
    StartSound -> (model,startSound())   


-- VIEW

view : Model -> Html Msg
view model =
   let
    dmsg = case model.userState of
           -- Init ->  [div [] [text ""]]
            Init ->  [div [] [text (model.msg++" state："++model.sendid++model.receiveid)]]
            Waiting ->  [div [] [text "waiting.."]]
            Loaded mondl ->
               ( case mondl of
                   mond::tail -> [div [] [text "ok"]]
                   _ -> [div [] [text "error"]]  )     
            Failed e -> [div [] [text (Debug.toString e)]]

    btn1=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Send]] [ text "いいね" ]
    in     
    Grid.container [Spacing.mt4Md]
    [ CDN.stylesheet 
      ,Grid.row 
        [Row.middleMd]
        [Grid.col
          [Col.md11]
          (btn1::dmsg)
        ]            
    ]

   -- DATA




type alias Matchl=List Match
matchDecoder : Decoder Match
matchDecoder =
    Json.Decode.map4 Match
        (Json.Decode.field "approaching" Json.Decode.int)
        (Json.Decode.field "approached" Json.Decode.int)
        (Json.Decode.field "approved" Json.Decode.bool)
        (Json.Decode.field "created_at" Json.Decode.string)

matchlDecoder=Json.Decode.list matchDecoder

   


