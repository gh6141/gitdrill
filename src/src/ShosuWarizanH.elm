module ShosuWarizanH exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json
import Array exposing (Array)

import Task

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Utilities.Spacing as Spacing

import Random
import List.FlatMap
import Tuple

import Debug


main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Mondai =
 {
     sa:String
     ,sb:String
     ,k1:Int
     ,k2:Int
 }


type alias Model =
  { 
    init:String
    ,mon1:String
    ,mon2:String
    ,mon1o:String
    ,mon2o:String
    ,ans1o:String
    ,k1:Int
    ,k2:Int
    ,bail:String
    ,baim:String
    ,bair:String
    ,displ:Bool
    ,dispm:Bool
    ,dispr:Bool
    ,ans:String
    ,dispans:Bool
    , keisiki:Keisiki
    ,hdisp:Bool
    ,pointlocation:Int
    ,picls:Int --point ichi  left
    ,cicls:Int --kanma ichi  left
    ,picrs:Int
    ,cicrs:Int
 
  }

type Keisiki= Hyojun |Junshosu |Junshosu100|HijosuSeisu 

init : () -> (Model, Cmd Msg)
init _ =
  ( {init="3",mon1="2.0",mon2="1.0",mon1o="20",mon2o="10",ans1o="2",k1=1,k2=1,bail="",baim="",bair=""
     ,displ=False,dispm=False,dispr=False,ans="",dispans=False,keisiki=Hyojun,hdisp=True,pointlocation=0
     ,picls=0,cicls=0,picrs=0,cicrs=0}
  , Cmd.none
  )

type Msg
    =  Next | Newmon Mondai | Btn Int | ChangeS String String | Rightx |Leftx | TypeK Keisiki |Hissan

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
   let
       mhenkan :Int -> Int -> Int -> Int -> Mondai
       mhenkan i1 i2 k1 k2= {sa=String.fromInt i1,sb=String.fromInt i2,k1=k1,k2=k2} 

       monGenerator : Random.Generator Mondai   
       monGenerator = Random.map4  mhenkan (Random.int 2 75 ) (Random.int 2  60 ) (Random.int 1 3) (Random.int 1 3)
  
   in
 
  case msg of
 
   Next ->
      ( {model |bail="",baim="",bair=""}
       ,   Random.generate Newmon monGenerator 
      )
  
   Newmon mnd ->
      let

       --mmon2o=model.mon2o
       mmon2o=mnd.sb
       --mk1=model.k1
       mk1=mnd.k1
       --mmon1o=model.mon1o
       mmon1o=waru (mojikake mnd.sa mnd.sb) (-mnd.k2+mnd.k1)
       mk2=model.k2

       mans1o=mnd.sa

       kaketa st =String.fromInt ((toint (String.fromChar st))*(toint mmon2o))
       func idx ch = (kaketa ch,idx)
       --manslst=List.indexedMap func (canslist (zkcut (waru model.ans1o (-mk2+mk1))))    --(かけた結果,商の何文字目か)リスト
       manslst=List.indexedMap func (canslist (zkcut (waru mans1o (-mk2+mk1))))    --(かけた結果,商の何文字目か)リスト
       amarikeisan = List.foldl hikuac (toint (zkcut mmon1o)) manslst
       --x=Debug.log "amari=" amarikeisan
       --amarikeisan=0

       recalflgo=amarikeisan/=0||(String.right 1 (mojikake mnd.sa mnd.sb))=="0" || (String.right 1 mnd.sb)=="0"
       -- recalflg=(String.right 1 mnd.sb)=="0"
       
       mon1x=waru (mojikake mnd.sa mnd.sb) mnd.k1
       mon2x=waru mnd.sb mnd.k2

       recalflg=
        case model.keisiki of
          Hyojun -> recalflgo
          Junshosu ->recalflgo || not ( (mnd.k1==2 && (String.length mnd.sa)==1 ) && (mnd.k2==1 && (String.length mnd.sb)==2)   )
          Junshosu100 ->amarikeisan/=0||not ( ((String.right 1 mnd.sb)/="0")  && (String.right 1 (mojikake mnd.sa mnd.sb)=="0") && (mnd.k1==3 && (String.length mnd.sa)==2 ) && (mnd.k2==1 && (String.length mnd.sb)==2)   )
          HijosuSeisu ->amarikeisan/=0||not (((String.contains "." mon2x)==True) && ((String.contains "." mon1x)==False) && (mnd.k1==1 && (String.length mnd.sa)==2 ) && (mnd.k2==1 && (String.length mnd.sb)==2)   )
     
       
       pic st=Maybe.withDefault 0 (List.head (String.indexes "." st))  --ピリオドの位置
       cic st=Maybe.withDefault 0 (List.head (String.indexes "," st))



     
      in
      ( {model |  mon1 =mon1x,mon2=mon2x
                ,  mon1o=waru (mojikake mnd.sa mnd.sb) (-mnd.k2+mnd.k1),mon2o=mnd.sb
                ,ans1o=mnd.sa                
                ,k1=mnd.k1,k2=mnd.k2
                ,bail="",baim="",bair="",displ=False,dispm=False,dispr=False,ans="",dispans=False
                ,picls=pic mon2x,cicls=cic mon2x,picrs=pic mon1x,cicrs=cic mon1x
                ,pointlocation=0
                }    
                ,if recalflg then (Random.generate Newmon monGenerator)  else Cmd.none)
  
   Btn si ->
    let
      bcap=buttoncaption si
      anst=(if bcap=="C" then (String.dropRight 1 model.ans) else (model.ans++bcap))

    in
     ( {model | ans=anst
                 } ,Cmd.none)
   ChangeS snum ichi->
       let
        bl=if ichi=="L" then snum else model.bail
        bm=if ichi=="M" then snum else model.baim
        br=if ichi=="R" then snum else model.bair

        disprflg=((10^model.k2==(toint bl)) && model.dispm)||((10^model.k2==(toint bm))&&model.displ)

       in
      ({model|bail=bl
             ,baim=bm
             ,bair=br
             ,displ=10^model.k2==(toint bl)
             ,dispm=10^model.k2==(toint bm)
             ,dispr=disprflg
             ,dispans=disprflg
             },Cmd.none)
   Leftx ->  ({model|pointlocation=if model.pointlocation>0 then model.pointlocation-1 else 0},Cmd.none)
   Rightx ->  ({model|pointlocation=model.pointlocation+1 },Cmd.none)

   TypeK keisik ->  ({model|keisiki=keisik},Cmd.none)

   Hissan ->  ({model|hdisp=False},Cmd.none)
                  
  


