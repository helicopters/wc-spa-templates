import Vue from 'vue'
import store from './vuex/store'
import router from '@/router'

import App from './App'

import '../static/reset.css'
import '../static/base.css'

import '@/modules/set-title'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})