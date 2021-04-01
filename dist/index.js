var axios = require("axios");
var qs = require("qs");
var idpay = /** @class */ (function () {
    function idpay(apiKey, SandBox) {
        idpay.apiKey = apiKey;
        idpay.SandBox = SandBox;
    }
    idpay.SandBox = false;
    idpay.urlStart = "https://api.idpay.ir/v1.1/payment";
    idpay.setConfig = function (url, data) {
        return {
            method: "post",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": idpay.apiKey,
                "X-SANDBOX": idpay.SandBox
            },
            data: data
        };
    };
    idpay.setRequest = function (data, url) {
        var config = idpay.setConfig(url, data);
        return new Promise(function (resolve, reject) {
            axios(config)
                .then(function (response) {
                resolve(response.data);
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    idpay.Request = function (para) {
        var data = qs.stringify(para);
        return idpay.setRequest(data, "" + idpay.urlStart);
    };
    return idpay;
}());
module.exports = idpay;
