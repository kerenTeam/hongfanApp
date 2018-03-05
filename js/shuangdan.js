var nowDay = new Date();

//18-01-22 年货节发帖
var Sbegin = new Date('2018-01-22T00:00:01');
var Send = new Date('2018-02-11T23:59:59');

// 2.9-2.15 达人榜 回答，提问 抽奖 送礼
var Ybegin = new Date('2018-02-09T00:00:01');
var Yend = new Date('2018-02-15T23:59:59');

var isOne2 = '';//当前是那个节日

if( nowDay>=Sbegin && nowDay<= Send ){
	isOne2 = 'SDjie2';
	if(mui('#maskInfo123')[0]){
		mui('#maskInfo123')[0].style.display = 'block';
		if( nowDay>=Ybegin && nowDay<= Yend && mui('#maskInfo123')[0].className.indexOf('beforeClose')>-1){
			mui('#maskInfo123')[0].style.display = 'none';//关闭首页 年货节发帖 显示，HI有圈 还是显示,只有首页 加了 beforeClose 类名
		}
	}
}

if( nowDay>=Ybegin && nowDay<= Yend && mui('#maskInfo1234')[0]){
	mui('#maskInfo1234')[0].style.display = 'block';
}
if(mui('#fenxiangBtn2')[0]){//发帖送礼
	mui('#fenxiangBtn2')[0].onclick = function(){
		event.stopPropagation();
		if(plus.storage.getItem('myToken')){
			if(plus.storage.getItem(isOne2)){
				alert('每个用户只能参加一次该活动！');
			}else{
				openview({
					view:'socialCircle/circlePublish.html',
					id:"circlePublish",
					extrasobj:{fromGo:'shuangdan'}
				});
				//测试环境
	//			openview({
	//				view:'shuangdan/shuangdan.html',
	//				id:"shuangdan",
	//				extrasobj:{newId:2345}
	//			});
			}

		}else{
			mui.toast('请登录');
			openview({
				view:'login.html'
			});
		}
	}
}

if(mui('#fenxiangBtn2D1')[0]){//问答送礼
	mui('#fenxiangBtn2D1')[0].onclick = function(){
		event.stopPropagation();
		if(plus.storage.getItem('myToken')){
			if(plus.storage.getItem('end09wenda')){
				alert('每个用户只能参加一次该活动！');
			}else{
				if(mui('#maskInfo1234')[0].className.indexOf('localIn')>-1){
					openview({
						view:'../limitTimeAct/09wenda/09wendaOne.html',
						id:"09wendaOne"
					});
				}else{
					openview({
						view:'limitTimeAct/09wenda/09wendaOne.html',
						id:"09wendaOne"
					});
				}
			}

		}else{
			mui.toast('请登录');
			if(mui('#maskInfo1234')[0].className.indexOf('localIn')>-1){
				openview({
					view:'../login.html'
				});
			}else{
				openview({
					view:'login.html'
				});
			}

		}
	}
}

//关闭弹窗
function openMask(){
	$('.ruleCt').click(function() {
		event.stopPropagation()
	})
	$('#maskInfo123').click(function() {
		event.preventDefault()
		$('#maskInfo123').fadeOut(200);
	})
	$('.closeMs23').click(function() {
		event.stopPropagation();
		$(this).parent().parent().fadeOut(200);
	})
}
