import Vue from 'vue'
import Tabbar from './tabbar'
import TabbarItem from './tabbar-item'

export default {
	install (Vue) {
		Vue.component('Tabbar', Vue.extend(Tabbar));
		Vue.component('TabbarItem', Vue.extend(TabbarItem));
	}
}