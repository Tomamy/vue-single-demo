import style from './index.less';
import indexTpl from './index.html';

import $ from 'Jquery';

import listData from '../../../data/json/list.json';

export default {
	template: indexTpl,			
	data() {
		return {
			lists: []	
		}
	},
	components: {
	
	},
	computed: {
			
	},
	methods: {
		init() {
			/**
			let _this = this;
			$.ajax({
				type: 'get',
				url: '/data/json/list.json',
				dataType: 'json',
				success: function(ret){
					_this.lists = ret.data;	
				}
			});
			**/
			this.lists = listData.data;
		}	
	},
	mounted() {
		this.init();	
	}
}


