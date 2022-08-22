const express = require('express');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
const fs = require('fs');
const port = process.env.PORT || 8080;


//multer선언 이미지 업로드하면 이름을 겹치지 않게 해준다 
const multer = require('multer');
const upload = multer({dest : './upload'});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//데이터 베이스 불러옴 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


//시퀄라이즈

const { sequelize } = require('./models');


//라우트 
const router = express.Router();
// const joinRouter = require("./router/member/Join");
// const LoginRouter = require("./router/member/Login");
// const KakaoLoginRouter = require("./router/member/KakaoLogin");
// const LogoutRouter = require("./router/member/Logout");
// const MemberUpdate = require("./router/member/MemberUpdate");
// const CommonRouter = require("./router/Common");


//크론
const cron = require('node-cron');

const cronController = require('./controller/cronController')



const indexRouter = require("./router/indexRouter");


app.use(morgan('dev'));



//세션설정
app.use(session({
  httpOnly: true,	
  secure: true,	
  secret: 'secret123',	
  resave: true,	
  saveUninitialized: true,	
  cookie: {	
    httpOnly: true,
    Secure: true
  }
}));



sequelize.sync({ force: false })
  .then(() => {

  })
  .catch((err) => {
    console.error(err);
  });



  
//데이터베이스 연결 
const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});


//라우터 연결 
// app.use("/member/join", joinRouter);
// app.use("/member/login", LoginRouter);
// app.use("/member/kakao_login", KakaoLoginRouter);
// app.use("/member/logout", LogoutRouter);
// app.use("/member/member_update", MemberUpdate);
// app.use("/common", CommonRouter);
app.use("/", indexRouter);


http.createServer(app).listen(port, ()=>{
});


cron.schedule('0 0 6,12,18,0 * * * ' , ()=>{

  cronController.exchangeCron();


});


app.get('/' , (req,res) =>{
 
    res.json({"user" : ["user1" , "user2" , "user3"]});
});
