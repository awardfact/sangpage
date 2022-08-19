import React , {useRef, useEffect, useState , Component , Array} from 'react';
import {withStyles} from '@material-ui/core/styles';
import "../../css/board.css";
import axios ,{post } from 'axios';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import BoardPage from '../board/BoardPage';
import BoardTable from '../board/BoardTable';



/*
수정내역 게시판판 컴포넌트 
현재 페이지에 따라 게시글을 얻어오고 게시글 테이블 컴포넌트를 호출한다 
해당 게시판은 관리자만 글을 작성할 수 있고 댓글 기능은 없다 
*/
function UpdateBoard(props){




    //state설정 
    const [page, setPage] = useState({
        cpage : 1,
        pageNum : 20,
        total : 0,
        totalPage : 0,
        isAdmin : 0,
        boardName : 'update',
    });
    const [boardContent , setBoardContent]  = useState();

    const [isAdmin , setIsAdmin] = useState({
        isAdminCheck : 0,
        isAdminTmp : 0,
    });

    //페이지 전환 클릭 
    const pageMove = (e)=>{

        setPage({
            ...page,
            cpage : Number(e.target.dataset.movePage),
        });

    }

    //관리자가 맞는지 아닌지 체크 
    const adminCheck = function(){

        if(props.memInfo != 'undefined'  && props.memInfo != null ){
            setIsAdmin({
                ...isAdmin,
                isAdminCheck : props.memInfo.isAdmin ===1 || props.memInfo.isAdmin ==='1' ? 1 : 0,
            });
        }
    }


    // 게시판 글을 가져온다 
    const getBoardCount = () =>{

        axios.get("/board/get_board/total",
        {
            params :  {
                boardName : page.boardName,
            }
        }
        ).then(function (response) {

            let pageTmp = parseInt(response.data.total / page.pageNum);


            if(response.data.total % page.pageNum){
                pageTmp += 1;
            }
            setPage({
                ...page,
                total : response.data.total,
                totalPage :  pageTmp,
            });




        }).catch(function (error) {
        //  console.log(error);
        });
    }


    // 게시판 글을 가져온다 
    const getBoard =() =>{

        axios.get("/board/get_board",
        {
            params :  {
                cpage : page.cpage,
                pageNum : page.pageNum,
                boardName : page.boardName,
            }
        }
        ).then(function (response) {

            //가져온 게시판 글을 세팅해준다 
            setBoardContent(response.data.data );


        }).catch(function (error) {
        //  console.log(error);
        });
    }

    
    useEffect( () => { 
        adminCheck();
    }, [props]);
    

    useEffect( () => { 
        getBoardCount();
    }, []);

    useEffect( () => { 
        getBoard();
    
    }, [page]);





    return(
        <div className="boardBox" >
            <div className="boardTitle" >
                수정내역
            </div>

            

            <BoardTable memInfo={props.memInfo}  boardContent={boardContent} page={page} />

            <div className="boardBottom">
                { isAdmin.isAdminCheck ? 
                <Link className="boardAdd" to="/board/update_board_add">게시글 작성</Link> :
                 ""
                }
            </div>


            <BoardPage  page={page}  pageMove={pageMove}  />

        </div>
        
    );

}



export default UpdateBoard;
