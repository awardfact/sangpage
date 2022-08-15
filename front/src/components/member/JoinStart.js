
import React , {useEffect, useState , useReducer , Component} from 'react';
import "../../css/member.css";
import { Link } from 'react-router-dom';
import axios ,{post , get } from 'axios';

function JoinStart(){

    // state선언
    const [type , setType] = useState({
        agree1 : false,
        agree2 : false,
        joinType : ''
    });

    const {agree1, agree2 , joinType}  = type;

    // 동의항목에 동의했을때 이벤트 
    const agreeClick = (e) => {
        let nextType = type;
        nextType[e.target.name]  = e.target.checked;
        setType(nextType);
    };



    // 페이지 회원가입 실행했을때 동의항목 동의 안했으면 preventEvent
    const pageJoin = (e) =>{
        if(!type.agree1 || !type.agree2){

            alert('회원약관에 동의해주세요.');
            e.preventDefault();
        } 

    }


    const kakaoJoin = (e)=>{
        if(type.agree1 || type.agree2){
            window.location.href="https://kauth.kakao.com/oauth/authorize?client_id=b970182c3733856862078f55331c8ba4&redirect_uri=https://sangpage.com/member/kakao_login&response_type=code";
        }else{
            alert('회원약관에 동의해주세요.');
        }
    }


    return(
        <div className="joinStartBox">

            <div className="agreeBox">
                <div className="agreeContent">
                    <div className="agreeText">회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관회원약관</div>
                    <div className="agreeCheck">회원약관을 모두 읽어보았고 회원약관에 동의합니다.<input type="checkbox" name="agree1" onClick={agreeClick} value={type.agree1} /></div>
                </div>
                <div className="agreeContent">
                    <div className="agreeText">회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2회원약관2</div>
                    <div className="agreeCheck">회원약관2를 모두 읽어보았고 회원약관에 동의합니다.<input type="checkbox" name="agree2"  onClick={agreeClick} value={type.agree2}  /></div>
                </div>
            </div>


            <div className="joinStartBtnBox">
                <Link to="/member/join" className="joinPage"  onClick={pageJoin}>회원가입</Link>
                <div className="joinKakao"  onClick={kakaoJoin}  >카카오톡 회원가입</div>
            </div>
            
        </div>
    );
}




export default JoinStart;
