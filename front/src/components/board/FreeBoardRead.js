import React , {useRef, useEffect, useState , Component} from 'react';
import "../../css/board.css";
import axios ,{post } from 'axios';
import { Link, useSearchParams , useLocation } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import BoardPage from '../board/BoardPage';
/*
게시글 수정 컴포넌트 
글 작성과 유사한 형태로 수정란이 출력된다 
*/
function FreeBoardAddInput(props){





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
function FreeBoardReading(props){



         

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
                <Link className="board_read_link" to="/board/free_board" >글 목록</Link>

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




// 비밀번호 검증 컴포넌트 
function PasswordCheck(props){

    return(
        <div>
            <Dialog open={true}  >
                { props.readState == 'updatePassword' || props.readState == 'deletePassword' ? 
                <>
                    <DialogTitle>게시글 패스워드를 입력해주세요.</DialogTitle>
                    <DialogContent>
                        <input className="passwordCheckInput" type="password" name="password" onChange={props.changeBoardInput}   value={props.boardContent.password} />
                    </DialogContent>
                </>
                : 
                <>
                    <DialogTitle>댓글 패스워드를 입력해주세요.</DialogTitle>
                    <DialogContent>
                        <input className="passwordCheckInput" type="password" name="passwordRe" onChange={props.changeMemoInput}     value={props.memoContent.passwordRe} />
                    </DialogContent>
                </>
                }
                <DialogActions>
                    <div className="passwordCheckRun"  variant="contained" color="primary"  onClick={props.passwordValidation}  >입력</div>
                    <div className="passwordCheckExit"  variant="outlined" color="primary" data-state="read" onClick={props.readStateChange}    >닫기</div>
                </DialogActions>
            </Dialog>
        </div>

    );
}

// //페이지 컴포넌트 
// function BoardPage(props){


//     const makePage = () =>{
//         const pageHtml = [];
//         let startPage = 1;
//         if(props.page != 'undefined'){

//             if(props.page.cpage > 5){
//                 pageHtml.push(<div className="memoPage" data-move-page="1" key={'bb'}  onClick={props.pageMove}   >{"<<"}</div>);
//                 pageHtml.push(<div className="memoPage" data-move-page={Number(props.page.cpage)-5}   key={'b'} onClick={props.pageMove}  >{"<"}</div>);
            
//                  startPage = props.page.cpage-2;
//             }else if(props.page.cpage > 3){
//                 pageHtml.push(<div className="memoPage"  data-move-page="1"   key={'b'} onClick={props.pageMove}  >{"<"}</div>);
//                  startPage = props.page.cpage-2;
//             }
//             for(let i = startPage; i < startPage + 5; i++){
//                 if(i > props.page.totalPage){
//                     break;
//                 }
//                 if(props.page.cpage == i ){
//                     pageHtml.push(<div className="memoPageC"   data-move-page={i}  onClick={props.pageMove}  key={i} >{i}</div>);
//                 }else{
//                     pageHtml.push(<div className="memoPage"   data-move-page={i}  onClick={props.pageMove}  key={i} >{i}</div>);
//                 }
//             }


//             if(props.page.cpage + 5 < props.page.totalPage){
//                 pageHtml.push(<div className="memoPage" key={'r'} onClick={props.pageMove}   data-move-page={Number(props.page.cpage)+5}  >{">"}</div>);
//                 pageHtml.push(<div className="memoPage"  key={'rr'} onClick={props.pageMove}   data-move-page={props.page.totalPage}  >{">>"}</div>);

//             }else if(props.page.cpage + 2 < props.page.totalPage){
//                 pageHtml.push(<div key={'r'}  className="memoPage" onClick={props.pageMove}   data-move-page={props.page.totalPage}    >{">"}</div>);

//             }

//             return pageHtml;

//         }


//     }



//     return(

//         <div className="boardPageBox">
//             {makePage()}
//         </div>

//     );

// }

//댓글 컴포넌트 
function BoardMemo(props){


    return(
        <div className="memoBox">
            <div className="memoTitle" >댓글 { props.page.totalPage ? "[" + props.page.total + "]"  : ""}</div>

            {/* 댓글 창 회원이 아니면 아이디와 패스워드를 입력하는 텍스트필드 출력  */}
            { !props.memInfo ? 
                <>
                    <div>비회원으로 댓글을 작성하려면 아이디와 패스워드를 입력해야 합니다.</div>
                    <div className="memoIdBox">
                            <div>아이디 : </div>
                            <input   ref={props.memoIdRef} type="text"  name="writerNm" value={props.memoContent.writerNm}  onChange={props.changeMemoInput}   />
                            <div>패스워드 : </div>
                        <input ref={props.memoPassRef} type="password"  name="password" value={props.memoContent.password}  onChange={props.changeMemoInput}   />
                    </div>
                    
                </>
                : "" }



            <div >
                <textarea className="inputMemo" ref={props.memoRef}  name="content" value={props.memoContent.content}  onChange={props.changeMemoInput}  ></textarea>
                <button className="memoRun" onClick={props.memoRun} >댓글작성</button>
            </div>


            {/* 댓댓글 댓글을 출력하고 대댓글 작성, 수정 , 삭제를 할 수 있다   */}
            <div className="memoContentBox">
              { props.memo ?  props.memo.map((e) =>{
                return(
                    <div key={e.memoNo}>
                        <div className="memo"  key={e.memoNo} data-tree={e.tree} ><span className="memoContent">{ e.tree !== 0 ? 'ㄴ' : ''}{e.content}</span>  <span className="memoWriter"  >작성자 : {e.writerNm} </span>
                            <div className="memoRight">
                                <div className="memoReply"  data-state="replyMemo"   data-memo-no={e.memoNo} data-root-parent-no={e.rootParentMemoNo}  data-parent-memo-no={e.memoNo}  data-tree={e.tree + 1}   onClick={props.memoReply}  >답글</div>

                                { Number(props.boardSet.isAdmin) === 1 || ( props.boardSet.memNo &&  e.memNo === props.boardSet.memNo ) ? 
                                    <div  className="memoUpdate" data-state="updateMemo"   data-memo-no={e.memoNo}  data-is-no-member-re={props.boardSet.memNo}  data-root-parent-no={e.rootParentMemoNo}   data-tree={e.tree + 1}    onClick={props.memoStateChange}    >수정하기</div>
                                : '' }
                                { Number(props.boardSet.isAdmin) !== 1 &&  Number(e.isNoMember) === 1 ? 
                                    <div  className="memoUpdate" data-state="updatePasswordMemo"  data-memo-no={e.memoNo}  data-is-no-member-re={props.boardSet.memNo}   data-root-parent-no={e.rootParentMemoNo}   data-tree={e.tree + 1}   onClick={props.memoStateChange}    >수정하기</div>
                                : '' }

                                { Number(props.boardSet.isAdmin) === 1 ||  ( props.boardSet.memNo &&  e.memNo === props.boardSet.memNo ) ? 
                                    <div  className="memoDelete" data-state="deleteMemo"  data-is-no-member-re={props.boardSet.memNo} data-memo-no={e.memoNo} data-root-parent-no={e.rootParentMemoNo}   data-tree={e.tree + 1}   onClick={props.memoStateChange}    >삭제하기</div>
                                : '' }
                                { Number(props.boardSet.isAdmin) !== 1 &&  Number(e.isNoMember) === 1 ? 
                                    <div  className="memoDelete" data-state="deletePasswordMemo"  data-is-no-member-re={props.boardSet.memNo}  data-root-parent-no={e.rootParentMemoNo}   data-tree={e.tree + 1}    data-memo-no={e.memoNo}  onClick={props.memoStateChange}    >삭제하기</div>
                                : '' }
                    

                            </div>
                        </div>
                        { props.memoContent.memoNo === e.memoNo  && (props.readState === 'updateMemo' || props.readState == 'replyMemo' )  ? 
                        <div className="memoReBox">


                                { !props.memInfo || (props.readState === 'updateMemo' && e.isNoMember === 1)  ? 
                                <>
                                    <div className="memoIdBox"   >
                                        <div>아이디 : </div>
                                        <input   ref={props.memoIdReRef} type="text"  name="writerNmRe" value={props.memoContent.writerNmRe}  onChange={props.changeMemoInput}   />
                                        <div>패스워드 : </div>
                                        <input ref={props.memoPassReRef} type="password"  name="passwordRe" value={props.memoContent.passwordRe}  onChange={props.changeMemoInput}   />
                                    </div>
                                </>
                                 : "" }
                                { props.readState === 'updateMemo' ? '수정' : '답글'}
                                <textarea className="inputMemo" ref={props.memoReRef}  name="contentRe" value={props.memoContent.contentRe}  onChange={props.changeMemoInput}  ></textarea>
                                <button className="memoRunReply" onClick={props.memoRunReply} >댓글작성</button>
                        </div>
                        : " "}
                    </div>
                     
                )
              }) : ""}
            </div>
            <BoardPage  page={props.page} pageMove={props.pageMove} />
        </div>

    );

}


/*
게시글 컴포넌트 
게시글 보기 , 게시글 수정 , 게시글 삭제 , 댓글 달기 기능이 있다
*/
function FreeBoardRead(props){





    //get에있는 보드번호 가져오기
    const search = useLocation().search;
    const boardNo = new URLSearchParams(search).get('boardNo');



    //입력 안했을떄 포커스를 주기위한 Ref
    const titleRef = useRef();
    const contentRef = useRef();
    const idRef = useRef();
    const passwordRef = useRef();
    const memoRef = useRef();
    const memoIdRef = useRef();
    const memoPassRef = useRef();

    const memoReRef = useRef();
    const memoIdReRef = useRef();
    const memoPassReRef = useRef();


    //state설정 상태 state, 게시글 state , 권한 state , 댓글 state
    const [readState, setReadState] = useState('read');

    const [memo, setMemo] = useState();
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

    const [memoContent , setMemoContent]  = useState({
        content : '',
        contentRe : '',
        isNoMember : 0,
        isNoMemberRe : 0,
        writerNm : '',
        password : '',
        writerNmRe : '',
        passwordRe : '',
        memNo : 0,
        parentMemoNo : 0,
        rootParentMemoNo : 0,
        tree : 0,
        memoNo : 0,
        boardNo : boardNo
    });
    
    const [page, setPage] = useState({
        cpage : 1,
        pageNum : 20,
        total : 0,
        totalPage : 0,
    });
    const {title, content, file,  fileName, id,  password}  = boardContent;




    //대댓글 작성 
    const memoRunReply = (e) =>{




        
        if(!memoContent.contentRe){
            alert('댓글을 입력해주세요.');
            memoReRef.current.focus();
            return false;
        }


        if(boardSet.memNo == 0 && !memoContent.writerNmRe){
            alert('아이디를 입력해주세요.');
            memoIdReRef.current.focus();
            return false;
        }

        

        
        if(boardSet.memNo == 0 && !memoContent.passwordRe){
            alert('패스워드 입력해주세요.');
            memoPassReRef.current.focus();
            return false;
        }




        if(readState === 'updateMemo'){

            axios.post("/board/update_board/memo", {
                data : memoContent,
                memInfo : props.memInfo
            }
            ).then(function (response) {
    
                if(response.data){
                    alert('댓글 수정에 성공했습니다.');
                    window.location.reload();
                }else{
                    alert('댓글 수정에 실패했습니다.');
                }
    
            }).catch(function (error) {
               alert('댓글 수정에 실패했습니다.');
            });
    


        }else if(readState == 'replyMemo'){


            axios.post("/board/add_board/memo_reply", {
                data : memoContent,
                memInfo : props.memInfo
            }
            ).then(function (response) {
    
                if(response.data){
                    alert('댓글 작성에 성공했습니다.');
                    window.location.reload();
                }else{
                    alert('댓글 작성에 실패했습니다.');
                }
    
            }).catch(function (error) {
               alert('댓글 작성에 실패했습니다.');
            });
    

        }








    }

    //댓글 작성 
    const memoRun  = (e) =>{



       


        if(!memoContent.content){
            alert('댓글을 입력해주세요.');
            memoRef.current.focus();
            return false;
        }


        if(boardSet.memNo == 0 && !memoContent.writerNm){
            alert('아이디를 입력해주세요.');
            memoIdRef.current.focus();
            return false;
        }

        

        
        if(boardSet.memNo == 0 && !memoContent.password){
            alert('패스워드 입력해주세요.');
            memoPassRef.current.focus();
            return false;
        }




        axios.post("/board/add_board/memo", {
            data : memoContent,
            memInfo : props.memInfo
        }
        ).then(function (response) {

            if(response.data){
                alert('댓글 작성에 성공했습니다.');
                window.location.reload();
            }else{
                alert('댓글 작성에 실패했습니다.');
            }

        }).catch(function (error) {
            alert('댓글 작성에 실패했습니다.');
        });




     



    }


    //a 상태 변경 
    const memoStateChange = (e) =>{


    

        setMemoContent({
            ...memoContent,
            password : '',
            passwordRe : '',
            writerNmRe : '',
            contentRe : '',
            memoNo :  Number(e.target.dataset.memoNo),
            tree : Number(e.target.dataset.tree),
            isNoMemberRe : props.memInfo  ? 0 : 1 ,
            rootParentMemoNo : Number(e.target.dataset.rootParentNo) !== 0 ?   Number(e.target.dataset.rootParentNo) : Number(e.target.dataset.memoNo)
        });
        setReadState(e.target.dataset.state);
    }


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




        if(readState == 'deleteMemo'){

            axios.post("/board/delete_board/memo", {
                data : memoContent,
            }
            ).then(function (response) {
    
                if(response.data){
                    alert('댓글 삭제에 성공했습니다.');
                    window.location.reload();
                }else{
                    alert('댓글 삭제에 실패했습니다.');
                }
    
            }).catch(function (error) {
                alert('댓글 삭제에 실패했습니다.');
            });
    


        }else{


            axios.post("/board/delete_board", {
                data : boardContent,
            }
            ).then(function (response) {
    
                if(response.data){
                    alert('게시글 삭제에 성공했습니다.');
                    window.location.href="../board/free_board";
                }else{
                    alert('게시글 삭제에 실패했습니다.');
                }
    
            }).catch(function (error) {
                alert('게시글 삭제에 실패했습니다.');
            });
    
    



        }




    }

    //비회원이 작성한 글인경우 패스워드 검증 
    const passwordValidation = (e) =>{




        if(readState.includes('Memo')){

            axios.post("/board/update_board/auth_memo", {
                boardNo : boardContent.boardNo,
                memoNo : memoContent.memoNo,
                password : memoContent.passwordRe,
            }
            ).then(function (response) {
    
                if(response.data){

                    if(readState == 'updatePasswordMemo'){
                        setReadState('updateMemo');
                    }else if(readState == 'deletePasswordMemo'){
                        setReadState('deleteMemo');
                    }

                }else{
                    alert('패스워드가 일치하지 않습니다.');
                }
    
            }).catch(function (error) {
                alert('통신 오류입니다 다시 시도해주세요.');
            });
    

        }else{


            axios.post("/board/update_board/auth", {
                boardNo : boardContent.boardNo,
                password : boardContent.password,
            }
            ).then(function (response) {
    
                if(response.data){
                    if(readState == 'updatePassword'){
                        setReadState('update');                    
                    }else if(readState == 'deletePassword'){
                        setReadState('delete');
                    }
                }else{
                    alert('패스워드가 일치하지 않습니다.');
                }
    
            }).catch(function (error) {
                alert('통신 오류입니다 다시 시도해주세요.');
            });
    

        }


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


        if(!props.memInfo){
            if(!boardContent.writerNm){
                alert('아이디 입력해주세요.');
                idRef.current.focus();
                return false;
            }
            if(!boardContent.password){
                alert('패스워드 입력해주세요.');
                passwordRef.current.focus();
                return false;
            }
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


    //댓글 내용 변경 
    const changeMemoInput = (e)=>{

        if(e.target.value.length <= 500){
            setMemoContent({
                ...memoContent ,    
                [e.target.name] : e.target.value,
            }); 
        }
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

    const pageMove = (e)=>{


        
        setPage({
            ...page,
            cpage : Number(e.target.dataset.movePage),
        });

    }


    // 게시글 내용 가져오는 함수 
    const getBoard =() =>{

        axios.get("/board/get_board/read",
        {
            params :  {
                boardNo : boardNo,
                page : page.cpage,
                pageNum :  page.pageNum,
            }
        }
        ).then(function (response) {

            response.data.createdAt = response.data.createdAt.split('T')[0];

  
            setBoardContent(response.data);
            let pageTmp = parseInt(response.data.total / page.pageNum);


            if(response.data.total % page.pageNum){
                pageTmp += 1;
            }
            setPage({
                ...page,
                total : response.data.total,
                totalPage :  pageTmp,
            });


           // memoSet();



        }).catch(function (error) {
        //  console.log(error);
        });
    }



    const getMemo = () =>{

        axios.get("/board/get_board/memo",
        {
            params :  {
                boardNo : boardNo,
                page : page.cpage,
                pageNum :  page.pageNum,
            }
        }
        ).then(function (response) {


            setMemo(response.data);
            memoSet();

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

    const memoReply = (e) =>{

  

        if(readState != 'read' && Number(e.target.dataset.memoNo) == memoContent.memoNo){

            setReadState('read');

        }else{
            setReadState(e.target.dataset.state);
        }

        setMemoContent({
            ...memoContent,
            password : '',
            passwordRe : '',
            writerNmRe : '',
            contentRe : '',
            memoNo :  Number(e.target.dataset.memoNo),
            tree : Number(e.target.dataset.tree),
            isNoMemberRe : props.memInfo ?  0 : 1 ,
            parentMemoNo : Number(e.target.dataset.parentMemoNo),
            rootParentMemoNo : Number(e.target.dataset.rootParentNo) !== 0 ?   Number(e.target.dataset.rootParentNo) : Number(e.target.dataset.memoNo)
        });




    }


        //페이지 설정 설정
        const pageSet = () =>{


            setTimeout(() =>{
    



                const memoTmp = document.getElementsByClassName("memo");
    
    
        
                for (let item of memoTmp) {
                    if(item.dataset.tree != 0){
                        item.style.marginLeft = 10 * item.dataset.tree + 'px';
                      //  item.innerHTML = 'ㄴ' + item.innerHTML;
                    }
                }
    
    
            }, 0);
     
            
        }



    //메모 설정
    const memoSet = () =>{


        setTimeout(() =>{

            const memoTmp = document.getElementsByClassName("memo");


    
            for (let item of memoTmp) {
                if(item.dataset.tree != 0){
                    item.style.marginLeft = 5 * item.dataset.tree + 'px';
                  //  item.innerHTML = 'ㄴ' + item.innerHTML;
                }
            }


        }, 0);
 
        
    }

    // 게시글 가져오고 state설정 
    useEffect( () => { 
        getBoard();

        if(props.memInfo != 'undefined' && props.memInfo != null){
            setMemoContent({
                ...memoContent,
                memNo : props.memInfo.memNo ? props.memInfo.memNo : 0
            });
        }else{
            setMemoContent({
                ...memoContent,
                isNoMember : 1
            });

        }

    } , [props]);


    useEffect( () => { 
        setBoard();

    } , [boardContent]);

    useEffect( () => { 
        getMemo();
    } , [page]);



    return(
        <div className="boardBox" >
            { readState == 'read' || readState == 'updatePassword' || readState == 'delete' || readState == 'deletePassword' || readState == 'deleteMemo' ||  readState == 'updatePasswordMemo'  || readState == 'deletePasswordMemo' || readState == 'updateMemo' || readState == 'replyMemo' ?     
            <>
                <FreeBoardReading  memInfo={props.memInfo} boardContent={boardContent}  boardSet={boardSet} readStateChange={readStateChange} />
                <BoardMemo memo={memo} pageMove={pageMove} page={page} readState={readState}  memoStateChange={memoStateChange} memoReply={memoReply} memInfo={props.memInfo} boardContent={boardContent} memoRun={memoRun} memoRunReply={memoRunReply}  boardSet={boardSet}  memoRef={memoRef} memoContent={memoContent} changeMemoInput={changeMemoInput} memoIdRef={memoIdRef} memoPassRef={memoPassRef} memoReRef={memoReRef}  memoIdReRef={memoIdReRef}  memoPassReRef={memoPassReRef} />
            </>


            :'' 
            }
             { readState == 'update'  ?     
            <FreeBoardAddInput  memInfo={props.memInfo} boardContent={boardContent}     boardSet={boardSet} readStateChange={readStateChange}  boardUpdateRun={boardUpdateRun} titleRef={titleRef} contentRef={contentRef} idRef={idRef} passwordRef={passwordRef}   changeBoardInput={changeBoardInput}  handleFileChange={handleFileChange} />
            :'' 
            }
            {readState == 'updatePassword'  || readState == 'deletePassword'  || readState == 'updatePasswordMemo'  || readState == 'deletePasswordMemo'  ?
            
            <PasswordCheck readState={readState}  memInfo={props.memInfo} boardContent={boardContent} memoContent={memoContent}    boardSet={boardSet} readStateChange={readStateChange} passwordValidation={passwordValidation} changeBoardInput={changeBoardInput}  changeMemoInput={changeMemoInput}  />
            :'' 
            }

            { readState == 'delete' || readState == 'deleteMemo' ?     
            <DeleteCheck  readState={readState} memInfo={props.memInfo} boardContent={boardContent}  deleteRun={deleteRun}    boardSet={boardSet} readStateChange={readStateChange}  boardUpdateRun={boardUpdateRun} titleRef={titleRef} contentRef={contentRef} idRef={idRef} passwordRef={passwordRef}   changeBoardInput={changeBoardInput}  handleFileChange={handleFileChange} />
            :'' 
            }

        </div>
        
    );

}




export default FreeBoardRead;
