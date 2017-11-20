import Vue from 'vue'
// import store from './vuex/store'
import router from './router'

import App from './App'


/* 引入 wc-fetch */

/* 引入 */

window.mockLogo = 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eokorAhvqntTTQbbvlpQJCIk8gdFGVhGib7RnNvkKHcd4OmwkdMGcJk1EVW7PMte7Wtrz7YFBj4pAg/0';

new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})