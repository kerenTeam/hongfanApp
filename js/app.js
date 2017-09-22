
//var serverUrl= "http://192.168.199.191:7200";
//var serverUrl='http://hiji.hifete.com';
var serverUrl='http://abcd.zlzmm.com:7200';


//var serverimgUrl='http://192.168.0.128:6789';
var serverimgUrl='http://hiji.hifete.com:6789';


//var propUrl = 'http://192.168.0.128:6789';
var propUrl = 'http://hiji.hifete.com:6789';
//var propUrl = 'http://211.149.183.181:6789';

var PAYSERVER='http://hiji.hifete.com:7200/api/alipay/payment';
var WXPAYSERVER='http://hiji.hifete.com:7200/api/wechatpay/unified';
//var WXPAYSERVER='http://192.168.199.191:7200/api/wechatpay/unified';

//执行alert方法
function alertF(content){ //非姐的方法 
	//alert(content)
}
function alertY(content){ //向前的方法 
//	alert(content)
}

//banner跳转
window.bannerGo = function(url, name, route) {
	if(url.indexOf('http')>-1 || url.indexOf('HTTP')>-1){//远程
		if(route == 'one'){//层级 
			var bannerTplHtml = 'bannerTpl.html'; 
		}else{
			var bannerTplHtml = '../bannerTpl.html';
		}
		if(url.indexOf('pro')>-1){//高级功能的h5
			localStorage.Burlname=url;  
			openview({
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name,
					type:'pro'
				}
			})	
		}else{
			openview({
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name
				}
			})
		}
	}else if(url.indexOf('&')>-1 ){//本地
		var localId = url.split('&')[1],localUrl = url.split('&')[0],localUId = url.split('&')[2] || -1;
		openview({
			view: localUrl,
			create: true,
			extrasobj: {
				storeId:localId,//商铺主页
				goodcatId:localId,//特色馆分类 
				goodsId:localId,//商品主页
				activityId:localId,//活动主页 
				storeCouponId:localId,//优惠主页
				newsId:localId,//帖子详情： 帖子id
				userId:localUId,//帖子详情： 帖子userId 
			}
		})
	}
	
}

//关注和取消关注
function followBack(thisobj,likerId,curType){
	event.stopPropagation();
	function Success(){
		event.stopPropagation();
		thisobj.css('display','none'); 
		thisobj.siblings().css('display','block'); 
	}
	Success();
 	mui.plusReady(function(){
		var oldToken = plus.storage.getItem('oldToken');
		var cityNum = plus.storage.getItem('cityNum');
		var	myuserid = plus.storage.getItem('userid');
		mui.ajax(serverUrl+'/api/friends/likeusers',{
			data:{userId:myuserid,likeUserId:likerId},
			dataType:'json',
			type:curType,
			timeout:8000,
			headers:{"token":oldToken,"city":cityNum},
			success:function(data,type,xhr){
				console.log('关注操作返回',data);
				if(data.errno==0){
				}else{
					mui.toast('当前网络不好，请重试');
					Success();
				}
			},
			error:function(xhr,type,errorThrown){
				mui.toast('当前网络不好，请重试');
				console.error('关注操作响应失败');
				Success();
			}
		});
	})
}
var PAYSERVER='http://hiji.hifete.com:7200/api/alipay/payment';

//系统分享
function shareSystem(href){
	var newsData = {href:'http://hiji.hifete.com'};
	if(/android/i.test(navigator.userAgent)){
		newsData = {content:href};
	}else{
		newsData = {href:href};
	}
	mui.plusReady(function(){
		plus.share.sendWithSystem(newsData, function(e){}, function(e){});
	})
}

