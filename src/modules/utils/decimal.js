/*
    基于 decimal.js-light 封装的四则运算 (因为经常只有四则运算而已)
    分别是:
    add: 	+ 加法运算
    minus:  - 减法运算
    times:  * 乘法运算
    divide: / 除法运算

	add
    ---------------------
    input:
    	a,b
    output:
		v
    args:
        支持任意个参数

	minus
    ---------------------
    input:
    	a,b
    output:
		v
    args:
        支持任意个参数

	times
    ---------------------
    input:
    	a,b
    output:
		v
    args:
        支持任意个参数

	divide
    ---------------------
    input:
    	a,b
    output:
		v
    args:
        支持任意个参数

*/
import Decimal from 'decimal.js-light'

const toArray = value => {
	return Array.prototype.slice.call(value)
}

const god = type => {
	return function () {
		const list = toArray(arguments)

		let base = new Decimal(list[0])

		let key = 1

		for (;key < list.length; key++) {
			base = base[type](list[key])
		}
		return base.toNumber()
	}
}

export default {
	add: god('add'),
	minus: god('minus'),
	times: god('times'),
	divide: god('dividedBy')
}
