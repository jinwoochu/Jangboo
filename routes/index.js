var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'BlockChain Based JangBoo' });
    console.log(req.signedCookies.id);

    if (req.signedCookies.id === undefined) {
        res.redirect('/users/login'); // 로그인 안되있는경우
    } else {
        res.redirect('/users/home') // 로그인 되있는경우
    }
});

module.exports = router;
