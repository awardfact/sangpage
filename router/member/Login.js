const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');





/*
페이지 로그인을 했을때 실행하는 페이지
받은 아이디로 회원 검색 후 패스워드가 일치한지 체크해서 일치하면 로그인을 실행한다 
*/
router.post("/", async  (req, res) => {

    const loginType = req.body.data.loginType;
    const password =  req.body.data.password;
    const encryptedPassowrd = bcrypt.hashSync(password, 10)
    const users = await Member.findOne({
        where: {
            memId: req.body.data.id,
            isDelete : 0,
            isMemberType : 'page'
        }
    });


    if(users){
        const same = bcrypt.compareSync(password, users.password);
        if(same){

            sess = req.session;
            sess.sangpageMemNo = users.memNo;

            
            console.log(sess.sangpageMemNo);
    
        }
    
    
        res.send(same);

    }else{
        res.send(false);
    }





});


module.exports = router;

