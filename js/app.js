
var serverUrl= "http://192.168.199.191:7200";
//var serverUrl='http://hiji.hifete.com';


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


//点赞 和取消点赞 帖子 
function likeThis(thisobj,newsId,referenceUserId,cityNum,myuserid,oldtoken,curType,imgSrc){ 
	mui.ajax(serverUrl + '/api/friends/newsinfo/newsId/'+newsId+'/userid/'+myuserid, {
		data:{'referenceUserId':referenceUserId},
		dataType: 'json',
		type: curType,
		timeout: 8000,
		headers: {"token": oldtoken,'city': cityNum},
		success: function(data, type, xhr) {  
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
	var loadPics = mui('.loadPics'),
	H = window.innerHeight;//可视窗口高度
	window.onscroll = function(){
		if(H == 0){H = window.innerHeight;}
		if(loadPics.length){
		    var S = document.documentElement.scrollTop||document.body.scrollTop;   //滚动条滚过高度
		    [].forEach.call(loadPics,function(img,index){
	         	if(!img.getAttribute('data-src')){return}
	        	//console.log(H + S - limit +'===='+ getTop(img) + plus.webview.currentWebview().id);
				if(H + S - limit > getTop(img)){
			     	img.src=img.getAttribute("data-src");
				 	img.removeAttribute("data-src");
				 	img.style.backgroundImage = 'url()';
				 	if(img.classList.contains('loadPics')){ 
					img.classList.remove('loadPics');
				     }
			 	}
	        })
		}    
	}
	if(init){//先默认显示
		window.onscroll();
	}
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
	if(obj.offsetHeight<obj.parentNode.offsetHeight){
		obj.style.height = '100%';
		obj.style.width = 'auto';
		clearInterval(timePicWidth);
		var timePicWidth = setTimeout(function(){
			obj.style.opacity = 1;
		},50)
	}else{
		clearInterval(timePicWidth2);
		var timePicWidth2 = setTimeout(function(){
			obj.style.opacity = 1;
		},50)
	}
}




