# idpayjs

This is a js module for using idpay payment gateway in javascripts project
## Install
yarn add idpayjs
or
npm i --save idpayjs
### Example
    const idpayjs = require('idpayjs');
    
    const idp=new idpayjs(APIKey,SandBox);

    idp.request({
        'order_id': '101',
        'amount': 10000,
        'name': 'قاسم رادمان',
        'phone': '09382198592',
        'mail': 'my@site.com',
        'desc': 'توضیحات پرداخت کننده',
        'callback': 'https://example.com/callback',
    })
    .then(resp=>{
        console.log(resp);
    })
    .catch(err=>{
        console.log(err);
    })

    idp.verify({
        'id': 'd2e353189823079e1e4181772cff5292',
        'order_id': '101',
    })
    .then(resp=>{
        console.log(resp);
    })
    .catch(err=>{
        console.log(err);
    })

    idp.inquiry({
        'id': 'd2e353189823079e1e4181772cff5292',
        'order_id': '101',
    })
    .then(resp=>{
        console.log(resp);
    })
    .catch(err=>{
        console.log(err);
    })

    idp.transactionsList({
        "id": "e22952579725883bbad9f8fa429134bf",
        "order_id": 101,
        "amount": 10000,
        "status": ["100"],
        "track_id": "27384837",
        "payment_card_no": "636214******5409",
        "payment_hashed_card_no": "B913D97F01CE42601181135DF3D0F81DA9E98E61BE3E3AB4436E6345D6AB0AEA",
        "payment_date": {"min": 1600005000, "max": 1600006000},
        "settlement_date": {"min": 1600005746, "max": 1600006000}
    })
    .then(resp=>{
        console.log(resp);
    })
    .catch(err=>{
        console.log(err);
    })

    const rial= idp.toRial(10000);
    const toman= idp.toToman(100000);