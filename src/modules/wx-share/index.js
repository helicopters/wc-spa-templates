/*
备注:
checkJsApi 检测 api 是否可用
onMeauShareTimeline 分享到朋友圈
onMenuShareAppMessage 分享给微信好友
onMenuShareQQ 分享给qq好友
onMenuShareQZone 分享到qq 空间
*/
import Vue from 'vue'
// import  from '../../config/service'

import WX from '../../config/wx'


/* 拿到微信的签名 */
let fetchSign = () => {
	let signParams = {
		data: {
			reqUrl: encodeURIComponent(location.href)
		}
	}

	return wc.get({
		path: 'weixin/signature',
		params: signParams
	});	
}



let share = (options) => {


	// getShareParams(options);



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




		// let configParams = {
		// 	debug: false,
		// 	appId: WX[process.env.NODE_ENV].APP_ID,
		// 	timestamp: res.timestamp,
		// 	nonceStr: res.noncestr,
		// 	signature: res.signature,
		// 	jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareQZone','onMenuShareAppMessage','onMenuShareQQ'] 
		// }
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

			/* 先组合分享参数 */

			/*
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

						


			*/




			let shareParams = {
				success: function (res) {
					console.log(resolve);

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







			// 分享到朋友圈
			wx.onMenuShareTimeline(shareParams);
			// 分享给朋友
			wx.onMenuShareAppMessage(options);
			// 分享给 qq好友
			wx.onMenuShareQQ(options);
			// 分享到 qq空间
			wx.onMenuShareQZone(options);

	








			// // console.log(options)

			// // 分享到朋友圈
			// wx.onMenuShareTimeline({
			//     title: options.title || options.desc || '专场秀', 
			//     desc: options.desc || '专场秀', 
			//     link: location.href, 
			//     imgUrl: options.img || options.pic[0], 
	  //           // trigger: function (res) {
	  //           //     alert('用户点击分享到朋友圈');
	  //           // },
	  //           success: function (res) {

	  //               resolve(res);

	  //           },
	  //           // cancel: function (res) {
	  //           //     alert('已取消');
	  //           // },
	  //           // fail: function (res) {
	  //           //     alert('wx.onMenuShareTimeline:fail: '+JSON.stringify(res));
	  //           // },
	  //           // complete: function (res) {
	  //           // 	alert(JSON.stringify(res));
	  //           // }
			// });

			// let shareConfig = {
			//     title: options.title || options.desc || '专场秀', 
			//     desc: options.desc || '专场秀', 
			//     link: location.href, 
			//     imgUrl: options.img || options.pic[0], 
			// }


			// 分享到朋友圈
			// wx.onMenuShareTimeline(shareConfig);
			// 分享给朋友
			// wx.onMenuShareAppMessage(shareConfig);
			// // 分享给 qq好友
			// wx.onMenuShareQQ(shareConfig);
			// // 分享到 qq空间
			// wx.onMenuShareQZone(shareConfig);








			})

		})
		
	})

		
}


export default {
	install (Vue) {
		Vue.prototype.$wxShare = share;
	}
}