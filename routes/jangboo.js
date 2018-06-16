

var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// DB모듈 장착
var DB = require('../db/user');
var jangbooDB = require('../db/jangboo');


/* GET users listing. */
// 장부를 보여준다.
router.get('/', function(req, res, next) {
  res.render('jangboo');
});

// depost(입금)하면 -> 장부에 기록한다.
router.post('/', function(req, res, next) {
    jangbooDB.deposit(req,res);
});

// withdraw(출금)하면 -> 장부에 기록한다.
router.post('/withdraw', function(req, res, next) {
    jangbooDB.withdraw(req,res);
});

// 출금 내용 보여줄려고 만든거
router.post('/viewDetail', function(req, res, next) {
    // jangbooDB.withdraw(req,res);
    jangbooDB.viewDetail(req,res);
});



module.exports = router;