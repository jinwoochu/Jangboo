//요청 페이지의 내용을 받아온다.
var request = require('request');

// mysql
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "jangboo"
});


// 유저 회원가입
exports.deposit = function(req, res) {


    console.log("넘어온다.");


    var userName = "하드코딩";
    var depositMoney = req.body.money;


    var insertQuery = "INSERT INTO `deposits` (money, user_name) VALUES (?,?)";
    var insertQueryParams = [depositMoney, userName];
    console.log(insertQuery)
    console.log("=======")
    console.log(insertQueryParams);

    con.query(insertQuery, insertQueryParams, function(err, result, field) {
        if (err) {
            response = makeResponse(0, "뭘보냐 씨발", {key:"뭘보냐 씨발"});
            res.json(response);
            return;
        } else {
            response = makeResponse(1, "모든 로직이 정상처리 되었습니다.", {});
            res.json(response);
        }
    });

    
}




// 리스폰스 만드는 함수
function makeResponse(status, message, data) {
    var response = {
        status: status,
        message: message
    };

    for (var key in data) {
        response[key] = data[key];
    }
    return response;
}
