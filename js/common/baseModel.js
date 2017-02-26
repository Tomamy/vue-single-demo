import $ from 'Jquery';

export default {

    timeout: 60000,

    /**
     * 统一 通过get请求去后台获取数据
     * @param url
     * @param params
     * @param callback
     * @param sync
     */
    getData(url, params, callback, sync) {
        return this._ajaxData('get', url, params, callback, sync);
    },

    /**
     * 统一 通过post请求去后台获取数据
     * @param url
     * @param params
     * @param callback
     * @param sync
     */
    postData(url, params, callback, sync) {
        return this._ajaxData('post', url, params, callback, sync);
    },

    /**
     * 统一ajax请求获取数据
     * @param type  请求方式
     * @param url   请求地址
     * @param params    请求参数
     * @param callback  回调函数
     * @param sync  同步方式
     * @private
     */
    _ajaxData(type, url, params, callback, sync) {
        var _this = this;
        //无查询参数，用于兼容(url,callback)模式
        if (typeof callback === 'undefined' && typeof  params === 'function') {
            callback = params;
            params = {};
        }

        return $.ajax({
            'url': url,
            'type': type,
            'async': !(sync && (sync === 'sync')),
            //'data': type == 'post' ? JSON.stringify(params) : params,
            'data': params,
            'dataType': 'json',
            //'contentType': "application/json",
            'timeout': _this.timeout,
            'success': (result) => {
                let retCode = result.code ;
                if(retCode == 401){
						let url = result.data + 'http://' +
                        encodeURIComponent(window.location.host + window.location.pathname + '?_hash=' + location.hash.replace('#','')) ;
					window.location.href = url ;
                }

                /*callback && callback(result.data);*/
                callback && callback(result);
            },
            'error': (result) => {
                _this._handleAPIError(result);
            }
        });
    },

    /**
     * 对API调用发生的异常错误做处理（容错、提示、记录）
     * @param result
     */
    _handleAPIError(result) {
        /*console.log('handleAPIError');
        console.log(result);*/
    },
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null)
            return decodeURIComponent(r[2]);
        return null; //返回参数值
    }
};
