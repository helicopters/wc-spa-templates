import Vue from 'vue'
import wcInput from './wcInput'

export default {
	install (Vue) {
		Vue.component('wcInput', Vue.extend(wcInput));
	} 
}