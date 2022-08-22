
const { Exchange , Test } = require('../models');  
var request = require('request');

async function exchangeCron(){

    // const inserId = await Test.create({ 
    //     ip :  '111.111.111.111'
    // });



    exchangeUrl =  `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=W5Nepat2NWWIbfZEcpPRNPaVxngJhmxM&data=AP01`
    request.get({
        url : exchangeUrl


    }, function(error, response , body){

        obj = JSON.parse(response.body);



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



};

module.exports = {
    exchangeCron
};