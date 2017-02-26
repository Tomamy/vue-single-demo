import Vue from 'Vue';
import Vuex from 'Vuex';
import $ from 'Jquery';

import store from './vuex/store.js';

import indexTpl from './main.html';
import indexStyle from './main.less'; 

//导入组件
import vFnav from '../../components/v-fnav/index.js';
import vBanner from './components/v-banner/index.js';
import vCnav from './components/v-cnav/index.js';
import vAdlist from '../../components/v-adlist/index.js';

/**
 * 创建和挂载根实例
 * 使整个应用都有路由功能
 */
const App = new Vue({
	store,
	el: '#app-container',
	template: indexTpl,
	data() {
		return {
		
		}	
	},
	components: {
		vFnav,
		vBanner,
		vCnav,
		vAdlist
	},
	methods: {
		init() {
		}	
	},
	mounted () {
		this.init();
	}
});
export default App;
