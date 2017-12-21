(function(){
	function transform (cookie) {
		var _cookie = cookie || document.cookie;
		var map = {};
		_cookie.split(';').forEach(function(item){
			var t = item.split('=');
			map[t[0].trim()] = t[1];
		});
		return map;
	}
	var dc = {
		set: function (key, value) {
			document.cookie = key + '=' + value;
		},
		get: function (key) {
			return transform()[key];
		},
		ls: function () {
			return transform();
		},
		remove: function (key) {
			document.cookie = key + "= ; expires=" + new Date(0); 
		}
	}
	window.dc = dc;
})();