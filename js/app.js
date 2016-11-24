

(function($, owner) {
	/**
	 * 用户登录
	 **/
//	var regA = /^1((3|4|5|8|7){1}\d{1}|70)\d{8}$/;
//	var regP = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
//	owner.login = function(loginInfo, callback) {
//		callback = callback || $.noop;
//		loginInfo = loginInfo || {};
//		loginInfo.account = loginInfo.account || '';//账户
//		loginInfo.password = loginInfo.password || '';//密码
//		if (!regA.test(loginInfo.account)) {
//			return callback('请输入正确的手机号码');
//		}
//		if (!regP.test(loginInfo.password)) {
//			return callback('请输入6-12位由数字和字母组成的密码');
//		}
////		var users = JSON.parse(localStorage.getItem('$users') || '[]');
////		var authed = users.some(function(user) {
////			return loginInfo.account == user.account && loginInfo.password == user.password;
////		});
////		if (authed) {
////			return owner.createState(loginInfo.account, callback);
////		}  
//      else{ 
//      	   var $$= jQuery;
//      	   var key;
//      	   var password = $$.md5(loginInfo.password);
//      	  // alert(password)
//      		$.ajax('http://www.ban9wan.com/API/API_Common',{
//      		    data:{"str":loginInfo.account+password,"number":5},
//					dataType:'json',//服务器返回json格式数据
//					type:'post',//HTTP请求类型 
//					timeout:10000,//超时时间设置为10秒；
//					success:function(data1){
//							//alert(data1)	
//					       key = data1;	
//					       login();
//					},
//					error:function(xhr,type,errorThrown){
//						$.toast("请求失败！");
//					}
//				});  
//				//登录后台验证
//				function login(){ 
//					var pageid=plus.webview.currentWebview().pageid;
//					var pageurl=plus.webview.currentWebview().pageurl;
//					//alert(pageid)
//					$.ajax('http://www.ban9wan.com/API/API_User',{
//      		    data:{"dis":"login","miyao":key,"number":5,"user":{"UserPhone":loginInfo.account,"UserPwd":password}},
//					dataType:'json',//服务器返回json格式数据
//					type:'post',//HTTP请求类型 
//					timeout:10000,//超时时间设置为10秒；
//					success:function(data){
//							if(data==1){
//								$.toast("密码错误！");
//							}
//							if(data==0){
//								$.toast("没有该账号！");
//							}
//							if(data==2){
//							//	localStorage.setItem('$phone','{}');
//							var logInfo = {};
//							logInfo.account = loginInfo.account;
//							//logInfo.password = loginInfo.password;
//							var users = JSON.parse(plus.storage.getItem('$users') || '[]');
//							 users = [logInfo];
//								plus.storage.setItem('$users', JSON.stringify(users));
//								plus.storage.setItem('$hasuser', JSON.stringify("1"));
//								var goin = JSON.parse(plus.storage.getItem("$goin"));
//									//获得主页面的webview
//								    var main = plus.webview.getLaunchWebview();
//								    //触发主页面的gohome事件
//								    mui.fire(main,'reload',{hrefid:'personal.html'});
//								    mui.fire(main,'reload',{hrefid:'CuService.html'});
//									var list = plus.webview.getWebviewById(pageid);
// 								    //$.back();
//									$.toast('登陆成功');
//								 	$.fire(list,'refreshBySigin');
// 								    plus.webview.close(plus.webview.currentWebview());
//							}
//							if(data==-1){
//								$.toast("密钥错误！");
//							}
//							if(data==-2){
//								$.toast("验证错误！");
//							} 
//					},
//					error:function(xhr,type,errorThrown){
//						$.toast("请求失败！");
//					}
//				}); 
//     };
//				}
//				
//			
//	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo2, callback) {
		var $$= jQuery;
		callback = callback || $.noop;
		regInfo2 = regInfo2 || {};
		regInfo2.account = regInfo2.account || '';
		//regInfo.password = $$.md5(regInfo.password) || '';
		//alert(regInfo2.account)
		$.ajax('http://www.ban9wan.com/API/API_Common',{
			data:{
				str:regInfo2.account,
				number:5
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否成功；
				var aa = data;
				$.ajax('http://www.ban9wan.com/API/API_User',{
					data:{
						"dis":"xzyh",
						"miyao":aa,
						"number":5,
						"user":{
							"UserPhone":regInfo2.account
						}
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；		              
					success:function(data){
					//	mui.alert(data);
					return callback(data);
					},error:function(xhr,type,errorThrown){
						//异常处理；
						//alert(type);
						return callback('请求错误');
					}
				});
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				return callback('请求错误');
			}
		});
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		users.push(regInfo);
//		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 新用户注册验证码
	 **/
	owner.yanz1 = function(regInfo, callback){
		var $$= jQuery;
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
			
		$.ajax('http://www.ban9wan.com/API/API_Shortmessage',{
			data:{
				dis:'register',
				phone:regInfo.account,
				code:regInfo.password
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否成功；
				return callback(data);
					
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				return callback('请求错误');
			}
		});
		
		return callback();
	}	
	/**
	 * 忘记密码验证码
	 **/
	owner.yanz2 = function(regInfo, callback){
		var $$= jQuery;
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
			
		$.ajax('http://www.ban9wan.com/API/API_Shortmessage',{
			data:{
				dis:'forgetPassword',
				phone:regInfo.account,
				code:regInfo.password
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否成功；
				return callback(data);
					
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				return callback('请求错误');
			}
		});
		
		return callback();
	}	
	
	/**
	 * 忘记密码
	 **/
	owner.forget = function(regInfo, callback) {
		var $$= jQuery;
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = $$.md5(regInfo.password) || '';
		$.ajax('http://www.ban9wan.com/API/API_Common',{
			data:{
				str:regInfo.account+regInfo.password,
				number:8
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；	              
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否成功；
				var aa = data;
				$.ajax('http://www.ban9wan.com/API/API_User',{
					data:{
						"dis":"pwd",
						"miyao":aa,
						"number":8,
						"user":{
							"UserPhone":regInfo.account,
							"UserPwd":regInfo.password
						}
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；		              
					success:function(data){
						return callback(data);
					},error:function(xhr,type,errorThrown){
						//异常处理；
						//alert(type);
						return callback('请求错误');
					}
				});
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				return callback('请求错误');
			}
		});
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		users.push(regInfo);
//		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};
	
	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));