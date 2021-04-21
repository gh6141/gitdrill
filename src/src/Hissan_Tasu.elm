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

type alias LrIR =
 {
  lI:Float
  ,lR:Float
  ,rR:Float
 }

 
type alias Model =
  { maru : Bool
  ,siki:String
  ,rmode :Bool
  ,lr :LrIR
  ,dlr :DispData
  ,stage :Int
  ,point :Int
  ,cursor :String
  ,seisu :Bool
  ,plimit:Int
  ,ilist:List String
  ,cursori:Int
  }

type alias DispData =
  {
   lv:String
   ,rv:String
   ,lr:String
   ,rr:String
   ,li:String
   ,ri:String
   ,i:String
   ,v:String
  }

type alias OnOff =
 { 
    lv:Bool
   ,rv:Bool
   ,lr:Bool
   ,rr:Bool
   ,li:Bool
   ,ri:Bool
   ,i:Bool
   ,v:Bool
 }

ilst=[
  ["rv"] --1
  ,["lv","rv"] --2
  ,["li","rr"] --3
  ,["ri","lv","lr"] --4
  ,["rv","v","lr","i"] --5
  ,["i","lv","rv"] --6
 ]

lflg=    [{lv=True,rv=True,lr=True,rr=True,li=True,ri=True,i=True,v=True}
           ,{lv=True,rv=False,lr=True,rr=True,li=True,ri=True,i=True,v=True} --1
           ,{lv=False,rv=False,lr=True,rr=True,li=True,ri=True,i=True,v=True} --2
           ,{lv=True,rv=True,lr=True,rr=False,li=False,ri=False,i=False,v=True}  --3
           ,{lv=False,rv=True,lr=False,rr=True,li=False,ri=False,i=False,v=True}  --4
           ,{lv=True,rv=False,lr=False,rr=True,li=True,ri=True,i=True,v=False}  --5
           ,{lv=False,rv=False,lr=True,rr=True,li=False,ri=False,i=False,v=True}  --6
          ]
l0={lv=True,rv=True,lr=True,rr=True,li=True,ri=True,i=True,v=True}

lrString : LrIR -> Int ->  DispData
lrString lr stage = {
   lv=if (Maybe.withDefault l0 (getAt stage lflg)).lv then  String.fromFloat (lr.lI*lr.lR) else ""
   ,rv=if (Maybe.withDefault l0 (getAt stage lflg)).rv then String.fromFloat (lr.lI*lr.rR) else ""
   ,lr=if (Maybe.withDefault l0 (getAt stage lflg)).lr then  String.fromFloat lr.lR else ""
   ,rr=if (Maybe.withDefault l0 (getAt stage lflg)).rr then  String.fromFloat lr.rR else ""
   ,li=if (Maybe.withDefault l0 (getAt stage lflg)).li then  String.fromFloat lr.lI else ""
   ,ri=if (Maybe.withDefault l0 (getAt stage lflg)).ri then String.fromFloat lr.lI else ""
   ,i=if (Maybe.withDefault l0 (getAt stage lflg)).i then String.fromFloat lr.lI else ""
   ,v=if (Maybe.withDefault l0 (getAt stage lflg)).v then String.fromFloat (lr.lI*(lr.lR+lr.rR)) else ""
 }

lrHenko : DispData -> String -> String -> Bool -> DispData
lrHenko dlr slr moji flg =
  
 {   --flg:trueのときボタン入力　falseのときキー入力
   lv=if slr=="lv" then (if flg then dlr.lv++moji else moji) else dlr.lv
   ,rv=if slr=="rv" then (if flg then dlr.rv++moji else moji) else dlr.rv
   ,lr=if slr=="lr" then (if flg then dlr.lr++moji else moji) else dlr.lr
   ,rr=if slr=="rr" then (if flg then dlr.rr++moji else moji) else dlr.rr
   ,li=if slr=="li" then (if flg then dlr.li++moji else moji) else dlr.li
   ,ri=if slr=="ri" then (if flg then dlr.ri++moji else moji) else dlr.ri
   ,i=if slr=="i" then (if flg then dlr.i++moji else moji) else dlr.i
   ,v=if slr=="v" then (if flg then dlr.v++moji else moji) else dlr.v
 }

 
   



