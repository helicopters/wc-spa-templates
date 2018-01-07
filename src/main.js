import Vue from 'vue'
// import store from './vuex/store'
import router from 'router'

import App from './App'

/* 引入 mock, 如果需要的话 */
import 'modules/mock'

/* 引入 reset.css, 以及 base.css, mixins.less */
import 'static/reset.css';
import 'static/base.css';
import 'static/mixins.less';

/* 引入工具函数 */
import 'modules/utils'
/* 引入工具包 */
import 'modules/tools'

/* 引入 qrcode, 仅在开发环境生效 */
import 'modules/qrcode'


import Icon from 'components/wc-svg-icon'
Vue.use(Icon);



























new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: {App}
})