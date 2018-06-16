var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// DB모듈 장착
var adminDB = require('../db/admin');
var jangbooDB = require('../db/jangboo');


/* GET users listing. */
router.get('/', function(req, res, next) {

    if (req.signedCookies.aid === undefined) {
        res.redirect('login'); // 로그인 안되있는경우
    } else {
        res.redirect('withdraw'); // 로그인 되있는경우
    }
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

// 지출 페이지
router.get('/withdraw',adminDB.isLogined,function(req, res, next) {
    // 잔여금액 렌더링 필요함
    jangbooDB.showAvailableBalance(req,res);

});

// 승인 내역 페이지 (대기 목록에 있는 지출 목록을 승인해)
router.get('/permit',adminDB.isLogined,function(req, res, next) {
    jangbooDB.waitSearchAdmin(req,res);
});

// 입금 대기목록 승인
router.post("/confirmWaitList",adminDB.isLogined,function (req,res,next) {

    adminDB.confirmWaitList(req,res);
});


// 로그아웃
router.get('/logout', function(req, res, next) {
    res.clearCookie("aid");
    res.redirect('/admins/login');
    // 민경환 ㅡㅡ
});


// 로그인되어있는지 , 쿠키 확인
exports.isLogined = function(req, res, next) {
    if (req.signedCookies.aid === undefined) {
        res.redirect('/admins/login');
    } else {
        next();
    }
}


module.exports = router;