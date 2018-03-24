/*
    给定一个时间戳, 获取它所包含的 year/month/day/hour/minute/second

    JS 的时间戳默认为 ms 毫秒级别, 13 位
    Java 时间戳, 默认为 s 秒级别, 10 位

    input:
        timeStamp, addZero
    output:
        {
            year,
            month,
            day,
            hour,
            minute,
            second
        }
    attation:
        返回对象的每一个字段的值, 都是 String 类型
    args:
        timeStamp: 需要转换的时间戳
        addZero: 是否需要在 month/day/hour/minute/second 为个位的时候在前面添加 0

*/
export default (timeStamp, addZero = true) => {
	if (timeStamp.toString().length !== 13) {
		throw new Error('Error timeStamp')
	}
	const _addZero = val => {
		return val < 10 ? ('0' + val) : val
	}
	const date = new Date(timeStamp)
	const obj = {
		year: date.getFullYear(),
		month: addZero ? _addZero(date.getMonth() + 1) : (date.getMonth() + 1),
		day: addZero ? _addZero(date.getDate()) : date.getDate(),
		hour: addZero ? _addZero(date.getHours()) : date.getHours(),
		minute: addZero ? _addZero(date.getMinutes()) : date.getMinutes(),
		second: addZero ? _addZero(date.getSeconds()) : date.getSeconds()
	}
	for (const key in obj) {
		obj[key] = obj[key].toString()
	}
	return obj
}
