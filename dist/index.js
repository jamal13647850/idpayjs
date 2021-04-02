var axios = require("axios");
var transactionsStatus = [
    { code: 1, description: "پرداخت انجام نشده است" },
    { code: 2, description: "پرداخت ناموفق بوده است" },
    { code: 3, description: "خطا رخ داده است" },
    { code: 4, description: "بلوکه شده" },
    { code: 5, description: "برگشت به پرداخت کننده" },
    { code: 6, description: "برگشت خورده سیستمی" },
    { code: 7, description: "انصراف از پرداخت" },
    { code: 8, description: "به درگاه پرداخت منتقل شد" },
    { code: 10, description: "در انتظار تایید پرداخت" },
    { code: 100, description: "پرداخت تایید شده است" },
    { code: 101, description: "پرداخت قبلا تایید شده است" },
    { code: 200, description: "به دریافت کننده واریز شد" },
];
var idpay = /** @class */ (function () {
    function idpay(apiKey, SandBox) {
        this.request = function (para) {
            var data = JSON.stringify(para);
            return idpay.setRequest(data, "" + idpay.urlStart);
        };
        this.verify = function (para) {
            var data = JSON.stringify(para);
            return idpay.setRequest(data, idpay.urlStart + "/verify");
        };
        this.inquiry = function (para) {
            var data = JSON.stringify(para);
            return idpay.setRequest(data, idpay.urlStart + "/inquiry");
        };
        this.transactionsList = function (para) {
            var data = JSON.stringify(para);
            var page = para.page, page_size = para.page_size;
            return idpay.setRequest(data, idpay.urlStart + "/transactions?" + (page ? "page=" + page : "") + (page && page_size ? "&page_size=" + page_size : "page_size=" + page_size));
        };
        this.toRial = function (amount) {
            return amount * 10;
        };
        this.toToman = function (amount) {
            return amount / 10;
        };
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
    return idpay;
}());
module.exports = idpay;
