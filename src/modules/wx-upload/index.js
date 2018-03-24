import Vue from 'vue'
import wcUpload from './wcUpload'

export default {
	install (Vue) {
		Vue.component('wcUpload', Vue.extend(wcUpload))
	}
}
