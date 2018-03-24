function parseURL (_url) {
	var queryString = ''
	var url = _url || location.href
	/* 从url后面往前算, 最后一个 ? 后面的参数会被认定是 queryString */
	var index = url.lastIndexOf('?')
	var map = {}
	var queryString = url.slice(index).split('?')[1]
	queryString.split('&').forEach(function (item) {
		var t = item.split('=')
		map[t[0]] = t[1]
	})
	return map
}
export default parseURL
