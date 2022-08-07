const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt')


router.post("/", async  (req, res) => {

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

    res.send('' + inserId.memNo);

});





module.exports = router;