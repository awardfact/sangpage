const express = require('express');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');


const app = express();
const fs = require('fs');
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//데이터 베이스 불러옴 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

//데이터베이스 연결 
const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});


http.createServer(app).listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

//app.set('port' , process.env.PORT || 4000);

app.get('/api/customers' , (req,res) =>{
    connection.query(
      "SELECT * from CUSTOMER" , (err,rows, fields) =>{
        res.send(rows);
      });
});



app.get('/' , (req,res) =>{
 
    res.json({"user" : ["user1" , "user2" , "user3"]});
});
