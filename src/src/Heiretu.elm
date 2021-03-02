
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

type alias LrVR =
 {
  v:Float
  ,uR:Float
  ,dR:Float
 }

 
type alias Model =
  { maru : Bool
  ,siki:String
  ,rmode :Bool
  ,lr :LrVR
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
   uv:String
   ,dv:String
   ,ur:String
   ,dr:String
   ,ui:String
   ,di:String
   ,i:String
   ,v:String
   ,r:String
  }

type alias OnOff =
 { 
    uv:Bool
   ,dv:Bool
   ,ur:Bool
   ,dr:Bool
   ,ui:Bool
   ,di:Bool
   ,i:Bool
   ,v:Bool
   ,r:Bool
 }

ilst=[
  ["di"] --0
  ,["ui","uv"] --1
  ,["i","uv"] --2
  ,["uv","ui","i"] --3
  ,["uv","ui","di","ur"] --4
  ,["dv","ui","di","i","r"] --5
 ]

lflg=    [  {uv=True,dv=True,ur=True,dr=True,ui=True,di=False,i=True,v=True,r=True} --0
           ,{uv=False,dv=False,ur=True,dr=True,ui=False,di=True,i=True,v=False,r=True} --1
           ,{uv=False,dv=False,ur=True,dr=True,ui=True,di=True,i=False,v=False,r=True}  --2
           ,{uv=False,dv=False,ur=True,dr=True,ui=True,di=False,i=False,v=False,r=True}  --3
           ,{uv=False,dv=False,ur=True,dr=False,ui=False,di=False,i=True,v=False,r=True}  --4
           ,{uv=False,dv=False,ur=True,dr=True,ui=True,di=False,i=True,v=False,r=False}  --5
          ]
l0={uv=True,dv=True,ur=True,dr=True,ui=True,di=True,i=True,v=True,r=True}

lrString : LrVR -> Int ->  DispData
lrString lr stage = {
   uv=if (Maybe.withDefault l0 (getAt stage lflg)).uv then  String.fromFloat (lr.v) else ""
   ,dv=if (Maybe.withDefault l0 (getAt stage lflg)).dv then String.fromFloat (lr.v) else ""
   ,ur=if (Maybe.withDefault l0 (getAt stage lflg)).ur then  String.fromFloat lr.uR else ""
   ,dr=if (Maybe.withDefault l0 (getAt stage lflg)).dr then  String.fromFloat lr.dR else ""
   ,ui=if (Maybe.withDefault l0 (getAt stage lflg)).ui then  String.fromFloat (lr.v/lr.uR) else ""
   ,di=if (Maybe.withDefault l0 (getAt stage lflg)).di then String.fromFloat (lr.v/lr.dR) else ""
   ,i=if (Maybe.withDefault l0 (getAt stage lflg)).i then String.fromFloat (lr.v/lr.uR+lr.v/lr.dR) else ""
   ,v=if (Maybe.withDefault l0 (getAt stage lflg)).v then String.fromFloat (lr.v) else ""
   ,r=if (Maybe.withDefault l0 (getAt stage lflg)).r then String.fromFloat (lr.v/(lr.v/lr.uR+lr.v/lr.dR)) else ""

 }

lrHenko : DispData -> String -> String -> Bool -> DispData
lrHenko dlr slr moji flg =
  
 {   --flg:trueのときボタン入力　falseのときキー入力
   uv=if slr=="uv" then (if flg then dlr.uv++moji else moji) else dlr.uv
   ,dv=if slr=="dv" then (if flg then dlr.dv++moji else moji) else dlr.dv
   ,ur=if slr=="ur" then (if flg then dlr.ur++moji else moji) else dlr.ur
   ,dr=if slr=="dr" then (if flg then dlr.dr++moji else moji) else dlr.dr
   ,ui=if slr=="ui" then (if flg then dlr.ui++moji else moji) else dlr.ui
   ,di=if slr=="di" then (if flg then dlr.di++moji else moji) else dlr.di
   ,i=if slr=="i" then (if flg then dlr.i++moji else moji) else dlr.i
   ,v=if slr=="v" then (if flg then dlr.v++moji else moji) else dlr.v
   ,r=if slr=="r" then (if flg then dlr.r++moji else moji) else dlr.r
 }

 
   



seikaiHanbetu : LrVR -> DispData -> Bool
seikaiHanbetu lr dlr = 
    (dlr.uv==String.fromFloat lr.v) 
   &&(dlr.dv==String.fromFloat (lr.v))
   &&(dlr.ur==String.fromFloat lr.uR)
   &&(dlr.dr==String.fromFloat lr.dR)
   &&(dlr.ui==String.fromFloat (lr.v/lr.uR))
   &&(dlr.di==String.fromFloat (lr.v/lr.dR))
   &&(dlr.i==String.fromFloat (lr.v/lr.uR+lr.v/lr.dR))
   &&(dlr.v==String.fromFloat (lr.v))
   &&(dlr.r==String.fromFloat (lr.v/(lr.v/lr.uR+lr.v/lr.dR)))



