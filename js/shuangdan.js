var nowDay = new Date();
//圣诞节
var Sbegin = new Date('2017-12-21T00:00:01');
var Send = new Date('2017-12-26T23:59:59');
//元旦节
var Ybegin = new Date('2017-12-29T00:00:01');
var Yend = new Date('2018-01-01T23:59:59');
var isOne = '';//当前是那个节日

if( nowDay>=Sbegin && nowDay<= Send ){
	isOne = 'SDjie';
	mui('.SDonePic')[0].style.display = 'inline-block';
	mui('#shaungdan0')[0].style.display = 'block';
}else if( nowDay>=Ybegin && nowDay<= Yend ){
	isOne = 'YDjie';
	mui('.SDonePic')[1].style.display = 'inline-block';
	mui('#shaungdan0')[0].style.display = 'block';
}

mui('#shaungdan1')[0].onclick = function(){
	event.stopPropagation();
	if(plus.storage.getItem('myToken')){
		if(plus.storage.getItem(isOne)){
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