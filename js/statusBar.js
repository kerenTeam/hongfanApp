//使用方法 : 有header是, 置于其下, 有筛选 节点时, 置于其下,需保证 <div class="screening" id="screeningdiv" style="top: 50px;">
//	这是封装的方法
	var statusBar = document.createElement("div");//这是模拟状态栏
	document.body.appendChild(statusBar);
	statusBar.style.cssText = "background-color: #f53c42;position: fixed;width:100%;top: 0;z-index: 9999";
	
	var immersed = 0;
	var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
	    immersed=parseFloat(ms[2]);// 获取状态栏的高度
	}
	var headdiv = document.getElementsByTagName('header')[0];//这是现有的header
	var screeningdiv = document.getElementById('screeningdiv');//这是现有的筛节点
	document.body.style.paddingTop =  immersed+'px';
	statusBar&&(statusBar.style.height = immersed+'px');
	headdiv&&(headdiv.style.top = immersed+'px');
	var oldtop = parseInt(screeningdiv.style.top);
	screeningdiv&&(screeningdiv.style.top = immersed + oldtop +'px');

//	这是单独加的方法
//	<div id="sBar" style="background-color: #f53c42;position: fixed;width:100%;top: 0;z-index: 9999"></div>
//	<script type="text/javascript">
//		var immersed = 0;
//		var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
//		if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
//		    immersed=parseFloat(ms[2]);// 获取状态栏的高度
//		}
//		var statusBar = document.getElementById('sBar');//这是模拟状态栏
//		var headdiv = document.getElementById('header');//这是现有的header
//		document.body.style.paddingTop =  immersed+'px';
//		statusBar&&(statusBar.style.height = immersed+'px');
//		headdiv&&(headdiv.style.top = immersed+'px');
//	</script>
