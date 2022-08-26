const express = require("express");
const router = express.Router();
const { Member , Test } = require('../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

var requestIp = require('request-ip');




router.get("/", async  (req, res) => {

    const ip = await Test.findOne({
        where: {
            ip: requestIp.getClientIp(req)
        }
    })


    if(!ip){
        const inserId = await Test.create({ 
            ip :  requestIp.getClientIp(req)
        });
    }

    
    console.log(req.session.sangpageMemNo);

    if(req.session.sangpageMemNo){

        const users = await Member.findOne({
            attributes : [
                'memNo',
                'memId',
                'name',
                'isAdmin',
                'email',
                'grade',
                'gender',
                'cellPhone',
                'isMemberType',
                'birthday'
            ],
            where: {
                memNo: req.session.sangpageMemNo
            }
        });
        res.send(users);
    
    }else{
        res.send(false);
    }


});


module.exports = router;

