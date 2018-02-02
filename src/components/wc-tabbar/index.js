import Vue from 'vue'
import wcTabbar from './wcTabbar'

export default {
	install (Vue) {
		Vue.component('wcTabbar', Vue.extend(wcTabbar));
	}
}