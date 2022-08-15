
import React , {useEffect, useState , Component} from 'react';


function Main(props){

    return(
        <div className="mainBox">
            <div className="mainContent">{props.memInfo ? props.memInfo.memId + '님 환영합니다!' : '로그인해주세요.'}</div>
        </div>
    );
}




export default Main;
