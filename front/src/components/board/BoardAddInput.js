import React , {useRef, useEffect, useState , Component} from 'react';
import "../../css/board.css";
import axios ,{post } from 'axios';
import { Link } from 'react-router-dom';


function BoardAddInput(props){


    return(

        <div className="boardAddBox">
            <div>제목</div>
            <input  className="boardAddTitle" ref={props.titleRef} type="text"  name="title" value={props.title}  onChange={props.changeBoardInput}   ></input>
            <div>파일첨부</div>
            <input className="boardAddFile" accept="image/*"  type="file" name="file"  file={props.file}  value={props.fileName}  onChange={props.handleFileChange}  />
            <div>내용</div>
            <textarea className="boardAddContent" ref={props.contentRef}  name="content" value={props.content}  onChange={props.changeBoardInput}  ></textarea>


            {props.memInfo ? 
            ''
            : 

            <div>
                <div>비회원으로 게시글을 작성하려면 아이디와 패스워드를 입력해야 합니다.</div>
                <div>아이디</div>
                <input   ref={props.idRef} type="text"  name="id" value={props.id}  onChange={props.changeBoardInput}   ></input><br/>
                <div>패스워드</div>
                <input   ref={props.passwordRef} type="password"  name="password" value={props.password}  onChange={props.changeBoardInput}   ></input><br/>
            </div>
            }

            <div className="boardAddBtnBox" >
                <button className="boardAddRun" onClick={props.boardAddRun} >작성하기</button>
                <Link className="boardAddCanel" to="/board/free_board" >작성취소</Link>
            </div>
            
        </div>


    );


}
export default BoardAddInput;
