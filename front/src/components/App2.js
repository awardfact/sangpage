import React, {useEffect, useState , useReducer , Component} from 'react';

//공통 컴포넌트
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";


// 회원 컴포넌트
import Login from "../components/member/Login";
import JoinStart from "../components/member/JoinStart";
import Join from "../components/member/Join";
import KakaoLogin from "../components/member/KakaoLogin";
import Mypage from "../components/member/Mypage";
import MemberUpdate from "../components/member/MemberUpdate";

//게시판 컴포넌트 
import FreeBoard from "../components/board/FreeBoard";
import FreeBoardAdd from "../components/board/FreeBoardAdd";
import FreeBoardRead from "../components/board/FreeBoardRead";
import UpdateBoard from "../components/board/UpdateBoard";
import UpdateBoardAdd from "../components/board/UpdateBoardAdd";
import UpdateBoardRead from "../components/board/UpdateBoardRead";


//라우터
import { BrowserRouter, Routes, Route,Link , useNavigate   } from 'react-router-dom';
import axios ,{post } from 'axios';







function App2(){


    // state선언
  const [memInfo , setMemInfo] = useState();

  const history = useNavigate();


  // 공통 실행코드 
  const commonRun =() =>{

    axios.get("/common", {
        data : 'common',
    }).then(function (response) {

      setMemInfo(response.data);


    }).catch(function (error) {
      //  console.log(error);
    });
  }

    

  useEffect( () => { 
    commonRun();

   }, [history]);





    return(
      <div  >
        <Header memInfo={memInfo}  />
  
          <Routes  onChange={commonRun} >
            <Route exact path="/"  element={<Main  memInfo={memInfo}  />}   >
  
            </Route>
            <Route exact path="/member/login"  element={<Login  memInfo={memInfo}  />}  >
  
            </Route>
            <Route exact path="/member/join_start"  element={<JoinStart memInfo={memInfo}   />}  >
  
            </Route>
            <Route exact path="/member/join"  element={<Join memInfo={memInfo}  />}  >

            </Route>
            <Route exact path="/member/kakao_login"  element={<KakaoLogin memInfo={memInfo}  />}  >
            </Route>
            <Route exact path="/member/mypage" element={<Mypage memInfo={memInfo} />} >
            </Route>
            <Route exact path="/member/member_update" element={<MemberUpdate memInfo={memInfo} />} >
            </Route>
            
            <Route exact path="/board/free_board" element={<FreeBoard memInfo={memInfo} />} >
            </Route>

            

            <Route exact path="/board/free_board_add" element={<FreeBoardAdd memInfo={memInfo} />} >
            </Route>


            <Route exact path="/board/free_board_read" element={<FreeBoardRead memInfo={memInfo} />} >
            </Route>



            <Route exact path="/board/update_board" element={<UpdateBoard memInfo={memInfo} />} >
            </Route>

            <Route exact path="/board/update_board_add" element={<UpdateBoardAdd memInfo={memInfo} />} >
            </Route>
            

            <Route exact path="/board/update_board_read" element={<UpdateBoardRead memInfo={memInfo} />} >
            </Route>
            


          </Routes>
          <Footer/>
      </div>
    )
  }

  
  export default App2;
