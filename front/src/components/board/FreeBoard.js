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


/*
게시판 테이블 컴포넌트 
*/
function FreeBoardTable(props){


    // 관리자는 삭제할 수 있게 관리자 여부를 isAdmin에 넣어준다 
    const [isAdmin , setIsAdmin] = useState(0);
    useEffect(() => {

        if(props.memInfo != 'undefined' && props.memInfo != null){
            const ProductOption = props.memInfo.isAdmin

            if(ProductOption != 'undefined' && ProductOption != null) {
                setIsAdmin(1);
            }else{
                setIsAdmin(0);
            }
        }
     },[props.memInfo])






    return(
        <Table className="freeBoardTable" >
            <TableHead>
                <TableRow>
                    { isAdmin == 1 ? <TableCell><input type="checkbox" name="allCheck" /></TableCell>
                        : ''
                    }
                
                    <TableCell>게시글 번호</TableCell>
                    <TableCell >게시글 이름</TableCell>
                    <TableCell>게시글 작성자</TableCell>
                    <TableCell>게시글 작성시간</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.freeboardContent ? props.freeboardContent.map( c =>{
                    return(
                        <TableRow key={c.boardNo} > 
                            { isAdmin == 1 ? 
                                <><TableCell><input type="checkbox" name="allCheck" /></TableCell></>
                                : ''
                            }
                            <TableCell  >{c.boardNo}</TableCell>
                            <TableCell>

                                <Link className="board_read_link" to={`/board/free_board_read?boardNo=${c.boardNo}`} >{c.boardTitle}</Link>
 
                            </TableCell>
                            <TableCell>{c.writerNm}</TableCell>
                            <TableCell>{c.createdAt.split('T')[0]}</TableCell>
                    </TableRow>
                    );
                }) :<TableRow ></TableRow> }
            </TableBody>
        </Table>

    );



}

/*
자유게시판 컴포넌트 
현재 페이지에 따라 게시글을 얻어오고 게시글 테이블 컴포넌트를 호출한다 
*/
function FreeBoard(props){



    const [page, setPage] = useState({
        cpage : 1,
        pageNum : 10,
        boardName : 'free',
        total : 0,
        totalPage : 0,
    });


    const [freeboardContent , setFreeboardContent]  = useState();

    useEffect( () => { 
        getBoardCount();
    }, []);
 

    useEffect( () => { 
        getFreeBoard();
    
        console.log(page);
    }, [page]);


    // 게시판 글을 가져온다 
    const getBoardCount = () =>{

        axios.get("/board/get_board/total",
        {
            params :  {
                boardName : boardName,
            }
        }
        ).then(function (response) {

            console.log(response);
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
    const getFreeBoard =() =>{

        axios.get("/board/get_board",
        {
            params :  {
                cpage : cpage,
                pageNum : pageNum,
                boardName : boardName,
            }
        }
        ).then(function (response) {

            //가져온 게시판 글을 세팅해준다 
            setFreeboardContent(response.data.data );


        }).catch(function (error) {
        //  console.log(error);
        });
    }


    const { cpage,  pageNum , boardName } = page;
    



    return(
        <div className="freeBoardBox" >
            <div className="freeBoardTitle" >
                자유게시판
            </div>

            

            <FreeBoardTable memInfo={props.memInfo}  freeboardContent={freeboardContent} />

            <div className="freeBoardBottom">
                <Link className="freeBoardAdd" to="/board/free_board_add">게시글 작성</Link>

            </div>



        </div>
        
    );

}




export default FreeBoard;
