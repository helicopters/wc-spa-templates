import Vue from 'vue'
// import store from './vuex/store'
import router from './router'

import App from './App'

/* 引入工具函数 */
import './modules/utils'

/* 引入 vconsole */
if (process.env.NODE_ENV === 'development') {
    var VConsole = require('vconsole/dist/vconsole.min.js');
}

/* 引入 qrcode, 仅在开发环境生效 */
import './modules/qrcode'

// console.log(ip + '');
// console.log(process)

new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})