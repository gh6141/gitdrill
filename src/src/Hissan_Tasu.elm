import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Random
import Json.Decode as Json
import Task

-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }

-- MODEL

type alias Mondai =
 {
     sa:String
     ,sb:String
 }
 
type alias Model =
  { maru : Bool
  ,toi:Mondai
  }

 
init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,toi={sa="",sb=""} } , Cmd.none )


-- UPDATE


type Msg
  = Change String | NewAns Mondai | Btn String | Tasikame

btnLabel : Int -> String
btnLabel xi = case xi of
               13 -> "C"
               _  -> String.fromInt xi


update : Msg -> Model -> ( Model,Cmd Msg)
update msg model =
  let
   mhenkan :Int -> Int -> Mondai
   mhenkan i1 i2 = {sa=String.fromInt i1,sb=String.fromInt i2} 

   ansGenerator : Random.Generator Mondai
   
   ansGenerator = Random.map2  mhenkan (Random.int 10 99) (Random.int 10 99)


  in

  case msg of
    Change newContent ->

      ({ model | maru=False      

      }, Random.generate NewAns ansGenerator)
                                    --generate : (a -> msg) -> Generator a -> Cmd msg
    NewAns mnd ->

      ( {model | maru=False,toi=mnd

      },Cmd.none )

    Btn si ->

      (model ,Cmd.none)
    
    Tasikame ->
     ( model,Cmd.none)


toint st=  Maybe.withDefault 0 (String.toInt st) 

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none




-- VIEW


view : Model -> Html Msg
view model =

  let
        sbutton : Int -> Html Msg
        sbutton ii = (button [style "font-size" "30px"   ,onClick (Btn (btnLabel ii))] [ text (" "++(btnLabel ii)++" ")])

        sujibutton=
           table []
            [
             tr [] [
               td [] [sbutton 7]
               ,td [] [sbutton 8]
               ,td [] [sbutton 9]
             ]
             ,tr [] [
               td [] [sbutton 4]
               ,td [] [sbutton 5]
               ,td [] [sbutton 6]
             ]
             ,tr [] [
               td [] [sbutton 1]
               ,td [] [sbutton 2]
               ,td [] [sbutton 3]
               
             ]
             ,tr [] [
               td [] [sbutton 0]
                ,td [] [sbutton 13]
             ]
            
            ]

        smoji: String->String -> String -> Html Msg
        smoji xx yy sutxt =  div [style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" "120px"] [text sutxt] ]

        stxt xx yy sutxt= div [style "background-color" "lightblue",style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" "120px",style "color" (if sutxt=="?" then "red" else "black")] [text sutxt] ]        
  
        a10=model.sa
        a1=
        b10=
        b1=
  
  in

  div [style "position" "relative"]
    [   Html.img [src "py/hissan_tasu.jpg"][]
        ,smoji "300" "10" a10
        ,smoji "460" "10" a1
        ,smoji "300" "140" b10
        ,smoji "460" "140" b1

        ,stxt "300" "320" "5"
        ,stxt "460" "320" "?"
      
        ,div[style "position" "absolute", style "top" "30px", style "left" "700px"][sujibutton]
        ,div[style "position" "absolute", style "top" "300px", style "left" "750px"][button [ style "font-size" "30px",onClick Tasikame][text "たしかめ"]]
        ,div[style "position" "absolute", style "top" "370px", style "left" "750px"][button [ style "font-size" "30px",onClick (Change "")][text "つぎへ"]]


        ,div[style "position" "absolute", style "top" "180px", style "left" "250px",style "color" "red"][text "〇"]
        --point


   
      
    ]

    --     ****************:
lgetAt : Int -> List (List String) -> List String
lgetAt idx lst =Maybe.withDefault [] (getAt idx lst) 

sgetAt idx lst =Maybe.withDefault "" (getAt idx lst)

getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs