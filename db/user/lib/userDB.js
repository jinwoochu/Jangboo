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
exports.register = function(req, res) {

    // console.log(req.body)

    var id = req.body.id;
    // var password = getSecretPassword(req.body.password);
    var password = req.body.password;
    var userName = req.body.name;


    var sex = req.body.sex;
    var phoneNumber = req.body.phoneNumber;

    var birthTmp = req.body.birthDay;
    var year = birthTmp.substring(0,4);
    var month = birthTmp.substring(4,6);
    var day = birthTmp.substring(6,8);
    var birthDay = year+"-"+month+"-"+day;

    var insertQuery = "INSERT INTO `users` (id, password, user_name, birth_day, phone, sex) VALUES (?,?,?,?,?,?)";
    var insertQueryParams = [id, password, userName, birthDay, phoneNumber, sex];

    con.query(insertQuery, insertQueryParams, function(err, result, field) {
        if (err) {
            response = makeResponse(0, "주문등록 쿼리문 오류", {});
            res.json(response);
            // return;
            var password = req.body.password;
        } else {
            response = makeResponse(1, "모든 로직이 정상처리 되었습니다.", {});
            res.json(response);
        }
    });
}


// 유저 로그인
exports.login = function (req,res) {

    var id = req.body.id;
    // var password = getSecretPassword(req.body.password);
    var password = req.body.password;

    var selectQuery = "SELECT * FROM users WHERE id=?";
    var selectQueryParams = [id];

    // email이 먼저 있는지 확인한다.
    con.query(selectQuery, selectQueryParams, function(err, result, field) {
        if (err) {
            response = makeResponse(0, "잘못된 쿼리문입니다.", {});
            res.json(response);
            return;
        }
        if (result.length == '0') {
            response = makeResponse(0, "없는 아이디 입니다.", {});
            res.json(response);
            return;
        } else if (result.length == 1) {
            if (result[0].password === password) {

                // 여기서 쿠키 심어야 할듯
                res.cookie('id', id, { signed: true });

                response = makeResponse(1, "로그인 성공", {});
                res.json(response);
                return;
            } else {
                response = makeResponse(0, "비밀번호가 틀렸습니다.", {});
                res.json(response);
                return;
            }
        }
    });
}

// 로그인되어있는지 , 쿠키 확인
exports.isLogined = function(req, res, next) {
    if (req.signedCookies.id === undefined) {
        res.redirect('/');
    } else {
        next();
    }
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
