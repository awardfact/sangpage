const express = require("express");
const router = express.Router();
const { Member } = require('../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');






router.get("/", async  (req, res) => {



    if(req.session.sangpageMemNo){

        const users = await Member.findOne({
            attributes : [
                'memNo',
                'memId',
                'name',
                'isAdmin',
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
    
    }


});


module.exports = router;

