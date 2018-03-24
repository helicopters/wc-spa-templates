/*
    将对象转换为 queryString 的形式
    input:
        {
            key1: value1,
            key2: value2
        }
    output:
        ?key1=value1&key2=value2

    args:
        obj: Object | 需要转换的对象
        appendQ: Boolean | 是否需要在首位加上一个 ?

*/

// 将对象转换为 queryString 的形式
import _isEmpty from 'lodash/isEmpty'

export default (obj, appendQ = true) => {
	// 如果是空对象, 返回一个空字符串
	if (_isEmpty(obj)) {
		return ''
	}

	let str = ''
	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			obj[key] = JSON.stringify(obj[key])
		}
	}
	for (const key in obj) {
		str = str + '&' + key + '=' + obj[key]
	}
	// 是否在生成的字符串第一位添加 ?
	return appendQ ? ('?' + str.slice(1)) : str.slice(1)
}
