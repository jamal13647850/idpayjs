var axios = require("axios");
var qs = require("qs");

type Config = {
  method: "post" | "get";
  url: string;
  headers: {
    "Content-Type": string;
    "X-API-KEY": string;
    "X-SANDBOX": boolean;
  };
  data: string;
};

type RQ = {
  order_id: string;
  amount: number;
  name: string;
  phone: string;
  mail: string;
  desc: string;
  callback: string;
};

class idpay {
  private static apiKey: string;
  private static SandBox: boolean = false;
  private static urlStart = "https://api.idpay.ir/v1.1/payment";
  constructor(apiKey: string, SandBox: boolean) {
    idpay.apiKey = apiKey;
    idpay.SandBox = SandBox;
  }

  private static setConfig = (url: string, data: string): Config => {
    return {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": idpay.apiKey,
        "X-SANDBOX": idpay.SandBox,
      },
      data: data,
    };
  };
  private static setRequest = (data: string, url: string): Promise<any> => {
    let config = idpay.setConfig(url, data);
    return new Promise((resolve, reject) => {
      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  Request: Function = (para:RQ): Promise<any> => {
    const data = JSON.stringify(para);

    return idpay.setRequest(data, `${idpay.urlStart}`);
  };
}

module.exports = idpay;
