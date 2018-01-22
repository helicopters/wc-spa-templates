import Vue from 'vue'
import wcForm from './wcForm'

export default {
	install (Vue) {
		Vue.component('wcForm', Vue.extend(wcForm));
	} 
}