/**
 * 加载到外部URL的文件，用于下载图片；
 */
/**
 * 打开长按事件
 * http://dev.dcloud.net.cn/mui/event/#gesture
 */
mui.init({
	gestureConfig: {
		longtap: true
	}
});
mui.plusReady(function() {
	document.addEventListener("longtap", function(event) {
		/**
		 * 获取目标节点的tagName
		 */
		var name = event.target.tagName;
		name = name.toLowerCase();
		/**
		 * 如果是图片，则弹出选择框决定是否下载；
		 */
		if(name === "img") {
			var imgUrl = event.target.src;
			console.log('图片地址：' + imgUrl);
			var filename = imgUrl.substring(imgUrl.lastIndexOf("/") + 1, imgUrl.length);
			var relativePath = "_downloads/" + filename;
			/**
			 * http://dev.dcloud.net.cn/mui/ui/#dialog
			 */
			mui.confirm("是否下载此图片", "确认下载？", ["下载", "取消"], function(event) {
				/**
				 * index从0开始
				 */
				var index = event.index;
				if(index == 0) {
					var dtask = plus.downloader.createDownload(imgUrl, {}, function(d, status) {
						if(status == 200) {
							//下载成功
							var fileName = d.filename;
							plus.gallery.save(fileName, function() {
								mui.toast('保存成功');
							}, function() {
								mui.toast('保存失败，请重试！');
							});
							console.log("下载成功=" + relativePath);
						} else {
							//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
							console.log("下载失败=" + status + "==" + relativePath);
							//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
							if(relativePath != null)
								delFile(relativePath);
						}
					});
					//启动下载任务
					dtask.start();

				}
				/*删除指定文件*/
				function delFile(relativePath) {
					plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
						entry.remove(function(entry) {
							console.log("文件删除成功==" + relativePath);
						}, function(e) {
							console.log("文件删除失败=" + relativePath);
						});
					});
				}
			});
		}
	});
});