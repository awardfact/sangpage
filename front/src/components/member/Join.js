
import React , {useRef, useEffect, useState , Component} from 'react';
import { Link } from 'react-router-dom';
import axios ,{post } from 'axios';


function Join(){


        //아이디 정규식 영어와 숫자로 구성된 5~15자리 
        const idRegExr =  new RegExp("^[a-zA-z0-9]{5,15}$");
        //패스워드 정규식 특수문자 숫자 영어 포함 8~15자리
        const passwordExr = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9@$!%*#?&]{8,15}$");
        const emailExr = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
        const phoneExr = new RegExp('^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$');
        const birthExr = new RegExp('^[0-1][0-9][0-3][0-9]');

        //입력 안했을떄 포커스를 주기위한 Ref
        const idRef = useRef();
        const passwordRef = useRef();
        const nameRef = useRef();
        const cellPhoneRef = useRef();
        const emailRef = useRef();
        const genderRef = useRef();
        const birthdayRef = useRef();


        // state선언
        const [joinContent , setJoinContent] = useState({
            id : '',
            password : '',
            name : '',
            cellPhone : '',
            email : '',
            gender : '',
            birthday : '',
            isMemberType : 'page',
        });


        const [error, setError]  = useState({
            idError : true,
            passwordError : true,
            emailError : true,
            phoneError : true,
            birthError : true, 
        });



        const joinCancel = (e) =>{
            if(!window.confirm('정말 회원가입을 취소하시겠습니까??')){
                e.preventDefault();
            }
        }
        
        // 텍스트 입력 변경했을 때 
        const changeInputText = (e) =>{

            const { value, name } = e.target;

            setJoinContent({
                ...joinContent, 
                [name] : value
            });
            



            // 정규식을 통한 검증 
            switch(name){

                case "id" :
                    if(idRegExr.test(value)){
                        setError({
                            ...error, 
                            idError : true
                        });
                    }else{
                        setError({
                            ...error, 
                            idError : false
                        });
                    }
                break;
                case "password" :
                    if(passwordExr.test(value)){
                        setError({
                            ...error, 
                            passwordError : true
                        });
                    }else{
                        setError({
                            ...error, 
                            passwordError : false
                        });
                    }
                    
                break;
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
        const joinRun = () =>{


            if(!id){
                alert('아이디를 입력해주세요.');
                idRef.current.focus();
                return false;
            }else if(!idError){
                alert('아이디를 정확히 입력해주세요.');
                idRef.current.focus();
                return false;
            }



            if(!password){
                alert('패스워드를 입력해주세요.');
                passwordRef.current.focus();
                return false;
            }else if(!passwordError){
                alert('패스워드를 정확히 입력해주세요.');
                passwordRef.current.focus();
                return false;
            }

            if(!email){
                alert('이메일을 입력해주세요.');
                emailRef.current.focus();
                return false;
            }else if(!emailError){
                alert('이메일을 정확히 입력해주세요.');
                emailRef.current.focus();
                return false;
            }


            
            if(!cellPhone){
                alert('휴대폰 번호를 입력해주세요.');
                cellPhoneRef.current.focus();
                return false;
            }else if(!phoneError){
                alert('휴대폰 번호를 정확히 입력해주세요.');
                cellPhoneRef.current.focus();
                return false;
            }



                        
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





            axios.post("/member/join", {
                data : joinContent
            }).then(function (response) {

                if(response.data){
                   alert('회원가입에 성공하였습니다.');
                    window.location.href="../../";
                }else{
                    alert('회원가입에 실패하였습니다');
                }
            
            }).catch(function (error) {
                console.log(error);
            });




        }


        const {id, password , name, cellPhone, email, gender, birthday , month, year }  = joinContent;
        const {idError, emailError , passwordError , phoneError , birthError}  = error;



    return(
        <div className="joinBox">

            <div className="joinContent">
                <div className="joinInputTitle" >아이디</div>: 
                <input type="text" name="id" ref={idRef}  placeholder="아이디를 입력해주세요."    onChange={changeInputText}  value={id} />
                {!idError ? <div className="inputError" >아이디는 영어와 숫자를 이용해서 5~15자로 입력하셔야 합니다</div>  : '' }
            </div>

            <div className="joinContent">
                <div className="joinInputTitle" >패스워드</div>: 
                <input type="password" name="password"  ref={passwordRef}   placeholder="패스워드를 입력해주세요."   onChange={changeInputText} value={password}   />
                {!passwordError ? <div className="inputError" >패스워드는 영어 숫자 특수문자를 포함한 8~15자리로 입력하셔야 합니다.</div>  : '' }
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
                <select name="gender" onChange={changeInputText} ref={genderRef}  >
                    <option>성별</option>
                    <option value="male" >남자</option>
                    <option value="female">여자</option>
                </select>

            </div>
            <div className="joinContent">
                <div className="joinInputTitle" >생년월일</div>: 
                <input type="text" name="birthday" ref={birthdayRef}    placeholder="생일을 4자리 숫자로 입력해주세요."   onChange={changeInputText} value={birthday}   />
                {!birthError ? <div className="inputError" >생일을 4자리 숫자로 입력해주세요.</div>  : '' }
            </div>

            <div className="joinBtnBox">
                <div  className="joinBtn"  onClick={joinRun}  >회원가입</div>
                <Link to="/member/join_start" className="joinCancelBtn"  onClick={joinCancel}>취소</Link>
            </div>
            

        </div>
    );
}




export default Join;
