
import React , {useEffect, useState , Component} from 'react';
import axios ,{post } from 'axios';

function Main(props){



    const getMainInfo = ()=>{
        // axios.get("/main/exchange",
        // ).then(function (response) {
        // }).catch(function (error) {
        // //  console.log(error);
        // });


    }

    useEffect(()=>{

        getMainInfo();

    });


    return(
        <div className="mainBox">
            <div className="mainContent">{props.memInfo ? props.memInfo.memId + '님 환영합니다!' : '로그인해주세요.'}</div>
        </div>
    );
}




export default Main;
