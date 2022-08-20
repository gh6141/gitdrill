port module McsCom exposing (main)


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
        
type alias Match={approaching:String,approached:String,approved:Bool}
-- MODEL
type alias Model =
    { sendM:Match
    ,receiveM:Match
      ,selected : Maybe String
    , userState : UserState
    ,msg:String
    ,sendid:String
    ,receiveid:String
    ,buttonhyoji:Bool
 
    }
 
type UserState
    = Init
    | Waiting
    | Failed Http.Error

init : (String,String) -> ( Model, Cmd Msg )
init (sendid,receiveid) = ( Model {approaching="0",approached="0",approved=False}
                                   {approaching="0",approached="0",approved=False} Nothing Init "" sendid receiveid True
         ,Cmd.batch [ 
                Http.get
                 { url = "/accounts/community_exist/"++ (sendid) ++ "/" ++  (receiveid )
                  ,    expect= Http.expectString Receive2
                 }        
               ]    
    )


type Msg =   Send | Send2
    | Receive (Result Http.Error Match) 
    | Receive2 (Result Http.Error String) 

    | StartSound 


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg


update : Msg -> Model -> (Model,Cmd Msg)
update msg model=
  case msg of
    
    Send ->
            ( model
            , 
                 Http.get
                 { url = "/accounts/community_save/"++( model.sendid )++ "/" ++ ( model.receiveid )
                  ,    expect= Http.expectString Receive2
                 }        
                
            )

    Send2 ->
            ( model
            , 
                 Http.get
                 { url = "/accounts/community_delete/"++( model.sendid )++ "/" ++ ( model.receiveid )
                  ,    expect= Http.expectString Receive2
                 }        
                
            )

    Receive (Ok mch) ->
            ( { model |  msg = (model.receiveid)++"受け取り　hozon zumi==>jusin data=="++mch.approached
                   -- , url =  (Maybe.withDefault mdinit (List.head mondl)).url
           }
                   
            , Cmd.none )

    Receive (Err e) ->
            ( { model | userState = Failed e }, Cmd.none )


    Receive2 (Ok st) ->
            (
                let
                  bhyoji=if (String.contains "参加" st) then True else False

                in
                
                {model|
             msg=String.dropRight 1 (String.dropLeft 1 st)
             --msg=st
             ,buttonhyoji=bhyoji
             
             } 
              ,Cmd.none)
    Receive2 (Err e) ->
            ( { model | userState = Failed e ,msg="err recv2"}, Cmd.none )

            
    StartSound -> (model,startSound())   




-- VIEW

view : Model -> Html Msg
view model =
   let
    dmsg = case model.userState of
            --Init ->  [div [] [text model.msg]]
           -- Waiting ->  [div [] [text "waiting.."]]   
           -- Failed e -> [div [] [text (model.msg++(Debug.toString e))]]
           Init ->  model.msg
           Waiting ->  "waiting.."   
           Failed e -> (model.msg++(Debug.toString e))

    btn1=if model.buttonhyoji then
          button [ onClick Send,class "btn btn-primary" ]  [ text "参加" ]
         else
          button [ onClick Send2 ,class "btn btn-primary"]  [ text "退会" ]
   
    in     
 
         div [] (btn1::[text ("　"++dmsg)])
   
       
       


   -- DATA




--type alias Matchl=List Match


--Helpers

mDecoder : Decoder Match
mDecoder =
    Json.Decode.map3 Match
        (Json.Decode.field "approaching" Json.Decode.string)
        (Json.Decode.field "approached" Json.Decode.string)
        (Json.Decode.field "approved" Json.Decode.bool)







