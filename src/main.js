import Vue from 'vue'
// import store from './vuex/store'
import router from './router'

import App from './App'

import './config'

import 'wc-fetch'
wc.config({
	host: _const.domain,
	commonPath: _const.path
});


new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})