import Vue from 'vue'
import store from './vuex/store'
import router from '@/router'

import App from './App'

import '../static/reset.css'
import '../static/common.css'

/* 纯粹引入, 没有任何配置和主动调用 */
import '@/modules/set-title'

/* axios 引入 */
import Service from '@/config/service'

axios.defaults.baseURL = Service[process.env.NODE_ENV].url;
axios.defaults.headers['Content-Type'] = 'application/json';

/* 
  做全局拦截使用
  https://blog.csdn.net/sjn0503/article/details/74729300 
*/
axios.interceptors.response.use((response) => {
  
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
