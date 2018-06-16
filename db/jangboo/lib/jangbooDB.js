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
            if(rows[i].status == "wait"){
                rows[i].status = "대기";
            } else if(rows[i].status == "confirm"){
                rows[i].status = "완료";
            }
            if(rows[i].kind == "deposit"){
                rows[i].kind = "입금";
            } else if(rows[i].kind == "withdraw"){
                rows[i].kind = "출금";
            }
        }

        res.render("lookupAllSearch",{searchData:rows, searchLen:rows.length}); // 장부에 있는 내역 받아야됌.
    });
}

// 대기 내역 조회
exports.waitSearchAdmin = function(req, res) {

    var selectQuery = "SELECT * FROM jangboo WHERE status = ?;";
    var selectQueryParam = ["wait"];
    con.query(selectQuery, selectQueryParam, function(err, rows, fields) {
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
            if(rows[i].status == "wait") {
                rows[i].status = "대기";
            }

            if(rows[i].kind == "deposit"){
                rows[i].kind = "입금";
            } else if(rows[i].kind == "withdraw"){
                rows[i].kind = "출금";
            }
        }

        res.render("permit",{searchData:rows, searchLen:rows.length}); // 장부에 있는 내역 받아야됌.
    });
}

// 대기 내역 조회
exports.waitSearch = function(req, res) {

    var selectQuery = "SELECT * FROM jangboo WHERE status = ?;";
    var selectQueryParam = ["wait"];
    con.query(selectQuery, selectQueryParam, function(err, rows, fields) {
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
            if(rows[i].status == "wait") {
                rows[i].status = "대기";
            }

            if(rows[i].kind == "deposit"){
                rows[i].kind = "입금";
            } else if(rows[i].kind == "withdraw"){
                rows[i].kind = "출금";
            }
        }

        res.render("lookupWaitSearch",{searchData:rows, searchLen:rows.length}); // 장부에 있는 내역 받아야됌.
    });
}

// 완료 내역 조회
exports.confirmSearch = function(req, res) {

    var selectQuery = "SELECT * FROM jangboo WHERE status = ? AND kind=?;";
    var selectQueryParam = ["confirm",'deposit'];
    con.query(selectQuery, selectQueryParam, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "내부 오류입니다.", {});
            res.json(response);
            return;
        }

        for(var i =0; i< rows.length;i++){
            rows[i].reg_time = rows[i].confirm_time.toLocaleString();
            if(parseInt(rows[i].confirm_time.toLocaleString().split("-")[1])<10){ // 달이 10 보다 작으면 0추가
                rows[i].confirm_time = rows[i].confirm_time.toLocaleString().replace(rows[i].confirm_time.toLocaleString().split("-")[1], "0"+ rows[i].confirm_time.toLocaleString().split("-")[1])
            }
            if(rows[i].status == "confirm"){
                rows[i].status = "완료";
            }
            if(rows[i].kind == "deposit"){
                rows[i].kind = "입금";
            } else if(rows[i].kind == "withdraw"){
                rows[i].kind = "출금";
            }
        }

        res.render("lookupConfirmSearch",{searchData:rows, searchLen:rows.length}); // 장부에 있는 내역 받아야됌.
    });
}

// withdraw에 잔여금액 반환
exports.showAvailableBalance = function (req,res) {

    var selectQuery = "select SUM(money) as deposit from jangboo where status='confirm' and kind='deposit';";
    // var selectQueryParam = ["confirm"];
    con.query(selectQuery, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "내부 오류입니다.", {});
            res.json(response);
            return;
        }
        console.log("입금 내역 : "+rows[0].deposit);

        var selectQuery2 = "select SUM(money) as withdraw from jangboo where status='confirm' and kind='withdraw';";

        con.query(selectQuery2, function(err_2, rows_2, fields_2) {
            if (err) {
                response = makeResponse(0, "내부 오류입니다.", {});
                res.json(response);
                return;
            }

            var withdrawBal;
            var sum_withdraw = rows_2[0].withdraw;

            if(sum_withdraw==null){ //
                withdrawBal=0;
            }else{ //  합이 널이 아니면 그 금액을 넣어주어야 된다.
                withdrawBal= sum_withdraw;
            }
            console.log("지출 금액 : "+withdrawBal);
            console.log("남은 금액 : "+ (rows[0].deposit - withdrawBal));
            res.render('withdraw',{availableMoney:(rows[0].deposit - withdrawBal)});
        });
    });


}

