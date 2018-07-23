/* eslint-disable */
/* 引入工具函数, 放到顶层引入, 防止在之前的模块中没有定义 */
import '@/modules/utils'

import Vue from 'vue'
import store from './vuex/store'
import router from '@/router'

import App from './App'

// /* 引入 reset.css, 以及 base.css */
// import '../static/reset.css';
// import '../static/base.css';

// /* 设置页面标题 */
// import '@/modules/set-title'

/* ---------------------- 微信相关 ------------------------ */

// /* 微信上传图片 */
// import wxUpload from 'modules/wx-upload'
// Vue.use(wxUpload);

// /* 微信分享 */
// import wxShare from 'modules/wx-share'
// Vue.use(wxShare);

/* 微信授权 */
// import '@/modules/wx-auth'

// /* 微信定位 */
// import wxLocation from 'modules/wx-location'
// Vue.use(wxLocation)

// import wxPay from 'modules/wx-pay'
// Vue.use(wxPay);

/* ---------------------- 微信相关 ------------------------ */

/* fetch */
// import 'wc-fetch'
// import Service from '@/config/service'

// wc.config ({
// 	url: Service[process.env.NODE_ENV].url
// })

/* ----------------------- 组件相关 --------------------------*/
// import wcLoading from 'wc-loading'
// import 'wc-loading/style.css'
// Vue.use(wcLoading);

// /* 弹窗 */
// import {Alert, Confirm, Toast} from 'wc-messagebox'
// import 'wc-messagebox/style.css'
// Vue.use(Alert);
// Vue.use(Confirm);
// Vue.use(Toast);

// /* 一些组件的引入 */
// import wcDialog from 'components/wc-dialog'
// Vue.use(wcDialog);

// import vuxForm from 'components/vux-form'
// Vue.use(vuxForm);

// import wcInput from 'components/wc-input'
// Vue.use(wcInput);

// /* 引入 svg icon */
// import Icon from 'components/wc-svg-icon'
// Vue.use(Icon);

/* 引入 wc-swiper*/
// import wcSwiper from 'wc-swiper'
// import 'wc-swiper/style.css'
// Vue.use(wcSwiper);

/* ----------------------- 组件相关 --------------------------*/

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
/* eslint-enable */