init : () -> (Model,Cmd Msg)
init _ =
  ( { maru=False,siki="",rmode=True,lr={v=0,uR=0,dR=0}
  ,dlr={ uv="",dv="",ur="",dr="" ,ui="",di="" ,i="",v="",r=""}
  ,stage=0,point=0,cursor="",seisu=True,plimit=3,ilist=(lgetAt 2 ilst),cursori=0
  } , Cmd.none )



-- UPDATE

 


type Msg
  = Change String | NewAns LrVR | Btn String | Tasikame |CTur String| CTuv String| CTui String
   | CTdr String|CTdv String |CTdi String |CTi String |CTv String |CTr String | Seisu Bool
   | CTc String | CTii (String,String) |CTiiB (String,String)
btnLabel : Int -> String
btnLabel xi = case xi of
               12 -> "."
               13 -> "C"
               _  -> String.fromInt xi



update : Msg -> Model -> ( Model,Cmd Msg)
update msg model =
  let
   lrhenkan :Int -> Int -> Int ->  LrVR
   lrhenkan lIx lRx rRx = 
    let 
      flix=toFloat lIx
      flrx=toFloat lRx
      frrx=toFloat rRx
    in   
    {
     v= if model.seisu then flix else flix
     ,uR= if model.seisu then flrx else flrx*10.0
     ,dR= if model.seisu then frrx else frrx*10.0
     }

   ansGenerator : Random.Generator LrVR
   ansGenerator = Random.map3  lrhenkan (Random.int 2 50) (Random.int 2 50) (Random.int 2 50)

   seisuHanbetu :LrVR -> Bool
   seisuHanbetu lr =
     let
       ii=round (lr.v/lr.uR+lr.v/lr.dR)
     in
      ((modBy (round lr.dR)  (round lr.v))==0)
      &&((modBy (round lr.uR) (round lr.v))==0)
      &&((modBy ii (round lr.v))==0)
     

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
      
      },if (seisuHanbetu lr ) then Cmd.none else (Random.generate NewAns ansGenerator) )
    Btn txt ->
     let
        ci = 
         case model.cursor of
           "ui" -> ( if (model.dlr.ui++txt==String.fromFloat (model.lr.v/model.lr.uR)) then model.cursori+1 else model.cursori )
           "uv" -> ( if (model.dlr.uv++txt==String.fromFloat (model.lr.v)) then model.cursori+1 else model.cursori )
           "ur" -> ( if (model.dlr.ur++txt==String.fromFloat (model.lr.uR)) then model.cursori+1 else model.cursori )
           "di" -> ( if (model.dlr.di++txt==String.fromFloat (model.lr.v/model.lr.dR)) then model.cursori+1 else model.cursori )
           "dv" -> ( if (model.dlr.dv++txt==String.fromFloat (model.lr.v)) then model.cursori+1 else model.cursori )
           "dr" -> ( if (model.dlr.dr++txt==String.fromFloat model.lr.dR) then model.cursori+1 else model.cursori )
           "i"  -> ( if (model.dlr.i++txt==String.fromFloat (model.lr.v/model.lr.uR+model.lr.v/model.lr.dR)) then model.cursori+1 else model.cursori )
           "v"  -> ( if (model.dlr.v++txt==String.fromFloat (model.lr.v)) then model.cursori+1 else model.cursori )
           "r"  -> ( if (model.dlr.r++txt==String.fromFloat (model.lr.v/(model.lr.v/model.lr.uR+model.lr.v/model.lr.dR))) then model.cursori+1 else model.cursori )
      
           _   -> model.cursori
     in


     if txt=="C" then
      if model.cursor=="uv" || model.cursor=="dv" || model.cursor=="v" then
             (model,
       Cmd.batch [Task.perform CTiiB <| Task.succeed ("dv","") 
       , Task.perform CTiiB <| Task.succeed ("uv","")
       , Task.perform CTiiB <| Task.succeed ("v","")]      
       ) 
      else
       ({model | dlr= lrHenko model.dlr model.cursor  "" False},
       Cmd.none
       ) 
     else if model.cursor=="uv" || model.cursor=="dv" || model.cursor=="v" then
      ({model | cursor=sgetAt ci model.ilist
        ,cursori=ci
      },
      Cmd.batch [Task.perform CTiiB <| Task.succeed ("uv",txt) 
      , Task.perform CTiiB <| Task.succeed ("dv",txt)
      , Task.perform CTiiB <| Task.succeed ("v",txt)]      
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
    CTur txt ->
       ({model| dlr= lrHenko model.dlr "ur" txt False
       },Cmd.none)  --buttonのときは　False
    CTuv txt ->
       ({model| dlr= lrHenko model.dlr "uv" txt False      
        },
      Cmd.batch [Task.perform CTii <| Task.succeed ("dv",txt) 
      , Task.perform CTii <| Task.succeed ("v",txt)]) --batchで同時に変更
    CTui txt ->
       ({model| dlr= lrHenko model.dlr "ui" txt False       
            },Cmd.none)
    CTdr txt ->
       ({model| dlr= lrHenko model.dlr "dr" txt  False      
        },Cmd.none)
    CTdi txt ->
        ({model| dlr= lrHenko model.dlr "di" txt False 

      },Cmd.none)
    CTdv txt ->
      ({model| dlr= lrHenko model.dlr "dv" txt  False
      },      Cmd.batch [Task.perform CTii <| Task.succeed ("v",txt) 
      , Task.perform CTii <| Task.succeed ("uv",txt)]) --batchで同時に変更
    CTv txt ->
      ({model| dlr= lrHenko model.dlr "v" txt  False
      },      Cmd.batch [Task.perform CTii <| Task.succeed ("dv",txt) 
      , Task.perform CTii <| Task.succeed ("uv",txt)]) --batchで同時に変更
    CTi txt ->
      ({model| dlr= lrHenko model.dlr "i" txt False 
       },Cmd.none)
    CTr txt ->
      ({model| dlr= lrHenko model.dlr "r" txt False 
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
        sbutton ii = (button [style "font-size" "40px"   ,onClick (Btn (btnLabel ii))] [ text (" "++(btnLabel ii)++" ")])

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
    [     Html.img [src "py/heiretu.jpg"][]
        --left
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "3px", style "left" "232px"] [input [ onClick (CTc "uv"), onInput CTuv,size 2,placeholder (if model.cursor=="uv" then "?" else ""), style "font-size" "18px",style "background-color" "coral",value model.dlr.uv] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "51px", style "left" "232px"] [input [ onClick (CTc "ur"), onInput CTur,size 2,placeholder (if model.cursor=="ur" then "?" else ""), style "font-size" "18px",style "background-color" "khaki",value  model.dlr.ur] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "51px", style "left" "85px"] [input [ onClick (CTc "ui"),  onInput CTui,size 2,placeholder (if model.cursor=="ui" then "?" else ""), style "font-size" "18px",style "background-color" "lightblue",value  model.dlr.ui] [] ]
        --right
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "84px", style "left" "232px"] [input [  onClick (CTc "dv"), onInput CTdv,size 2,placeholder (if model.cursor=="dv" then "?" else ""), style "font-size" "18px",style "background-color" "coral",value model.dlr.dv] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "131px", style "left" "232px"] [input [  onClick (CTc "dr"), onInput CTdr,size 2,placeholder (if model.cursor=="dr" then "?" else ""), style "font-size" "18px",style "background-color" "khaki",value  model.dlr.dr] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "131px", style "left" "85px"] [input [  onClick (CTc "di"), onInput CTdi,size 2,placeholder (if model.cursor=="di" then "?" else ""), style "font-size" "18px",style "background-color" "lightblue",value  model.dlr.di] [] ]
        --all
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "208px", style "left" "54px"] [input [onClick (CTc "i"),   onInput CTi,size 2,placeholder (if model.cursor=="i" then "?" else ""), style "font-size" "18px",style "background-color" "lightblue",value model.dlr.i] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "208px", style "left" "152px"] [input [onClick (CTc "v"),   onInput CTv,size 2,placeholder (if model.cursor=="v" then "?" else ""), style "font-size" "18px",style "background-color" "coral",value model.dlr.v] [] ]
        ,div [style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "220px", style "left" "310px"] [input [onClick (CTc "r"),   onInput CTr,size 2,placeholder (if model.cursor=="r" then "?" else ""), style "font-size" "18px",style "background-color" "khaki",value model.dlr.r] [] ]

        --stage
        ,div[style "position" "absolute", style "top" "2px", style "left" "400px",style "font-size" "20px"][text  ("ステージ："++(String.fromInt model.stage) )]

        ,div[style "position" "absolute", style "top" "30px", style "left" "400px"][button [ style "font-size" "30px",onClick (Change "")][text "つぎへ"]]
        ,div[style "position" "absolute", style "top" "100px", style "left" "400px"][button [ style "font-size" "24px",onClick Tasikame][text "たしかめ"]]
        ,div[style "position" "absolute", style "top" "170px", style "left" "400px"][button [ style "font-size" "12px",onClick (Seisu True)][text "整数"]]
        ,div[style "position" "absolute", style "top" "170px", style "left" "450px"][button [ style "font-size" "12px",onClick (Seisu False)][text "小数"]]
        
        ,div[style "visibility" (if model.rmode==True then "visible" else "hidden"),style "position" "absolute", style "top" "30px", style "left" "520px"][sujibutton]
        ,div[style "position" "absolute", style "top" "180px", style "left" "250px",style "font-size" (if (model.stage==5 && model.point>=model.plimit ) then "30px" else "120px"),style "color" "red",style "visibility" (if model.maru==True then "visible" else "hidden")][text (if model.stage==5 && model.point>=model.plimit then "合格！!すばらしい" else "〇")]
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