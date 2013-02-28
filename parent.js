(function() {
	var el,	iframe,	i, script, messageHandler, element, container, options, xdomain,
	resize = window.IframeResize = {};
	id = 'iframe-4ee0',
	props = {
		style : 'padding: 0; margin: 0; border: none; display: block; height: 0; overflow: hidden;',
		scrolling : 'no',
		frameBorder : 0,
		id : id
	},
	ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1,

	setHeight = function (height) {
		document.getElementById(id).style.height = height + 'px';
	},
	
	messageHandler = function (e) {
		var height, r,
			regex = new RegExp(xdomain + '$'),
			matches = e.origin.match(regex);
		if(matches.length = 1){
			strD = e.data + "";
			r = strD.match(/^(\d+)(s?)$/);
			if(r && r.length == 3){
				height = parseInt(r[1]);
				if (!isNaN(height)) {
					try {
						setHeight(height);
					} catch (ex) {}
				}
				if(r[2] == "s"){
					scroll(0,0);
				}
			}
		}
	},
	setProps = function (options) {
		for (i in props) {
			try {
				var prop = (props[i] == options[i] || typeof(options[i]) == "undefined")? props[i] : options[i];
				if (i !== 'style') {
					iframe[i] = prop;
				} else {
					iframe[i].cssText = prop;
				}
			} catch (ex) {}
		}
	},
	setup = function(options) {
		options = options || {};
		xdomain = options.domain || '*';
		id=options.id;
		iframe=document.getElementById(id); 
		setProps(options);
	},update=function(hash){
		var matches = hash.match(/^#h(\d+)(s?)$/);
					if (matches) {
						setHeight(matches[1]);
						if(matches[2] == 's'){
							scroll(0,0);
						}
					}
	},browser = (function(){
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
	
	resize.load = function (options){
		setup(options);
		try {
			if (window.postMessage) {
				if (window.addEventListener) {
					window.addEventListener('message', messageHandler, false);
				} else if (window.attachEvent) {
					window.attachEvent('onmessage', messageHandler);
				}
			} else {
				if(browser.ie&&browser.version<8){
					if(browser.version==6){
						setInterval(function () {
							var hash = window.frames[""+id].frames["_iframe_agent"].location.hash;
							update(hash);
						}, 150);
					}else{
						setInterval(function () {
						 var arrStr = document.cookie.split("; ");
							for(var i = 0;i < arrStr.length;i ++){
								var temp = arrStr[i].split("=");
								if(temp[0] == "h_"+id)  update(unescape(temp[1]));
						   }
						},150);
					}
				}else{
					setInterval(function () {
						var hash = window.location.hash;
						update(hash);
					}, 150);
				}
			}
		} catch (ey) {}
	}
})();