seikaiHanbetu : LrIR -> DispData -> Bool
seikaiHanbetu lr dlr = 
    (dlr.lv==String.fromFloat (lr.lI*lr.lR)) 
   &&(dlr.rv==String.fromFloat (lr.lI*lr.rR))
   &&(dlr.lr==String.fromFloat lr.lR)
   &&(dlr.rr==String.fromFloat lr.rR)
   &&(dlr.li==String.fromFloat lr.lI)
   &&(dlr.ri==String.fromFloat lr.lI)
   &&(dlr.i==String.fromFloat lr.lI)
   &&(dlr.v==String.fromFloat (lr.lI*(lr.lR+lr.rR)))



init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,siki="",rmode=True,lr={lI=0,lR=0,rR=0}
  ,dlr={ lv="",rv="",lr="",rr="" ,li="",ri="" ,i="",v=""}
  ,stage=1,point=0,cursor="",seisu=True,plimit=3,ilist=(lgetAt 2 ilst),cursori=0
  } , Cmd.none )



-- UPDATE

 


type Msg
  = Change String | NewAns LrIR | Btn String | Tasikame |CTlr String| CTli String| CTlv String
   | CTrr String|CTri String |CTrv String |CTi String |CTv String | Seisu Bool
   | CTc String | CTii (String,String) |CTiiB (String,String)
btnLabel : Int -> String
btnLabel xi = case xi of
               12 -> "."
               13 -> "C"
               _  -> String.fromInt xi



