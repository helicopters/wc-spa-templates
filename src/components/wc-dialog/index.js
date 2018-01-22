import Vue from 'vue'
import wcDialog from './wcDialog'

export default {
	install (Vue) {
		Vue.component('wcDialog', Vue.extend(wcDialog));
	} 
}