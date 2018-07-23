import Vue from 'vue'
import store from './vuex/store'
import router from '@/router'

import App from './App'

import '../static/reset.css'
import '../static/base.css'

/* 模块引入 */

/* 纯粹引入, 没有任何配置和主动调用 */
import '@/modules/set-title'

/* 组件引入 */
import Icon from '@/components/Icon'
Vue.use(Icon)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})