var express = require('express');
var router = express.Router();

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
    
})

// 회원가입 페이지
router.get('/register', function (req,res) {
    res.render('userRegister');
})

// 회원가입 밸리데이션






module.exports = router;
