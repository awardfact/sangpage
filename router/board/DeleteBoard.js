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
router.post("/",  async  (req, res) => {



    const board = await Board.destroy({
        where : {
            boardNo : req.body.data.boardNo
        }
    });


    if(board){
        fs.unlink(`./front/public/image/board/${req.body.data.uploadFile}` , (err)=>{
        });

        res.send('' + board);
    }


    // const obj = JSON.parse(JSON.stringify(req.body));

    // if(obj['memInfo.memNo']){
    //     const inserId = await Board.create({ 

    //         boardName : obj['content.boardName'] ,
    //         boardTitle : obj['content.title'] ,
    //         boardContent : obj['content.content'] ,
    //         uploadFile : req.file ? req.file.filename : ''   ,
    //         isNoMember : 0 ,
    //         writerNm : obj['memInfo.name'] ,
    //         password : '' ,
    //         memNo :  Number(obj['memInfo.memNo']) ,
    //     });

    //     res.send('' + inserId.boardNo);

    // }else{
    //     const password =  obj['content.password'];
    //     const encryptedPassowrd = bcrypt.hashSync(password, 10);
    //     const inserId = await Board.create({ 

    //         boardName : obj['content.boardName'] ,
    //         boardTitle : obj['content.title'] ,
    //         boardContent : obj['content.content'] ,
    //         uploadFile : req.file ? req.file.filename : ''   ,
    //         isNoMember : 1 ,
    //         writerNm : obj['content.id'] ,
    //         password : encryptedPassowrd ,
    //         memNo : null ,
    //     });
    //     res.send('' + inserId.boardNo);
    // }

    




});





module.exports = router;