view : Model -> Html Msg
view model =
  let   
        

        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "30px"   ,onClick (Btn ii)]] [ text (" "++(buttoncaption ii)++" ")])


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
               ,td [] [sbutton 11]
             ]                  
            ]        
                  
        cbox val hdl=select [style "font-size" "30px",onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100","1000","10000"]) 
        cbox2 val hdl=select [style "font-size" "30px" ,onChange hdl ] (List.map (\s -> Html.option [selected (s==val),value s][text s]) ["","10","100","1000","10000"]) 

        tbox str color= span [] [input [  size 7,placeholder "?", style "font-size" "26px",style "background-color" color,value str] [] ] 
        -- kotae =  waru  (String.fromInt ((toint model.mon1o)*(toint model.mon2o)))  (model.k1+model.k2)  
        anso=waru model.ans1o (-model.k2+model.k1)
        seikaiflg=(anso==model.ans)

 
        ls=model.mon2
        rs=model.mon1

        pcls=if model.picls==0 then ((String.length ls)+1) else model.picls      
        pcrs=if model.picrs==0 then ((String.length rs)+1) else model.picrs      
    
        ls00=String.replace "." "" ls
        ls0=ls00++(String.repeat (pcls+model.pointlocation-(String.length ls00)-(if (String.contains "." ls) then 0  else 1)) "0"   )

        rs00=String.replace "." "" rs    
        rs0=rs00++(String.repeat (pcrs+model.pointlocation-(String.length rs00)-(if (String.contains "." rs) then 0  else 1)) "0"   )


        lsx1= (String.left (pcls+model.pointlocation) ls0)++(if (model.pointlocation==0) then "" else ".")++(String.dropLeft (pcls+model.pointlocation) ls0)
        rsx1= (String.left (pcrs+model.pointlocation) rs0)++(if (model.pointlocation==0) then "" else ".")++(String.dropLeft (pcrs+model.pointlocation) rs0)


        lsx2= (String.left (pcls) lsx1)++(if (model.pointlocation==0) then "." else "")++(String.dropLeft (pcls) lsx1)
        rsx2= (String.left (pcrs) rsx1)++(if (model.pointlocation==0) then "." else "")++(String.dropLeft (pcrs) rsx1)
   
        
        divx st= div [style "line-height" "1em"] [ text (if model.hdisp then st else "")]

      
      
      
        kaketa st =String.fromInt ((toint (String.fromChar st))*(toint model.mon2o))
        func idx ch = (kaketa ch,idx)
        manslst=List.indexedMap func (canslist (zkcut model.ans))    --(かけた結果,商の何文字目か)リスト
        


        kichi= 
         if (String.contains "." model.mon1o) then
          (String.length (Maybe.withDefault "" (List.head (List.reverse (String.split "." model.mon1o)))))
         else
          0

        zeroansichi=
         if (String.contains "0." anso) then
          1
         else
          0

      
        t1=(String.length lsx2)+1  --実際の文字数に合わせる   
        t2= (String.length rsx2)+model.pointlocation+(if model.keisiki==HijosuSeisu then 1 else 0)      
         
          
        
        hikufunc idx st = List.foldl hikuac (toint (zkcut model.mon1o)) (List.take (idx+1) manslst)
        

        hikulst=List.indexedMap hikufunc  manslst

        pmanslst=List.map2 Tuple.pair manslst (List.map (\su->String.fromInt su) hikulst )  --引いた結果リスト
      
        --tabx ni=String.repeat  (ceiling(1.0*(toFloat ni))) "\u{00a0}"
        tabx ni=String.repeat  ni "\u{00a0}"
        tabxh ni=String.repeat  ni "\u{202f}"


 
  in

   table [align "center" ,style "width" "80%"]
   [
    tr [align "left"]
    [
      td [style "width" "50%"] 
      [
        tr [] [
         td [style "text-align" "right"][span [style "font-size" "50px",style "color" "red"][text (if seikaiflg then "〇" else "　")]  ]
        ] 
        ,tr [] [
          td [style "font-size" "30px"] [ text (model.mon1++"　÷　"++model.mon2++"　=　")
          ,if model.dispans then (tbox model.ans "coral") else (text "") 
          
             ]
        ]
        ,tr [] [
          td [style "font-size" "20px"] [
             text "↓×",cbox model.bail handlerl,text " ↓×",cbox model.baim handlerm
             --, text "　　÷",cbox2 model.bair handlerr,text "↑"
          ]

        ]      
        ,tr [] [
            td [style "font-size" "30px"] [
               text ((if model.displ then model.mon1o else "")++"　÷　"++(if model.dispm then model.mon2o else "")
                ++"　=　"++(if (model.displ&&model.dispm) then anso else "") )
            ]
        ]
        ,tr [][td [style "font-size" "30px"] [text "\u{00a0}"]]
        ,        
        
         tr [] 
          [  
           let

             yoko=25
             tate=25
             adiv xi yi txt updown =div [style "position" "absolute", style "top" ((String.fromInt (tate*yi+updown))++"px"), style "left" ((String.fromInt (yoko*xi))++"px")] 
                     --     [text (if model.hdisp then txt else "")]
                     (aspan txt)

             spancreate idxch =span  [style "position" "absolute", style "top" "0px", style "left" ((String.fromInt (yoko*(Tuple.first idxch)) )++"px")] 
                               [text (String.fromChar (Tuple.second idxch))]

             aspan txt= 
                  let
                    olst=List.map spancreate (List.indexedMap Tuple.pair (String.toList (String.replace "." "" txt)))
                    pichi= if (String.contains "." txt) then
                            String.length (Maybe.withDefault "" (List.head (String.split "." txt))) 
                           else
                            0
                                                       
                     
                    --x=Debug.log "pi=" (yoko*pichi)
                    pl=[ if (pichi==0) then
                            span [] [text ""]
                        else
                            span [style "font-size" "40px",style "color" "red",style "position" "absolute", style "top" "-5px", style "left" ((String.fromInt (yoko*pichi-9) )++"px")]  [text "."]
                       ]
                  in
                   olst++pl


             --割られる数mon1oの１の位以上の桁数 0.も１けたとする　１２．３は２けた  整数も１３は２けた
             --m1oketa= seisuketa model.mon1o
             m1oketa= seisuketa rsx2
             --答えのansoの整数部桁数
             aoketa= seisuketa anso
             --答えの小数部桁数
             aosketa= shosuketa anso

             hchosei=if model.keisiki==HijosuSeisu then -1 else 0


             sikitr=List.FlatMap.flatMap (\((hikareru,idx),hiku) ->  (                        
                    [ 
                     adiv (8+m1oketa-aoketa-(String.length hikareru)+idx+1+zeroansichi) ((idx+2)*3-2) hikareru 5
                    ,adiv 8 ((idx+2)*3-1) "--------------" 0
                    ,adiv (8+m1oketa-aoketa-(String.length hiku)+idx+2+(if (hiku=="0"&&hchosei==0) then (zeroansichi-1) else 0)+hchosei) ((idx+2)*3)  hiku -5
                   
                     
                      ]
                   ))  pmanslst 


             seisuketa st= String.length 
              ( if (String.contains "." st) then
                ( Maybe.withDefault "" (List.head (String.split "." st)) )
              else
                st )
             shosuketa st= String.length 
              ( if (String.contains "." st) then
                ( Maybe.withDefault "" (List.head (List.reverse (String.split "." st))) )
              else
                "" )






           in
            td [style "position" "relative",style "font-size" "30px"] ([            
             adiv (8+(m1oketa-aoketa)) 1  model.ans  5         
            ,adiv 7 2   "----------"  0
            ,adiv 7 3 ")"    -5
            ,adiv 2 3   lsx2 -5
            ,adiv 8 3  rsx2 -5
            ]++sikitr)
          ]

      ]
   
     ,td [style "vertical-align" "top"]
     [
       tr [] [
         td [] [
                Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]

      ,sujibutton       
         ]

       ]
       ,tr [] [
         td [] [
           Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK Hyojun)]] [ text "標準" ]
          ,Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK Junshosu)]] [ text "商が純小数" ]
          ,Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK Junshosu100)]] [ text "商が1/100純小数" ]
         ,Button.button [Button.attrs [style "font-size" "10px"   ,onClick (TypeK HijosuSeisu)]] [ text "被除数は整数" ]
         ,Button.button [Button.attrs [style "font-size" "20px"   ,onClick Hissan]] [ text "筆算非表示" ]
         ]
       ]
       ,tr [] [
         td [] [
          Button.button [Button.attrs [style "font-size" "20px"   ,onClick Leftx]] [ text "←" ]
         ,Button.button [Button.attrs [style "font-size" "20px"   ,onClick Rightx]] [ text "→" ]
         ]
       ]
  
     ]
    ]
   ]


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)

handlerl selectedText = ChangeS selectedText "L"
handlerm selectedText = ChangeS selectedText "M"
handlerr selectedText = ChangeS selectedText "R"


toint st=  Maybe.withDefault 0 (String.toInt st) 
tofloat st = Maybe.withDefault 0 (String.toFloat st) 

waru st keta= String.fromFloat ((tofloat st)/(toFloat (10^keta)))
mojikake st1 st2 = String.fromInt ((toint st1) * (toint st2))

buttoncaption ii = 
  case ii of
    10 -> "."
    11 -> "C"
    _  -> String.fromInt ii

fst tuple =
    let
        (value1, _) = tuple
    in
    value1

snd tuple =
    let
        (_, value2) = tuple
    in
    value2

zkcut ss=String.replace "0" "" (String.replace "." "" ss)

hikuac  st ac = ac- (toint (Tuple.first st))*10^(round (logBase 10 ((toFloat ac)/(tofloat (Tuple.first st))) ) ) --マイナスならないMaxで引く

canslist sans=String.toList (zkcut sans)
