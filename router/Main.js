const express = require("express");
const router = express.Router();
const { Exchange } = require('../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

var requestIp = require('request-ip');
var request = require('request');



router.get("/exchange", async  (req, res) => {


    exchangeUrl =  `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=W5Nepat2NWWIbfZEcpPRNPaVxngJhmxM&data=AP01`
    request.get({
        url : exchangeUrl


    }, function(error, response , body){
        obj = JSON.parse(response.body);
        res.send(obj);


        obj.forEach(async (e)=>{
            if(e.result ==1){
                const inserId = await Exchange.update({ 

                    ttb : e.ttb ,
                    tts :  e.tts ,
                    dealBars : e.deal_bas_r ,
                },{
                    where: {
                        curUnit :  e.cur_unit
                    }
                });
            }

        
        });
    });



});


module.exports = router;

