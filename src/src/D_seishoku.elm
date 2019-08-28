import Browser
import Html exposing (Html, button, div, text ,img)
import Html.Attributes
import Html.Attributes exposing (src,width,height)
import Html.Events exposing (onClick)


main =
  Browser.sandbox { init = init, update = update, view = view }





-- MODEL

type alias Model = {num:Int,mondai:String,ans:List String,ansn:Int,maru:Bool,url:String}


init : Model
init = {num=0,mondai="",ans=["","",""],ansn=0,maru=False,url=""}





shutudai: Int -> Model -> Model
shutudai num model=  case num of
         0-> {model | mondai="**",ans=["","",""],ansn=0,url=""}
         1-> {model | mondai="１　細胞分裂のときに核の中にあらわれるひも状のものは何か"
              ,ans=["染色体","ミトコンドリア","細胞質"]
              ,ansn=0
              ,url=""}
         2-> {model | mondai="２　植物で細胞分裂のさかんなところはどこか"
              ,ans=["表皮","茎の中心","根の先端"]
              ,ansn=2
              ,url=""}
         3-> {model | mondai="３　酢酸オルセイン溶液は何を染める染色液"
              ,ans=["染色体","細胞壁","葉緑体"]
              ,ansn=0
              ,url=""}
         4-> {model | mondai="４　雄と雌が関わって子孫をつくる生殖を何というか"
              ,ans=["栄養生殖","無性生殖","有性生殖"]
              ,ansn=2
              ,url=""}
         5-> {model | mondai="５ 生殖細胞ではないものはどれか"
              ,ans=["精子","卵","胚"]
              ,ansn=2
              ,url=""}
         6-> {model | mondai="６ 精子の核と卵の核が合体することを何というか"
              ,ans=["受精","分裂","受粉"]
              ,ansn=0
              ,url=""}
         7-> {model | mondai="７　受精卵が細胞分裂してから自分で食物をとるまでのものを何というか"
              ,ans=["卵","胚","個体"]
              ,ansn=1
              ,url=""}
         8-> {model | mondai="８ 受精してからからだができるまでの過程を何というか"
              ,ans=["成長","受精","発生"]
              ,ansn=2
              ,url=""}

    
         9-> {model | mondai="９ 生殖細胞をつくるための特別な細胞分裂を何というか"
              ,ans=["体細胞分裂","生殖分裂","減数分裂"]
              ,ansn=2
              ,url=""}
         10-> {model | mondai="１０ 受粉後、花粉管の中を移動していくものは何か"
              ,ans=["卵細胞","花粉","精細胞"]
              ,ansn=2
              ,url=""}   
         11-> {model | mondai="１１ 精細胞の核と卵細胞の核が合体することを何というか "
              ,ans=["受精","分裂","受粉"]
              ,ansn=0} 
         12-> {model | mondai="１２ DNAについて間違っているものはどれか"
              ,ans=["デオキシリボ核酸","遺伝子の本体を構成する物質","多細胞生物だけが持っている"]
              ,ansn=2
              ,url=""} 
         13-> {model | mondai="１３　対立形質とはなにか"
              ,ans=["正反対の形質","同時に現れない２つの形質","必ず同時に現れる２つの形質"]
              ,ansn=1
              ,url=""}       
         14-> {model | mondai="１４　減数分裂で生殖細胞が作られるとき、対になっている遺伝子が分かれて別々の生殖細胞に入る。この法則は何か。"
              ,ans=["優性の法則","分離の法則","劣性の法則"]
              ,ansn=1
              ,url=""}       
         15-> {model | mondai="１５　対立形質を持つ純系どうしをかけあわせた場合、子には一方の形質だけが現れる。この法則は何か。"
              ,ans=["優性の法則","分離の法則","劣性の法則"]
              ,ansn=0
              ,url=""}  
         16-> {model | mondai="１６ 対立形質である純系の赤い花と純系の白い花をかけあわせたら、子はすべて赤い花になった。子を自家受精して得られる孫の赤い花と白い花の比はどうなるか。"
              ,ans=["すべて赤い花","赤：白＝１：１","赤：白＝３：１"]
              ,ansn=2
              ,url=""}                                                        
         _-> {model | mondai="",ans= ["","",""],ansn=0,url=""}




-- UPDATE

type Msg = Increment | Decrement | Answer Int

update : Msg -> Model -> Model
update msg ({num} as model) =
  case msg of
    Increment ->
      {model | num=num + 1 
      , mondai = (shutudai (num+1) model).mondai
      , ans = (shutudai (num+1) model).ans
      , ansn= (shutudai (num+1) model).ansn
      , maru=False
      , url = (shutudai (num+1) model).url
      }

    Decrement ->
      {model | num=num - 1
      , mondai = (shutudai (num+1) model).mondai
      , ans = (shutudai (num+1) model).ans
      , ansn= (shutudai (num+1) model).ansn
      , maru=False
      , url= (shutudai (num+1) model).url
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
    , (
     if model.url == ""   then   
       div [] []
     else
       img [src model.url ,width 200 , height 150] [] 
    )
    , div [Html.Attributes.style "font-size" "30pt", Html.Attributes.style "color" "red"][text (if model.maru then "〇正解！！" else "　　")]
    ] ++
      (model.ans |> List.indexedMap bt)
   )