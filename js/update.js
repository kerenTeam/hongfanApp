var wgtVer=null;
var wgtUrl = '';
var newVer = '';
function plusReady(){
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        wgtVer=inf.version;
        console.log("当前应用版本："+wgtVer);
    });
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener('plusready',plusReady,false);
}
//ios提示更新(弃用)
function checkUpdateIos(){
	var oldtoken = plus.storage.getItem('oldToken');
	mui.ajax(serverUrl+'/api/index/version',{
		dataType:'json',
		type:'post',
		timeout:5000,
		headers:{"token":oldtoken},
		success:function(data,type,xhr){
			console.log('检测更新',data);
			console.log('检测更新'+JSON.stringify(data));
			wgtUrl= serverUrl + data.data.android_path_url;
			var newVer = data.data.ios_versionNum;//远程版本号
			var newUrl = data.data.ios_path_url;//远程地址
			if(newVer > wgtVer){//升级
				mui.confirm('检测到有新版本，是否升级？', '提示',['是','否'], function(e) {
					if(e.index == 0) {
						plus.runtime.openURL(newUrl);
					}
				})
            }

		},
		error:function(xhr,type,errorThrown){
			//mui.toast('当前网络不好，请重试');
			console.error('操作响应失败');
		}
	});
}


// android检测更新（和ios公用）
function checkUpdate(hide,ios){
	!hide && plus.nativeUI.showWaiting('正在检查更新...',{width:'130px',height:'110px'});
	var oldtoken = plus.storage.getItem('oldToken');
	mui.ajax(serverUrl+'/api/index/version',{
		dataType:'json',
		type:'post',
		timeout:5000,
		headers:{"token":oldtoken},
		success:function(data,type,xhr){
			console.log('检测更新'+JSON.stringify(data));
			if(ios){
				wgtUrl = data.data.ios_path_url;//下载地址 ios
				newVer = data.data.ios_versionNum;//远程版本号（ios
			}else{
				wgtUrl=  data.data.android_path_url;//下载地址 android
				newVer = data.data.versionNum;//远程版本号（android
			}
			if(newVer > wgtVer){//升级
				console.error('开始下载');
                downWgt(hide,wgtUrl,ios);  // 下载升级包
            }else{
            		plus.nativeUI.closeWaiting();
                !hide && plus.nativeUI.alert("当前版本为最新版本！");
            }
		},
		error:function(xhr,type,errorThrown){
			console.error('操作响应失败');
		}
	});
}
// 下载wgt文件

function downWgt(hide,downurl,ios){
	!hide && plus.nativeUI.showWaiting('正在下载...',{width:'130px',height:'110px'});
    console.log('下载地址全'+ propUrl+"/"+downurl);
    console.log('下载地址半' +downurl);
    if(downurl.indexOf('http') == -1){
    		downurl = propUrl+"/"+downurl;
    }
    plus.downloader.createDownload(downurl, {filename:"_doc/update/"}, function(d,status){
    		console.log('下载状态',status);
        if ( status == 200 ) {
            console.log("下载wgt成功："+d.filename);
            if(!hide){
	            	plus.nativeUI.confirm("下载完成，是否马上升级！",function(e){
	            		var sure = (e.index == 0) ? "确定" : "取消";
	            		if (sure == '确定') {
	            			installWgt(d.filename,hide); // 安装wgt包
	            		}
	            	})
            }else{
            		installWgt(d.filename,hide,ios); // 安装wgt包
            }

        } else {
            console.log("下载wgt失败！");
            !hide && plus.nativeUI.alert("下载文件失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}
// 安装应用资源
function installWgt(path,hide,ios){
    !hide && plus.nativeUI.showWaiting('正在安装...',{width:'130px',height:'110px'});
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        if(hide){//静默更新
	        	if(path.indexOf('apk')>-1){
	        		plus.nativeUI.alert("软件更新包已通过wifi预加载下载成功， 请安装新版HI集软件！",function(){
		            plus.runtime.quit();
		        });
	        }else{
	    			plus.nativeUI.alert("软件已通过wifi预加载优化完成， 重启完成操作！",function(){
	            		plus.runtime.restart();
		        });
	        }
        }

    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        if(!hide){
	        	if (e.message.indexOf('不匹配')>-1) {
	        		plus.nativeUI.alert("更新完成， 重启完成升级！",function(){
		            plus.runtime.restart();
		        });
	        	} else{
	        		plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
	        	}
        }
        //!hide && plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
    });
}
/*
 * 差异化升级流程：
 * 1.启动app后在plusReady里面首先获取app版本
 * 2.检查服务器版本
 * 3.服务器版本大于本地app版本下载升级包，提示安装和升级
 * 4.服务器版本小于等于本地版本时，不做任何操作
 * 5.重启即可玩升级
 */