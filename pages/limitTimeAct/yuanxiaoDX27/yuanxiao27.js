
//关闭弹窗
$('.ruleCt').click(function() {
	event.stopPropagation()
})
$('#maskInfoYXDX').click(function() {
	event.preventDefault()
	$('#maskInfoYXDX').fadeOut(200);
})
$('.closeMs23').click(function() {
	event.stopPropagation();
	$(this).parent().parent().fadeOut(200);
})

//18-03-02 >> 18-03-04 元宵节猜灯谜
var nowDay = new Date();
var Dbegin = new Date('2018-03-02T00:00:01');
var Dend = new Date('2018-03-04T23:59:59');

if( nowDay>=Dbegin && nowDay<= Dend && mui('#maskInfoYXDX')[0]){
	mui('#maskInfoYXDX')[0].style.display = 'block';
	mui('#yuanxiaoJB')[0].style.display = 'block';
	mui('#btnYXDX')[0].onclick = function(){
		event.stopPropagation();
		openview({
			view:'limitTimeAct/yuanxiaoDX27/yuanxiaoDX27.html',
			id:"yuanxiaoDX27"
		});
	}
	mui('#yuanxiaoJB')[0].onclick = function(){
		mui('#maskInfoYXDX')[0].style.display = 'block';
	}
}

