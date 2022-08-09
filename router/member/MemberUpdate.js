const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt')


/*
회원정보 수정 실행 페이지 
*/
router.post("/", async  (req, res) => {





    const inserId = await Member.update({ 
        name : req.body.data.name ,
        cellPhone : req.body.data.cellPhone ,
        email : req.body.data.email ,
        gender : req.body.data.gender ,
        birthday :  req.body.data.birthday,    
    },{
        where: {
            memNo : req.body.data.memNo
        }
    }

    );



    res.send('' +inserId);

});





module.exports = router;