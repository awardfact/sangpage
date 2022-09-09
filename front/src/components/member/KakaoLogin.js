
import React , {useEffect, useState , Component , useRef} from 'react';
import axios ,{post , get } from 'axios';

function Main(props){


    // 얻어온 회원정보로 회원가입 or 로그인 
    const KakaoJoin = (response) =>{



        axios.post("/member/kakao_login", {
            data : response.data
        }).then(function (response) {
            if(response.data == 'login'){
               alert('로그인에 성공하였습니다.');
                window.location.href="../../";
            }else if(response.data == 'join'){
                alert('회원가입에 성공하였습니다');
                window.location.href="../../";
            }else{
                alert('회원가입에 실패하였습니다');
                window.location.href="../../";
            }
        }).catch(function (error) {
            alert('회원가입 또는 로그인에 실패하였습니다');
            window.location.href="../../";
        });


    }

    
    //회원의 카카오 정보를 얻어옴
    const KakaoLogin =() =>{
        let params = new URL(window.location.href).searchParams;
        let code = params.get("code");

        axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=b970182c3733856862078f55331c8ba4&redirect_uri=https://sangpage.com/member/kakao_login&code=${code}`
        ).then(function (response) {
            axios.get(`https://kapi.kakao.com/v2/user/me`,
            {
                headers: {
                    "Content-Type": "KakaoAK b970182c3733856862078f55331c8ba4 ",
                    "Authorization" : `Bearer ${response.data.access_token}`,
                }
            }
            ).then(function (response) {
                KakaoJoin(response);
            }).catch(function (error) {
            //  console.log(error);
            });


        }).catch(function (error) {
        //  console.log(error);
        });
    }

    KakaoLogin();








    

    return(
        <div className="mainBox">
            로그인 또는 회원가입 진행중입니다...
        </div>
    );
}




export default Main;
