import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React , {useRef, useEffect, useState , Component , Array} from 'react';
import "../../css/board.css";
import { Link } from 'react-router-dom';

/*
게시판 테이블 컴포넌트 
*/
function BoardTable(props){


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
        <Table className="boardTable" >
            <TableHead>
                <TableRow>
                    { isAdmin == 1 ? <TableCell><input type="checkbox" name="allCheck" /></TableCell>
                        : ''
                    }
                
                    <TableCell>게시글 번호</TableCell>
                    <TableCell >게시글 이름</TableCell>
                    <TableCell>게시글 작성자</TableCell>
                    <TableCell>게시글 작성시간</TableCell>
                    <TableCell>조회수</TableCell>
                </TableRow>
            </TableHead> 
            <TableBody>
                {props.boardContent ? props.boardContent.map( c =>{
                    return(
                        <TableRow key={c.boardNo} > 
                            { isAdmin == 1 ? 
                                <><TableCell><input type="checkbox" name="allCheck" /></TableCell></>
                                : ''
                            }
                            <TableCell  >{c.boardNo}</TableCell>
                            <TableCell>

                                <Link className="board_read_link" to={`/board/${c.boardName}_board_read?boardNo=${c.boardNo}`} >{c.boardTitle}</Link>
 
                            </TableCell>
                            <TableCell>{c.writerNm}</TableCell>
                            <TableCell>{c.createdAt.split('T')[0]}</TableCell>
                            <TableCell>{c.hit}</TableCell>
                    </TableRow>
                    );
                }) :<TableRow ></TableRow> }
            </TableBody>
        </Table>

    );



}



export default BoardTable;