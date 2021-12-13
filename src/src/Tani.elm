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
   ,inp:String
   ,knzn:Kanzan
   ,fromT:String
   ,toT:String
   ,s20:Int
   ,kekkal:List (String,String)
   ,gokaku:Bool
   ,msg:Bool
   ,missl:List (Mondai,String)
  }

 
init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,toi={sa="4",sb="5"},inp="?",knzn=MtoKm,fromT="m",toT="km",s20=4999,kekkal=[],gokaku=False,msg=False,missl=[]} , Cmd.none )


-- UPDATE

type Kanzan = MtoKm | KmtoM | CmtoM | MtoCm | MmtoCm | CmtoMm | MltoL | LtoMl | GtoKg | KgtoG


type Msg
  = Change String | NewAns Mondai | Btn String | KChange Kanzan 

btnLabel : Int -> String
btnLabel xi = case xi of
               10 -> "."
               13 -> "C"
               _  -> String.fromInt xi


update : Msg -> Model -> ( Model,Cmd Msg)
update msg model =
  let
   mhenkan :Int -> Int -> Mondai
   mhenkan i1 i2 = {sa=String.fromInt i1,sb=String.fromInt i2} 

   ansGenerator : Random.Generator Mondai   
   ansGenerator = Random.map2  mhenkan (Random.int 1 model.s20) (Random.int 1 model.s20)


  in

  case msg of
    Change newContent ->

      ({ model | maru=False 

      }, Random.generate NewAns ansGenerator)
                                    --generate : (a -> msg) -> Generator a -> Cmd msg
    NewAns mnd ->
      let
        --答えの最大数が指定した数を超えないように 9,99 etc
        gnflg1=((toint mnd.sa) + (toint mnd.sb)) > model.s20
        --問題が重複しないようにする
        gnflg2=List.any (\(sa,sb) -> mnd.sa==sa && mnd.sb==sb ) model.kekkal
        --考えうる問題の組み合わせがまだあるか？
        endflg=not ((List.length model.kekkal) == ((model.s20-1)*model.s20//2))

        gnflg=(gnflg1 || gnflg2 ) && endflg
        




      in
      ( {model | maru=False,toi=
          {sa=
          case model.knzn of
           KmtoM -> String.fromFloat ((tofloat mnd.sa)/1000.0)
           MtoCm -> String.fromFloat ((tofloat mnd.sa)/100.0)
           CmtoMm -> String.fromFloat ((tofloat mnd.sa)/10.0)
           LtoMl -> String.fromFloat ((tofloat mnd.sa)/1000.0)
           KgtoG -> String.fromFloat ((tofloat mnd.sa)/1000.0)
           _ -> mnd.sa      
         ,sb=mnd.sb}
       ,inp="?",gokaku=(not endflg),msg=False
        },if gnflg then (Random.generate NewAns ansGenerator) else  Cmd.none )
       --  }, Cmd.none )

    Btn si -> 
     let
       
        seikais=henkan model.toi.sa model.knzn
        kotaes=String.replace "?" "" (model.inp++si)  --? 除外

        --正解と答えの桁数が一致しているか　チェック ?除外
        ketacheck=(String.length seikais) == (String.length kotaes)


        --答えが一致せず　 桁数一致のとき　間違いと表示
        machigai=  (not (kotaes==seikais)) && ketacheck
        
        kuriagari=  ((toint (String.right 1 model.toi.sa))+(toint (String.right 1 model.toi.sb))  ) >9

        inpx=((if model.inp=="?" then "" else model.inp )++si)

        --  marux=((toint model.toi.sa)+(toint model.toi.sb))
        --              ==
          --           ( toint inpx)
        marux = ((henkan model.toi.sa model.knzn) == inpx  )
        
     in
      ({model| 
               inp=if si=="C" then "?" else inpx            
               ,maru=marux
               ,kekkal=
                 if (machigai||model.msg) then
                    model.kekkal
                 else
                   ( (model.toi.sa,model.toi.sb) :: model.kekkal  )
               ,msg=machigai
               ,missl=
                 if machigai then
                   ( ( model.toi, inpx) :: model.missl)
                 else
                   model.missl
              } ,Cmd.none)
    KChange knzn ->
      let
       (fromS,toS)=
         case knzn of
           MtoKm -> ("m","km")
           KmtoM -> ("km","m")
           CmtoM -> ("cm","m")
           MtoCm -> ("m","cm")
           MmtoCm -> ("mm","cm")
           CmtoMm -> ("cm","mm")
           MltoL -> ("mL","L")
           LtoMl -> ("L","mL")
           GtoKg -> ("g","kg")
           KgtoG -> ("kg","g")

      in
      ({model|knzn=knzn,fromT=fromS ,toT=toS, gokaku=False},Cmd.none    )
    
 
toint st=  Maybe.withDefault 0 (String.toInt st) 
tofloat st=  Maybe.withDefault 0 (String.toFloat st) 


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- VIEW


