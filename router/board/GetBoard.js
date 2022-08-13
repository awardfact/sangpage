const express = require("express");
const router = express.Router();
const { Board , Memo } = require('../../models');  
const path = require('path');
const bcrypt = require('bcrypt')
const fs = require('fs');

//multer선언 이미지 업로드하면 이름을 겹치지 않게 해준다 
const multer = require('multer');
const upload = multer({dest : './front/public/image/board'});
querystring = require('querystring');


async function getMemo( memo){


    if(memo.parentMemoNo != 'undefined' &&  memo.parentMemoNo != null){

        memo.memo = await Memo.findAll({
            where: {
                boardNo: memo.boardNo,
                parentMemoNo : memo.parentMemoNo ?  memo.parentMemoNo : 0,
                deletedAt : null
            },
        });


        memo.memo.forEach((key, index) =>{  
            memo[key] = index.dataValues;

   
        });


        console.log(memo);
    }





   // console.log(memo.memo[0]); 
    //console.log(memo.memo[0].dataValues); 



    // memo.memo.dataValues
    // memo.memo.dataValues.child = await Memo.findAll({
    //     where: {
    //         parentMemoNo : memo.dataValues.memoNo
    //     },
    // });


}



/*
게시글을 추가하는 페이지 
회원인 경우와 비회원인 경우 다르게 들어감
*/
router.get("/"   , async  (req, res) => {

    const query = querystring.parse(req.query)



    
    const users = await Board.findAll({
        where: {
            boardName: req.query.boardName
        },
        offset : req.query.pageNum * (req.query.cpage -1),
        limit : Number(req.query.pageNum)
    });


    res.send(users); 


});


router.get("/read"   , async  (req, res) => {

    const query = querystring.parse(req.query)



    
    if(req.query.boardNo){
        let users = await Board.findOne({
            where: {
                boardNo: req.query.boardNo
            },
        });
    

        
        users.dataValues.memo = await Memo.findAll({
            where: {
                boardNo: req.query.boardNo,
                deletedAt : null
            },
            order : [
                [' case    when rootParentMemoNo != 0 then  rootParentMemoNo ELSE memoNo  END ', 'ASC'],
                ['parentMemoNo' ,"DESC"],
                ["createdAt" , "DESC"]
            ]
        });

        console.log(users.dataValues.memo)
        //users.dataValues.memo = getMemo(users.dataValues);
        // users.dataValues.memo.forEach(e =>{

        //     console.log(e.dataValues);

        // });

      //  console.log(users.dataValues.memo);

    
        res.send(users); 

    }



});





module.exports = router;