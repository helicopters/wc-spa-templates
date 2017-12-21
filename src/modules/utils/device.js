/*
    获取当前设备的设备型号, 包含如下函数:
    isiOS()
    isAndroid()
    isiPad()
    isWeChat()


*/
let appVersion = navigator.appVersion;
let userAgent  = navigator.userAgent;

export default {
	isiOS () {
		return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	},
	isAndroid () {
		return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
	},
	isiPad () {
		return userAgent.indexOf('iPad') > -1;
	},
	isWeChat () {
		return userAgent.indexOf('MicroMessenger') > -1;
	}
}
// function isAndroid () {
// 	return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
// 	// return appVersion.match(/android/gi);
// }
// function isiOS () {
// 	return userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	// return appVersion.match(/iphone/gi);
// }
// function isiPad () {
// 	return userAgent.indexOf('iPad') > -1
// }


// function isBrowser () {}
// function isWeixin () {
// 	return userAgent.indexOf('MicroMessenger') > -1;
// }
// function isMobile () {
// 	return !!userAgent.match(/AppleWebKit.*Mobile/i) || !!userAgent.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/); //是否为移动终端
// }

// function isWeibo () {
// 	return userAgent.indexOf('Weibo') > -1;
// }
// function isQQ () {
// 	return userAgent.match(/\sQQ/i) == "qq";
// }
