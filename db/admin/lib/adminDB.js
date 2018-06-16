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


// 관리자 회원가입
exports.register = function(req, res) {
    // console.log("넘어온다.");
    // console.log(req.body)

    var id = req.body.id;
    // var password = getSecretPassword(req.body.password);
    var password = req.body.password;
    var userName = req.body.name;
    var sex = req.body.sex;

    var birthTmp = req.body.birthDay;
    var year = "19"+birthTmp.substring(0,2);
    var month = birthTmp.substring(2,4);
    var day = birthTmp.substring(4,6);
    var birthDay = year+"-"+month+"-"+day;

    var phoneNumber = req.body.phoneNumber;

    var insertQuery = "INSERT INTO `admins` (id, password, user_name, birth_day, phone, sex) VALUES (?,?,?,?,?,?)";
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


// 관리자 로그인
exports.login = function (req,res) {

    var id = req.body.id;
    // var password = getSecretPassword(req.body.password);
    var password = req.body.password;

    var selectQuery = "SELECT * FROM admins WHERE id=?";
    var selectQueryParams = [id];

    // 아이디가 먼저 있는지 확인한다.
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
                res.cookie('aid', id, { signed: true });

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
    if (req.signedCookies.aid === undefined) {
        res.redirect('/admins/login');
    } else {
        next();
    }
}

exports.confirmWaitList = function (req,res) {
    console.log("넘오!@#!@");
    console.log(req.body);
    var number = req.body.number;


    // UPDATE `student` SET name='이진경' WHERE id=1;

    var selectQuery = "UPDATE jangboo SET status = 'confirm' WHERE u_num=?;";
    var selectQueryParams = [number];

    console.log(selectQuery)

    // 아이디가 먼저 있는지 확인한다.
    con.query(selectQuery, selectQueryParams, function(err, result, field) {
        if (err) {
            response = makeResponse(0, "잘못된 쿼리문입니다.", {});
            res.json(response);
            return;
        }
        response = makeResponse(1, "정상적으로 성공했습니다.", {});
        res.json(response);
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
