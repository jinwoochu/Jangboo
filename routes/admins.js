var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// DB모듈 장착
var adminDB = require('../db/admin');



/* GET users listing. */
router.get('/', function(req, res, next) {

    res.send("admin Page!!");
    // if (req.signedCookies.id === undefined) {
    //     res.redirect('login'); // 로그인 안되있는경우
    // } else {
    //     res.redirect('home'); // 로그인 되있는경우
    // }
});

// 로그인 페이지
// 로그인한 유저가 로그인 다시 하려고 할때 -> 못가게 함.
router.get('/login', function(req, res, next) {

    res.render("adminLogin");
    // if (req.signedCookies.id === undefined) {
    //     res.render("userLogin"); // 로그인 안되있는경우
    // } else {
    //     res.redirect('home'); // 로그인 되있는경우
    // }
});

// 관리자 로그인 밸리데이션
router.post("/login",function (req,res,next) {
    // db에 접근해서 로그인 밸리데이션을 한다.
    adminDB.login(req,res);
});


// 관리자 회원가입 페이지
router.get('/register', function (req,res) {
    res.render('adminRegister');
});

// 관리자 회원가입 밸리데이션
router.post("/register",function (req,res,next) {
    // db에 접근해서 회원가입 밸리데이션을 한다.
    adminDB.register(req,res);
});

// 조회 페이지
router.get('/lookup',function(req, res, next) {
    res.render("lookup");
});

// 지출 페이지 -- admin.js로 넘길것임 나중에
router.get('/withdraw',function(req, res, next) {
    res.render("withdraw");
});


// 로그아웃
router.get('/logout', function(req, res, next) {
    res.clearCookie("id");
    res.redirect('/');
});




module.exports = router;