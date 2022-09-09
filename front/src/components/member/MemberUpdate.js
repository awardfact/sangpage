
import React , {useRef, useEffect, useState , Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import axios ,{post } from 'axios';



import { Link } from 'react-router-dom';

function MemberUpdate(props){


    // state선언
    const [memContent , setMemContent] = useState({
        memId : '',
        isAdmin : '',
        name :'',
        cellPhone : '',
        email : '',
        gender :'',
        birthday : '',
        grade : '',
        memNo : '',
    });


    
    const [error, setError]  = useState({
        passwordError : true,
        emailError : true,
        phoneError : true,
        birthError : true, 
    });



    //아이디 정규식 영어와 숫자로 구성된 5~15자리 
    const emailExr = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    const phoneExr = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
    const birthExr = new RegExp('^[0-1][0-9][0-3][0-9]');

     //입력 안했을떄 포커스를 주기위한 Ref

     const nameRef = useRef();
     const cellPhoneRef = useRef();
     const emailRef = useRef();
     const genderRef = useRef();
     const birthdayRef = useRef();


        // 텍스트 입력 변경했을 때 
    const changeInputText = (e) =>{

        const { value} = e.target;
        const inputName = e.target.name;

        setMemContent({
            ...memContent, 
            [inputName] : value
        });
        



        // 정규식을 통한 검증 
        switch(inputName){
            case "email" :
                if(emailExr.test(value)){
                    setError({
                        ...error, 
                        emailError : true
                    });
                }else{
                    setError({
                        ...error, 
                        emailError : false
                    });
                }
                
            break;
            case "cellPhone" :
                if(phoneExr.test(value)){
                    setError({
                        ...error, 
                        phoneError : true
                    });
                }else{
                    setError({
                        ...error, 
                        phoneError : false
                    });
                }
                
            break;
            case "birthday" :
                if(birthExr.test(value)){
                    setError({
                        ...error, 
                        birthError : true
                    });
                }else{
                    setError({
                        ...error, 
                        birthError : false
                    });
                }
                
            break;
        }

    }



    //회원가입 실행 
    const memberUpdateRun  = () =>{






                    
        if(!name){
            alert('이름을 입력해주세요.');
            nameRef.current.focus();
            return false;
        }


        if(!gender){
            alert('성별을 입력해주세요.');
            genderRef.current.focus();
            return false;
        }


                    
        if(!birthday){
            alert('생일을 입력해주세요.');
            birthdayRef.current.focus();
            return false;
        }else if(!birthError){
            alert('생일을 정확히 입력해주세요.');
            birthdayRef.current.focus();
            return false;
        }





        axios.post("/member/member_update", {
            data : memContent
        }).then(function (response) {


            console.log(response);
            if(response.data){
                alert('회원 수정에 성공하였습니다.');
                 window.location.href="../../";
            }else{
                 alert('회원 수정에 실패하였습니다');
            }
        
        }).catch(function (error) {
            console.log(error);
        });




    }


    



    useEffect( () => { 

        setMemContent(props.memInfo);
        if(!props.memInfo){
            alert('회원 전용 페이지입니다.');
            window.location.href="../../";
        }
    }, []);

    const {memId , isAdmin , name , cellPhone , email ,gender , birthday , grade} = memContent;
    const {idError, emailError , passwordError , phoneError , birthError}  = error;


    return(
        <div className="joinBox">
            <div className="joinContent">
                <div className="joinInputTitle" >아이디</div>: 
                <input type="text" name="memId" disabled   value={memId} />
            </div>
            <div className="joinContent">
                <div className="joinInputTitle" >이메일</div>: 
                <input type="text" name="email"  ref={emailRef}   placeholder="이메일을 입력해주세요."   onChange={changeInputText} value={email}   />
                {!emailError ? <div className="inputError" >이메일 형식으로 입력해주세요.</div>  : '' }
            </div>
            <div className="joinContent">
                <div className="joinInputTitle" >휴대폰</div>: 
                <input type="text" name="cellPhone" ref={cellPhoneRef}    placeholder="휴대폰 번호를 입력해주세요."   onChange={changeInputText} value={cellPhone}   />
                {!phoneError ? <div className="inputError" >휴대폰 번호를 입력해주세요.(-필수)</div>  : '' }
            </div>
            <div className="joinContent">
                <div className="joinInputTitle" >이름</div>: 
                <input type="text" name="name" ref={nameRef}  placeholder="이름을 입력해주세요."   onChange={changeInputText} value={name}   />
            </div>
            <div className="joinContent">
                <div className="joinInputTitle" >성별</div>: 
                <select name="gender" onChange={changeInputText} ref={genderRef}  value={gender} >
                    <option>성별</option>
                    <option value="male"  >남자</option>
                    <option value="female"   >여자</option>
                </select>
            </div>
            <div className="joinContent">
                <div className="joinInputTitle" >생년월일</div>: 
                <input type="text" name="birthday" ref={birthdayRef}    placeholder="생일을 4자리 숫자로 입력해주세요."   onChange={changeInputText} value={birthday}   />
                {!birthError ? <div className="inputError" >생일을 4자리 숫자로 입력해주세요.</div>  : '' }
            </div>

            
            <div className="joinBtnBox">
                <div  className="joinBtn"  onClick={memberUpdateRun}  >개인정보 수정</div>

            </div>

        </div>
    );
}




export default MemberUpdate;
