const express = require('express');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');


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
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');


app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
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


http.createServer(app).listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

//app.set('port' , process.env.PORT || 4000);

app.get('/api/customers' , (req,res) =>{
    connection.query(
      "SELECT * from CUSTOMER where isDeleted = 0" , (err,rows, fields) =>{
        res.send(rows);
      });
});

//image에 접근하ㅏ면 upload와 매핑이된다 
app.use('/image', express.static('./upload'));


app.post('/api/customers' , upload.single('image'), (req,res) =>{
 
  let sql = "INSERT INTO CUSTOMER VALUES (null , ? , ? , ? , ? , ? , 0 , now() ) ";

  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday , gender , job];
  console.log(params);
  console.log(sql);
  connection.query(sql, params, (err,row,fields)=>{
    res.send(row);
  });

});

app.delete('/api/customers/:id' , (req,res) =>{
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 where id = ?";
  let params = [req.params.id];

    connection.query(sql, params, (err,rows,fields) =>{
    res.send(rows);
  });

});


app.get('/' , (req,res) =>{
 
    res.json({"user" : ["user1" , "user2" , "user3"]});
});
