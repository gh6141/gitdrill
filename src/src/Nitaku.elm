port module Nitaku exposing (main)

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

shutudaiL=[ {obj= {img1="suika",img2="taburetto",mondai="すいか"},img="suika"  }
           , {obj= {img1="meron",img2="mikan",mondai="みかん"},img="mikan"  }
         , {obj={img1="ringo",img2="tamago",mondai="りんご"},img="ringo"  }
         ,  {obj={img1="budo",img2="taiikukan",mondai="ぶどう"},img="budo"  }
         , {obj={img1="youtube",img2="taiikukan",mondai="たいいくかん"},img="taiikukan"  }
         , {obj= {img1="youtube",img2="budo",mondai="ゆーちゅーぶ"},img="youtube"  }
         ,  {obj={img1="tamago",img2="ringo",mondai="たまご"},img="tamago"  }
        , {obj= {img1="mikan",img2="taburetto",mondai="たぶれっと"},img="taburetto"  }
         , {obj= {img1="suika",img2="meron",mondai="めろん"},img="meron"  }

 , {obj={img1="terebi",img2="hasi",mondai="はし"},img="hasi"  }
  , {obj={img1="terebi",img2="kuruma",mondai="てれび"},img="terebi"  }
   , {obj={img1="kuruma",img2="saihu",mondai="くるま"},img="kuruma"  }
    , {obj={img1="saihu",img2="tukue",mondai="さいふ"},img="saihu"  }
     , {obj={img1="isu",img2="tukue",mondai="いす"},img="isu"  }
        , {obj={img1="tukue",img2="hasi",mondai="つくえ"},img="tukue"  }


        , {obj={img1="pull.gif",img2="run.gif",mondai="ひっぱる"},img="pull.gif"  }
         ,  {obj={img1="great.gif",img2="carry.gif",mondai="はこぶ"},img="carry.gif"  }
         , {obj= {img1="worry.gif",img2="kowai.gif",mondai="こわい"},img="kowai.gif"  }
         , {obj= {img1="iraira.gif",img2="walk.gif",mondai="いらいら"},img="iraira.gif"  }
         ,  {obj={img1="run.gif",img2="walk.gif",mondai="あるく"},img="walk.gif"  }
         , {obj={img1="iraira.gif",img2="worry.gif",mondai="しんぱい"},img="worry.gif"  }
         ,  {obj={img1="great.gif",img2="carry.gif",mondai="すごい"},img="great.gif"  }
         , {obj={img1="pull.gif",img2="run.gif",mondai="はしる"},img="run.gif"  }

         , {obj={img1="tukareru",img2="kanasii",mondai="かなしい"},img="kanasii"  }
         , {obj={img1="tanosii",img2="kanasii",mondai="たのしい"},img="tanosii"  }
         , {obj={img1="konbanha",img2="tukareru",mondai="つかれる"},img="tukareru"  }
         , {obj={img1="ohayo",img2="sayounara",mondai="さようなら"},img="sayounara"  }
         , {obj={img1="ohayo",img2="konbanha",mondai="こんばんは"},img="konbanha"  }
         , {obj={img1="sayounara",img2="ohayo",mondai="おはようございます"},img="ohayo"  }

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
minit =Model 0  {img1="meron",img2="suika",mondai="すいか"} False False

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

