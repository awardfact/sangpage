const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');


http.createServer(app).listen(8444);

//app.set('port' , process.env.PORT || 4000);
app.get('/' , (req,res) =>{
    res.send('익스프레스 시작2331');
});
