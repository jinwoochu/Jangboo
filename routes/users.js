

var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// DB모듈 장착
var DB = require('../db/user');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 로그인 페이지
router.get('/login', function(req, res, next) {
   res.render("userLogin");
});

// 로그인 밸리데이션
router.post("/login",function (req,res,next) {
    // var id = req.body.id;
    // var password = req.body.password;
    console.log(req.body)
    // db에 접근해서 로그인 밸리데이션을 한다.

    DB.test(req,res);


    /////////////// 코드 작성 요망 ///////////////////
});

// 회원가입 페이지
router.get('/register', function (req,res) {
    res.render('userRegister');
});

// 회원가입 밸리데이션
router.post("/register",function (req,res,next) {

    console.log(req.body)
    // db에 접근해서 회원가입 밸리데이션을 한다.

    /////////////// 코드 작성 요망 ///////////////////
});

module.exports = router;