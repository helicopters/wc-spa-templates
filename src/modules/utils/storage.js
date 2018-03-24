(function () {
	window.ls = {
		set: function (key, value) {
			if (typeof value === 'object') {
				throw new Error('You are trying to save an object to storage')
			}
			localStorage.setItem(key, value)
		},
		get: function (key) {
			return localStorage.getItem(key)
		},
		remove: function (key) {
			localStorage.removeItem(key)
		},
		clear: function () {
			localStorage.clear()
		},
		ls: function () {
        	return localStorage
		}
	}

	window.ss = {
		set: function (key, value) {
			if (typeof value === 'object') {
				throw new Error('You are trying to save an object to storage')
			}
			sessionStorage.setItem(key, value)
		},
		get: function (key) {
			return sessionStorage.getItem(key)
		},
		remove: function (key) {
			sessionStorage.removeItem(key)
		},

		clear: function () {
			sessionStorage.clear()
		},
		ls: function () {
        	return sessionStorage
		}
	}
})()
