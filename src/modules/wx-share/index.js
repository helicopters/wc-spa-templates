/*
备注:
checkJsApi 检测 api 是否可用
onMeauShareTimeline 分享到朋友圈
onMenuShareAppMessage 分享给微信好友
onMenuShareQQ 分享给qq好友
onMenuShareQZone 分享到qq 空间


title 
desc
linkUrl
imgUrl

手机上看
	分享到朋友圈
		title 显示在右边
		desc  不显示
		imgUrl 显示在左边
	分享给好友
		title 显示在左上
		desc  显示在左下
		imgUrl 显示在右边

电脑上看
	分享给好友
		和手机上一样


如果不传递参数的话
*/
import Vue from 'vue'
import WX from 'config/wx'
/* 拿到微信的签名 */
let fetchSign = () => {
	let signParams = {
		
			reqUrl: encodeURIComponent(location.href)
		
	}
	return wc.get({
		path: 'weixin/signature',
		params: signParams
	});	
}
let share = (options) => {
	return fetchSign()
	.then(res=>{
		/* 如果拿取成功*/
		if (res.code == 200) {
			return new Promise((resolve)=>{
				resolve(res.data[0]);
			})
		}
	}).then(res=>{
		return new Promise((resolve, reject) => {
		/* 注入 wx.config 的参数*/
		wx.config({
			debug: false,
			appId: WX[process.env.NODE_ENV].APP_ID,
			timestamp: res.timestamp,
			nonceStr: res.noncestr,
			signature: res.signature,
			jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareQZone','onMenuShareAppMessage','onMenuShareQQ'] 
		});
		/* 在 ready 之后开始执行 */
		wx.ready(()=>{

				let shareParams = {
					title: '',
					desc: '',
					imgUrl: '',
					linkUrl: '',
					success: function (res) {
						resolve(res);
					},
					fail: function (res) {
						reject(res);
					}
				}

				/* 简单的合并 shareParams 和 用户传递的 options */
				for (let key in options) {
					shareParams[key] = options[key];
				}
				
				wx.onMenuShareTimeline(shareParams);
				wx.onMenuShareAppMessage(options);
				wx.onMenuShareQQ(options);
				wx.onMenuShareQZone(options);
			})
		})
	})
}
export default {
	install (Vue) {
		Vue.prototype.$wxShare = share;
	}
}