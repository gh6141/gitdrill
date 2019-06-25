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
         1-> "１　人では、食べたものは口、食道、（　　　　　　　　）という順番でからだのなかをとおる。"
         2-> "２　たべものにふくまれる（　　　　）は、だ液によってべつの物に変化（へんか）します"
         3-> "３　口からこう門までの食べ物の通り道（とおりみち）を（　　　　）といいます"
         4-> "４　食べ物が、だ液などで、からだに吸収しやすい養分に変えられることを（　　　　）といいます"
         5-> "５　だ液や胃液など食べ物を消化するはたらきをもつ液を（　　　　）といいます"
         6-> "６　酸素（さんそ）をとりいれ、二酸化炭素（にさんかたんそ）をだすことを（　　　）といいます"
         7-> "７　血液（けつえき）は、（　　　　）からおくりだされ、血管（けっかん）をとおって全身（ぜんしん）には運ばれます"
         8-> "８　血液は、血管のなかを流れ、全身（ぜんしん）をめぐりながら、（　　　　　　　）などを運ぶはたらきをしています"
         9-> "９　（　　　　）は、いらなくなったものを、血液のなかからとりのぞいて、にょうをつくります"
         _-> ""     

sentakushi: Int -> List String
sentakushi num = case num of
         0-> ["","",""]
         1-> ["胃（い）、大腸、小腸","大腸、胃、小腸","胃、小腸、大腸"]
         2-> ["でんぷん","さとう","水分（すいぶん）"]
         3-> ["気管（きかん）","消化管（しょうかかん）","食道（しょくどう）"]
         4-> ["消化（しょうか）","蓄積（ちくせき）","代謝（たいしゃ）"]
         5-> ["血液（けつえき）","酵素（こうそ）","消化液（しょうかえき）"]
         6-> ["呼吸（こきゅう）","光合成（こうごうせい）","吸収（きゅうしゅう）"]
         7-> ["かん臓","心臓（しんぞう）","肺（はい）"]
         8-> ["養分、酸素、窒素","養分、酸素、二酸化炭素","デンプン、酸素、二酸化炭素"]
         9-> ["小腸","心臓","じん臓"]
         _-> ["","",""]

kaito:Int -> Int
kaito num = case num of
         0-> 0
         1-> 2
         2-> 0
         3-> 1
         4-> 0
         5-> 2
         6-> 0
         7-> 1
         8-> 1
         9-> 2
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
    [ button [  Html.Attributes.style "font-size" "26pt", Html.Attributes.style "background-color" "green",onClick Decrement ] [ text "もどる" ], 
     button [ Html.Attributes.style "font-size" "26pt" ,Html.Attributes.style "background-color" "green", onClick Increment ] [ text "つぎへ" ]
    , div [ Html.Attributes.style "font-size" "30pt" ] [ text ( model.mondai) ]    
    , div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text (if model.maru then "〇正解！！" else "　　")]
    ] ++
      (model.ans |> List.indexedMap bt)
   )