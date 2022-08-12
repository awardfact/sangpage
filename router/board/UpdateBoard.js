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
게시글을 수정하는 페이지 
*/
router.post("/", upload.single('content.file')  , async  (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    
    console.log(obj);
    console.log(req.file);
    if(req.file){
        fs.unlink(`./front/public/image/board/${obj['content.uploadFile']}` , (err)=>{
            console.log(err);
        });
    }

    if(obj['isNoMember']){

        const password =  obj['content.password'];
        const encryptedPassowrd = bcrypt.hashSync(password, 10);
        const inserId = await Board.update({ 
            boardTitle : obj['content.boardTitle'],
            boardContent : obj['content.boardContent'],
            uploadFile : req.file ? req.file.filename : obj['content.uploadFile'],
            writerNm : obj['content.writerNm'],
            password : encryptedPassowrd,
   
        },{
            where: {
                boardNo : obj['content.boardNo']
            }
        }
    
        );
        res.send('' + inserId.boardNo);

    }else{


        const password =  obj['content.password'];
        const encryptedPassowrd = bcrypt.hashSync(password, 10);
        const inserId = await Board.update({ 
            boardTitle : obj['content.boardTitle'],
            boardContent : obj['content.boardContent'],
            uploadFile : req.file ? req.file.filename : obj['content.uploadFile'],
   
        },{
            where: {
                boardNo : obj['content.boardNo']
            }
        }
    
        );
        res.send('' + inserId.boardNo);
    }


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