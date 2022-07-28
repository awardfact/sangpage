const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');

const options = { // letsencrypt로 받은 인증서 경로를 입력해 줍니다.

    ca: fs.readFileSync('/etc/letsencrypt/live/sangpage.com/fullchain.pem'),

    key: fs.readFileSync('/etc/letsencrypt/live/sangpage.com/privkey.pem'),

    cert: fs.readFileSync('/etc/letsencrypt/live/sangpage.com/cert.pem')

    };



http.createServer(app).listen(4000);
http.createServer(options,app).listen(443)
//app.set('port' , process.env.PORT || 4000);
app.get('/' , (req,res) =>{
    res.send('익스프레스 시작');
});
