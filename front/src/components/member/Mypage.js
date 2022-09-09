
import React , {useEffect, useState , Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import axios ,{post } from 'axios';



import { Link } from 'react-router-dom';

function Mypage(props){

        // state선언
        const [memContent , setMemContent] = useState({
            id : '',
            isAdmin : '',
            name :'',
            cellPhone : '',
            email : '',
            gender :'',
            birthday : '',
            grade : ''
        });

        





    useEffect( () => { 

        setMemContent(props.memInfo);
        if(!props.memInfo){
            alert('회원 전용 페이지입니다.');
            window.location.href="../../";
        }
    });

    


    const {id , isAdmin , name , cellPhone , email ,gender , birthday , grade} = memContent;


    return(
        <div className="mypageBox">
            <div className="mypageContent">{props.memInfo ? props.memInfo.memId + '님 환영합니다!' : '로그인해주세요.'}</div>
            <div className="mypageGrade">회원등급 : {isAdmin == 1 ? '관리자' : grade }</div>
            <Link className="updateMember" to="/member/member_update" >회원정보 수정</Link>
        </div>
    );
}




export default Mypage;
