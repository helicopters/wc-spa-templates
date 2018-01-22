import Vue from 'vue'
import MD5 from 'blueimp-md5'
import wxConfig from 'config/wx'
/*
支付的时候不存在异常的扔出来, 
*/
let args = {};
let status;
let statusMap = {
    'fail': 2,
    'cancel': 3,
    'ok': 1
}
let wxPay = options => {
    args = options;
    return WeXPay()
        .then(res => {



            // status = res;
            // let params = {
            //     data: {
            //         orderCode: args.orderCode,
            //         payResult: statusMap[res],
            //         userId: localStorage.getItem('userId')
            //     }
            // }
            // return wc.get({
            //     path: 'pay/confirm',
            //     params: params
            // }).then(res => {
            //     if (res.code == 200) {
                    return new Promise((resolve) => {
                        resolve(res);
                    })
            //     }
            // })



        })
    /*
    支付, 支付成功之后, 可以不加状态什么玩意的, 直接搞定, 无所谓. 
    */
}
function WeXPay() {
    let nowTime = parseInt(new Date().getTime() / 1000).toString();
    let str = Math.random().toLocaleString();
    let paySign = signatureStr({
        "appId": wxConfig[process.env.NODE_ENV].APP_ID,
        "timeStamp": nowTime,
        "nonceStr": str,
        "package": "prepay_id=" + args.payResult.weiXinPayResult.prePayId,
        "signType": "MD5",
    })
    return new Promise((resolve, reject) => {
        function onBridgeReady() {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": wxConfig[process.env.NODE_ENV].APP_ID,
                    "timeStamp": nowTime,
                    "nonceStr": str,
                    "package": "prepay_id=" + args.payResult.weiXinPayResult.prePayId,
                    "signType": "MD5",
                    "paySign": paySign
                },
                function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        resolve('ok');
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        resolve('cancel');
                    } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                        resolve('fail')
                    } else {
                        reject({
                            msg: '支付失败'
                        });
                    }
                }
            );
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    })
}
function signatureStr(obj, bool) {
    if (!obj || (typeof obj !== 'object')) return;
    let arr = [],
        key;
    for (key in obj) {
        arr.push(key);
    }
    arr = arr.sort();
    for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = arr[i] + '=' + obj[arr[i]];
    }
    let str;
    if (bool) {
        str = MD5(arr.join('&'));
    } else {
        str = MD5(arr.join('&') + '&key=' + wxConfig[process.env.NODE_ENV].key);
    }
    return str.toUpperCase();
}
export default {
    install(Vue) {
        Vue.prototype.$wxPay = wxPay;
    }
}