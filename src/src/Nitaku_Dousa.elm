port module Nitaku_Dousa exposing (..)

import Browser
import Html.Attributes
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http


import Url
import Platform.Cmd

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Utilities.Spacing as Spacing

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Form as Form



type alias Toi =
    { img1:String,
      img2:String,
      mondai:String 
    }

shutudaiL=[ {obj= {img1="tatu",img2="suwaru",mondai="たつ"},img="tatu"  }
           , {obj= {img1="suwaru",img2="tatu",mondai="すわる"},img="swaru"  }
         , {obj={img1="neru",img2="osu",mondai="ねる"},img="neru"  }
         ,  {obj={img1="kiru",img2="osu",mondai="おす"},img="osu"  }
         , {obj={img1="hakobu",img2="kiru",mondai="きる"},img="kiru"  }
         , {obj= {img1="hakobu",img2="motu",mondai="はこぶ"},img="hakobu"  }
         ,  {obj={img1="motu",img2="keru",mondai="もつ"},img="motu"  }
        , {obj= {img1="shagamu",img2="korobu",mondai="しゃがむ"},img="shagamu"  }
         , {obj= {img1="kaku",img2="keru",mondai="ける"},img="keru"  }
        , {obj={img1="aruku",img2="kaku",mondai="かく"},img="kaku"  }
         ,  {obj={img1="korobu",img2="yaburu",mondai="ころぶ"},img="korobu"  }
         , {obj= {img1="aruku",img2="oru",mondai="あるく"},img="aruku"  }
         , {obj= {img1="kiru",img2="yaburu",mondai="やぶる"},img="yaburu"  }
         , {obj= {img1="kiru",img2="oru",mondai="おる"},img="oru"  }
         

          ]

 
 
shutudai num= 
   let
     ltail=List.drop num shutudaiL
     tmpl=List.head ltail
     tobj=Maybe.withDefault  {obj={img1="",img2="",mondai=""},img=""} tmpl
   in
     tobj.obj





fsearch ig obj =  (obj.img==ig)

zenkaku hk = 
   let
     lfilter=List.filter (fsearch hk)  shutudaiL
     tmpl=List.head lfilter
     tobj=Maybe.withDefault  {obj={img1="",img2="",mondai=""},img=""} tmpl

   in         
     tobj.obj.mondai


getAt : Int -> List a -> Maybe a
getAt idx xs =
    if idx < 0 then
        Nothing

    else
        List.head <| List.drop idx xs

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none  
        }
        

-- MODEL
type alias Model =
    { 
        num:Int,
        toi:Toi,
        seikaiflg:Bool,
        flghyoji:Bool
    }
 


minit: Model
minit =Model 0  {img1="tatu",img2="suwaru",mondai="たつ"} False False

init : () -> ( Model, Cmd Msg )
init _ = ( minit  ,Cmd.none   )



-- UPDATE

type Msg =  Inc |  StartSound |StartSound2 |Btn1 | Btn2 | BtnMondai 


port handleMsg: (String->msg) -> Sub msg
port startSound: () -> Cmd msg
port startSound2: () -> Cmd msg

port speak: String -> Cmd msg




update : Msg -> Model -> (Model,Cmd Msg)
update msg model=
  let 
    sflg1=if model.toi.mondai==(zenkaku model.toi.img1) then True else False
    sflg2=if model.toi.mondai==(zenkaku model.toi.img2) then True else False    
  in
  case msg of
    Inc -> ({model|num=if model.num<((List.length shutudaiL)-1) then model.num+1 else 1 ,toi=shutudai model.num,flghyoji=False},speak((shutudai model.num).mondai++"は、どれかな"))
   --Dec -> ({model|num=if model.num>0 then model.num-1 else 9 ,toi=shutudai model.num,flghyoji=False},speak((shutudai model.num).mondai++"を、えらんでください"))

    Btn1 -> ({model|
                seikaiflg=sflg1

               ,num=if sflg1 then (if model.num<((List.length shutudaiL)-1) then model.num+1 else 1 ) else model.num
               ,toi=if sflg1 then (shutudai model.num) else model.toi
               ,flghyoji=if sflg1 then False else True
               
               } ,
            --Cmd.none

            if sflg1 then
           --  Cmd.batch [startSound() , speak((shutudai model.num).mondai++"わ、どれ？")]
              startSound() 
             
             
            else
              --Cmd.batch [startSound2() ,speak((shutudai (model.num-1)).mondai++"わ、どれ？")]
               startSound2() 
            )


    Btn2 -> ({model|
              seikaiflg=   sflg2      
              
               ,num=if sflg2 then (if model.num<((List.length shutudaiL)-1) then model.num+1 else 1 ) else model.num
               ,toi=if sflg2 then (shutudai model.num) else model.toi
               ,flghyoji=if sflg2 then False else True
             
              } ,
           --Cmd.none
           if sflg2 then 
           -- Cmd.batch [startSound() ,speak((shutudai model.num).mondai++"わ、どれ？")]
               startSound() 
           else 
           -- Cmd.batch [startSound2() ,speak((shutudai (model.num-1)).mondai++"わ、どれ？")]
          startSound2() 
           )

    BtnMondai -> (model,
                speak((shutudai (model.num-1)).mondai++"わ、どれ？")
                 )

    StartSound -> (model,startSound())
    StartSound2 -> (model,startSound2())





-- VIEW

view : Model -> Html Msg
view model =
  let  
    
   -- btn1=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Dec]] [ text "←" ]
    btn2=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick Inc]] [text "→"]
    btnMondai=Button.button [Button.large ,Button.primary ,Button.attrs [Spacing.m1  ,onClick BtnMondai]] [text (model.toi.mondai)]
    marubatu=span [style "font-size" "10vw",style "color" (if model.seikaiflg then "red" else "blue")] [text (if model.seikaiflg then "〇" else "ｘ")]

  in

      

    Grid.container [Spacing.mt4Md]
    [ CDN.stylesheet 
      ,Grid.row 
        []
        [      
           Grid.col
          []
          [
            div [style "text-align" "center"]
             [ btnMondai
             ]           
          ]            
        ]
      
      ,Grid.row
        [Row.middleMd]
        [ Grid.col
            []
            [ img [src ("https://rasp.cld9.work/py/"++model.toi.img1++(if (String.contains ".gif" model.toi.img1) then "" else ".jpg")),onClick Btn1,style "width" "25vw"] []  ]
          , Grid.col
            [ ]
           [ div [] [if model.flghyoji then marubatu else (span [] []) ] ]
        , Grid.col
            [  ]
           [ img [src ("https://rasp.cld9.work/py/"++model.toi.img2++(if (String.contains ".gif" model.toi.img2) then "" else ".jpg")),onClick Btn2,style "width" "25vw"] []  ]
    
       
        ]
    
    ]

