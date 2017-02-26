import baseModel from '../../../common/baseModel.js'; 
import types from './types.js';

export default {
	//获取中国地图geojson数据	
	[types.GET_BANNER_DATA] () {
		return new Promise( (resolve, reject) => {
			baseModel.getData( '/data/json/ads.json', (data) => {
				resolve(data);		
			});
		} );
	}
}
