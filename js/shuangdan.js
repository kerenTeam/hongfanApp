var nowDay = new Date();
//圣诞节 弃用
//18-01-22 年货节发帖
var Sbegin = new Date('2018-01-22T00:00:01');
var Send = new Date('2018-02-11T23:59:59');
//元旦节 弃用
var Ybegin = new Date('2017-12-29T00:00:01');
var Yend = new Date('2018-01-01T23:59:59');
var isOne2 = '';//当前是那个节日

if( nowDay>=Sbegin && nowDay<= Send ){
	isOne2 = 'SDjie2';
//	mui('.SDonePic')[0].style.display = 'inline-block';
	mui('#maskInfo123')[0].style.display = 'block';
}else if( nowDay>=Ybegin && nowDay<= Yend ){
	isOne2 = 'YDjie2';
//	mui('.SDonePic')[1].style.display = 'inline-block';
	mui('#shaungdan0')[0].style.display = 'block';
}

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
