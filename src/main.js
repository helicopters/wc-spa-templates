import Vue from 'vue'
// import store from './vuex/store'
import router from './router'

import App from './App'

/* 引入 wc-fetch */

/* 引入 */


new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})