iframe_cross_domain_auto_height
===============================

iframe支持跨域自适用高度 兼容ie6+ firefox chrome

1.父级页面 demo.html (a.com)
iframe嵌套child.html (b.com)
引入parent.js 
iframe设置id name 并且将该值通过 if_id 传入到child.html
如：
<iframe id="ad-738435dda" name="ad-738435dda" width="400px" frameborder="no" src="http://www.b.com/js/test/child.html?if_id=ad-738435dda"></iframe>
页面加载完成后执行
IframeResize.load({
			domain : 'b.com',
			id:'ad-738435dda'
		});


2.子级页面 child.html

引入child.js

并且在底部添加下列代码
<iframe id="_iframe_agent" name="_iframe_agent" src="" width="0" height="0" style="display:none;" ></iframe>

同时添加
<script type="text/javascript">
	window.onload = function() {
		messageParent("http://www.a.com/js/test/agent.html");
	}
	window.onresize = function() {
		messageParent("http://www.a.com/js/test/agent.html");
	}
	</script>
其中 http://www.a.com/js/test/agent.html 更换为 父级域内的agent.html

3.代理页 agent.html
将该页面直接放在父级域的一个可以访问的地方即可。

大部分代码来自：https://github.com/johnymonster/iframe_height
修改成先加载iframe 再通过js调整高度