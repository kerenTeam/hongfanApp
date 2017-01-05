	
	/* 使用方法 : 有header是, 置于其下, 有筛选 节点时, 置于其下
	 * 有筛选节点需保证 <div class="screening" id="screeningdiv">
	 * 保证下拉框的id
	 * 其他需单独适配,需用单独加的方法
	 */
	//这是封装的方法
	var statusBar = document.createElement("div");//这是模拟状态栏
	document.body.appendChild(statusBar);
	statusBar.style.cssText = "background-color: #f53c42;position: fixed;width:100%;top: 0;z-index: 9999";
	
	// 获取状态栏的高度
	var immersed = 0;
	var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms&&ms.length>=3){ // 当前环境为沉浸式状态栏模式
	    immersed=parseFloat(ms[2]);// 获取状态栏的高度
	}
	
	//适配header
	var headdiv = document.getElementsByTagName('header')[0];//这是现有的header
	document.body.style.paddingTop =  immersed+'px';
	statusBar&&(statusBar.style.height = immersed+'px');
	headdiv&&(headdiv.style.top = immersed+'px');
	//适配下拉菜单
	var screeningdiv = document.getElementById('screeningdiv');//这是现有的筛选节点
	if(screeningdiv){
		screeningdiv.style.top = immersed + 50 +'px';
		var Categorytw = document.getElementById('Categorytw');
		Categorytw && (Categorytw.getElementsByTagName('li')[0].style.paddingTop = immersed+'px');
		var gradew = document.getElementById('gradew');
		gradew && (gradew.getElementsByTagName('li')[0].style.paddingTop = immersed+'px');
		var Sort_Sort = document.getElementById('Sort-Sort');
		Sort_Sort && (Sort_Sort.getElementsByTagName('li')[0].style.paddingTop = immersed+'px');
	}

//	这是单独加模拟状态栏的方法
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