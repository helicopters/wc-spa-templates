/*
	微信定位应该是仅仅拿到了用户的一个经纬度, 还需要通过腾讯地图的接口拿到具体的位置

*/


import Vue from 'vue'
import WX from 'config/wx'

let WXLocation = (options) => {
	return new Promise((resolve) => {
		let signParams = {
			data: {
				reqUrl: encodeURIComponent(location.href.split('#')[0])
			}
		}
		wc.get({
			path: 'weixin/signature',
			params: signParams
		}).then(res=>{
			if (res.code == 200) {
				return new Promise((resolve)=>{
					resolve(res.data[0])
				})
			}
		}).then(res=>{
			let configParams = {
				debug: false,
				appId: WX[process.env.NODE_ENV].APP_ID,
				timestamp: res.timestamp,
				nonceStr: res.noncestr,
				signature: res.signature,
				jsApiList: ['checkJsApi','getLocation'] 
			}

			wx.config(configParams);
				wx.ready(()=>{
					wx.getLocation({
					    type: 'wgs84', 
					    success (res) {
					    	resolve(res);
					    },
					    fail (res){
					    	console.log(res);
					    }
					});
				})
			})
	})
}
export default {
	install (Vue) {
		Vue.prototype.$wxLocation = WXLocation;
	}
}