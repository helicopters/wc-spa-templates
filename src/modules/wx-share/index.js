/*
备注:
checkJsApi 检测 api 是否可用
onMeauShareTimeline 分享到朋友圈
onMenuShareAppMessage 分享给微信好友
onMenuShareQQ 分享给qq好友
onMenuShareQZone 分享到qq 空间
title
desc
link
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

import wxShare from './wx-share'

/* 默认的分享出去指向的地址 */
const defaultShareUrl = 'http://zhuanchangxiu.com/msg/index.html#list'

/* 拿到微信的签名 */
const fetchSign = (haslink) => {
	let reqUrl

	/* 如果用户指定了分享的链接 */
	if (haslink) {
		reqUrl = location.href
	} else {
		reqUrl = defaultShareUrl
	}

	const signParams = {
		data: {
			reqUrl: encodeURIComponent(reqUrl)
		}
	}
	return wc.get({
		path: 'weixin/signature',
		params: signParams
	})
}
const share = (options = {}) => {
	return fetchSign(options.link)
		.then(res => {
			/* 如果拿取成功 */
			if (res.code == 200) {
				return new Promise((resolve) => {
					resolve(res.data[0])
				})
			}
		}).then(res => {
			return new Promise((resolve, reject) => {
				/* 注入 wx.config 的参数 */
				wx.config({
					debug: false,
					appId: WX[process.env.NODE_ENV].APP_ID,
					timestamp: res.timestamp,
					nonceStr: res.noncestr,
					signature: res.signature,
					jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareQZone', 'onMenuShareAppMessage', 'onMenuShareQQ']
				})
				/* 在 ready 之后开始执行 */
				wx.ready(() => {
					/* 不再设置默认参数 */
					const shareParams = {
						title: '专场秀',
						desc: '行业资讯',
						link: defaultShareUrl,
						imgUrl: 'https://zhuanchangxiu.oss-cn-hangzhou.aliyuncs.com/6b132907eb7a40568b7fee09c1e55f6dl3noofJ3QTcs0jR40pzgdzPh47zFbku1j9BVCrxFlrmqAVLsoWhO9Wu3Sv44piNi.jpg',
						success: function (res) {
							resolve(res)
						},
						fail: function (res) {
							reject(res)
						}
					}

					for (const key in options) {
						/* 如果没有值的话, 就使用默认值 */
						if (options[key]) {
							shareParams[key] = options[key]
						}
					}

					wx.onMenuShareTimeline(shareParams)
					wx.onMenuShareAppMessage(shareParams)
					wx.onMenuShareQQ(shareParams)
					wx.onMenuShareQZone(shareParams)
				})
			})
		}).catch(err => {
			console.log(err)
		})
}
export default {
	install (Vue) {
		Vue.prototype.$wxShare = share
		Vue.component('wxShare', Vue.extend(wxShare))
	}
}
