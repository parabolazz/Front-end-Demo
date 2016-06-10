//获取元素的所有属性（包括内联，内部和外部样式表）的函数
function getStyle(obj,attr){				
	if(obj.currentStyle){
	    return obj.currentStyle[attr];
    }else{
	    return window.getComputedStyle(obj,false)[attr];
	}
}

//通过传参的不同，来达到共用一套函数的效果
function startmove(obj,keyvalue){ 
	clearInterval(obj.timer); //清除定时器，防止多个定时器同时运行
	obj.timer = setInterval(function(){
		var flag = true; //判断每个动画完成的标志
		for (var attr in keyvalue) {
			// 1.取值
			var istyle = 0;
			var speed = 0;
			if (attr == "opacity") {
				//浏览器对浮点数的运算是不准确的，透明度需要作四舍五入
				istyle = Math.round(parseFloat(getStyle(obj,attr)*100));
				speed = (keyvalue[attr]*100 - istyle)/10;
			}else { 
				istyle = parseInt(getStyle(obj,attr));
				speed = (keyvalue[attr] - istyle)/10;	
			}
			// 2.计算动画速度

			//缓冲运动，浏览器运行到后期时，speed会出现小数如0.75，
			// 如果这时div移动到了190，那么这时left值也会出现小数如190.75,
			// 浏览器默认将小数去掉，宽度为190,下次执行speed还是0.75,
			// 造成了死循环，div将一直停留在190，到达不了target，定时器一直运行
			// 如果向左->速度正值->向上取整，否则向下取整
			speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
			//3.检测停止
			if (istyle !== keyvalue[attr]) {
				flag = false;					
				if (attr == "opacity") { obj.style[attr] = (istyle + speed)/100;}
				else {obj.style[attr] = istyle + speed + "px";}
			}
		}

		if (flag) {
			clearInterval(obj.timer);
		}
	},30)
}