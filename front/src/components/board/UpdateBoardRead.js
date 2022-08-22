import React , {useRef, useEffect, useState , Component} from 'react';
import "../../css/board.css";
import axios ,{post } from 'axios';
import { Link, useSearchParams , useLocation } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';



/*
게시글 수정 컴포넌트 
글 작성과 유사한 형태로 수정란이 출력된다 
*/
function BoardAddInput(props){





    return(

        <div className="boardAddBox">
            <div>제목</div>
            <input  className="boardAddTitle" ref={props.titleRef} type="text"  name="boardTitle" value={props.boardContent.boardTitle}  onChange={props.changeBoardInput}   />
            <div>파일첨부</div>
            <input className="boardAddFile" accept="image/*"  type="file" name="file"  file={props.boardContent.file}  value={props.fileName}  onChange={props.handleFileChange}  />
            { props.boardSet.isFile ? 
                <>
                <img src={`/image/board/${props.boardContent.uploadFile}`} /><br/>
                </> : " "
            }
            <div>내용</div>
            <textarea className="boardAddContent" ref={props.contentRef}  name="boardContent" value={props.boardContent.boardContent}  onChange={props.changeBoardInput}  ></textarea>

            { props.boardSet.isNoMember ? 
            <div>
                <div>비회원으로 게시글을 작성하려면 아이디와 패스워드를 입력해야 합니다.</div>
                <div>아이디</div>
                <input   ref={props.idRef} type="text"  name="writerNm" value={props.boardContent.writerNm}  onChange={props.changeBoardInput}   /><br/>
                <div>패스워드</div>
                <input   ref={props.passwordRef} type="password"  name="password" value={props.boardContent.password}  onChange={props.changeBoardInput}   /><br/>

            </div>

            : "" }

            <div className="boardAddBtnBox" >
                <button className="boardAddRun" onClick={props.boardUpdateRun} >수정하기</button>
                <div className="boardAddCanel"  data-state="read" onClick={props.readStateChange} >수정취소</div>
            </div>
            
        </div>


    );


}

/*
게시판 내용 컴포넌트 
상단에 제목 작성자 작성일을 출력하고 업로드한 이미지와 글 내용 출력, 수정,삭제가 가능한 경우에는 수정,삭제 버튼이 출력된다 
*/
function BoardReading(props){



         

    return(
        <div className="boardReadBox">

            <div className="boardReadTop">
                <div  className="boardReadTitle"     >{props.boardContent.boardTitle}</div>
                <div  className="boardReadWriter"     >작성자 : {props.boardContent.writerNm}</div>
                <div  className="boardReadCreate"     >작성일 : {props.boardContent.createdAt}</div>
            </div>

            <div  className="boardReadContent"     >
                { props.boardSet.isFile ? 
                <>
                <br/>
                <img src={`/image/board/${props.boardContent.uploadFile}`} /><br/>
                </> : " "
                }
                {props.boardContent.boardContent}
                
            </div>


            <div className="boardReadBottom">
            <div className="boardHit">조회수 : {props.boardContent.hit}</div>
                <Link className="board_read_link" to="/board/update_board" >글 목록</Link>

                { props.boardSet.isAdmin === 1 || props.boardSet.isWriter === 1 ? 
                    <div  className="boardReadUpdate" data-state="update" onClick={props.readStateChange}    >수정하기</div>
                : '' }
                { props.boardSet.isAdmin !== 1 &&  props.boardSet.isNoMember === 1 ? 
                    <div  className="boardReadUpdate" data-state="updatePassword" onClick={props.readStateChange}    >수정하기</div>
                : '' }

                { props.boardSet.isAdmin === 1 || props.boardSet.isWriter === 1 ? 
                    <div  className="boardReadDelete" data-state="delete" onClick={props.readStateChange}    >삭제하기</div>
                : '' }
                { props.boardSet.isAdmin !== 1 &&  props.boardSet.isNoMember === 1 ? 
                    <div  className="boardReadDelete" data-state="deletePassword" onClick={props.readStateChange}    >삭제하기</div>
                : '' }
                
            </div>

        </div>
    );
}


// 게시글 삭제 여부 확인 컴포넌트 
function DeleteCheck(props){
    return(
        <div>
            <Dialog open={true}  >
                <DialogTitle>{ props.readState == 'delete' 
                ? <span>정말 게시글을 삭제하시겠습니까??</span>
                : <span>정말 댓글을 삭제하시겠습니까??</span>
                }</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions >
                    <div className="boardDeleteBox">
                        <div className="passwordCheckRun"  variant="contained" color="primary"  onClick={props.deleteRun}  >삭제</div>
                        <div className="passwordCheckExit"  variant="outlined" color="primary" data-state="read" onClick={props.readStateChange}    >닫기</div>
                    </div>

                    
                </DialogActions>
            </Dialog>
        </div>

    );
}



