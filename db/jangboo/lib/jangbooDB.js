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


// 입금
exports.deposit = function(req, res) {

    var searchId = req.signedCookies.id;
    var depositMoney = req.body.money;


    var selectQuery = "SELECT * FROM users WHERE id= ?;";
    var selectQueryParams = [searchId];

    con.query(selectQuery, selectQueryParams, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "해당 쿠키값을 가진 ID가 없습니다.", {});
            res.json(response);
            return;
        }
        console.log(rows[0].user_name);
        var userName = rows[0].user_name;

        var insertQuery = "INSERT INTO `jangboo` (money, user_name, kind) VALUES (?,?,?)";
        var insertQueryParams = [depositMoney, userName, "deposit"];

        con.query(insertQuery, insertQueryParams, function(err, result, field) {
            if (err) {
                response = makeResponse(0, "데이터 삽입 오류", {});
                res.json(response);
                return;
            } else {
                response = makeResponse(1, "모든 로직이 정상처리 되었습니다.", {});
                res.json(response);
            }
        });
    });
}


// 전체 내역 조회
exports.allSearch = function(req, res) {
    console.log("넘어온다.");

    var selectQuery = "SELECT * FROM jangboo;";

    con.query(selectQuery, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "내부 오류입니다.", {});
            res.json(response);
            return;
        }

        for(var i =0; i< rows.length;i++){
            rows[i].reg_time = rows[i].reg_time.toLocaleString();
            if(parseInt(rows[i].reg_time.toLocaleString().split("-")[1])<10){ // 달이 10 보다 작으면 0추가
                rows[i].reg_time = rows[i].reg_time.toLocaleString().replace(rows[i].reg_time.toLocaleString().split("-")[1], "0"+ rows[i].reg_time.toLocaleString().split("-")[1])
            }
        }

        res.render("lookup",{searchData:rows, searchLen:rows.length}); // 장부에 있는 내역 받아야됌.
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
