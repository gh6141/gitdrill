module BasicExample exposing (main)

import Browser
import Draggable
import Html exposing (Html)
import Html.Attributes as A


type alias Position =
    { x : Float
    , y : Float
    }


type alias Model =
    { xy : Position
    , drag : Draggable.State ()
    , xy2 : Position
    , drag2 : Draggable.State ()
    }


type Msg
    = OnDragBy Draggable.Delta
    | OnDragBy2 Draggable.Delta
    | DragMsg (Draggable.Msg ())
    | DragMsg2 (Draggable.Msg ())


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : flags -> ( Model, Cmd Msg )
init _ =
    ( { xy = Position 32 32, xy2 = Position 50 50 ,drag = Draggable.init ,drag2 =Draggable.init}
    , Cmd.none
    )


dragConfig : Draggable.Config () Msg
dragConfig =
    Draggable.basicConfig OnDragBy

dragConfig2 : Draggable.Config () Msg
dragConfig2 =
    Draggable.basicConfig OnDragBy2


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ xy,xy2 } as model) =
    case msg of
        OnDragBy ( dx, dy ) ->
            ( { model | xy = Position (xy.x + dx) (xy.y + dy)  }
            , Cmd.none
            )

        OnDragBy2 ( dx, dy ) ->
            ( { model | xy2 = Position (xy2.x + dx) (xy2.y + dy)  }
            , Cmd.none
            )

        DragMsg dragMsg ->
            Draggable.update dragConfig dragMsg { model | xy = Position (xy.x ) (xy.y)  }

        DragMsg2 dragMsg2 ->
            Draggable.update dragConfig2 dragMsg2 { model | xy2 = Position (xy2.x ) (xy2.y )  }


subscriptions : Model -> Sub Msg
subscriptions { drag,drag2 } =
   Sub.batch
        [Draggable.subscriptions DragMsg drag
        , Draggable.subscriptions DragMsg2 drag2
        ]

    


view : Model -> Html Msg
view { xy,xy2 } =
    let
        translate1 =
            "translate(" ++ String.fromFloat xy.x ++ "px, " ++ String.fromFloat xy.y ++ "px)"

        translate2 =
    
            "translate(" ++ String.fromFloat xy2.x ++ "px, " ++ String.fromFloat xy2.y ++ "px)"
    in
    Html.div
    []

    [
        Html.div
        ([ A.style "transform" translate1
         , A.style "padding" "16px"
         , A.style "background-color" "lightgray"
         , A.style "width" "64px"
         , A.style "cursor" "move"
         , Draggable.mouseTrigger () DragMsg
         ]
            ++ Draggable.touchTriggers () DragMsg
        )
        [ Html.text "Drag me" ]
    ,
     Html.div
        ([ A.style "transform" translate2
         , A.style "padding" "16px"
         , A.style "background-color" "lightgray"
         , A.style "width" "64px"
         , A.style "cursor" "move"
         , Draggable.mouseTrigger () DragMsg2
         ]
            ++ Draggable.touchTriggers () DragMsg2
        )
        [ Html.text "Drag me" ]
    ]