view : Model -> Html Msg
view model =

  let
        sbutton : Int -> Html Msg
        sbutton ii = (button [style "font-size" "50px"   ,onClick (Btn (btnLabel ii))] [ text (" "++(btnLabel ii)++" ")])

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
                ,td [] [sbutton 10]
                ,td [] [sbutton 13]
             ]
            
            ]

        smoji: String->String -> String -> Html Msg
        smoji xx yy sutxt =  div [style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" "120px"] [text sutxt] ]
        smojif xx yy sutxt ff =  div [style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" (ff++"px")] [text sutxt] ]

        stxt xx yy sutxt sizef= div [style "background-color" "lightblue",style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" (sizef++"px"),style "color" (if sutxt=="?" then "red" else "black")] [text sutxt] ]        
  
        a10=String.slice -2 -1 ("0"++model.toi.sa)
        a10x=if a10=="0" then "" else a10
        a1=String.right 1 ("0"++model.toi.sa)
        b10=String.slice -2 -1 ("0"++model.toi.sb)
        b10x=if b10 =="0" then "" else b10
        b1=String.right 1 ("0"++model.toi.sb)

        funKekka (sa,sb) = smojif (String.fromInt (10*(toint sa))) (String.fromInt (10*(toint sb))) (if model.s20<=9 then "〇" else "") "6"

        rireki=div [style "position" "absolute", style "top" "80px", style "left" "750px",style "color" "green",style "font-size" "3px"]
                   (List.map funKekka model.kekkal)
  
  in

  div [style "position" "relative"]
    [   --smoji "20" "10" a10x
        --,smoji "100" "10" a1
        --,smoji "180" "10" "+"
        --,smoji "260" "10" b10x
        --,smoji "340" "10" b1
        --,smoji "410" "10" "="
        stxt "100" "10" (model.toi.sa++model.fromT) "60"
        ,stxt "400" "10" (model.toT++"であらわすと→") "20"
        ,stxt "640" "10" (model.inp++model.toT) "60"
         
      
        ,div[style "position" "absolute", style "top" "200px", style "left" "100px"][sujibutton]
        ,div[style "position" "absolute", style "top" "240px", style "left" "550px"][button [ style "font-size" "50px",onClick (Change "")][text "つぎへ"]]

        ,div[style "position" "absolute", style "top" "280px", style "left" "750px"][button [ style "font-size" "12px",onClick (KChange MtoKm)][text "m => km"]]
        ,div[style "position" "absolute", style "top" "320px", style "left" "750px"][button [ style "font-size" "12px",onClick (KChange KmtoM)][text "km => m"]]
        ,div[style "position" "absolute", style "top" "360px", style "left" "750px"][button [ style "font-size" "12px",onClick (KChange CmtoM)][text "cm => m"]]
        ,div[style "position" "absolute", style "top" "400px", style "left" "750px"][button [ style "font-size" "12px",onClick (KChange MtoCm)][text "m => cm"]]

        ,div[style "position" "absolute", style "top" "280px", style "left" "850px"][button [ style "font-size" "12px",onClick (KChange MmtoCm)][text "mm => cm"]]
        ,div[style "position" "absolute", style "top" "320px", style "left" "850px"][button [ style "font-size" "12px",onClick (KChange CmtoMm)][text "cm => mm"]]
        ,div[style "position" "absolute", style "top" "360px", style "left" "850px"][button [ style "font-size" "12px",onClick (KChange MltoL)][text "mL => L"]]
        ,div[style "position" "absolute", style "top" "400px", style "left" "850px"][button [ style "font-size" "12px",onClick (KChange LtoMl)][text "L => mL"]]
        ,div[style "position" "absolute", style "top" "440px", style "left" "850px"][button [ style "font-size" "12px",onClick (KChange GtoKg)][text "g => kg"]]
        ,div[style "position" "absolute", style "top" "480px", style "left" "850px"][button [ style "font-size" "12px",onClick (KChange KgtoG)][text "kg => g"]]


        ,div[style "position" "absolute", style "top" "40px", style "left" "650px",style "color" "red",style "font-size" "100px"][text (if model.maru then "〇" else "")]
        ,rireki
        ,div[style "position" "absolute", style "top" "260px", style "left" "250px",style "color" "red",style "font-size" "40px"]
            [
               text (
                if model.gokaku then 
                 if (List.length model.missl) == 0 then
                  "ごうかく！！すばらしい"
                 else
                  let
                    stadd (mondai,kotae) ac =  mondai.sa++"+"++mondai.sb++"(x"++kotae++")" ++ "  "++ac
                  in
                   "がんばりました！ "++  List.foldr stadd  "" (List.take 2 model.missl)
               
                else
                 ""
                )
               
            ]
        ,div[style "position" "absolute", style "top" "160px", style "left" "250px",style "color" "green",style "font-size" "30px"][text (if model.msg then ("答えは"++(henkan model.toi.sa model.knzn)++model.toT++"です") else "")]

   
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

henkan : String -> Kanzan -> String
henkan src knzn =
  let
    isrc=toint src
    fsrc=tofloat src    
  in
   case knzn of 
    MtoKm -> String.fromFloat (fsrc/1000.0)
    KmtoM -> String.fromFloat (fsrc*1000.0)
    CmtoM -> String.fromFloat (fsrc/100.0)
    MtoCm -> String.fromFloat (fsrc*100.0)
    MmtoCm -> String.fromFloat (fsrc/10.0)
    CmtoMm -> String.fromFloat (fsrc*10.0)
    MltoL -> String.fromFloat (fsrc/1000.0)
    LtoMl -> String.fromFloat (fsrc*1000.0)
    GtoKg -> String.fromFloat (fsrc/1000.0)
    KgtoG -> String.fromFloat (fsrc*1000.0)

