module WarizanH2 exposing (..)

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

import Svg
import Svg.Attributes

main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }


type alias Model =
  { 
    hijosu:String
    ,josu:String
    ,ans:String
    ,nyuryoku:String
    ,ansdisp:Bool
    ,seed:Sd
    ,kirikae:String
    ,sublockl:List SuBlock
    ,sublocklT:List SuBlock
    ,currentIchi:(Ichi,Kt)
    ,renzoku:Int
    ,junjo:List (Ichi,Kt)
    ,jido:String
  }


type alias Sd={s1:Int,e1:Int,s2:Int,e2:Int}

type Sss=Sho|Seki|Sa|Nowhere
type Kt=K10|K1
type alias Basho={idx:Int,basho:Sss,sidx:Int,kurai:Kt}


type alias Suji=
 {
   kurai10:Char
   ,kurai1:Char
   ,ix:Int
   ,iy:Int
 }

type alias SujiL= List Suji

 


type alias SuBlock=
  {
     sho:Suji
    ,sekigyo:SujiL
    ,sagyo:SujiL
    ,idx:Int
  }

type alias Ichi= {xx:Int,yy:Int}





init : () -> (Model, Cmd Msg)
init _ =
  ( {hijosu="100",josu="2",ans="50",nyuryoku="",ansdisp=False,seed={s1=19,e1=99,s2=19,e2=99},kirikae="商をたてる"
  ,sublockl=[ {sho={kurai10='□',kurai1='?',ix=-1,iy=0},sekigyo=[{kurai10='0',kurai1='□',ix=-2,iy=1},{kurai10='0',kurai1='□',ix=-1,iy=1}],sagyo=[{kurai10='□',kurai1='□',ix=0,iy=2}],idx=1} 
             ,{sho={kurai10='□',kurai1='□',ix=0,iy=0},sekigyo=[],sagyo=[],idx=1}]
  ,sublocklT=[ {sho={kurai10='0',kurai1='5',ix=-1,iy=0},sekigyo=[{kurai10='0',kurai1='1',ix=-2,iy=1},{kurai10='0',kurai1='0',ix=-1,iy=1}],sagyo=[{kurai10='0',kurai1='0',ix=0,iy=2}],idx=1}
              ,{sho={kurai10='0',kurai1='0',ix=0,iy=0},sekigyo=[],sagyo=[],idx=1}],currentIchi=({xx=-1,yy=0},K1)
    ,renzoku=0  
    ,junjo=[({xx=-1,yy=0},K1),({xx=-2,yy=1},K1),({xx=-1,yy=1},K1),({xx=0,yy=0},K1),({xx=0,yy=2},K1)]    
    ,jido="ナビなし"    
    }
  , Cmd.none
  )

