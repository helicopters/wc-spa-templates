if (process.env.NODE_ENV == 'development') {

	let qrcode = null;
	/* 第一次, 打开带 ip 的 url, 先保存 ip 地址, 然后替换url 到没有带ip参数的 url */
	let ip = utils.parseUrl().ip;
	if (ip) {
		localStorage.setItem('__ip__', utils.parseUrl().ip);
		location.replace(location.origin)
	} else {
		/* 
			第二次进来之后, 不会存在 ip 地址, 所以走这里
			1 判断 localStorage 里面有没有存 ip
				存在, 生成二维码
		*/

		let ip = localStorage.getItem('__ip__');
		if (ip) {
			let url = location.href;
			url = url.replace('localhost', ip);
			createQrcode(url)
		}

		window.onhashchange = ()=>{
			let ip = localStorage.getItem('__ip__');
			if (ip) {
				let url = location.href;
				console.log(url)
				url = url.replace('localhost', ip);
				createQrcode(url)
			}			
		}
	}

	function createQrcode (url) {
		/* 创建 el */
		let div = document.createElement('div');
		div.id = 'qrcode';
		div.style.display = 'none';
		document.body.appendChild(div);

		if (qrcode) {
			qrcode.clear();
			qrcode.makeCode(url);
		} else {
			qrcode = new QRCode(document.getElementById("qrcode"), {
			    text: url,
			    width: 200,
			    height: 200,
			    colorDark : "#000000",
			    colorLight : "#ffffff",
			    correctLevel : QRCode.CorrectLevel.H
			});			
		}

		/* 没有提供生成成功的函数, 所以我们只能延迟 调用*/
		let fn = ()=>{
			setTimeout(()=>{
				let base64 = document.querySelector('#qrcode').querySelector('img').src;
				if (base64) {
					let css = `background:url(${base64}) center center no-repeat;padding:100px 110px;line-height:220px;margin:20px;`
					/* 清空之前输出的二维码 */
					console.clear();
					console.log('%c', css);	
					console.log(`%c当前的URL为: ${url}`, 'font-size:20px;color:red')		
				} else {
					fn();
				}
			},100);		
		}
		fn();		
	}
}