const express = require("express");
const router = express.Router();
const { Member } = require('../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');






router.get("/", async  (req, res) => {




    console.log(req.session.sangpageMemNo);
    res.send('' + req.session.sangpageMemNo);


});


module.exports = router;

