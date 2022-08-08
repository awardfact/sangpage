const express = require("express");
const router = express.Router();
const { Member } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');





/*
로그아웃 실행하는 페이지
세션을 삭제한다 
*/
router.post("/", async  (req, res) => {

    req.session.sangpageMemNo = null;  


    res.send('' + 1);


});


module.exports = router;