//点赞 和取消点赞 帖子 
function likeThis(thisobj,newsId,referenceUserId,cityNum,myuserid,oldtoken,curType,imgSrc){ 
	mui.ajax(serverUrl + '/api/friends/newsinfo/newsId/'+newsId+'/userid/'+myuserid, {
		data:{'referenceUserId':referenceUserId},
		dataType: 'json',
		type: curType,
		timeout: 8000,
		headers: {"token": oldtoken,'city': cityNum},
		success: function(data, type, xhr) {
			console.log('点赞返回',data)
			if(data.errno == 0) {  
    			thisobj.attr('src',imgSrc);
			}else{
				mui.toast('操作失败'); 
			}
		},
		error: function(xhr, type, errorThrown) { 
			console.error('点赞,响应失败');
			mui.toast('当前网络不好,请重试');
		}
	}); 
}

 
//懒加载方法
window.lazyLoad = function(init,limit){
	var limit = limit || 100;
	var loadPics = mui('.loadPics');
	var H = window.innerHeight || 1000;//可视窗口高度(避免第一次不加载)
	window.onscroll = function(){
		if(H == 0){H = window.innerHeight;}
		if(loadPics.length){
		    var S = document.documentElement.scrollTop||document.body.scrollTop;   //滚动条滚过高度
		    [].forEach.call(loadPics,function(img,index){
	         	if(!img.getAttribute('data-src')){return}
		        //console.error( H + S - limit +'===='+ getTop(img) +'====='+loadPics.length)
	         	if(H + S - limit > getTop(img)){
	             	img.src=img.getAttribute("data-src");
	             	img.removeAttribute("data-src");
             		img.style.backgroundImage = 'url()';
	             	if(img.classList.contains('loadPics')){//减少每次滚动时遍历个数
	             		img.classList.remove('loadPics');
	             		loadPics = mui('.loadPics');
	             	}
	         	}
	        })
		}    
	}
	window.onscroll();
	function getTop(e){//获取元素距离顶部高度方法。  
	    var T = e.offsetTop;
	    while(e = e.offsetParent ){
	        T += e.offsetTop
		}
	    return T
	} 
}

/*图片高宽处理*/
 window.imgHeight =  function(obj){
 	if(obj.offsetHeight == 0){/*处理高宽都为零bug*/
 		var Delayloading = setTimeout(function(){
 			imgHeight(obj);
 			clearTimeout(Delayloading),Delayloading = null;
 		},500)
 	}else{
		if(obj.offsetHeight<obj.parentNode.offsetHeight){
			obj.style.height = '100%';
			obj.style.width = 'auto';
		}
		var timePicWidth = setTimeout(function(){
			obj.style.opacity = 1;
			clearTimeout(timePicWidth),timePicWidth = null;
		},50)
 	}
}
 
//config ===== 判断网络
function internetF(){
	var types = {}; 
	types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown"; 
	types[plus.networkinfo.CONNECTION_NONE] = "None"; 
	types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet"; 
	types[plus.networkinfo.CONNECTION_WIFI] = "WiFi"; 
	types[plus.networkinfo.CONNECTION_CELL2G] = "2G"; 
	types[plus.networkinfo.CONNECTION_CELL3G] = "3G"; 
	types[plus.networkinfo.CONNECTION_CELL4G] = "4G"; 
	return(types[plus.networkinfo.getCurrentType()]);
}
//var IType = 'WiFi';
//mui.plusReady(function(){
//	alert(internetF());
//	if(internetF() == '2G' || internetF() == '3G' || internetF() == '4G'){
//		IType = 'dataW';
//	}else if(internetF() == 'WiFi'){
//		IType = 'WiFiW';
//	}
//})


//						  	plus.storage.removeItem('myToken');
//						  	plus.storage.removeItem('oldToken');
//							plus.storage.removeItem('userid');
//							plus.storage.removeItem('Acc_pass');
//							plus.storage.removeItem('$gotCoupon');
//							plus.storage.removeItem('likeH');
//							plus.storage.removeItem('commentH');
//							plus.storage.removeItem('PletterH');
//							plus.storage.removeItem('cityNum');



//格式化时间戳
function formatDate(v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //cond
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

