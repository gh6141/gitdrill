
import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }





-- MODEL

type alias Model = {num:Int,mondai:String,ans:List String,ansn:Int,maru:Bool}

init : Model
init = {num=0,mondai="",ans=["","",""],ansn=0,maru=False}



shutudai: Int -> String
shutudai num =  case num of
         0-> "＊＊"
         1-> "１　ものがもえつづけるには、たえず（　　　　　）がいれかわる必要（ひつよう）があります。"
         2-> "２　空気のなかで、いちばんたくさんある気体（きたい）は（　　　　　）です。"
         3-> "３　（　　　　）には、ものをもやすはたらきがあります"
         4-> "４　ちっ素や二酸化炭素には、ものをもやすはたらきは（　　　　　　　　）"
         5-> "５　ものがもえると、空気中の酸素（さんそ）の一部がつかわれて、（　　　　　　）ができます。"
         
         _-> ""     

sentakushi: Int -> List String
sentakushi num = case num of
         0-> ["","",""]
         1-> ["空気（くうき）","ちっ素","二酸化炭素（にさんかたんそ）"]
         2-> ["酸素（さんそ）","ちっ素","二酸化炭素（にさんかたんそ）"]
         3-> ["酸素（さんそ）","二酸化炭素（にさんかたんそ）","ちっ素"]
         4-> ["あります","ありません","あったり、なかったりします"]
         5-> ["酸素（さんそ）","二酸化炭素（にさんかたんそ）","ちっ素"]
         _-> ["","",""]

kaito:Int -> Int
kaito num = case num of
         0-> 0
         1-> 0
         2-> 1
         3-> 0
         4-> 0
         5-> 1

         _ -> 0


-- UPDATE

type Msg = Increment | Decrement | Answer Int

update : Msg -> Model -> Model
update msg ({num} as model) =
  case msg of
    Increment ->
      {model | num=num + 1 
      , mondai = shutudai (num+1)
      , ans = sentakushi (num+1)
      , ansn= kaito (num+1)
      , maru=False
      }

    Decrement ->
      {model | num=num - 1
      , mondai = shutudai (num-1)
      , ans =sentakushi (num-1)
      , ansn = kaito (num-1)
      , maru=False
      }

    Answer numi->
      {model | maru=(model.ansn==numi)
      }


-- VIEW

view : Model -> Html Msg
view model =
  let
    bt numi xs = button [Html.Attributes.style "font-size" "40pt",Html.Attributes.style "margin" "5pt", onClick (Answer numi) ] [ text xs]
  in
   div []
   (
    [ button [  Html.Attributes.style "font-size" "30pt", Html.Attributes.style "background-color" "green",onClick Decrement ] [ text "もどる" ], 
     button [ Html.Attributes.style "font-size" "30pt" ,Html.Attributes.style "background-color" "green", onClick Increment ] [ text "つぎへ" ]
    , div [ Html.Attributes.style "font-size" "40pt" ] [ text ( model.mondai) ]    
    , div [Html.Attributes.style "font-size" "40pt", Html.Attributes.style "color" "red"][text (if model.maru then "〇正解！！" else "　　")]
    ] ++
      (model.ans |> List.indexedMap bt)
   )
   
    