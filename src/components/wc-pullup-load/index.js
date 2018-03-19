import Vue from 'vue'
import wcPullupLoad from './wcPullupLoad'

export default {
	install (Vue) {
		Vue.component('wcPullupLoad', Vue.extend(wcPullupLoad));
	}
}