import Vue from 'vue'
// import store from './vuex/store'
import router from './router'

import App from './App'

new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})