update : Msg -> Model -> ( Model,Cmd Msg)
update msg model =
  let
   lrhenkan :Int -> Int -> Int ->  LrIR
   lrhenkan lIx lRx rRx = 
    let 
      flix=toFloat lIx
      flrx=toFloat lRx
      frrx=toFloat rRx
    in   
    {
     lI= if model.seisu then flix else flix/10
     ,lR= if model.seisu then flrx else flrx*10.0
     ,rR= if model.seisu then frrx else frrx*10.0
     }

   ansGenerator : Random.Generator LrIR
   ansGenerator = Random.map3  lrhenkan (Random.int 2 5) (Random.int 2 5) (Random.int 2 5)

  in

  case msg of
    Change newContent ->
      let 
         flgp=model.point>=model.plimit
         stagex=if flgp then model.stage+1 else model.stage
         ilistx=lgetAt (stagex-1) ilst
      in
      ({ model | maru=False
      ,stage=stagex
      ,point=if flgp then 0 else model.point
      ,ilist=ilistx
      
      --,cursor="lv"
      }, Random.generate NewAns ansGenerator)
                                    --generate : (a -> msg) -> Generator a -> Cmd msg
    NewAns lr ->

      ( {model | maru=False,lr=lr
      ,dlr=(lrString lr model.stage)
      ,cursor=sgetAt 0 model.ilist
      ,cursori=0
      --,dlr= lrHenko model.dlr "ri" (sgetAt 0 model.ilist) False
      --,cursor="rv"
      
      },Cmd.none )
    Btn txt ->
     let
        ci = 
         case model.cursor of
           "li" -> ( if (model.dlr.li++txt==String.fromFloat model.lr.lI) then model.cursori+1 else model.cursori )
           "lv" -> ( if (model.dlr.lv++txt==String.fromFloat (model.lr.lI*model.lr.lR)) then model.cursori+1 else model.cursori )
           "lr" -> ( if (model.dlr.lr++txt==String.fromFloat model.lr.lR) then model.cursori+1 else model.cursori )
           "ri" -> ( if (model.dlr.ri++txt==String.fromFloat model.lr.lI) then model.cursori+1 else model.cursori )
           "rv" -> ( if (model.dlr.rv++txt==String.fromFloat (model.lr.lI*model.lr.rR)) then model.cursori+1 else model.cursori )
           "rr" -> ( if (model.dlr.rr++txt==String.fromFloat model.lr.rR) then model.cursori+1 else model.cursori )
           "i"  -> ( if (model.dlr.i++txt==String.fromFloat model.lr.lI) then model.cursori+1 else model.cursori )
           "v"  -> ( if (model.dlr.v++txt==String.fromFloat (model.lr.lI*(model.lr.lR+model.lr.rR))) then model.cursori+1 else model.cursori )
           _   -> model.cursori
     in


     if txt=="C" then
      if model.cursor=="li" || model.cursor=="ri" || model.cursor=="i" then
             (model,
       Cmd.batch [Task.perform CTiiB <| Task.succeed ("ri","") 
       , Task.perform CTiiB <| Task.succeed ("li","")
       , Task.perform CTiiB <| Task.succeed ("i","")]      
       ) 
      else
       ({model | dlr= lrHenko model.dlr model.cursor  "" False},
       Cmd.none
       ) 
     else if model.cursor=="li" || model.cursor=="ri" || model.cursor=="i" then
      ({model | cursor=sgetAt ci model.ilist
        ,cursori=ci
      },
      Cmd.batch [Task.perform CTiiB <| Task.succeed ("ri",txt) 
      , Task.perform CTiiB <| Task.succeed ("li",txt)
      , Task.perform CTiiB <| Task.succeed ("i",txt)]      
      ) 
     else
      ({model | dlr= lrHenko model.dlr model.cursor  txt True
              ,cursor=sgetAt ci model.ilist
        ,cursori=ci
      },
      Cmd.none      
      ) --input のときはTrue
    Tasikame ->
      ({model | maru=(seikaiHanbetu model.lr model.dlr )
      ,point=if (seikaiHanbetu model.lr model.dlr ) then model.point+1 else 0
      },Cmd.none)
    CTlr txt ->
       ({model| dlr= lrHenko model.dlr "lr" txt False
       },Cmd.none)  --buttonのときは　False
    CTli txt ->
       ({model| dlr= lrHenko model.dlr "li" txt False      
        },
      Cmd.batch [Task.perform CTii <| Task.succeed ("ri",txt) 
      , Task.perform CTii <| Task.succeed ("i",txt)]) --batchで電流は同時に変更
    CTlv txt ->
       ({model| dlr= lrHenko model.dlr "lv" txt False       
            },Cmd.none)
    CTrr txt ->
       ({model| dlr= lrHenko model.dlr "rr" txt  False      
        },Cmd.none)
    CTri txt ->
        ({model| dlr= lrHenko model.dlr "ri" txt False 

      },Cmd.none)
    CTrv txt ->

      ({model| dlr= lrHenko model.dlr "rv" txt  False
      },Cmd.none)
    CTv txt ->
      ({model| dlr= lrHenko model.dlr "v" txt  False
      },Cmd.none)
    CTi txt ->

      ({model| dlr= lrHenko model.dlr "i" txt False 
       },Cmd.none)
    CTc lvtxt ->
      ({model|cursor=lvtxt},Cmd.none) 
    CTii (txt,lt) ->

      ({model|dlr=lrHenko model.dlr txt lt False

      },Cmd.none)
    CTiiB (txt,lt) ->
       --Cのとき　電流3か所けすため lt/=""
      ({model|dlr=lrHenko model.dlr txt lt (lt/="")},Cmd.none)
    
    Seisu bl->
      ({model | seisu=bl},Cmd.none)

    
 


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
               ,td [] [sbutton 12]
               ,td [] [sbutton 13]
             ]
            
            ]

  in

  div [style "position" "relative"]
    [     Html.img [src "py/hissan_tasu.jpg"][]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "320px", style "left" "250px"] [input [ onClick (CTc "li"),  onInput CTli,size 3,placeholder (if model.cursor=="li" then "?" else ""), style "font-size" "70px",style "background-color" "lightblue",value  model.dlr.li] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "320px", style "left" "450px"] [input [  onClick (CTc "ri"), onInput CTri,size 3,placeholder (if model.cursor=="ri" then "?" else ""), style "font-size" "70px",style "background-color" "lightblue",value  model.dlr.ri] [] ]
      
        ,div[style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "30px", style "left" "700px"][sujibutton]
        ,div[style "position" "absolute", style "top" "300px", style "left" "750px"][button [ style "font-size" "30px",onClick Tasikame][text "たしかめ"]]
        ,div[style "position" "absolute", style "top" "370px", style "left" "750px"][button [ style "font-size" "30px",onClick (Change "")][text "つぎへ"]]


        ,div[style "position" "absolute", style "top" "180px", style "left" "250px",style "font-size" (if (model.stage==6 && model.point>=model.plimit ) then "30px" else "120px"),style "color" "red",style "visibility" (if model.maru==True then "visible" else "hidden")][text (if model.stage==6 && model.point>=model.plimit then "合格！!すばらしい" else "〇")]
        --point
        ,div[style "position" "absolute", style "top" "250px", style "left" "40px",style "font-size" "20px"][text (String.repeat model.point "〇")]

   
      
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