type Msg
    =  Next | Newmon (Int,Int) | Btn Int |Btn2 Sd |Kirikae |Suj (Ichi,Kt) |Jido

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let

      mhenkan i1 i2 = (i1,i2)
      monGenerator = Random.map2  mhenkan (Random.int model.seed.s1 model.seed.e1 ) (Random.int model.seed.s2  model.seed.e2 ) 
      --aru ichi,kt ni char wo set
      sbset ichi char ktx sblst=
       let
        sblst1=  List.map (\blk-> 
         let
          ichixx=ichi.xx
          ichiyy=ichi.yy    
         in
           {blk|
            sho=  {kurai1=(if (ichi.xx==blk.sho.ix && ichi.yy==blk.sho.iy) then char else blk.sho.kurai1)
                 ,kurai10=blk.sho.kurai10
                 ,ix=blk.sho.ix,iy=blk.sho.iy
                    }
            ,sekigyo= 
               let    
                 ffsb sj = {sj|kurai1= if (ichixx==sj.ix && ichiyy==sj.iy && ktx==K1 ) then char  else sj.kurai1
                              ,kurai10=  if (ichixx==sj.ix && ichiyy==sj.iy && ktx==K10 ) then char  else sj.kurai10
                           }
               in            
                 List.map  ffsb  blk.sekigyo
            ,sagyo=
               let
                 ffsbsa sjx = {sjx|kurai1= if (ichixx==sjx.ix && ichiyy==sjx.iy && ktx==K1 ) then char  else sjx.kurai1
                                ,kurai10=  if (ichixx==sjx.ix && ichiyy==sjx.iy && ktx==K10 ) then char  else sjx.kurai10
                               }
               in            
                 List.map  ffsbsa  blk.sagyo
             }   ) sblst
  
       in
          sblst1

      -- aru ichi,kt no char wo shutoku
      shutoku ichi ktxx sblst=
       let
        sblst1=  List.filterMap (\blk-> 
         let
          ichixx=ichi.xx
          ichiyy=ichi.yy    
         in
           if (ichi.xx==blk.sho.ix && ichi.yy==blk.sho.iy) then
            Just blk.sho.kurai1
           else 
            let 
             ffsb sj=    if (ichi.xx==sj.ix && ichi.yy==sj.iy ) then
                           if ktxx==K1 then
                            Just sj.kurai1
                           else if ktxx==K10 then
                            Just sj.kurai10
                           else
                            Nothing
                         else
                            Nothing

             sekij= (List.head  (List.filterMap  ffsb  blk.sekigyo))
             saj= (List.head  (List.filterMap  ffsb  blk.sagyo)) 

            in
             if sekij==Nothing then
              saj
             else if saj==Nothing then
              sekij
             else
              Nothing
                ) sblst
  
       in
             Maybe.withDefault '*'  (List.head  sblst1)

      zlSakusei sblst =                     --   List (ichi,kt) wo sakusei
       let
        sblst1=  List.map (\blk->  
            let
              shoichi= ({xx=blk.sho.ix,yy=blk.sho.iy},K1)
              sekigyoichiLo=  
               ( List.concat ( List.map  (\sj->                      
                              if (sj.kurai10=='0' || sj.kurai10=='@') then
                               [ ({xx=sj.ix ,yy=((if sj.kurai10=='@' then -1 else 1)*sj.iy)},K1)]
                              else
                                [({xx=sj.ix ,yy=sj.iy},K10),({xx=sj.ix ,yy=sj.iy},K1)]                  
                           )      (List.reverse blk.sekigyo)  ) )


              sekigyoichiL=   --最後から２番目に@があるときは、先頭と次のSujiを交換する必要がある  yy<0 でわかるようにしておく
               let
                fstSj=   List.head (List.drop ((List.length sekigyoichiLo)-1) sekigyoichiLo)
                sndSj=   List.head (List.drop ((List.length sekigyoichiLo)-2) sekigyoichiLo)
                nokoriL= List.take ((List.length sekigyoichiLo)-2) sekigyoichiLo
               in
                case (fstSj,sndSj) of
                  (Just ic1,Just ic2) -> 
                    if  (fst ic2).yy<0 then
                     nokoriL++[ic1] ++ [({xx=(fst ic2).xx  ,yy= (abs (fst ic2).yy) },(snd ic2))]
                    else
                      sekigyoichiLo                    
                  _ -> sekigyoichiLo
              
              sagyoL=
               ( List.map  (\sj->  ({xx=sj.ix ,yy=sj.iy},K1)  )  (List.reverse blk.sagyo) )
               
              
            in            
              shoichi::(sekigyoichiL++sagyoL)  
               ) (sblst  )
        in
         (List.concat sblst1)


      

      -- aru ichi,kt no ato wo shutoku
      jshutoku ichi ktxx ichiZenList=
       let
          fncc idx ichx =(idx,ichx)
          pizlst=List.indexedMap fncc ichiZenList  --List (idx,ichi)
          --一致する位置さがす
          tmpsblst= List.filter (\ixichi->(fst (snd ixichi)).xx==ichi.xx  && (fst (snd ixichi)).yy==ichi.yy  && (snd (snd ixichi))==ktxx   ) pizlst
          tmpd=  Maybe.withDefault (0,({xx=0,yy=0} ,K1))  (List.head  tmpsblst)
          --次の位置さがす
          tmpsblst2=  List.filter (\ixichi->  (fst ixichi)==((fst tmpd)+1)   ) pizlst
       in
        (snd ( Maybe.withDefault (0, ({xx=1,yy=0} ,K10) ) (List.head  tmpsblst2) )) --該当ないときは、関係ない位置指定
             
       

 in
 
  case msg of
  
   Next ->
      ( model 
       ,   Random.generate Newmon monGenerator
      )
  
   Newmon tpl ->
     let
       m1=fst tpl
       m2=snd tpl
       hij=m1*m2

       hijosuo=String.fromInt hij
       josuo=String.fromInt  m2
       anso=String.fromInt m1
       jsolen=(String.length josuo)       
       ansL=String.length anso
       
       fnChrToSbc iix ch= { --iix:sho　何文字目か 0~  
          sho={kurai10='0',kurai1=ch,ix=iix+1-ansL,iy=0}
         ,sekigyo=
            let
    
              
              sglt=  List.map   (\idx->  -- idx:josu sentokara 1~
                            let
                             kake=(toint (String.dropLeft (jsolen-idx) josuo) )* (tointc ch)
                             kakes="0"++(String.fromInt kake)
                             tmp1=String.dropRight (idx-1)  kakes
                             tmp2=String.dropRight 1 tmp1

                            in                           
                             {
                             kurai10= Maybe.withDefault '0' (List.head (String.toList (String.right 1 tmp2)))                            
                             ,kurai1= Maybe.withDefault '0' (List.head (String.toList (String.right 1 tmp1)))
                             ,ix=iix-ansL-idx+2
                             ,iy=2*iix+1
                              }
                             ) ( List.reverse (List.range 1 jsolen ) )
              hdp= Maybe.withDefault {kurai10='0',kurai1='0',ix=0,iy=0} (List.head sglt)
              hd=hdp.kurai10
              ixt=hdp.ix
              iyt=hdp.iy
              sglx=if hd=='0' then 
                    sglt 
                   else
                    {kurai10='0',kurai1=hd,ix=ixt-1,iy=iyt}::(
                      let                        
                        hdp2={hdp|kurai10='@'}     
                      in
                         hdp2::( Maybe.withDefault sglt  (List.tail sglt))
                    )
              hd2=(Maybe.withDefault {kurai10='0',kurai1='0',ix=0,iy=0} (List.head sglx) ).kurai1
              sgl=if (hd2=='0'&&jsolen>1) then (List.drop 1 sglx) else sglx

            in
             sgl
         ,sagyo=
            let
               ansLx=String.length anso
               hijos1x ke = toint  ( if ke<0 then hijosuo++"0" else (String.dropRight ke hijosuo ))                                      
               kakea idx=(toint josuo)*(toint (suchushutu (idx-1) anso))
               
               fcrx ix acc= (acc+(kakea ix))*10
               ruisekix ii= List.foldl fcrx 0  (List.range 1 (ii))
               
               hijo=hijos1x (ansLx-iix-2)
               rsx=ruisekix (iix+1)

 

               tmp=(String.fromInt ( hijo - rsx )  )
               saL=String.length tmp

               fff idx chh=  { 
                  kurai10= '0' 
                  ,kurai1=chh 
                  ,ix=iix-ansLx+idx+(if (String.length anso)==(iix+1) then 1 else (3-saL))  
                  ,iy=2* iix+2 } 
               sagl=List.indexedMap  fff  (String.toList tmp )
            in
             sagl
         ,idx=iix+1  -- 1 kara start

        }

       sbTinit=  List.indexedMap fnChrToSbc  (String.toList anso)

       

     --  sbltmp=[{sho={kurai10='0',kurai1='?',ix=0,iy=0},sekigyo=[],sagyo=[],idx=1}]

       kuhaku sblst =
        let
         sblst1=  List.map (\blk-> 

           {blk|
            sho=  {kurai1='□'
                 ,kurai10=if blk.sho.kurai10 /='0' then '□' else '0'
                 ,ix=blk.sho.ix,iy=blk.sho.iy
                    }
            ,sekigyo= 
               let    
                 ffsb sj = {sj|kurai1= '□'
                              ,kurai10=  if (sj.kurai10 /='0' && sj.kurai10 /='@') then '□'  else '0'
                           }
                 --test=Debug.log "sekigyo" blk.sekigyo
               in            
                  List.map  ffsb  blk.sekigyo
            ,sagyo=
               let
                 ffsbsa sjx = {sjx|kurai1=  '□'  
                                ,kurai10=  if sjx.kurai10 /='0' then '□'  else '0'
                               }
               in            
                 List.map  ffsbsa  blk.sagyo
             }   ) sblst  
        in
          sblst1

       junjod=zlSakusei sbTinit
       --test =Debug.log "lst:" junjod

       --sbset ichix '?' kt model.sublockl
       --saishono ?
       sqicx=Maybe.withDefault ({xx=0,yy=0},K1) (List.head junjod)
       sbltmp=if model.kirikae=="商をたてる" then 
                 sbset (fst sqicx) '?' (snd sqicx)   ( kuhaku sbTinit )
              else
                 ( kuhaku sbTinit )

     in
   
      ( {model |  hijosu = hijosuo,josu=josuo,ans=anso
      ,nyuryoku=if model.kirikae=="商をたてる" then "?" else ""
      ,sublocklT=sbTinit
      ,sublockl=sbltmp  
      ,currentIchi=sqicx
      ,ansdisp=False
      ,junjo =junjod
     
      }    ,Cmd.none)
  
   Btn si ->
    let
      mans=
        case si of
         10 -> String.dropRight 1 model.nyuryoku
         11 -> model.nyuryoku
         _ ->  (String.replace "?" "" model.nyuryoku)++(String.fromInt si)     

      ss=
        case si of
         10 -> "□"  -- Cancel
         11 -> "" -- to *  Ans
         _ ->  (String.fromInt si)


      sch=Maybe.withDefault '*' (List.head (String.toList ss))
      tsch= shutoku (fst model.currentIchi) (snd model.currentIchi) model.sublocklT

      renzokusu= if sch==tsch then (1+model.renzoku)  else  0
      
      nextic=jshutoku  (fst model.currentIchi) (snd model.currentIchi) model.junjo --次の位置を、現在の位置から求める

      tmpsblp=if sch=='*' then
              model.sublockl
             else
              sbset (fst model.currentIchi) (if (tsch==sch || sch=='□') then sch else 'x')  (snd model.currentIchi) model.sublockl


      tmpsbl= if (tsch==sch && model.jido=="ナビなし" ) then (sbset (fst nextic) '?'  (snd nextic) tmpsblp) else tmpsblp --正しいなら次の位置に？を表示
      nichi= if (tsch==sch && model.jido=="ナビなし" ) then nextic else model.currentIchi  --正しいなら、次の数字に位置を設定

    in
     ( {model |
                nyuryoku= 
                 if model.kirikae=="商をたてる" then
                  String.fromList  ( List.map (\bl-> bl.sho.kurai1  ) tmpsbl)
                 else
                  mans
                , ansdisp=if (si==11&&model.ansdisp==False) then True else False
               -- ,sublockl=model.sublocklT
                ,sublockl=tmpsbl
                ,renzoku=renzokusu
                ,currentIchi=nichi
                 } ,Cmd.none)
   Btn2 sed ->
          ( {model | seed=sed
                 } ,Cmd.none)

   Kirikae -> ({model|kirikae=if model.kirikae=="商をたてる" then "すべて計算" else "商をたてる"
    ,nyuryoku=if (model.nyuryoku=="" && model.kirikae=="商をたてる") then "?" else ""
    ,renzoku=0
    },Cmd.none)

   Jido -> ({model| jido=if model.jido=="ナビ" then "ナビなし" else "ナビ"   },Cmd.none)


   Suj tpl ->
    let
     ichix= (fst tpl  )  
     kt=snd tpl
     --   ichi de settei       


    in 
     ({model|  sublockl=sbset ichix '?' kt model.sublockl
     ,currentIchi=(ichix,kt) },Cmd.none)


