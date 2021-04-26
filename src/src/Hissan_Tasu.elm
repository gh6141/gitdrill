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
   ,in10:String
   ,in1:String
   ,in10k :String
   ,cur:Int
   
  }

 
init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,toi={sa="11",sb="11"},in10="",in1="?" ,in10k="",cur=1} , Cmd.none )


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
   ansGenerator = Random.map2  mhenkan (Random.int 1 99) (Random.int 1 99)


  in

  case msg of
    Change newContent ->

      ({ model | maru=False      

      }, Random.generate NewAns ansGenerator)
                                    --generate : (a -> msg) -> Generator a -> Cmd msg
    NewAns mnd ->

      ( {model | maru=False,toi=mnd ,cur =1,in1="?",in10=""

        },if ((toint mnd.sa) + (toint mnd.sb))>99 then (Random.generate NewAns ansGenerator) else  Cmd.none )
       --  }, Cmd.none )

    Btn si -> 
     let
        --１の位が正しいか判別
        kurai1=(si==String.right 1 (String.fromInt ((toint model.toi.sa)+(toint model.toi.sb)  )  ))   
        --次の入力を促す位置     
        next_cur=  if kurai1 then 2 else ( if model.cur==2 then 2 else 1)
        in1x=if model.cur==1 then si else model.in1 
        in10x=if (model.cur==1&&next_cur==2) then "?" else (if model.cur==2 then si else model.in10)
        
        kuriagari=  ((toint (String.right 1 model.toi.sa))+(toint (String.right 1 model.toi.sb))  ) >9

        in10kx=if (kurai1 && kuriagari) then "1" else ""
        
        
     in


      ({model| in1=in1x
               ,in10=in10x
               ,in10k=in10kx
               ,cur = next_cur
               ,maru=((toint model.toi.sa)+(toint model.toi.sb))
                      ==
                     ( (toint in10x)*10 + (toint in1x))
                      
              } ,Cmd.none)
    
    Tasikame ->
     ( { model| maru=
      ( ((toint model.toi.sa)+(toint model.toi.sb))
       ==
       ( (toint model.in10)*10 + (toint model.in1))
        ) },Cmd.none)


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

        stxt xx yy sutxt sizef= div [style "background-color" "lightblue",style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" (sizef++"px"),style "color" (if sutxt=="?" then "red" else "black")] [text sutxt] ]        
  
        a10=String.slice -2 -1 ("0"++model.toi.sa)
        a10x=if a10=="0" then "" else a10
        a1=String.right 1 ("0"++model.toi.sa)
        b10=String.slice -2 -1 ("0"++model.toi.sb)
        b10x=if b10 =="0" then "" else b10
        b1=String.right 1 ("0"++model.toi.sb)
  
  in

  div [style "position" "relative"]
    [   Html.img [src "py/hissan_tasu.jpg"][]
        ,smoji "300" "10" a10x
        ,smoji "460" "10" a1
        ,smoji "300" "140" b10x
        ,smoji "460" "140" b1

        ,stxt "300" "320" model.in10 "120"
        ,stxt "460" "320" model.in1 "120"
        ,stxt "370" "1" model.in10k "50"
      
        ,div[style "position" "absolute", style "top" "30px", style "left" "700px"][sujibutton]
        --,div[style "position" "absolute", style "top" "300px", style "left" "750px"][button [ style "font-size" "30px",onClick Tasikame][text "たしかめ"]]
        ,div[style "position" "absolute", style "top" "370px", style "left" "750px"][button [ style "font-size" "30px",onClick (Change "")][text "つぎへ"]]
        ,div[style "position" "absolute", style "top" "180px", style "left" "250px",style "color" "red",style "font-size" "100px"][text (if model.maru then "〇" else "")]
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