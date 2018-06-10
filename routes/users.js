var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// DB모듈 장착
var DB = require('../db/user');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('users/login');
});

// 로그인 페이지
router.get('/login', function(req, res, next) {
   res.render("userLogin");
});

// 로그인 밸리데이션
router.post("/login",function (req,res,next) {
    // db에 접근해서 로그인 밸리데이션을 한다.
    DB.login(req,res);
});


// 회원가입 페이지
router.get('/register', function (req,res) {
    res.render('userRegister');
});

// 회원가입 밸리데이션
router.post("/register",function (req,res,next) {
    // db에 접근해서 회원가입 밸리데이션을 한다.
    DB.register(req,res);
});


// 메인 페이지
router.get('/home',DB.isLogined, function(req, res, next) {
    res.render("home");
});

// 입금 페이지
router.get('/deposit', DB.isLogined, function(req, res, next) {
    res.render("deposit");
});

// 조회 페이지
router.get('/lookup',DB.isLogined,function(req, res, next) {
    res.render("lookup");
});

// 지출 페이지
router.get('/withdraw',function(req, res, next) {
    res.render("withdraw");
});


// 로그아웃
router.get('/logout', function(req, res, next) {
    res.clearCookie("id");
    res.redirect('/');
});




module.exports = router;