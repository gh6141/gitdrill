-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)


main =
  Browser.sandbox { init = init, update = update, view = view }

-- Data
data : List (String,String) 
data= [("ナトリウム原子","Na"),("水素原子","H"),("酸素原子","O"),("塩素原子","Cl"),("硫黄原子","S"),("鉄原子","Fe"),("アルミニウム原子","Al"),("銅原子","Cu"),("亜鉛原子","Zn"),("炭素原子","C"),("窒素原子","N"),("カリウム原子","K"),("カルシウム原子","Ca"),("バリウム原子","Ba"),("銀原子","Ag")]

--Func
getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing
    else
        List.head <| List.drop idx xs

fst:(String,String) -> String
fst tpl =
  let
    (fstx,_) = tpl
  in
    fstx

snd:(String,String) -> String
snd tpl =
  let
    (_,sndx) = tpl
  in
    sndx


-- MODEL

type MaruBatu = Maru | Batu | Mada 

type alias Model = {num:Int,name:String,siki:String,seikai:MaruBatu,sikil:List String}

init : Model
init = {num=0,name="",siki="",seikai=Mada,sikil=["","",""]}
  

-- UPDATE

type Msg = Increment | Decrement | B1 | B2 | B3

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      {model | num=model.num + 1 , name= fst (Maybe.withDefault ("","")  (getAt model.num data)  ) 
      ,siki=  snd (Maybe.withDefault ("","")  (getAt model.num data)  )
      ,sikil=[snd (Maybe.withDefault ("","")  (getAt 4 data)  ),snd (Maybe.withDefault ("","")  (getAt 5 data)  ),snd (Maybe.withDefault ("","")  (getAt model.num data)  )]
      }

    Decrement ->
      {model | num=model.num - 1 , name= fst (Maybe.withDefault ("","")  (getAt model.num data)  )
      , siki= snd (Maybe.withDefault ("","")  (getAt model.num data)  ) 
      }

    B1 ->
      {model|seikai=Maru}
    
    B2 ->
      {model|seikai=Maru}
    
    B3 ->
      {model|seikai=Maru}


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model.num) ]
    , button [ onClick Increment ] [ text "+" ]
    , div [Html.Attributes.style "font-size" "70pt"] [text model.name]
    , div [Html.Attributes.style "font-size" "100pt"] [text model.siki]
    , button [ Html.Attributes.style "font-size" "100pt",onClick B1 ] [ text (Maybe.withDefault "" (getAt 0 model.sikil)) ]
    , button [ Html.Attributes.style "font-size" "100pt",onClick B2 ] [ text (Maybe.withDefault "" (getAt 1 model.sikil)) ]
    , button [ Html.Attributes.style "font-size" "100pt",onClick B3 ] [ text (Maybe.withDefault "" (getAt 2 model.sikil)) ]
    ]