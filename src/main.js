/* 引入工具函数, 放到顶层引入, 防止在之前的模块中没有定义 */
import 'modules/utils'


import Vue from 'vue'
import store from './vuex/store'
import router from 'router'

import App from './App'

/* 引入 reset.css, 以及 base.css */
import 'static/reset.css';
import 'static/base.css';
/* 专门用来重置样式的 */
import 'static/cover.less'
/* 项目配色文件 */
import './less/color.less'

/* 引入 qrcode, 仅在开发环境生效 */
import 'modules/qrcode'

/* 设置页面标题 */
import 'modules/set-title'

/* 微信相关代码 */

/* 微信上传图片 */
import wxUpload from 'modules/wx-upload'
Vue.use(wxUpload);

/* 微信分享 */
import 'modules/wx-share'

/* 微信授权 */
import 'modules/wx-auth'

/* 微信定位 */
import wxLocation from 'modules/wx-location'
Vue.use(wxLocation)

import wxPay from 'modules/wx-pay'
Vue.use(wxPay)

/* 弹窗 */
import {Alert, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert);
Vue.use(Confirm);
Vue.use(Toast);

/* fetch */
import 'wc-fetch'
import Service from 'config/service'

wc.config ({
	url: Service[process.env.NODE_ENV].url
})

if (process.env.NODE_ENV == 'development') {
	wc.config ({
		headers: {
			'Content-Type': 'application/json',
			token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1MTU3NDQ2NTQsInN1YiI6IntcImlkXCI6XCIzXCIsXCJpbWFnZVwiOlwiaHR0cDovL3d4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9EWUFJT2dxODNlb2tvckFodnFudFRUUWJidmxwUUpDSWs4Z2RGR1ZoR2liN1JuTnZrS0hjZDRPbXdrZE1HY0prMUVWVzdQTXRlN1d0cno3WUZCajRwQWcvMTMyXCIsXCJuaWNrbmFtZVwiOlwi5bCP5pyL5Y-L5LiN5LmWXCIsXCJvcGVuSWRcIjpcIm9vZlhJMDdaRzViVW1QcVVCZmZVTFlCMzlKUjRcIixcInNleFwiOlwiMVwifSIsImV4cCI6MTUxNzIxNTg4M30.q8xI3V0Kocwgc9mOi6P2k44nzUubEFaF5ZLUpIcK_0Y'
		}
	})
} else {
	wc.config ({
		headers: {
			'Content-Type': 'application/json',
			token: ls.get('token')
		}
	})	
}

import wcLoading from 'wc-loading'
import 'wc-loading/style.css'
Vue.use(wcLoading);

/* 一些组件的引入 */
import wcDialog from 'components/wc-dialog'
Vue.use(wcDialog);

import wcForm from 'components/wc-form'
Vue.use(wcForm);

import wcInput from 'components/wc-input'
Vue.use(wcInput);

/* 引入 svg icon */
import Icon from 'components/wc-svg-icon'
Vue.use(Icon);


/* 引入 wc-swiper*/
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper);




new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})