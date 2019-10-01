-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..)
import Random exposing (Seed, int, step,initialSeed)

shuffleList : Seed -> List a -> List a
shuffleList seed list =
    shuffleListHelper seed list []


shuffleListHelper : Seed -> List a -> List a -> List a
shuffleListHelper seed source result =
    if List.isEmpty source then
        result
    else
        let
            indexGenerator =
                int 0 ((List.length source) - 1)

            ( index, nextSeed ) =
                step indexGenerator seed

            valAtIndex =
                getAt index source

            sourceWithoutIndex =
                removeAt index source
        in
            case valAtIndex of
                Just val ->
                    shuffleListHelper nextSeed sourceWithoutIndex (val :: result)

                Nothing ->
                    []



main =
  Browser.sandbox { init = init, update = update, view = view }

-- Data
data : List (String,String) 
data= [("O2","酸素"),("H2","水素"),("CO2","二酸化炭素"),("H2O","水"),("NaCl","塩化ナトリウム"),("CuO","酸化銅"),("Ag2O","酸化銀"),("MgO","酸化マグネシウム"),("NaHCO3","炭酸水素ナトリウム")]

--Func
getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing
    else
        List.head <| List.drop idx xs

removeAt : Int -> List a -> List a
removeAt index l =
    if index < 0 then
        l

    else
        let
            head =
                List.take index l

            tail =
                List.drop index l |> List.tail
        in
        case tail of
            Nothing ->
                l

            Just t ->
                List.append head t


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

type alias Model = {num:Int,name:String,siki:String,seikai:MaruBatu,sikil:List String, marukei:Int}

init : Model
init = {num=0,name="",siki="",seikai=Mada,sikil=["","",""],marukei=0}
  

-- UPDATE

type Msg = Increment | Decrement | B1 | B2 | B3

update : Msg -> Model -> Model
update msg model =
 let
     yoso idx = snd (Maybe.withDefault ("","")  (getAt idx data))
 in
 
  case msg of
    Increment ->
      {model | seikai=Mada
      , num=if model.num==(List.length data) then 0 else model.num+1, name= fst (Maybe.withDefault ("","")  (getAt model.num data)  ) 
      ,siki=  snd (Maybe.withDefault ("","")  (getAt model.num data)  )
      ,sikil= shuffleList (Random.initialSeed model.num) [yoso (Basics.modBy  (List.length data) (model.num + 1) )  ,yoso (Basics.modBy   (List.length data) (model.num+2)) , yoso model.num] }

    Decrement ->
      {model | num=model.num - 1 , name= fst (Maybe.withDefault ("","")  (getAt model.num data)  )
      , siki= snd (Maybe.withDefault ("","")  (getAt model.num data)  ) 
      }

    B1 ->
      {model|seikai=if (Maybe.withDefault "" (getAt 0 model.sikil))== model.siki then Maru else Batu,marukei=if (Maybe.withDefault "" (getAt 0 model.sikil))== model.siki  then model.marukei+1 else model.marukei}
    
    B2 ->
      {model|seikai=if (Maybe.withDefault "" (getAt 1 model.sikil))== model.siki then Maru else Batu ,marukei=if (Maybe.withDefault "" (getAt 1 model.sikil))== model.siki  then model.marukei+1 else model.marukei}
    
    B3 ->
      {model|seikai=if (Maybe.withDefault "" (getAt 2 model.sikil))== model.siki then Maru else Batu ,marukei=if (Maybe.withDefault "" (getAt 2 model.sikil))== model.siki  then model.marukei+1 else model.marukei}


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [ --button [Html.Attributes.style "font-size" "30pt", onClick Decrement ] [ text "もどる" ],
     div [] [ text (String.fromInt model.num) ]
    , button [ Html.Attributes.style "font-size" "30pt",onClick Increment ] [ text "つぎへ" ]
    , div [Html.Attributes.style "font-size" "60pt"] [text model.name]
    --, div [Html.Attributes.style "font-size" "80pt"] [text model.siki]
    , button [ Html.Attributes.style "margin" "5pt",Html.Attributes.style "font-size" "100pt",onClick B1 ] [ text (Maybe.withDefault "" (getAt 0 model.sikil)) ]
    , button [ Html.Attributes.style "margin" "5pt",Html.Attributes.style "font-size" "100pt",onClick B2 ] [ text (Maybe.withDefault "" (getAt 1 model.sikil)) ]
    , button [ Html.Attributes.style "margin" "5pt",Html.Attributes.style "font-size" "100pt",onClick B3 ] [ text (Maybe.withDefault "" (getAt 2 model.sikil)) ]
    ,div [ Html.Attributes.style "font-size" "40pt" , Html.Attributes.style "color" "red"] [ text ( (String.fromInt model.marukei)++"/"++(String.fromInt (List.length data))++" "++(if model.seikai==Maru then "〇" else if model.seikai==Batu  then "✖" else "") )]
    ]