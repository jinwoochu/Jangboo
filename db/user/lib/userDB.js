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


// 판매자 회원가입
exports.register = function(req, res) {

    console.log(req.body)


    var id = req.body.id;
    // var password = getSecretPassword(req.body.password);
    var password = req.body.password;
    var userName = req.body.name;
    var birthDay = req.body.birthDay;
    var phone = req.body.phoneNumber;
    var sex = req.body.sex;

    // var insertQuery = "INSERT INTO `SELLERS` (email,password,phone,name,web_site) VALUES (?,?,?,?,?)";
    // var insertQueryParams = [email, password, phone, name, webSite];
    //
    // con.query(insertQuery, insertQueryParams, function(err, result, field) {
    //     if (err) {
    //         response = makeResponse(0, "주문등록 쿼리문 오류", {});
    //         res.json(response);
    //         return;
    //     } else {
    //         var requestJsonData = {
    //             "$class": "org.acme.ling.Seller",
    //             "ID": "SELLER_" + result.insertId,
    //         }
    //
    //         var options = {
    //             url: REST_API_ADDRESS + 'Seller',
    //             method: 'POST',
    //             json: requestJsonData
    //         };
    //
    //         request(options, function(error, reqResponse, body) {
    //             if (!error && reqResponse.statusCode == 200) {
    //                 // 블록체인에도 데이터 넣기 성공하면
    //                 response = makeResponse(1, "모든 로직이 정상처리 되었습니다.", {});
    //                 res.json(response);
    //             } else {
    //                 response = makeResponse(0, "DB에 데이터 넣기는 성공하였으나 블록체인에 접근실패", {});
    //                 res.json(response);
    //             }
    //
    //         });
    //
    //     }
    // });
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
