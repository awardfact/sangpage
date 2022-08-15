import React , { useRef, useEffect, useState , Component} from 'react';
import axios ,{post } from 'axios';

function Login(){

    //입력 안했을떄 포커스를 주기위한 Ref
    const idRef = useRef();
    const passwordRef = useRef();


    // state선언
    const [loginContent , setLoginContent] = useState({
        id : '',
        password : '',
    });

    const kakaoLogin = (e)=>{
        window.location.href="https://kauth.kakao.com/oauth/authorize?client_id=b970182c3733856862078f55331c8ba4&redirect_uri=https://sangpage.com/member/kakao_login&response_type=code";
    }
            
    // 텍스트 입력 변경했을 때 
    const changeInputText = (e) =>{

        const { value, name } = e.target;

        setLoginContent({
            ...loginContent, 
            [name] : value
        });
        
    }


    
        //로그인  실행 
        const loginRun = () =>{


            if(!id){
                alert('아이디를 입력해주세요.');
                idRef.current.focus();
                return false;
            }

            if(!password){
                alert('패스워드를 입력해주세요.');
                passwordRef.current.focus();
                return false;
            }


            axios.post("/member/login", {
                data : loginContent
            }).then(function (response) {
                if(response.data){
                   alert('로그인에 성공하였습니다.');
                    window.location.href="../../";
                }else{
                    alert('로그인에 실패하였습니다');
                }
            
            }).catch(function (error) {
                alert('로그인에 실패하였습니다');
            });




        }



    const {id, password}  = loginContent;

    return(
        <div className="loginBox">
            <div className="loginInputContent">
                <div className="joinInputTitle" >아이디</div>: 
                <input type="text" name="id" ref={idRef}  placeholder="아이디를 입력해주세요."    onChange={changeInputText}  value={id} />
            </div>
            <div className="loginInputContent">
                <div className="joinInputTitle" >패스워드</div>: 
                <input type="password" name="password"  ref={passwordRef}   placeholder="패스워드를 입력해주세요."   onChange={changeInputText} value={password}   />
            </div>

            
            <div className="loginBtnBox">
                <div  className="loginBtn"  onClick={loginRun}  >로그인</div>
                <div className="kakaoLoginBtn" onClick={kakaoLogin}>카카오톡 로그인</div>
            </div>
            


        </div>
    );
}




export default Login;
