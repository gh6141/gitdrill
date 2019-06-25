import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }





-- MODEL

type alias Toijoho = {mondai:String,ans:List String,ansn:Int}

type alias Model = {num:Int,toi:Toijoho,maru:Bool}

init : Model
init = {num=0,toi={mondai="",ans=["","",""],ansn=0},maru=False}



shutudai: Int -> Toijoho
shutudai num =  case num of
         0-> {mondai="＊＊", ans=["","",""],ansn=0}
         1-> {mondai="１ 根、くき、葉には、根からとり入れられた水のとおる　決まった通り道（　　　　　　）"
              ,ans= ["があります","はありません","があるときとないときがあります "]
              ,ansn=0 }
         2-> {mondai="２ 根からくきを通（とお）ってきた水は、おもに　（　　　）から水蒸気となってでていきます。"
              ,ans= ["くき","くきと葉","葉"]
              ,ansn=2 }
         3-> {mondai="３ 葉の緑（みどり）いろをぬくためには　（　　　）をつかいます"
              ,ans= ["ヨウ素液","エタノール","かたくりこ"]
              ,ansn=1 }
         4-> {mondai="４ （　　　　　　　）とでんぷんができます"
              ,ans= ["葉に日光があたる","葉に雨があたる","夜になる"]
              ,ansn=0 }
         5-> {mondai="５ 葉にでんぷんがあるかどうか、しらべるには（　　　）をつかいます"
              ,ans= ["石灰水（せっかいすい）","リトマス紙","ヨウ素液"]
              ,ansn= 2}
         6-> {mondai="６ ヨウ素液は、でんぷんを（　　　　）にかえます"
              ,ans= ["赤色","青むらさき色","黄色"]
              ,ansn=1 }
         7-> {mondai="７ 植物のからだの中の水が、水蒸気（すいじょうき）となって出ていくことを（　　　）といいます"
              ,ans= ["蒸散（じょうさん）","蒸発（じょうはつ）","発散（はっさん）"]
              ,ansn=0 }
         8-> {mondai="８ 葉がついたホウセンカに袋をかぶせてしばらくすると（　　　　）"
              ,ans= ["袋の内側に水滴（すいてき）がつく","袋がふくらむ","袋がしぼむ"]
              ,ansn=0 }     
      
         
      
         _-> {mondai="",ans=["","",""],ansn=0}     



-- UPDATE

type Msg = Increment | Decrement | Answer Int

update : Msg -> Model -> Model
update msg ({num} as model) =
  case msg of
    Increment ->
      {model | num=num + 1 
      , toi = shutudai (num+1)
      , maru=False
      }

    Decrement ->
      {model | num=num - 1
      , toi = shutudai (num-1)
      , maru=False
      }

    Answer numi->
      {model | maru=(model.toi.ansn==numi)
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
    , div [ Html.Attributes.style "font-size" "30pt" ] [ text ( model.toi.mondai) ]    
    , div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text (if model.maru then "〇正解！！" else "　　")]
    ] ++
      (model.toi.ans |> List.indexedMap bt)
   )