// 지출하기 == 2개의 테이블을 변경해야한다.
// jangboo, description
exports.withdraw = function(req, res) {

    var withdrawId = req.signedCookies.aid;
    var withdrawMoney = req.body.money;
    var why = req.body.why;

    var selectQuery = "SELECT * FROM admins WHERE id= ?;";
    var selectQueryParams = [withdrawId];

    con.query(selectQuery, selectQueryParams, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "해당 쿠키값을 가진 ID가 없습니다.", {});
            res.json(response);
            return;
        }
        console.log(rows[0].user_name);
        var userName = rows[0].user_name;

        var insertQuery = "INSERT INTO `jangboo` (money, user_name, status, kind) VALUES (?,?,?,?)";
        var insertQueryParams = [withdrawMoney, userName, "confirm", "withdraw"];

        con.query(insertQuery, insertQueryParams, function(err, result, field) {
            if (err) {
                response = makeResponse(0, "데이터 삽입 오류", {});
                res.json(response);
                return;
            } else {

                var jangNum = result.insertId;
                var insertQuery2 = "INSERT INTO `withdraw_desc` (jangboo_num, description) VALUES (?,?)";
                var insertQueryParams2 = [jangNum, why];

                con.query(insertQuery2, insertQueryParams2, function(err2, result2, field2) {
                    if (err2) {
                        response = makeResponse(0, "데이터 삽입 오류", {});
                        res.json(response);
                        return;
                    } else {
                        response = makeResponse(1, "모든 로직이 정상처리 되었습니다.", {});
                        res.json(response);
                    }
                });
            }
        });





    });
}

// 지출내역 조회
exports.lookupWithdrawSearch = function(req, res) {

    var selectQuery = "SELECT * FROM jangboo WHERE kind= ?;";
    var selectQueryParams = ['withdraw'];

    con.query(selectQuery, selectQueryParams, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "쿼리문 오류", {});
            res.json(response);
            return;
        }

        for(var i =0; i< rows.length;i++){
            rows[i].reg_time = rows[i].reg_time.toLocaleString();
            if(parseInt(rows[i].reg_time.toLocaleString().split("-")[1])<10){ // 달이 10 보다 작으면 0추가
                rows[i].reg_time = rows[i].reg_time.toLocaleString().replace(rows[i].reg_time.toLocaleString().split("-")[1], "0"+ rows[i].reg_time.toLocaleString().split("-")[1])
            }
            if(rows[i].status == "wait") rows[i].status = "대기";
            else rows[i].status = "완료";

            if(rows[i].kind == "deposit") rows[i].kind = "입금";
            else rows[i].kind = "출금";
        }

        res.render("lookupWithdrawSearch",{searchData:rows, searchLen:rows.length}); // 장부에 있는 내역 받아야됌.

    });
}


exports.showMypage = function (req,res) {


    var id = req.signedCookies.id;

    var selectQuery = "SELECT user_name FROM users WHERE id=?;";
    var selectQueryParams = [id];

    con.query(selectQuery, selectQueryParams, function(err, rows, fields) {
        if (err) {
            response = makeResponse(0, "해당 쿠키값을 가진 ID가 없습니다.", {});
            res.json(response);
            return;
        }

        var userName = rows[0].user_name;
        var selectQuery2 = "SELECT * FROM jangboo WHERE user_name=?;";
        var selectQueryParams2 = [userName];

        con.query(selectQuery2, selectQueryParams2, function(err2, rows2, fields2) {
            if (err) {
                response = makeResponse(0, "쿼리문 오류", {});
                res.json(response);
                return;
            }

            for(var i =0; i< rows.length;i++){
                rows2[i].reg_time = rows2[i].reg_time.toLocaleString();
                if(parseInt(rows2[i].reg_time.toLocaleString().split("-")[1])<10){ // 달이 10 보다 작으면 0추가
                    rows2[i].reg_time = rows2[i].reg_time.toLocaleString().replace(rows2[i].reg_time.toLocaleString().split("-")[1], "0"+ rows2[i].reg_time.toLocaleString().split("-")[1])
                }
                rows2[i].confirm_time = rows2[i].confirm_time.toLocaleString();
                if(parseInt(rows2[i].confirm_time.toLocaleString().split("-")[1])<10){ // 달이 10 보다 작으면 0추가
                    rows2[i].confirm_time = rows2[i].confirm_time.toLocaleString().replace(rows2[i].confirm_time.toLocaleString().split("-")[1], "0"+ rows2[i].confirm_time.toLocaleString().split("-")[1])
                }

                if(rows2[i].status == "wait") rows2[i].status = "대기";
                else rows2[i].status = "완료";

                if(rows2[i].kind == "deposit") rows2[i].kind = "입금";
                else rows2[i].kind = "출금";
            }

            res.render("mypage",{searchData:rows2, searchLen:rows2.length}); // 장부에 있는 내역 받아야됌.

        });
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
