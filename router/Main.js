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


    const currentDay = moment().subtract(1, 'hours').format('YYYYMMDD');
    const currentTime = moment().subtract(1, 'hours').format('HHMM');

    const time = new Date();
    const exchange = await Exchange.findAll({


    });
    const xy = dfs_xy_conv("toXY",req.query.lat,req.query.long);


    exchangeUrl =  `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?numOfRows=20&serviceKey=XvsgAIs0EusRoN8Ym6a%2FsoVkRM8hm3bez0Bp9BW8zWWhpNwzPcPwSIJ84Qnir34cdKL2K4RyKi1HGOUtZGqYzg%3D%3D&base_date=${currentDay}&base_time=${currentTime}&nx=${xy.x}&ny=${xy.y}`
//    location = request('GET', exchangeUrl);
    let locationTmp = await axios.get(exchangeUrl);


    const locationJson = convert2.xml2json(locationTmp.data, { compact: true, spaces: 4 });




    let locationStatus = JSON.parse(locationJson).response.header.resultMsg._text;
    console.log(exchangeUrl);
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



// 위도 경도를 기상청 api x,y좌표로 변환하기 위한 함수 
function dfs_xy_conv(code, v1, v2) {

    var RE = 6371.00877; // 지구 반경(km)
    var GRID = 5.0; // 격자 간격(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)
    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)
    var XO = 43; // 기준점 X좌표(GRID)
    var YO = 136; // 기1준점 Y좌표(GRID)



    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
    var rs = {};
    if (code == "toXY") {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    }
    else {
        rs['x'] = v1;
        rs['y'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) - ra;
        var alat = Math.pow((re * sf / ra), (1.0 / sn));
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
            theta = 0.0;
        }
        else {
            if (Math.abs(yn) <= 0.0) {
                theta = Math.PI * 0.5;
                if (xn < 0.0) - theta;
            }
            else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
    }
    return rs;
}



module.exports = router;

