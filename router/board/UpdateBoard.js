const express = require("express");
const router = express.Router();
const { Board } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt')
const fs = require('fs');

//multer선언 이미지 업로드하면 이름을 겹치지 않게 해준다 
const multer = require('multer');
const upload = multer({dest : './front/public/image/board'});


/*
게시글을 추가하는 페이지 
회원인 경우와 비회원인 경우 다르게 들어감
*/
router.post("/", upload.single('content.file')  , async  (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
});

/*
패스워드 체크 
*/
router.post("/auth", async  (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));

    const board = await Board.findOne({
        where: {
            boardNo: req.body.boardNo,
        }
    });

    if(board){
        const same = bcrypt.compareSync(req.body.password, board.password);
        res.send(same);

    }


});




module.exports = router;