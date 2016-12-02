
var serverUrl='http://192.168.199.191:7200';
var serverimgUrl='http://211.149.195.183:8114/';
//(function($, owner) {
//
//	owner.createState = function(name, callback) {
//		var state = owner.getState();
//		state.account = name;
//		state.token = "token123456789";
//		owner.setState(state);
//		return callback();
//	};
//
//	/**
//	 * 新用户注册
//	 **/
//	owner.reg = function(regInfo2, callback) {
//		var $$= jQuery;
//		callback = callback || $.noop;
//		regInfo2 = regInfo2 || {};
//		regInfo2.account = regInfo2.account || '';
//		//regInfo.password = $$.md5(regInfo.password) || '';
//		//alert(regInfo2.account)
//		$.ajax('http://www.ban9wan.com/API/API_Common',{
//			data:{
//				str:regInfo2.account,
//				number:5
//			},
//			dataType:'json',//服务器返回json格式数据
//			type:'post',//HTTP请求类型
//			timeout:10000,//超时时间设置为10秒；	              
//			success:function(data){
//				//服务器返回响应，根据响应结果，分析是否成功；
//				var aa = data;
//				$.ajax('http://www.ban9wan.com/API/API_User',{
//					data:{
//						"dis":"xzyh",
//						"miyao":aa,
//						"number":5,
//						"user":{
//							"UserPhone":regInfo2.account
//						}
//					},
//					dataType:'json',//服务器返回json格式数据
//					type:'post',//HTTP请求类型
//					timeout:10000,//超时时间设置为10秒；		              
//					success:function(data){
//					//	mui.alert(data);
//					return callback(data);
//					},error:function(xhr,type,errorThrown){
//						//异常处理；
//						//alert(type);
//						return callback('请求错误');
//					}
//				});
//			},
//			error:function(xhr,type,errorThrown){
//				//异常处理；
//				return callback('请求错误');
//			}
//		});
////		var users = JSON.parse(localStorage.getItem('$users') || '[]');
////		users.push(regInfo);
////		localStorage.setItem('$users', JSON.stringify(users));
//		return callback();
//	};
//
//	/**
//	 * 新用户注册验证码
//	 **/
//	owner.yanz1 = function(regInfo, callback){
//		var $$= jQuery;
//		callback = callback || $.noop;
//		regInfo = regInfo || {};
//		regInfo.account = regInfo.account || '';
//		regInfo.password = regInfo.password || '';
//			
//		$.ajax('http://www.ban9wan.com/API/API_Shortmessage',{
//			data:{
//				dis:'register',
//				phone:regInfo.account,
//				code:regInfo.password
//			},
//			dataType:'json',//服务器返回json格式数据
//			type:'post',//HTTP请求类型
//			timeout:10000,//超时时间设置为10秒；	              
//			success:function(data){
//				//服务器返回响应，根据响应结果，分析是否成功；
//				return callback(data);
//					
//			},
//			error:function(xhr,type,errorThrown){
//				//异常处理；
//				return callback('请求错误');
//			}
//		});
//		
//		return callback();
//	}	
//	/**
//	 * 忘记密码验证码
//	 **/
//	owner.yanz2 = function(regInfo, callback){
//		var $$= jQuery;
//		callback = callback || $.noop;
//		regInfo = regInfo || {};
//		regInfo.account = regInfo.account || '';
//		regInfo.password = regInfo.password || '';
//			
//		$.ajax('http://www.ban9wan.com/API/API_Shortmessage',{
//			data:{
//				dis:'forgetPassword',
//				phone:regInfo.account,
//				code:regInfo.password
//			},
//			dataType:'json',//服务器返回json格式数据
//			type:'post',//HTTP请求类型
//			timeout:10000,//超时时间设置为10秒；	              
//			success:function(data){
//				//服务器返回响应，根据响应结果，分析是否成功；
//				return callback(data);
//					
//			},
//			error:function(xhr,type,errorThrown){
//				//异常处理；
//				return callback('请求错误');
//			}
//		});
//		
//		return callback();
//	}	
//	
//	/**
//	 * 忘记密码
//	 **/
//	owner.forget = function(regInfo, callback) {
//		var $$= jQuery;
//		callback = callback || $.noop;
//		regInfo = regInfo || {};
//		regInfo.account = regInfo.account || '';
//		regInfo.password = $$.md5(regInfo.password) || '';
//		$.ajax('http://www.ban9wan.com/API/API_Common',{
//			data:{
//				str:regInfo.account+regInfo.password,
//				number:8
//			},
//			dataType:'json',//服务器返回json格式数据
//			type:'post',//HTTP请求类型
//			timeout:10000,//超时时间设置为10秒；	              
//			success:function(data){
//				//服务器返回响应，根据响应结果，分析是否成功；
//				var aa = data;
//				$.ajax('http://www.ban9wan.com/API/API_User',{
//					data:{
//						"dis":"pwd",
//						"miyao":aa,
//						"number":8,
//						"user":{
//							"UserPhone":regInfo.account,
//							"UserPwd":regInfo.password
//						}
//					},
//					dataType:'json',//服务器返回json格式数据
//					type:'post',//HTTP请求类型
//					timeout:10000,//超时时间设置为10秒；		              
//					success:function(data){
//						return callback(data);
//					},error:function(xhr,type,errorThrown){
//						//异常处理；
//						//alert(type);
//						return callback('请求错误');
//					}
//				});
//			},
//			error:function(xhr,type,errorThrown){
//				//异常处理；
//				return callback('请求错误');
//			}
//		});
////		var users = JSON.parse(localStorage.getItem('$users') || '[]');
////		users.push(regInfo);
////		localStorage.setItem('$users', JSON.stringify(users));
//		return callback();
//	};
//	
//	/**
//	 * 获取当前状态
//	 **/
//	owner.getState = function() {
//		var stateText = localStorage.getItem('$state') || "{}";
//		return JSON.parse(stateText);
//	};
//
//	/**
//	 * 设置当前状态
//	 **/
//	owner.setState = function(state) {
//		state = state || {};
//		localStorage.setItem('$state', JSON.stringify(state));
//		//var settings = owner.getSettings();
//		//settings.gestures = '';
//		//owner.setSettings(settings);
//	};
//
//	var checkEmail = function(email) {
//		email = email || '';
//		return (email.length > 3 && email.indexOf('@') > -1);
//	};
//
//	/**
//	 * 找回密码
//	 **/
//	owner.forgetPassword = function(email, callback) {
//		callback = callback || $.noop;
//		if (!checkEmail(email)) {
//			return callback('邮箱地址不合法');
//		}
//		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
//	};
//
//	/**
//	 * 获取应用本地配置
//	 **/
//	owner.setSettings = function(settings) {
//		settings = settings || {};
//		localStorage.setItem('$settings', JSON.stringify(settings));
//	}
//
//	/**
//	 * 设置应用本地配置
//	 **/
//	owner.getSettings = function() {
//			var settingsText = localStorage.getItem('$settings') || "{}";
//			return JSON.parse(settingsText);
//		}
//		/**
//		 * 获取本地是否安装客户端
//		 **/
//	owner.isInstalled = function(id) {
//		if (id === 'qihoo' && mui.os.plus) {
//			return true;
//		}
//		if (mui.os.android) {
//			var main = plus.android.runtimeMainActivity();
//			var packageManager = main.getPackageManager();
//			var PackageManager = plus.android.importClass(packageManager)
//			var packageName = {
//				"qq": "com.tencent.mobileqq",
//				"weixin": "com.tencent.mm",
//				"sinaweibo": "com.sina.weibo"
//			}
//			try {
//				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
//			} catch (e) {}
//		} else {
//			switch (id) {
//				case "qq":
//					var TencentOAuth = plus.ios.import("TencentOAuth");
//					return TencentOAuth.iphoneQQInstalled();
//				case "weixin":
//					var WXApi = plus.ios.import("WXApi");
//					return WXApi.isWXAppInstalled()
//				case "sinaweibo":
//					var SinaAPI = plus.ios.import("WeiboSDK");
//					return SinaAPI.isWeiboAppInstalled()
//				default:
//					break;
//			}
//		}
//	}
//}(mui, window.app = {}));