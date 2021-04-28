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
   ,s20:Int
   ,kekkal:List (String,String)
   ,gokaku:Bool
  }

 
init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,toi={sa="11",sb="11"},inp="?",s20=9,kekkal=[],gokaku=False} , Cmd.none )


-- UPDATE


type Msg
  = Change String | NewAns Mondai | Btn String | S05 |S09 |S20 | S99 

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
      ( {model | maru=False,toi=mnd ,inp="?",gokaku=(not endflg)
        },if gnflg then (Random.generate NewAns ansGenerator) else  Cmd.none )
       --  }, Cmd.none )

    Btn si -> 
     let
        --正しいか判別
        seikai=((model.inp++si)==(String.fromInt ((toint model.toi.sa)+(toint model.toi.sb)  )  ))   
        
        kuriagari=  ((toint (String.right 1 model.toi.sa))+(toint (String.right 1 model.toi.sb))  ) >9

        inpx=((if model.inp=="?" then "" else model.inp )++si)

        marux=((toint model.toi.sa)+(toint model.toi.sb))
                      ==
                     ( toint inpx)
        
     in
      ({model| 
               inp=if si=="C" then "?" else inpx            
               ,maru=marux
               ,kekkal=(model.toi.sa,model.toi.sb) :: model.kekkal      
              } ,Cmd.none)
    S05 ->
      ({model|s20=5,gokaku=False},Cmd.none    )
    S09 ->
      ({model|s20=9,gokaku=False},Cmd.none    )
    S20 ->
      ({model|s20=20,gokaku=False},Cmd.none    )
    S99 ->
      ({model|s20=99,gokaku=False},Cmd.none    )

    



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
    [   smoji "20" "10" a10x
        ,smoji "100" "10" a1
        ,smoji "180" "10" "+"
        ,smoji "260" "10" b10x
        ,smoji "340" "10" b1
        ,smoji "410" "10" "="

        ,stxt "510" "10" model.inp "120"
   
    
      
        ,div[style "position" "absolute", style "top" "200px", style "left" "100px"][sujibutton]
        ,div[style "position" "absolute", style "top" "240px", style "left" "550px"][button [ style "font-size" "30px",onClick (Change "")][text "つぎへ"]]
        ,div[style "position" "absolute", style "top" "300px", style "left" "750px"][button [ style "font-size" "20px",onClick S05][text "答<=5"]]
        ,div[style "position" "absolute", style "top" "340px", style "left" "750px"][button [ style "font-size" "20px",onClick S09][text "答<=9"]]
        ,div[style "position" "absolute", style "top" "380px", style "left" "750px"][button [ style "font-size" "20px",onClick S20][text "答<=20"]]
        ,div[style "position" "absolute", style "top" "420px", style "left" "750px"][button [ style "font-size" "20px",onClick S99][text "答<=99"]]

        ,div[style "position" "absolute", style "top" "40px", style "left" "650px",style "color" "red",style "font-size" "100px"][text (if model.maru then "〇" else "")]
        ,rireki
        ,div[style "position" "absolute", style "top" "260px", style "left" "250px",style "color" "red",style "font-size" "40px"][text (if model.gokaku then "合格！！がんばりました" else "")]
      
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