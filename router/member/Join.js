const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt')


/*
페이지 회원가입을 했을때 실행하는 페이지
정보를 가지고 회원가입을 실행한다 
*/
router.post("/", async  (req, res) => {


    const users = await Member.findOne({
        where: {
            memId: req.body.data.id,
            isDelete : 0,
        }
    });

    if(users){
        res.send('');
    }else{

        const password =  req.body.data.password;
        const encryptedPassowrd = bcrypt.hashSync(password, 10)
        const inserId = await Member.create({ 
            memId : req.body.data.id ,
            name : req.body.data.name ,
            isAdmin : 0,
            password : encryptedPassowrd  ,
            cellPhone : req.body.data.cellPhone ,
            email : req.body.data.email ,
            isMemberType : req.body.data.isMemberType ,
            gender : req.body.data.gender ,
            birthday :  req.body.data.birthday,
            grade : '준회원',
            isDelete : 0,
     
        });
    
        sess = req.session;
        sess.sangpageMemNo = inserId.memNo;
    
    
        res.send('' + inserId.memNo);



    }


});





module.exports = router;