view : Model -> Html Msg
view model =
 let
 
        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "40px"   ,onClick (Btn ii)]] 
         [ text (" "++(
             case ii of
              10-> "C"
              11-> "A"
              _ -> String.fromInt ii 
           
           )++" ")])

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
               ,td [title "けします"] [sbutton 10]
               ,td [title "答"] [sbutton 11]
             ]                   
            ]

        x0=70
        y0=80
        hwidth=220
        tatekankaku=53
        sj0=180

        ansL=String.length model.ans
        --hijosuL=String.length model.hijosu
        hijos1 ke = toint (
           if ke<0 then model.hijosu++"0" else (String.dropRight ke model.hijosu )                    
          )   
        kake idx=(toint model.josu)*(toint (suchushutu (idx-1) model.nyuryoku))
        fcr ix acc= (acc+(kake ix))*10
        ruiseki ii= List.foldl fcr 0 (List.range 1 ii)
       
        tochukeisanL ii= tochukL ii model.nyuryoku (String.fromInt (kake ii) ) (String.fromInt ( (hijos1 (ansL-ii-1)) - (ruiseki ii) ) )                

        optionsu ii= if (ii==(String.length model.ans) && ( (hijos1 (ansL-ii-1)) - (ruiseki ii) ) ==0 ) then -1 else 0
        tochukL ii mnyu skk shh =(rsjtext (x0+sj0) (y0-4) mnyu ((ansL-1)*(-1)) 0) ++      (sjtext (x0+sj0) (y0+44)  skk ((ansL-ii)*(-1)) (ii*2-1) )
           ++[ sline x0 (y0+2*tatekankaku*(ii)+6) (x0+hwidth) (y0+2*tatekankaku*(ii)+6) 1 "blue" ]
           ++(sjtext (x0+sj0) (y0+44)  shh (ii+(ansL-1)*(-1)+(optionsu ii)) (ii*2) ) 

        -- //////////////////////　Manual calc  //////////////////////////////////////
        optionsu2 ii= if (ii==(String.length model.ans)) then -1 else 0
        tochukL2 ii mnyu kr10 skk shh =(rsjtext (x0+sj0) (y0-4) mnyu ((ansL-1)*(-1)) 0)
           ++ (sjtext2 (x0+sj0) (y0+44) (String.dropLeft 1 (String.replace "0" "\u{00a0}" kr10)) ((ansL-ii)*(-1)) (ii*2-1) )
           ++ (sjtext1 (x0+sj0) (y0+44)  skk ((ansL-ii)*(-1)) (ii*2-1) )
           ++[ sline x0 (y0+2*tatekankaku*(ii)+6) (x0+hwidth) (y0+2*tatekankaku*(ii)+6) 1 (if shh=="" then "white" else "green") ]
           ++(sjtext1 (x0+sj0) (y0+44)  shh (ii+(ansL-1)*(-1)+(optionsu2 ii)) (ii*2) ) 
        mtochukeisanL ii= tochukL2 ii (slistToString2 model.sublockl)  (slistToString3 (sbcToSj ii).sekigyo)  (slistToString (sbcToSj ii).sekigyo)   (slistToString  (sbcToSj ii).sagyo)
        slistToString :List Suji -> String
        slistToString slst= String.fromList  ( List.map (\sj->sj.kurai1 ) slst )   
        slistToString3 slst= String.fromList  ( List.map (\sj->sj.kurai10 ) slst )        
        sbcToSj ii=(getAtx (ii-1) model.sublockl )       
        slistToString2 blst = String.fromList  ( List.map (\blk->blk.sho.kurai1 ) blst ) 


       -- mtochukeisanL ii= tochukL ii  ("aa")   ("bb")
        mcList=  (List.concat ( List.map (\xi-> mtochukeisanL xi )  (List.range 1 (List.length model.sublockl))  )) 

        -- ///////////////

        svgview=       
          Svg.svg [ Svg.Attributes.viewBox "0 0 400 600"
          , Svg.Attributes.width "480"
          , Svg.Attributes.height "600"
          ]
          (
           [
          sline x0 y0 (x0+hwidth) y0 3 "black" 
          ,stext x0 (y0+40) ")" "black" "50px"
          ,stext (x0+0) (y0+120) (if (model.ans==model.nyuryoku) then "◎" else "　") "red" "300px"
           ]++(sjtext (x0-50) (y0+44) model.josu 0 0)
           ++(sjtext (x0+sj0) (y0+44) model.hijosu 0 0)

           ++ 
            (
              case model.kirikae of
               --"すべて計算" -> (rsjtext (x0+sj0) (y0-4) model.nyuryoku ((ansL-1)*(-1)) 0) ++ (List.concat ( List.map (\xi-> tochukeisanL xi )  (List.range 1 (String.length model.nyuryoku))  )) 
               "すべて計算" -> List.concat ( List.map (\xi-> tochukeisanL xi )  (List.range 1 (String.length model.nyuryoku)))
               "商をたてる" -> mcList 
               _ -> (List.concat ( List.map (\xi-> tochukeisanL xi )  (List.range 1 (String.length model.nyuryoku))  )) 

            )
           
           
          )




        sline x1 y1 x2 y2 wd color =Svg.line
          [ Svg.Attributes.x1 (String.fromInt x1)
         , Svg.Attributes.y1 (String.fromInt y1)
         , Svg.Attributes.x2 (String.fromInt x2)
         , Svg.Attributes.y2 (String.fromInt y2)
         , Svg.Attributes.stroke color
         , Svg.Attributes.strokeWidth (String.fromInt wd)
         , Svg.Attributes.strokeLinecap "round"
          ] []
        
        stext xx yy moji color fs = Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill color   
         ,Svg.Attributes.fontSize fs    
         ]
         [ Svg.text moji
         ]
        
        stextix xx yy moji color fs ix iy kt =  Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill color   
         ,Svg.Attributes.fontSize fs    
         ,onClick (Suj ({xx=ix,yy=iy},kt))   
         ]
         [ Svg.text moji
         ]
        
        func txx tyy tdivx tdivy idx chr = stext (txx+(-idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" 
        --indexedMap : (Int -> a -> b) -> List a -> List b
        sjtext xx yy moji divx divy =
          List.indexedMap (func xx yy divx divy)  (List.reverse (String.toList moji))

        func1 txx tyy tdivx tdivy idx chr = stextix (txx+(-idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" (-idx+tdivx) tdivy K1
        sjtext1 xx yy moji divx divy =
          List.indexedMap (func1 xx yy divx divy)  (List.reverse (String.toList moji))

        func2 txx tyy tdivx tdivy idx chr = stextix (txx+(-idx+tdivx)*tatekankaku-17)   (tyy+tdivy*tatekankaku-25)  (String.fromChar chr) "black" "24px" (-idx+tdivx) tdivy K10
        sjtext2 xx yy moji divx divy =
          List.indexedMap (func2 xx yy divx divy)  (List.reverse (String.toList moji))
        
        rfunc txx tyy tdivx tdivy idx chr = stextix (txx+(idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" (idx+tdivx) tdivy K1
        rsjtext xx yy moji divx divy =
          List.indexedMap (rfunc xx yy divx divy)  (String.toList moji)
          
                  
 in

   table [align "center",Html.Attributes.title (if (model.renzoku==0 && model.jido  =="ナビ"  )then "□をクリックしてから数字をクリックしましょう" else "")]
   [
    tr []
    [
     td []
     [
       svgview
     ]
      ,
   
     td []
     [        
       if model.kirikae=="商をたてる" then 
        div [style "font-size" "20px",style "color" "green",title "まちがうと、０ポイントにもどります"] [text (if ( modBy 20 model.renzoku)==19 then 
                        if model.renzoku> 200 then
                         "すごいですね。合かく！！"
                        else if model.renzoku> 100 then
                         "すばらしい！！"
                        else if model.renzoku> 50 then
                         "その調子！！"
                        else
                         "いいですね"
                     else
                       (String.fromInt model.renzoku)++"ポイント"       
                    )]
       else
        div [] []
       ,Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
       ,sujibutton 
       ,div [] [
             Button.button [Button.attrs [style "font-size" "14px"   ,onClick Kirikae,title "計算する・しないをえらべます"]] [ text model.kirikae ]
             ,Button.button [Button.attrs [style "font-size" "14px"   ,onClick Jido,title "つぎのわくに、いどうする・しないをえらべます"]] [ text model.jido ]
            ,span [style "font-size" "40px",style "color" "red"] [text ("\u{00a0}"++(if model.ansdisp then model.ans else "　"))]
       ]      
       ,div [][
          Button.button [Button.attrs [title "１けたの数でわります",style "font-size" "16px"   ,onClick (Btn2 {s1=111,e1= 1499,s2= 2,e2= 5})]] [ text "レベル1のもんだい" ]
          ]
       ,div [] [  Button.button [Button.attrs [title "２けたの数でわり、答えは３けたです",style "font-size" "16px"   ,onClick (Btn2 {s1=111,e1= 299,s2= 11,e2= 29})]] [ text "レベル2のもんだい" ]]
       ,div [] [  Button.button [Button.attrs [title "２けたの数でわり、答えは２けたです",style "font-size" "16px"   ,onClick (Btn2 {s1=11,e1= 99 ,s2=11,e2= 99})]] [ text "レベル3のもんだい" ]]
       
     ]
    ]
   ]


subscriptions : Model -> Sub Msg
subscriptions model =  Sub.none


onChange : (String -> msg) -> Attribute msg
onChange handler =
    on "change" (Json.map handler Html.Events.targetValue)


toint st=  Maybe.withDefault 0 (String.toInt st) 
tointc ch= toint (String.fromChar ch)


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

getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs

getAtx idx xs = 
  case (getAt idx xs) of
   Nothing -> {sho={kurai10='0',kurai1='?',ix=0,iy=0},sekigyo=[],sagyo=[],idx=1}
   Just a -> a

fc idx chr = (idx,chr)
fc2 ix (idx,chr) = if ix==idx then True else False
suchushutu ic suji=String.fromList ( List.map (\tpl->(snd tpl))  (List.filter (fc2 ic)  (List.indexedMap fc  (String.toList suji) ) ) )