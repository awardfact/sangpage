const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');






router.post("/", async  (req, res) => {

    const loginType = req.body.data.loginType;
    const password =  req.body.data.password;
    const encryptedPassowrd = bcrypt.hashSync(password, 10)
    const users = await Member.findOne({
        where: {
            memId: req.body.data.id
        }
    });

    const same = bcrypt.compareSync(password, users.password);


    if(same){

        sess = req.session;
        sess.sangpageMemNo = users.memNo;

    }


    res.send(same);


});


module.exports = router;

