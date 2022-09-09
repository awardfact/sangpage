import React , {useRef, useEffect, useState , Component} from 'react';
import "../../css/board.css";
import axios ,{post } from 'axios';
import { Link } from 'react-router-dom';
import BoardAddInput from '../board/BoardAddInput';



function FreeBoardAddInput(props){


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


function UpdateBoardAdd(props){


    //입력 안했을떄 포커스를 주기위한 Ref
    const titleRef = useRef();
    const contentRef = useRef();
    const idRef = useRef();
    const passwordRef = useRef();



    const [boardContent , setBoardContent] = useState({
        title : '',
        content : '',
        file : '',
        fileName : '',
        id : '',
        password : '',
        boardName : 'update',
    });

    const {title, content, file,  fileName, id,  password}  = boardContent;

    const boardAddRun = () =>{
        if(!title){
            alert('제목을 입력해주세요.');
            titleRef.current.focus();
            return false;
        }

        if(!content){
            alert('내용 입력해주세요.');
            contentRef.current.focus();
            return false;
        }


        if(!props.memInfo){
            if(!id){
                alert('아이디 입력해주세요.');
                idRef.current.focus();
                return false;
            }
            if(!password){
                alert('패스워드 입력해주세요.');
                password.current.focus();
                return false;
            }
        }


        
        axios.post("/board/add_board", {
            content : boardContent,
            memInfo : props.memInfo,
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(function (response) {

            if(response.data){
                if(response.data){
                    alert('게시글 작성에 성공하였습니다.');
                     window.location.href="./update_board";
                 }else{
                     alert('게시글 작성에 실패하였습니다.');
                 }
            }

        }).catch(function (error) {
            alert('게시글 작성에 실패하였습니다.');
        });







    }


    const changeBoardInput = (e) =>{
        const { value, name } = e.target;
        setBoardContent({
            ...boardContent, 
            [name] : value
        });


    };

    

    // 파일을 입력하면 setState시킨다 
    const handleFileChange = (e) =>{

        setBoardContent({
            ...boardContent,
            file : e.target.files[0],
            fileName : e.target.value
        });


    }



    return(
        <div className="boardBox" >
            <div className="boardAddTitle" >
                수정사항 게시글 작성
            </div>

            <BoardAddInput  memInfo={props.memInfo} boardAddRun={boardAddRun} titleRef={titleRef} contentRef={contentRef} idRef={idRef} passwordRef={passwordRef}   boardContent={boardContent} changeBoardInput={changeBoardInput}  handleFileChange={handleFileChange} />
        </div>
        
    );

}




export default UpdateBoardAdd;
