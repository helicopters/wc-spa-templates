import Vue from 'vue'
// import store from './vuex/store'
import router from './router'

import App from './App'

/* 引入 vconsole */
if (process.env.NODE_ENV === 'development') {
    var VConsole = require('vconsole/dist/vconsole.min.js');
}

new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})