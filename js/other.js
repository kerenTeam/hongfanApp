$(function() {
	$(document).on('click', '.hasMore', function() {
		$(this).toggleClass('showMore');
		myScroll.refresh();
		return false;
	});
});

$(document).ready(function () {
	$('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false,
   });
}); 

$(document).ready(function() {
	$(window).scroll(function() {
		if($(window).scrollTop() > 100) {
			$(".topUp").show();
		} else {
			$(".topUp").hide();
		}
	});
	$(".topUp").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 200);
	});
	$(".foot_more").click(function() {
		$(this).find(".foot_more_pull").toggle();
	});
});		

$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')) {
            $('.grade-eject').removeClass('grade-w-roll');
        } else {
            $('.grade-eject').addClass('grade-w-roll');
        }
    });
});

$(document).ready(function(){
    $(".grade-w>li").click(function(){
        $(".grade-t")
            .css("left","33.48%")
    });
});

$(document).ready(function(){
    $(".grade-t>li").click(function(){
        $(".grade-s")
            .css("left","66.96%")
    });
});

//Brand寮€濮�

$(document).ready(function(){
    $(".Brand").click(function(){
        if ($('.Category-eject').hasClass('grade-w-roll')) {
            $('.Category-eject').removeClass('grade-w-roll');
        } else {
            $('.Category-eject').addClass('grade-w-roll');
        }
    });
});
//
//$(document).ready(function(){
//  $(".Category-w>li").click(function(){
//      $(".Category-t")
//          .css("left","33.48%")
//  });
//});
//
//$(document).ready(function(){
//  $(".Category-t>li").click(function(){
//      $(".Category-s")
//          .css("left","66.96%")
//  });
//});
//
////Sort寮€濮�
//
//$(document).ready(function(){
//  $(".Sort").click(function(){
//      if ($('.Sort-eject').hasClass('grade-w-roll')) {
//          $('.Sort-eject').removeClass('grade-w-roll');
//      } else {
//          $('.Sort-eject').addClass('grade-w-roll');
//      }
//  });
//});


//鍒ゆ柇椤甸潰鏄惁鏈夊脊鍑�

$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Category-eject').hasClass('grade-w-roll')){
            $('.Category-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Regional").click(function(){
        if ($('.Sort-eject').hasClass('grade-w-roll')){
            $('.Sort-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Brand").click(function(){
        if ($('.Sort-eject').hasClass('grade-w-roll')){
            $('.Sort-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Brand").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')){
            $('.grade-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Sort").click(function(){
        if ($('.Category-eject').hasClass('grade-w-roll')){
            $('.Category-eject').removeClass('grade-w-roll');
        };
    });
});
$(document).ready(function(){
    $(".Sort").click(function(){
        if ($('.grade-eject').hasClass('grade-w-roll')){
            $('.grade-eject').removeClass('grade-w-roll');
        };

    });
});


//js鐐瑰嚮浜嬩欢鐩戝惉寮€濮�
function grade1(wbj){
    var arr = document.getElementById("gradew").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    wbj.style.background = "#eee"
}

function gradet(tbj){
    var arr = document.getElementById("gradet").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.background = "";
    };
    tbj.style.background = "#fff"
}

function grades(sbj){
    var arr = document.getElementById("grades").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.borderBottom = "";
    };
    sbj.style.borderBottom = "solid 1px #ff7c08"
}

//function Categorytw(wbj){
//  var arr = document.getElementById("Categorytw").getElementsByTagName("li");
//  for (var i = 0; i < arr.length; i++){
//      var a = arr[i];
//      a.style.background = "";
//  };
//  wbj.style.background = "#eee"
//}
//
//function Categoryt(tbj){
//  var arr = document.getElementById("Categoryt").getElementsByTagName("li");
//  for (var i = 0; i < arr.length; i++){
//      var a = arr[i];
//      a.style.background = "";
//  };
//  tbj.style.background = "#fff"
//}
//
//function Categorys(sbj){
//  var arr = document.getElementById("Categorys").getElementsByTagName("li");
//  for (var i = 0; i < arr.length; i++){
//      var a = arr[i];
//      a.style.borderBottom = "";
//  };
//  sbj.style.borderBottom = "solid 1px #ff7c08"
//}

function Sorts(sbj){
    var arr = document.getElementById("Sort-Sort").getElementsByTagName("li");
    for (var i = 0; i < arr.length; i++){
        var a = arr[i];
        a.style.borderBottom = "";
    };
    sbj.style.borderBottom = "solid 1px #ff7c08"
}
 

var goNum;
function toshare(num){
	goNum = num;
	$(".am-share").addClass("am-modal-active");	
	if($(".sharebg").length>0){
		$(".sharebg").addClass("sharebg-active");
	}else{
		$("body").append('<div class="sharebg"></div>');
		$(".sharebg").addClass("sharebg-active");
	}
	$(".sharebg-active,.share_btn").click(function(){
		$(".am-share").removeClass("am-modal-active");	
		setTimeout(function(){
			$(".sharebg-active").removeClass("sharebg-active");	
			$(".sharebg").remove();	
		},300);
	})
}









