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
  ( {hijosu="100",josu="2",ans="50",nyuryoku="",ansdisp=False,seed={s1=19,e1=99,s2=19,e2=99},kirikae="AC"
  ,sublockl=[ {sho={kurai10='□',kurai1='□',ix=0,iy=0},sekigyo=[],sagyo=[],idx=1} ]

  ,sublocklT=[]}
  , Cmd.none
  )

type Msg
    =  Next | Newmon (Int,Int) | Btn Int |Btn2 Sd |Kirikae |Suj Ichi

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
 let

      mhenkan i1 i2 = (i1,i2)
      monGenerator = Random.map2  mhenkan (Random.int model.seed.s1 model.seed.e1 ) (Random.int model.seed.s2  model.seed.e2 ) 
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
                             ,ix=iix-ansL-idx
                             ,iy=2*iix-1
                              }
                             ) ( List.reverse (List.range 1 jsolen ) )
              hd=(Maybe.withDefault {kurai10='0',kurai1='0',ix=0,iy=0} (List.head sglt)).kurai10
              sglx=if hd=='0' then sglt else {kurai10='0',kurai1=hd,ix=0,iy=0}::sglt
              hd2=(Maybe.withDefault {kurai10='0',kurai1='0',ix=0,iy=0} (List.head sglx) ).kurai1
              sgl=if hd2=='0' then (List.drop 1 sglx) else sglx

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

              -- yxx=Debug.log "hij=" hijo
              -- xx=Debug.log "rsx=" rsx

               tmp=(String.fromInt ( hijo - rsx )  )

               fff idx chh=  {  kurai10= '0'  ,kurai1=chh ,ix=iix-ansL+1-idx  ,iy=2* iix } 
               sagl=List.indexedMap  fff  (String.toList tmp )
            in
             sagl
         ,idx=iix+1  -- 1 kara start

        }

       sbTinit=  List.indexedMap fnChrToSbc  (String.toList anso)

       

       sbltmp=[{sho={kurai10='0',kurai1='?',ix=0,iy=0},sekigyo=[],sagyo=[],idx=1}]



     in
   
      ( {model |  hijosu = hijosuo,josu=josuo,ans=anso
      ,nyuryoku=if model.kirikae=="AC" then "?" else ""
      ,sublocklT=sbTinit
      ,sublockl=sbltmp      
       ,ansdisp=False

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
         10 -> "?"  -- Cancel
         11 -> "" -- to *  Ans
         _ ->  (String.fromInt si)


      sch=Maybe.withDefault '*' (List.head (String.toList ss))


    in
     ( {model |
                nyuryoku= 
                 if model.kirikae=="AC" then
                  String.fromList  ( List.map (\bl-> bl.sho.kurai1  ) model.sublockl)
                 else
                  mans
                , ansdisp=if si==11 then True else model.ansdisp
                ,sublockl=model.sublocklT
 
                 } ,Cmd.none)
   Btn2 sed ->
          ( {model | seed=sed
                 } ,Cmd.none)

   Kirikae -> ({model|kirikae=if model.kirikae=="AC" then "MC" else "AC"
    ,nyuryoku=if (model.nyuryoku=="" && model.kirikae=="AC") then "?" else ""
    },Cmd.none)

   Suj ichix ->
    let
     --   ichi de settei
     sbset ichi char sblst=
       let
        sblst1=  List.map (\blk-> 
          let 


          in
           {blk|sho={kurai1=(if (ichi.xx==blk.sho.ix && ichi.yy==blk.sho.iy) then char else blk.sho.kurai1),kurai10=blk.sho.kurai10,ix=blk.sho.ix ,iy=blk.sho.iy } }   ) sblst
  
       in
          sblst1

    in 
     ({model| 
              ,sublockl=sbset ichix '■' model.sublocklT

      },Cmd.none)


view : Model -> Html Msg
view model =
 let
 
        sbutton : Int -> Html Msg
        sbutton ii = (Button.button [Button.attrs [style "font-size" "40px"   ,onClick (Btn ii)]] 
         [ text (" "++(
             case ii of
              10-> "C"
              11-> "答"
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
               ,td [] [sbutton 10]
               ,td [] [sbutton 11]
             ]                   
            ]

        x0=100
        y0=80
        hwidth=200
        tatekankaku=44

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
        tochukL ii mnyu skk shh =(rsjtext (x0+150) (y0-4) mnyu ((ansL-1)*(-1)) 0) ++      (sjtext (x0+150) (y0+44)  skk ((ansL-ii)*(-1)) (ii*2-1) )
           ++[ sline x0 (y0+2*tatekankaku*(ii)+6) (x0+hwidth) (y0+2*tatekankaku*(ii)+6) 1 "blue" ]
           ++(sjtext (x0+150) (y0+44)  shh (ii+(ansL-1)*(-1)+(optionsu ii)) (ii*2) ) 

        -- //////////////////////　Manual calc  //////////////////////////////////////
        optionsu2 ii= if (ii==(String.length model.ans)) then -1 else 0
        tochukL2 ii mnyu kr10 skk shh =(rsjtext (x0+150) (y0-4) mnyu ((ansL-1)*(-1)) 0)
           ++ (sjtext2 (x0+150) (y0+44) (String.dropLeft 1 (String.replace "0" "\u{00a0}" kr10)) ((ansL-ii)*(-1)) (ii*2-1) )
           ++ (sjtext1 (x0+150) (y0+44)  skk ((ansL-ii)*(-1)) (ii*2-1) )
           ++[ sline x0 (y0+2*tatekankaku*(ii)+6) (x0+hwidth) (y0+2*tatekankaku*(ii)+6) 1 (if shh=="" then "white" else "green") ]
           ++(sjtext1 (x0+150) (y0+44)  shh (ii+(ansL-1)*(-1)+(optionsu2 ii)) (ii*2) ) 
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
           ++(sjtext (x0+150) (y0+44) model.hijosu 0 0)

           ++ 
            (
              case model.kirikae of
               --"MC" -> (rsjtext (x0+150) (y0-4) model.nyuryoku ((ansL-1)*(-1)) 0) ++ (List.concat ( List.map (\xi-> tochukeisanL xi )  (List.range 1 (String.length model.nyuryoku))  )) 
               "MC" -> List.concat ( List.map (\xi-> tochukeisanL xi )  (List.range 1 (String.length model.nyuryoku)))
               "AC" -> mcList 
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
        
        stextix xx yy moji color fs ix iy =  Svg.text_
         [ Svg.Attributes.x (String.fromInt xx)
         , Svg.Attributes.y (String.fromInt yy)
         , Svg.Attributes.fill color   
         ,Svg.Attributes.fontSize fs    
         ,onClick (Suj {xx=ix,yy=iy})   
         ]
         [ Svg.text moji
         ]
        
        func txx tyy tdivx tdivy idx chr = stext (txx+(-idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" 
        --indexedMap : (Int -> a -> b) -> List a -> List b
        sjtext xx yy moji divx divy =
          List.indexedMap (func xx yy divx divy)  (List.reverse (String.toList moji))

        func1 txx tyy tdivx tdivy idx chr = stextix (txx+(-idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" (-idx+tdivx) tdivy
        sjtext1 xx yy moji divx divy =
          List.indexedMap (func1 xx yy divx divy)  (List.reverse (String.toList moji))

        func2 txx tyy tdivx tdivy idx chr = stextix (txx+(-idx+tdivx)*tatekankaku-20)   (tyy+tdivy*tatekankaku-22)  (String.fromChar chr) "black" "24px" (-idx+tdivx) tdivy
        sjtext2 xx yy moji divx divy =
          List.indexedMap (func2 xx yy divx divy)  (List.reverse (String.toList moji))
        
        rfunc txx tyy tdivx tdivy idx chr = stextix (txx+(idx+tdivx)*tatekankaku)   (tyy+tdivy*tatekankaku)  (String.fromChar chr) "black" "46px" (idx+tdivx) tdivy
        rsjtext xx yy moji divx divy =
          List.indexedMap (rfunc xx yy divx divy)  (String.toList moji)
          
                  
 in

   table [align "center"]
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
                Button.button [Button.attrs [style "font-size" "30px"   ,onClick Next]] [ text "つぎへ" ]
                   ,
       sujibutton 
       ,div [] [
             Button.button [Button.attrs [style "font-size" "30px"   ,onClick Kirikae]] [ text model.kirikae ]
       ]      
       ,div [style "font-size" "40px"] [text (if model.ansdisp then model.ans else "　")]
       ,div [][
          Button.button [Button.attrs [style "font-size" "16px"   ,onClick (Btn2 {s1=111,e1= 1499,s2= 2,e2= 5})]] [ text "*/1=4" ]
         , Button.button [Button.attrs [style "font-size" "16px"   ,onClick (Btn2 {s1=11,e1= 99 ,s2=11,e2= 99})]] [ text "*/2=2" ]
         , Button.button [Button.attrs [style "font-size" "16px"   ,onClick (Btn2 {s1=111,e1= 299,s2= 11,e2= 29})]] [ text "*/2=3" ]
       ]
       
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