 
var serverUrl='http://192.168.199.191:7200'; 
//var serverUrl='http://192.168.0.128:7200';
//var serverUrl='http://hiji.hifete.com'; 
//var serverUrl='http://Aaron.lan:7200';
  

//var serverimgUrl='http://211.149.195.183:8114/'; 
var serverimgUrl='http://hiji.hifete.com:6789'; 

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