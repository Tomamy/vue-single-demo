export default {
	getParam( _name, source ){
		var pattern = new RegExp("(\\?|&)" + _name + "=([^&]*)");
		var m = (source || window.location.href).match(pattern);
		return (!m?"":m[2]);
	}
}
	