/*
게시글 컴포넌트 
게시글 보기 , 게시글 수정 , 게시글 삭제 , 댓글 달기 기능이 있다
*/
function UpdateBoardRead(props){





    //get에있는 보드번호 가져오기
    const search = useLocation().search;
    const boardNo = new URLSearchParams(search).get('boardNo');



    //입력 안했을떄 포커스를 주기위한 Ref
    const titleRef = useRef();
    const contentRef = useRef();



    //state설정 상태 state, 게시글 state , 권한 state , 댓글 state
    const [readState, setReadState] = useState('read');

    const [boardContent , setBoardContent] = useState({
        title : '',
        content : '',
        file : '',
        fileName : '',
        id : '',
        password : '',
        boardName : 'free',
    });
    const [boardSet , setBoardSet] = useState({
        isFile : 0,
        isAdmin : 0,
        isWriter : 0,
        isNoMember : 0,
        memNo : null,
    });



    const {title, content, file,  fileName, id,  password}  = boardContent;



    //게시글 상태 변경 
    const readStateChange = (e) =>{
        setBoardContent({
            ...boardContent,
            password : '',
        });
        setReadState(e.target.dataset.state);
    }



    //게시글 삭제 
    const deleteRun = (e) =>{
        axios.post("/board/delete_board", {
            data : boardContent,
        }
        ).then(function (response) {

            if(response.data){
                alert('게시글 삭제에 성공했습니다.');
                window.location.href="../board/update_board";
            }else{
                alert('게시글 삭제에 실패했습니다.');
            }

        }).catch(function (error) {
            alert('게시글 삭제에 실패했습니다.');
        });
    }


    //게시글 추가 
    const boardUpdateRun = () =>{
        if(!boardContent.boardTitle){
            alert('제목을 입력해주세요.');
            titleRef.current.focus();
            return false;
        }

        if(!boardContent.boardContent){
            alert('내용 입력해주세요.');
            contentRef.current.focus();
            return false;
        }



        
        axios.post("/board/update_board", {
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
                    alert('게시글 수정에 성공하였습니다.');
                     window.location.reload();
                 }else{
                     alert('게시글 수정에 실패하였습니다.');
                 }
            }

        }).catch(function (error) {
            alert('게시글 수정에 실패하였습니다.');
        });

    }




    //게시글 수정하면 실행 
    const changeBoardInput = (e) =>{


        const { value, name } = e.target;

        setBoardContent({
            ...boardContent, 
            [name] : value
        });
    };





    //권한 state설정 함수 
    const setBoard = () =>{

        if(props.memInfo != 'undefined'  && props.memInfo != null  && boardContent != 'undefined'  && boardContent != null ){


  
            setBoardSet({
                ...boardSet,
                isFile : boardContent.uploadFile ? 1 : 0,
                isAdmin : props.memInfo.isAdmin ===1 || props.memInfo.isAdmin ==='1' ? 1 : 0,
                isWriter : props.memInfo.memNo ===  boardContent.memNo ? 1 : 0,
                isNoMember :boardContent.isNoMember === 1 ? 1 : 0,
                memNo  : props.memInfo.memNo
            });

 
        }else if(boardContent != 'undefined'  && boardContent != null){


            setBoardSet({
                ...boardSet,
                isFile : boardContent.uploadFile ? 1 : 0,
                isNoMember :boardContent.isNoMember  === 1 ? 1 : 0,
            });

        }

    }

    // 게시글 내용 가져오는 함수 
    const getBoard =() =>{

        axios.get("/board/get_board/read",
        {
            params :  {
                boardNo : boardNo,

            }
        }
        ).then(function (response) {

            response.data.createdAt = response.data.createdAt.split('T')[0];

  
            setBoardContent(response.data);

        }).catch(function (error) {
        //  console.log(error);
        });
    }


    

    // 파일을 입력하면 setState시킨다 
    const handleFileChange = (e) =>{

        setBoardContent({
            ...boardContent,
            file : e.target.files[0],
            fileName : e.target.value
        });


    }


    // 게시글 가져오고 state설정 
    useEffect( () => { 
        getBoard();


    } , [props]);


    useEffect( () => { 
        setBoard();

    } , [boardContent]);




    return(
        <div className="BoardBox" >
            { readState == 'read' || readState == 'updatePassword' || readState == 'delete' || readState == 'deletePassword' || readState == 'deleteMemo' ||  readState == 'updatePasswordMemo'  || readState == 'deletePasswordMemo' || readState == 'updateMemo' || readState == 'replyMemo' ?     
            <>
                <BoardReading  memInfo={props.memInfo} boardContent={boardContent}  boardSet={boardSet} readStateChange={readStateChange} />
            </>


            :'' 
            }

             { readState == 'update'  ?     
            <BoardAddInput  memInfo={props.memInfo} boardContent={boardContent}     boardSet={boardSet} readStateChange={readStateChange}  boardUpdateRun={boardUpdateRun} titleRef={titleRef} contentRef={contentRef}  changeBoardInput={changeBoardInput}  handleFileChange={handleFileChange} />
            :'' 
            }

            { readState == 'delete' || readState == 'deleteMemo' ?     
            <DeleteCheck  readState={readState} memInfo={props.memInfo} boardContent={boardContent}  deleteRun={deleteRun}    boardSet={boardSet} readStateChange={readStateChange}  boardUpdateRun={boardUpdateRun} titleRef={titleRef} contentRef={contentRef}    changeBoardInput={changeBoardInput}  handleFileChange={handleFileChange} />
            :'' 
            }

        </div>
        
    );

}




export default UpdateBoardRead;
