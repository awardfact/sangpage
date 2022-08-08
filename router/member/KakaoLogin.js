const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');




/*
카카오 회원가입 또는 로그인을 클릭했을 때 카카오에서 정보를 받고 회원가입 또는 로그인을 하는
페이지 먼저 카카오에서 받은 id를 가지고 회원이 있는지 검색하고 있으면 로그인 없으면 회원가입 + 로그인을 진행한다 
*/
router.post("/", async  (req, res) => {
    const param = req.body.data;

    //
    const users = await Member.findOne({
        where: {
            memId: param.id,
            isDelete : 0,
            isMemberType : 'kakao'
        }
    });



    if(users){
        sess = req.session;
        sess.sangpageMemNo = users.memNo;
        res.send('login');


    }else{
        const inserId = await Member.create({ 
            memId : param.id ,
            name : param.kakao_account.profile_nickname ? param.kakao_account.profile_nickname: param.id  ,
            isAdmin : 0,
            password : ''  ,
            cellPhone : '' ,
            email : param.kakao_account.email ? param.kakao_account.email : '' ,
            isMemberType : 'kakao' ,
            gender : param.kakao_account.gender ?  param.kakao_account.gender : 'male' ,
            birthday : param.kakao_account.birthday ?  param.kakao_account.birthday : '',
            grade : '준회원',
            isDelete : 0,
     
        });

        sess = req.session;
        sess.sangpageMemNo = inserId.memNo;
        res.send('join');

    }


});


module.exports = router;

