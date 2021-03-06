import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Random
import Json.Decode as Json
import Task
import Debug

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
   ,s20:Int
   ,kekkal:List (String,String)
   ,gokaku:Bool
   ,msg:Bool
   ,missl:List (Mondai,String)
  }

 
init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,toi={sa="4",sb="5"},inp="?",s20=9,kekkal=[],gokaku=False,msg=False,missl=[]} , Cmd.none )


-- UPDATE


type Msg
  = Change String | NewAns Mondai | Btn String | S09 

btnLabel : Int -> String
btnLabel xi = case xi of
               13 -> "C"
               11 -> "-"
               12 -> "x"
               _  -> String.fromInt xi


update : Msg -> Model -> ( Model,Cmd Msg)
update msg model =
  let
   mhenkan :Int -> Int -> Mondai
   mhenkan i1 i2 = {sa=String.fromInt i1,sb=String.fromInt i2} 

   ansGenerator : Random.Generator Mondai   
   ansGenerator = Random.map2  mhenkan (Random.int (-1*model.s20) model.s20) (Random.int (-1*model.s20) model.s20)


  in

  case msg of
    Change newContent ->

      ({ model | maru=False 

      }, Random.generate NewAns ansGenerator)
                                    --generate : (a -> msg) -> Generator a -> Cmd msg
    NewAns mnd ->
      let
        --答えの最大数が指定した数を超えないように 9,99 etc
        kotaei=(toint mnd.sa) + (toint mnd.sb)
        gnflg1=(kotaei > model.s20 ) || (kotaei < (-1*model.s20))
        --問題が重複しないようにする
        gnflg2=List.any (\(sa,sb) -> mnd.sa==sa && mnd.sb==sb ) model.kekkal
        --考えうる問題の組み合わせがまだあるか？
        nn=model.s20
        
       -- aa=Debug.log "kekkal:" model.kekkal

        endflg=not ((List.length model.kekkal) == (2*nn*nn+4*nn+1+nn*(nn-1)))

        gnflg=(gnflg1 || gnflg2 ) && endflg
        


      in
      ( {model | maru=False,toi=mnd ,inp="?",gokaku=(not endflg),msg=False}
         ,if gnflg then (Random.generate NewAns ansGenerator) else  Cmd.none )
       --  }, Cmd.none )

    Btn si -> 
     let
       
        seikais=mojihenkan (String.fromInt ((toint model.toi.sa)+(toint model.toi.sb)  )  )
        kotaes=String.replace "?" "" (model.inp++si)  --? 除外

        --正解と答えの桁数が一致しているか　チェック ?除外
        ketacheck=(String.length seikais) == (String.length kotaes)


        --答えが一致せず　 桁数一致のとき　間違いと表示
        machigai=  (not (kotaes==seikais)) && ketacheck
        
        inpx=((if model.inp=="?" then "" else model.inp )++si)

        marux=( seikais == inpx   )
     in
      ({model| 
               inp= case si of
                       "C" -> "?"
                       _ -> inpx
         
               ,maru=marux
               ,kekkal=
                 if (machigai||model.msg) then
                    model.kekkal
                 else  -- not machgai  && not model.msg
                  if (List.any (\(sa,sb) -> model.toi.sa==sa && model.toi.sb==sb ) model.kekkal) then
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

    S09 ->
      ({model|s20=4,gokaku=False},Cmd.none    )
   

    

mojihenkan ss = 
          case ss of
            "1" -> "x"
            "-1" -> "-x"
            "0" -> "0" 
            _ -> (ss++"x")




toint st=  Maybe.withDefault 0 (String.toInt st) 

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
               ,td [] [sbutton 12]
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
                ,td [] [sbutton 11]
             ]
            
            ]

        smoji: String->String -> String -> Html Msg
        smoji xx yy sutxt =  div [style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" "100px"] [text sutxt] ]
        smojif xx yy sutxt ff =  div [style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" (ff++"px")] [text sutxt] ]

        stxt xx yy sutxt sizef= div [style "background-color" "lightblue",style "position" "absolute", style "top" (yy++"px") , style "left" (xx++"px")] [span [size 1, style "font-size" (sizef++"px"),style "color" (if sutxt=="?" then "red" else "black")] [text sutxt] ]        
  
        funKekka (sa,sb) = smojif (String.fromInt (10*(toint sa))) (String.fromInt (10*(toint sb))) (if model.s20<=5 then "〇" else "") "6"

        rireki=div [style "position" "absolute", style "top" "80px", style "left" "750px",style "color" "green",style "font-size" "3px"]
                   (List.map funKekka model.kekkal)
  
        padd=if (toint model.toi.sb)>=0 then "+" else ""


        mojia=mojihenkan model.toi.sa
        mojib=mojihenkan model.toi.sb

  in

  div [style "position" "relative"]
    [   
        smoji "20" "10" (mojia++padd++mojib++"=") 
        ,stxt  (String.fromInt (20+70*(String.length (mojia++padd++mojib++"=")))) "10" model.inp "120"  
      
        ,div[style "position" "absolute", style "top" "200px", style "left" "100px"][sujibutton]
        ,div[style "position" "absolute", style "top" "240px", style "left" "550px"][button [ style "font-size" "50px",onClick (Change "")][text "つぎへ"]]

        ,div[style "position" "absolute", style "top" "420px", style "left" "750px"][button [ style "font-size" "20px",onClick S09][text "答の絶対値_係数<=4"]]


        ,div[style "position" "absolute", style "top" "40px", style "left" "650px",style "color" "red",style "font-size" "100px"][text (if model.maru then "〇" else "")]
        ,rireki
        ,div[style "position" "absolute", style "top" "260px", style "left" "250px",style "color" "red",style "font-size" "40px"]
            [
               text (
                if model.gokaku then 
                 if (List.length model.missl) == 0 then
                  "合格！！すばらしい"
                 else
                  let
                    stadd (mondai,kotae) ac =  mondai.sa++"+"++mondai.sb++"(x"++kotae++")" ++ "  "++ac
                  in
                   "がんばりました！ "++  List.foldr stadd  "" (List.take 2 model.missl)
               
                else
                 ""
                )
               
            ]
        ,div[style "position" "absolute", style "top" "160px", style "left" "250px",style "color" "green",style "font-size" "30px"][text (if model.msg then ("答えは"++(mojihenkan (String.fromInt ((toint model.toi.sa)+(toint model.toi.sb)  ))) ++"です") else "")]
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