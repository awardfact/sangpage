import React , {useRef, useEffect, useState , Component} from 'react';
import "../../css/board.css";
import axios ,{post } from 'axios';


//페이지 컴포넌트 
function BoardPage(props){


    const makePage = () =>{
        const pageHtml = [];
        let startPage = 1;
        if(props.page != 'undefined'){

            if(props.page.cpage > 5){
                pageHtml.push(<div className="memoPage" data-move-page="1" key={'bb'}  onClick={props.pageMove}   >{"<<"}</div>);
                pageHtml.push(<div className="memoPage" data-move-page={Number(props.page.cpage)-5}   key={'b'} onClick={props.pageMove}  >{"<"}</div>);
            
                 startPage = props.page.cpage-2;
            }else if(props.page.cpage > 3){
                pageHtml.push(<div className="memoPage"  data-move-page="1"   key={'b'} onClick={props.pageMove}  >{"<"}</div>);
                 startPage = props.page.cpage-2;
            }
            for(let i = startPage; i < startPage + 5; i++){
                if(i > props.page.totalPage){
                    break;
                }
                if(props.page.cpage == i ){
                    pageHtml.push(<div className="memoPageC"   data-move-page={i}  onClick={props.pageMove}  key={i} >{i}</div>);
                }else{
                    pageHtml.push(<div className="memoPage"   data-move-page={i}  onClick={props.pageMove}  key={i} >{i}</div>);
                }
            }


            if(props.page.cpage + 5 < props.page.totalPage){
                pageHtml.push(<div className="memoPage" key={'r'} onClick={props.pageMove}   data-move-page={Number(props.page.cpage)+5}  >{">"}</div>);
                pageHtml.push(<div className="memoPage"  key={'rr'} onClick={props.pageMove}   data-move-page={props.page.totalPage}  >{">>"}</div>);

            }else if(props.page.cpage + 2 < props.page.totalPage){
                pageHtml.push(<div key={'r'}  className="memoPage" onClick={props.pageMove}   data-move-page={props.page.totalPage}    >{">"}</div>);

            }

            return pageHtml;

        }


    }



    return(

        <div className="boardPageBox">
            {makePage()}
        </div>

    );

}





export default BoardPage;
