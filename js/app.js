//var serverUrl='http://192.168.199.191:7200';
//var serverUrl='http://hiji.hifete.com';
var serverUrl='http://s-365426.gotocdn.com';
//var serverUrl='http://192.168.31.153:7200';

//var propUrl = 'http://192.168.0.128:6789';
var propUrl = 'http://hiji.hifete.com:6789';
//var propUrl = 'http://211.149.183.181:6789';
var partner_key='syet234876fxcvdj58yjdbn475serop8';
var serverUrl0='http://192.168.199.191:7200';
var serverUrl1='http://192.168.0.130:7200'; 

var partner_key='syet234876fxcvdj58yjdbn475serop8';

//var serverimgUrl='http://192.168.0.128:6789';
var serverimgUrl='http://hiji.hifete.com:6789';
//var serverimgUrl='http://211.149.183.181:6789'; 

var PAYSERVER='http://hiji.hifete.com:7200/api/alipay/payment'; 
var WXPAYSERVER='http://hiji.hifete.com:7200/api/wechatpay/unified';
//var WXPAYSERVER='http://192.168.199.191:7200/api/wechatpay/unified'; 

//执行alert方法
function alertF(content){ //非姐的方法 
	alert(content)
}
function alertY(content){ //向前的方法 
	alert(content) 
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

//js控制显示字数
(function($){
    $.fn.wordLimit = function(num){
        this.each(function(){
            if(!num){
                var copyThis = $(this.cloneNode(true)).hide().css({
                    'position': 'absolute',
                    'width': 'auto',
                    'overflow': 'visible'
                });
                $(this).after(copyThis);
                if(copyThis.width()>$(this).width()){
                    $(this).text($(this).text().substring(0,$(this).text().length-4));
                    $(this).html($(this).html()+'...');
                    copyThis.remove();
                    $(this).wordLimit();
                }else{
                    copyThis.remove(); //清除复制
                    return;
                }
            }else{
                var maxwidth=num;
                if($(this).text().length>maxwidth){
                    $(this).text($(this).text().substring(0,maxwidth));
                    $(this).html($(this).html()+'...');
                }
            }
        });
    }
})(jQuery);
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
