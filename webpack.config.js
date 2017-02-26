require('babel-polyfill');
var path = require('path');

module.exports = function(condition){
	return {
		entry: {
			index: [
				'babel-polyfill',
				'./js/modules/index/main.js'
			],
			torder: [
				'babel-polyfill',
				'./js/modules/torder/main.js'
			],
			porder: [
				'babel-polyfill',
				'./js/modules/porder/main.js'
			],
			vstore: [
				'babel-polyfill',
				'./js/modules/vstore/main.js'
			],
			home: [
				'babel-polyfill',
				'./js/modules/home/main.js'
			]
		},
		output: {
			path: path.join(__dirname, './.pack'),
			filename: '[name].js',
			chunkFilename: condition ? '[name].app-[hash].js' : '[name].app.js',
			publicPath: condition ? 'js/' : '.pack/'
		},
		externals: {
			Jquery: 'window.$',
			Vue: 'Vue',
			Vuex: 'Vuex'
		},
		plugins: [

		],	
		module: {
			loaders: [
				{ 
					test: /\.css$/, 
					loader: 'style-loader!css-loader!autoprefixer-loader' 
				},
				{	test: /\.less$/, 
					loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' 
				},
				{	
					test: /\.js?$/, 
					exclude: /node_modules/, 
					loader: 'babel-loader', 
					query: {
						presets: ['es2015','stage-2']
					}
				},
				{ 
					test: /\.html$/, 
					loader: "html-loader" 
				},
				{	test: /\.(png|jpg)$/, 
					loader: 'url-loader?limit=8192'
				}
			]
		}
	}
}
