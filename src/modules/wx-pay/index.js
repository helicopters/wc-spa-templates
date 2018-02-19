import Vue from 'vue'
import wxConfig from 'config/wx'

let wxPay = options => {
    return WeXPay(options)
        .then(res => {
            return new Promise((resolve) => {
                resolve(res);
            })
        })
}

function WeXPay(options) {
    return new Promise((resolve, reject) => {
        function onBridgeReady() {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": wxConfig[process.env.NODE_ENV].APP_ID,
                    "timeStamp": options.data.args.timeStamp.toString(),
                    "nonceStr": options.data.args.nonceStr,
                    "package": options.data.args.package,
                    "signType": "MD5",
                    "paySign": options.data.args.paySign
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
export default {
    install(Vue) {
        Vue.prototype.$wxPay = wxPay;
    }
}