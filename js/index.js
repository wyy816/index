(function(){
    var $circles = $("#circles ol li");
    var $imgs = $("#imgs ul li");
    var $carousel = $("#carousel");
    var $close = $(".close");
    var $mask = $(".mask");
    var $maoni = $("<li class='maoni'></li>").appendTo($("#imgs ul"));
    
    $mask.eq(0).fadeOut(0).fadeIn(1000);
    $close.click(function() {
        $(this).parent().fadeOut(1000);
    })

    var arr = (function(){
        var temp = [];
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 6; j++){
                temp.push($("<div></div>").css({
                    "width":0,
                    "height":0,
                    "background":"url(images/slider-img1.jpg)"+ j * -138.33 + "px " + i * -143.66 + "px",
                    "position":"absolute",
                    "left": j*138.33,
                    "top": i*143.66
                }).appendTo($maoni));
            }
        }
        return temp;
    })()
    console.log(arr);
    var ciridx = 0;
    var imgidx = 0;
    var lock = true;
    var timer = setInterval(function(){
        ciridx++;
        if(ciridx>$circles.length-1){
            ciridx = 0;
        }
        change.call($circles.eq(ciridx));
    },7000)
    $carousel.mouseenter(function() {
		clearInterval(timer);
	})
	$carousel.mouseleave(function() {
		clearInterval(timer);
		timer = setInterval(function() {
		ciridx++;
		if (ciridx > $circles.length - 1) {
			ciridx = 0;
		}
		change.call($circles.eq(ciridx));
	}, 7000);
    })
    // 实现一次运动
    $circles.click(change);
    function change(){
        if(!lock){
            return;
        }
        lock = false;
        ciridx = $(this).index();
        if(ciridx === imgidx){
            lock = true;
            return;
        }
        $(this).addClass("cur").siblings().removeClass("cur");
        $mask.eq(imgidx).fadeOut(1000);
        $maoni.addClass("active");
        
    // 轮换数组，实现多次运动 类似异性轮播图

        $.each(arr,function(index,value){
            value.css(
                "backgroundImage","url(images/slider-img" + (ciridx + 1) + ".jpg)").animate({
                "width": 138.33,
				"height": 143.66
            },300 + Math.random() * 3000);
        })
        setTimeout(function (){
            $.each(arr,function(index,value){
                value.css({
                  "width":0,
                  "height":0  
                })
            
        })
        imgidx = ciridx;
			$imgs.eq(imgidx).addClass("active").siblings().removeClass("active");
			$mask.eq(imgidx).fadeOut(0).fadeIn(1000);
        lock = true;
    },3310)
    }

})()