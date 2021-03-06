import $ from 'Jquery';

import style from './index.less';
import indexTpl from './index.html';

import types from '../../vuex/types.js';

import adsData from '../../../../../data/json/ads.json';

export default {
	template: indexTpl,
	data() {
		return {
			ads: []		
		}	
	},
	components: {
	
	},
	methods: {
		init() {
			/**
				this.$store.dispatch(types.GET_BANNER_DATA)
				.then((ret) => {
					this.ads = ret.data;
				});	
			**/
			this.ads = adsData.data;
		}					
	},
	updated () {
		let swiper = new Swiper('.swiper-container',{
			pagination: '.swiper-pagination',
			loop: true,
			autoplay: 5000
		});
	},
	mounted () {
		this.init();			
	}
}
