import Vue from 'vue'
import Icon from './Icon'

export default {
	install (Vue) {
		Vue.component('Icon', Vue.extend(Icon));
	}
}