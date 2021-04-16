module Nijo exposing (main)

import Browser
import Draggable
import Draggable.Events exposing (onClick, onDragBy, onDragStart)
import Html exposing (Html,button,select)
import Html.Attributes exposing(selected,value)
import Math.Vector2 as Vector2 exposing (Vec2, getX, getY)
import Svg exposing (..)
import Svg.Attributes as Attr exposing(strokeWidth)
import Svg.Events exposing (onMouseUp,on)
import Html.Events exposing (onClick,on)
import Svg.Keyed
import Svg.Lazy exposing (lazy)


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model = Int


init : Model
init =
  0



-- UPDATE


type Msg
  = Increment
  | Decrement


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    , svg
    [ viewBox "0 0 400 400"
    , width "400"
    , height "400"
    ]
    [ circle
        [ cx "50"
        , cy "50"
        , r "40"
        , fill "red"
        , stroke "black"
        , strokeWidth "3"
        ]
        []
    
    ]
    ]


 