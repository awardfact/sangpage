
import React , {useRef, useEffect, useState , Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import "../css/header.css";
import axios ,{post } from 'axios';



import { Link } from 'react-router-dom';


// 헤더의 회원정보쪽 
function HeaderMemeber(props){
    return(
        <>
        {  props.memInfo ?  
            <div className="menuMember">
                <Link className="menuMypage" to="/member/mypage" >마이페이지</Link>
                <div className="menuLogout"  onClick={props.Logout}  >로그아웃</div>
            </div>
            :
            <div className="menuMember">
                <Link className="menuLogin" to="/member/login" >로그인</Link>
                <Link className="menuJoin" to="/member/join_start" >회원가입</Link>
            </div>
        }
        </>

    );
}

//게시판 메뉴
function BoardMenu(props){


    const boardRef = useRef();



    return(
        <div  className="menu"  >
            <div className="menuTitle" onMouseEnter={ (e) => {
                boardRef.current.classList.remove('dpn');

            }}  >게시판</div>
            <div className="subMenuBox dpn" ref={boardRef} id="board" > 
                <Link className="subMenu" to="/board/update_board" >수정사항</Link>
                <Link className="subMenu" to="/board/free_board" >자유게시판</Link>
            </div>
        </div>
    );
}


function Header(props){


    //로그아웃 실행 
    const Logout= () =>{
        axios.post("/member/logout").then(function (response) {
            if(response.data){
               alert('로그아웃되었습니다.');
                window.location.href="../";
            }else{
                alert('로그아웃에 실패하였습니다.');
            }
        
        }).catch(function (error) {
            alert('로그아웃에 실패하였습니다');
        });

    }


    return(
        <div className="header">
            <a href="/" className="logo"  ></a>
            <div className="headerRight">
                <div className="menuBox">
                    <BoardMenu  />
                    <div className="menu" >메뉴2</div>
                    <div className="menu" >메뉴3</div>
                    <div className="menu" >메뉴4</div>
                    <div className="menu" >메뉴6</div>                
                </div>
            </div>
            
            
            <HeaderMemeber memInfo={props.memInfo}  Logout={Logout}  />


            



        </div>
    );
}




export default Header;
