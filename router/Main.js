const express = require("express");
const router = express.Router();
const { Exchange , Test } = require('../models');  
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

const requestIp = require('request-ip');
const request = require('sync-request');
const axios = require('axios');
const convert = require('xml2js');
const convert2 = require('xml-js');
const moment = require('moment');
require('moment-timezone');



router.get("/", async  (req, res) => {


    moment.tz.setDefault("Asia/Seoul");


    const currentDay = moment().format('YYYYMMDD');
    const currentTime = moment().format('HH:00');

    const time = new Date();
    const exchange = await Exchange.findAll({


    });



    exchangeUrl =  `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=14&serviceKey=XvsgAIs0EusRoN8Ym6a%2FsoVkRM8hm3bez0Bp9BW8zWWhpNwzPcPwSIJ84Qnir34cdKL2K4RyKi1HGOUtZGqYzg%3D%3D&base_date=${currentDay}&base_time=${currentTime}&nx=${req.query.lat}&ny=${req.query.long}`
//    location = request('GET', exchangeUrl);
    let locationTmp = await axios.get(exchangeUrl);


    const locationJson = convert2.xml2json(locationTmp.data, { compact: true, spaces: 4 });
    //console.log(locationJson);

    console.log(exchangeUrl);


    let locationStatus = JSON.parse(locationJson).response.header.resultMsg._text;

    console.log(locationStatus);
    if(locationStatus == 'NORMAL_SERVICE'){
        const location = JSON.parse(locationJson).response.body.items.item;

        res.send({exchange : exchange , location : location});
    }else{

        res.send({exchange : exchange });

    }

        //let tmp = JSON.parse(locationJson).response.body.items;        


    // if(tmp){
    //     console.log(tmp);
    // }


    // Object.keys(locationJson).forEach(function(k){
    //     console.log('키값 : '+k + ', 데이터값 : ' + locationJson[k]);
    // });

   // locationTmp = locationTmp.getElementsByTagName('response');
//console.log(locationJson);
//console.log(111111);

//    const ltmp = JSON.parse(locationJson);
//    console.log(ltmp);

    //const location = locationTmp.data;

    // const location =  convert.parseString(locationTmp.data ,async function(err, obj){
    //     console.log(obj);
    //     console.log(obj.response);



    // });
   // console.log(JSON.parse(location));
    



});




module.exports = router;

