const express = require("express");
const router = express.Router();
const { Board , Memo ,  } = require('../../models');  
const index = require('../../models/index');  
const path = require('path');
const bcrypt = require('bcrypt')
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');


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


/*
게시글과 댓글을 불러오는 페이지 

*/

router.get("/read"   , async  (req, res) => {

    const query = querystring.parse(req.query)


    
    const offset = (req.query.page -1) * req.query.pageNum;
    const limit = req.query.pageNum;
    

    
    if(req.query.boardNo){
        let users = await Board.findOne({
            where: {
                boardNo: req.query.boardNo
            },
        });
    

        
       /* users.dataValues.memo = await Memo.findAll({
            where: {
                boardNo: req.query.boardNo,
                deletedAt : null
            },
            order : [
                [Sequelize.literal("case    when rootParentMemoNo != 0 then  rootParentMemoNo ELSE memoNo  END")],
                //[' case    when rootParentMemoNo != 0 then  rootParentMemoNo ELSE memoNo  END ', 'ASC'],
                ['parentMemoNo' ,"DESC"],
                ["createdAt" , "DESC"]
            ]
        });
        */
        
        const memo = await index.sequelize.query(`SELECT * from memo where boardNo=${req.query.boardNo} AND deletedAt is null order by  case    when rootParentMemoNo != 0 then  rootParentMemoNo ELSE memoNo  END ASC, parentMemoNo ASC , createdAt ASC limit ${limit} offset ${offset}   `);
        

         users.dataValues.memo = memo[0];

        //users.dataValues.memo = getMemo(users.dataValues);
        // users.dataValues.memo.forEach(e =>{

        //     console.log(e.dataValues);

        // });

      //  console.log(users.dataValues.memo);

    
        res.send(users); 

    }



}); 





module.exports = router;