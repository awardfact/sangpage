const express = require("express");
const router = express.Router();
const { Board,Memo } = require('../../models');  
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
    if(obj['memInfo.memNo']){
        const inserId = await Board.create({ 

            boardName : obj['content.boardName'] ,
            boardTitle : obj['content.title'] ,
            boardContent : obj['content.content'] ,
            uploadFile : req.file ? req.file.filename : ''   ,
            isNoMember : 0 ,
            writerNm : obj['memInfo.name'] ,
            password : '' ,
            memNo :  Number(obj['memInfo.memNo']) ,
        });

        res.send('' + inserId.boardNo);

    }else{
        const password =  obj['content.password'];

        const encryptedPassowrd = bcrypt.hashSync(password, 10);
        const inserId = await Board.create({ 

            boardName : obj['content.boardName'] ,
            boardTitle : obj['content.title'] ,
            boardContent : obj['content.content'] ,
            uploadFile : req.file ? req.file.filename : ''   ,
            isNoMember : 1 ,
            writerNm : obj['content.id'] ,
            password : encryptedPassowrd ,
            memNo : null ,
        });
        res.send('' + inserId.boardNo);
    }

    




});


/*
게시글을 추가하는 페이지 
회원인 경우와 비회원인 경우 다르게 들어감
*/
router.post("/memo" , async  (req, res) => {


    const password =  req.body.data.password;
    const encryptedPassowrd = bcrypt.hashSync(password, 10);





    const inserId = await Memo.create({ 
        boardNo : req.body.data.boardNo ,
        content : req.body.data.content ,
        isNoMember : req.body.data.isNoMember ,
        writerNm :  req.body.memInfo ? req.body.memInfo.name : req.body.data.writerNm ,
        password : req.body.data.password ? encryptedPassowrd :  req.body.data.password,
        memNo : req.body.data.memNo ,
        parentMemoNo : 0 ,
        rootParentMemoNo : 0 ,
        tree : 0 ,
    });

    res.send('' + inserId.boardNo);




});


/*
게시글을 추가하는 페이지 
회원인 경우와 비회원인 경우 다르게 들어감
*/
router.post("/memo_reply" , async  (req, res) => {


    const password =  req.body.data.passwordRe;
    const encryptedPassowrd = bcrypt.hashSync(password, 10);


    const inserId = await Memo.create({ 
        boardNo : req.body.data.boardNo ,
        content : req.body.data.contentRe ,
        isNoMember :  req.body.memInfo ? 0 : 1 ,
        writerNm : req.body.memInfo ? req.body.memInfo.name : req.body.data.writerNmRe ,
        password : req.body.data.passwordRe ? encryptedPassowrd :  req.body.data.passwordRe,
        memNo : req.body.data.memNo ,
        parentMemoNo : req.body.data.parentMemoNo ,
        rootParentMemoNo : req.body.data.rootParentMemoNo ,
        tree : req.body.data.tree ,
    });

    res.send('' + inserId.boardNo);




});








module.exports = router;