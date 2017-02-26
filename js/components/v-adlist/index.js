import style from './index.less';
import indexTpl from './index.html';

import $ from 'Jquery';

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
			let _this = this;
			$.ajax({
				type: 'get',
				url: '/data/json/list.json',
				dataType: 'json',
				success: function(ret){
					_this.lists = ret.data;	
				}
			});	
		}	
	},
	mounted() {
		this.init();	
	}
}


