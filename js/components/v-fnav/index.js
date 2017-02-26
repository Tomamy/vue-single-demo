import style from './index.less';
import indexTpl from './index.html';

import utils from '../../common/utils.js';

let pos = utils.getParam('pos');

export default {
	template: indexTpl,			
	data() {
		return {
			isHome: pos == 'home' || !pos ? true : false,
			isList: pos == 'list' ? true : false,
			isPencil: pos == 'pencil' ? true : false,
			isWeidian: pos == 'weidian' ? true : false,
			isUser: pos == 'user' ? true : false
		}
	},
	components: {
	
	},
	computed: {
			
	},
	methods: {
	
	}
}


