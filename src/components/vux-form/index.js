import Vue from 'vue'
import vuxForm from './vuxForm'

export default {
	install (Vue) {
		Vue.component('vuxForm', Vue.extend(vuxForm));
	} 
}