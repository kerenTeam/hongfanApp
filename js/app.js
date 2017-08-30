var serverUrl='http://192.168.199.191:7200';
//var serverUrl='http://211.149.183.181:7200';
//var serverUrl='http://192.168.0.106:7200';
 
//var serverUrl='http://hiji.hifete.com';
//var serverUrl='http://s-365426.gotocdn.com';
//var serverUrl='http://s-365426.gotocdn.com:7200';
//var serverUrl='http://192.168.31.153:7200';
var serverUrl0='http://192.168.199.191:7200';
var serverUrl1='http://hiji.hifete.com';


//var serverimgUrl='http://192.168.0.128:6789';
//var serverimgUrl='http://211.149.183.181:6789';
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

window.showRedfun = function(){
	mui.plusReady(function(){
		var oldtoken = plus.storage.getItem('oldToken');
		var myuserid = plus.storage.getItem('userid');
		var PletterH = plus.storage.getItem('PletterH');
		var commentH = plus.storage.getItem('commentH');
		var likeH = plus.storage.getItem('likeH');
		console.error('请求小红点'+"赞："+likeH+"评论："+commentH+"私信："+PletterH);
		//alert('请求小红点'+"赞："+plus.storage.getItem('likeH')+"评论："+plus.storage.getItem('commentH')+"私信："+plus.storage.getItem('PletterH'));
		//document.getElementsByClassName('redDot')[0].style.display = 'inline-block';
		if(plus.storage.getItem('userid')){ 
			if(likeH || commentH || PletterH){ 
				document.getElementsByClassName('redDot')[0].style.display = 'inline-block';
			}else{ 
				//请求私信
				mui.ajax(serverUrl+'/api/news/hasnewmsg',{
					data:{"userid":myuserid},
					dataType:'json',
					type:'post',
					timeout:10000,
					headers:{"token":oldtoken},
					success:function(data){
						if(data.data && data.data.length){
							mui.each(data.data,function (index,element) {
			 					if(element.isnew){//有私信未读
			 						//alert('私信'); 
			 						plus.storage.setItem("PletterH",'yes');//私信标杆
			 						document.getElementsByClassName('redDot')[0].style.display = 'inline-block';
			 						mui('.reddian1')[2].style.display = 'inline-block'; 
			 						return false;
			 					}
							})
						}
					}
				});
				//请求评论
				mui.ajax(serverUrl+'/api/news/message',{ 
					data:{"userid":myuserid},
					dataType:'json',
					type:'post',
					timeout:10000,
					headers:{"token":oldtoken},
					success:function(data){
						if(data.data && data.data.length){
							mui.each(data.data,function (index,element) {
			 					if(element.read_state){//有评论未读
			 						//alert('评论');
			 						plus.storage.setItem("commentH",'yes');//私信标杆
			 						document.getElementsByClassName('redDot')[0].style.display = 'inline-block';
			 						mui('.reddian1')[0].style.display = 'inline-block'; 
			 						return false;
			 					}
							})
						}
					}
				});
				//请求点赞
				mui.ajax(serverUrl+'/api/news/newslike',{
					data:{"userid":myuserid},
					dataType:'json',
					type:'post',
					timeout:10000,
					headers:{"token":oldtoken},
					success:function(data){
						console.log(data);
						if(data.errno == 0 && data.data.mynewsliker && data.data.mynewsliker.mynewsliker.length){
							mui.each(data.data.mynewsliker.mynewsliker,function (index,element) {
			 					if(element.read_state){//有评论未读 
			 						//alert('点赞');
			 						plus.storage.setItem("likeH",'yes');//私信标杆
			 						document.getElementsByClassName('redDot')[0].style.display = 'inline-block';
			 						mui('.reddian1')[1].style.display = 'inline-block'; 
			 						return false;
			 					}
							})
						}
					}
				});
			}
		}
	})
}//发现红点

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
function followBack(thisobj,friendid){
	event.stopPropagation();
	function Success(){
		event.stopPropagation();
		$(thisobj).toggleClass(" mui-btn-outlined");
	 	if($(thisobj).hasClass("mui-btn-outlined")){
	 		if($(thisobj).hasClass("eachF")){
	 			$(thisobj).html("互相关注")
		 	}else{
		 		$(thisobj).html("已关注")
		 	}
		 }else{
	 		$(thisobj).html("+关注")
		 }
	}
	Success();
 	mui.plusReady(function(){
		var oldtoken = plus.storage.getItem('oldToken');
		var myuserid = plus.storage.getItem('userid');
		mui.ajax(serverUrl+'/api/news/followsb',{
			data:{"userid":myuserid,friendid:friendid},
			dataType:'json',
			type:'post',
			timeout:3000,
			headers:{"token":oldtoken},
			success:function(data,type,xhr){
				console.log('关注操作返回',data);
				if(data.errno==0){
					mui.toast('操作成功');
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


//点赞 帖子
function likeThis(newsId,likedUserid,myuserid,oldtoken){
	mui.ajax(serverUrl+"/api/news/likethenews",{
		data:{newsid:newsId,userid:likedUserid,like_user_id:myuserid},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{"token":oldtoken},
		success:function(data,type,xhr){
		},
		error:function(xhr,type,errorThrown){
				plus.nativeUI.closeWaiting();
				console.log('响应失败  !');
			}

	})
}
//点赞 评论
function likeCmt(commitid,commit_like_user_id,oldtoken){
	mui.ajax(serverUrl+"/api/news/likesmcommit",{
		data:{commit_like_user_id:commit_like_user_id,commitid:commitid},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{"token":oldtoken},
		success:function(data,type,xhr){
		},
		error:function(xhr,type,errorThrown){
				plus.nativeUI.closeWaiting();
				console.log('响应失败  !');
			}

	})
}

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

//懒加载方法
window.lazyLoad = function(init,limit){
	var limit = limit || 100;
	var loadPics = mui('.loadPics'),
	H = window.innerHeight;//可视窗口高度
	window.onscroll = function(){
		if(loadPics.length){
		    var S = document.documentElement.scrollTop||document.body.scrollTop;   //滚动条滚过高度
		    [].forEach.call(loadPics,function(img){
		         if(!img.getAttribute('data-src')){return}
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
	init && (window.onscroll())//先默认显示
	function getTop(e){//获取元素距离顶部高度方法。  
	    var T = e.offsetTop;
	    while(e = e.offsetParent ){
	        T += e.offsetTop
		}
	    return T
	} 
}

