

var express = require('express');
var router = express.Router();

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// DB모듈 장착
var DB = require('../db/user');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('jangboo');
});

module.exports = router;