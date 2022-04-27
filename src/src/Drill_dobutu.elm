module Drill_dobutu exposing (..)
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
         1-> "１　核を染める染色液はどれか"
         2-> "２　おもに植物の細胞にだけあるつくりはどれか"
         3-> "３　糖をしらべるための薬品はどれか"
         4-> "４　だ液に含まれる消化酵素はどれか"
         5-> "５　胃液に含まれる消化酵素はどれか"
         6-> "６　胆汁はどの器官でつくられるか"
         7-> "７　デンプンが消化されて、最終的に吸収されるとき何という物質になるか"
         8-> "８　タンパク質が消化されて、最終的に何という物質になるか"
         9-> "９　脂肪を分解する消化酵素はどれか"
         10-> "10 デンプンを分解する消化酵素はどれか"
         11-> "11 小腸の壁のひだの表面にある小さい突起はどれか"
         12-> "12　ブドウ糖とアミノ酸は小腸で吸収されたあとどの器官に運ばれるか"
         13-> "13 有害なものを無害に変える器官はどれか"
         14-> "14　栄養分を貯えたり、他の物質に変えたりする器官はどれか"
         15-> "15 酸素を運ぶ役割の血液の成分は何か"
         16-> "16 体内に入ったウイルスや細菌などを分解する役割の血液の成分は何か"
         17-> "17　組織液とは（　　）が毛細血管の壁からしみだして細胞をひたしているものである"
         18-> "18　心臓から出ていく血液が流れる血管を何というか"
         19-> "19　尿は腎臓からぼうこうへ（　）を通って送られる"
         20-> "20 脳やせき髄を何というか"
         21-> "21　刺激に対して無意識に起こる、生まれつき持っている反応を何というか"
         22-> "22　は虫類にあてはまるものはどれか"
         23-> "23 外とう膜をもつ　ものは　どれか"
         _-> ""     

sentakushi: Int -> List String
sentakushi num = case num of
         0-> ["","",""]
         1-> ["酢酸オルセイン溶液","BTB溶液","ヨウ素液"]
         2-> ["核","液胞","細胞膜"]
         3-> ["BTB溶液","酢酸カーミン液","ベネジクト溶液"]
         4-> ["アミラーゼ","トリプシン","ペプシン"]
         5-> ["アミラーゼ","トリプシン","ペプシン"]
         6-> ["胃","肝臓","胆のう"]
         7-> ["麦芽糖","ブドウ糖","アミノ酸"]
         8-> ["ブドウ糖","モノグリセリド","アミノ酸"]
         9-> ["アミラーゼ","ペプシン","リパーゼ"]
         10-> ["アミラーゼ","ペプシン","リパーゼ"]
         11-> ["根毛","柔毛","肺胞"]
         12-> ["胃","肺","肝臓"]
         13-> ["腎臓","小腸","肝臓"]
         14-> ["小腸","腎臓","肝臓"]
         15-> ["赤血球","白血球","血しょう"]
         16-> ["赤血球","白血球","血しょう"]
         17-> ["赤血球","白血球","血しょう"]
         18-> ["動脈","静脈","毛細血管"]
         19-> ["血管","リンパ管","輸尿管"]
         20-> ["中枢神経","抹消神経","自律神経"]
         21-> ["直接反応","反射","本能"]
         22-> ["カモノハシ","ヘビ","イモリ"]
         23-> ["昆虫類","甲殻類","軟体動物"]
         _-> ["","",""]

kaito:Int -> Int
kaito num = case num of
         0-> 0
         1-> 0
         2-> 1
         3-> 2
         4-> 0
         5-> 2
         6-> 1
         7-> 1
         8-> 2
         9-> 2
         10-> 0
         11-> 1
         12-> 2
         13-> 2
         14-> 2
         15-> 0
         16-> 1
         17-> 2
         18-> 0
         19-> 2
         20-> 0
         21-> 1
         22-> 1
         23-> 2
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