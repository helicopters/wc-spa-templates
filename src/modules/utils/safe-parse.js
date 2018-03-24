function safeParse (jsonStr) {
	let obj = {}
	try {
		obj = JSON.parse(jsonStr)
	} catch (e) {
		obj = {}
	}
	return obj
}
