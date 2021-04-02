var axios = require("axios");


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

type requestParameters = {
  order_id: string;
  amount: number;
  name: string;
  phone: string;
  mail: string;
  desc: string;
  callback: string;
};

type verifyParameters = {
  id: string;
  order_id: string;
};

type transactionsListParameters = {
  page: number;
  page_size: number;
  id:string;
  order_id:string;
  amount:number;
  status:string[];
  track_id:string;
  payment_card_no:string;
  payment_date:dateRange;
  settlement_date:dateRange;
};

type dateRange={min:number;max:number};

const transactionsStatus: { code: number, description: string }[] = [
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

  request: Function = (para:requestParameters): Promise<any> => {
    const data = JSON.stringify(para);

    return idpay.setRequest(data, `${idpay.urlStart}`);
  };

  verify: Function = (para:verifyParameters ): Promise<any> => {
    const data = JSON.stringify(para);

    return idpay.setRequest(data, `${idpay.urlStart}/verify`);
  };

  inquiry: Function = (para:verifyParameters ): Promise<any> => {
    const data = JSON.stringify(para);

    return idpay.setRequest(data, `${idpay.urlStart}/inquiry`);
  };

  transactionsList: Function = (para:transactionsListParameters ): Promise<any> => {
    const data = JSON.stringify(para);
    const {page,page_size}=para;
    return idpay.setRequest(data, `${idpay.urlStart}/transactions?${page?"page="+page:""}${page && page_size?"&page_size="+page_size:"page_size="+page_size}`);
  };

  
}

module.exports = idpay;
