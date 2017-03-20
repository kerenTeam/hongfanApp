 
var serverUrl='http://192.168.199.191:7200'; 
//var serverUrl='http://hiji.hifete.com'; 
//var serverUrl='http://Aaron.lan:7200';
  

//var serverimgUrl='http://211.149.195.183:8114/'; 
var serverimgUrl='http://hiji.hifete.com:6789'; 
var PAYSERVER='http://hiji.hifete.com:7200/api/alipay/payment';

//关注和取消关注
function followBack(thisobj,friendid){
	event.stopPropagation();
	function Success(){
		event.stopPropagation()
		$(thisobj).toggleClass(" mui-btn-outlined");
	 	if($(thisobj).hasClass("mui-btn-outlined")){
	 		if($(thisobj).hasClass("eachF")){
	 			$(thisobj).html("互相关注")
		 	}else{
		 		$(thisobj).html("已关注")
		 	}
		 }else{
	 		$(thisobj).html("关注")
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