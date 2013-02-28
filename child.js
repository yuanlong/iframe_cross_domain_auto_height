var browser = (function(){
			var ua = window.navigator.userAgent;
			//ä¯ÀÀÆ÷ÀàÐÍ¼ì²â
			var opera = typeof(window.opera)=="object";
			var ie = !opera && ua.indexOf("MSIE")>0;
			//ä¯ÀÀÆ÷°æ±¾¼ì²â
			var re,version;
			 if( ie ) {
				re = /MSIE( )(\d+(\.\d+)?)/;
			}		
			if( "undefined" != typeof( re ) && re.test( ua ) )
			  version = parseFloat(RegExp.$2);
			return{
				ie: ie,
				version: version
			}
		})();
var messageParent = function(agent,scrollTop){
		var h = document.body.scrollHeight;
		h = (scrollTop)? h+'s':h;
		if(top.postMessage){
			top.postMessage( h , '*');
		} else {
			if(browser.ie&&browser.version<8&&agent){
				var id=getQueryString("if_id");
				var urlC = agent+(id!=null?("?if_id="+id):""); 
				document.getElementById("_iframe_agent").src=urlC+"#"+'h'+h; 
			}else{
				window.location.hash = 'h'+h;
			}
		}
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}