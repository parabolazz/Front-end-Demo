window.onload = function(){
	var container=document.getElementsByClassName('container')[0];
	var list = document.getElementsByClassName('list')[0];
	var buttons = document.getElementsByClassName('button')[0].getElementsByTagName('span');
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;

	// 移动按钮函数
	function showbutton(){
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].className == "up") {
				buttons[i].className = "";
				break;
			}
		}
		buttons[index - 1].className = "up";
	}

	// 移动图片函数
	function animate(offset){
		var left = parseInt(list.style.left)+ offset;
		var time = 300; //切换总时长
		var delay = 10;	//隔多少时间执行一次
		var speed = offset/(time/delay); //速度（每秒位移量）
		//切换动画函数
		function go(){
			if ((speed < 0 && parseInt(list.style.left) > left)  || (speed > 0 && parseInt(list.style.left) < left)) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go,delay); //重复执行直至list.style.left == left
			}else{
				list.style.left = left +"px";
				if (left > -800) {
					list.style.left = -4000 + "px";
				}
				if (left < -4000) {
					list.style.left = -800 + "px";
				}
			}
		}
		go();
	}

	// 左移事件
	prev.onclick = function(){
		if (index == 1) { //左移到第一张，如果继续左移，button回到最后
			index = 5;
		}else {
			index--;
		}
		animate(800); //向左偏移800，也就是一张图片的宽度
		showbutton();
	}

	// 右移事件
	next.onclick = function(){
		if (index == 5) { //同上
			index = 1;
		}else {
			index++;
		}
		showbutton();
		animate(-800);
	}

	// 为每个按钮绑定事件
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function(){
			var myindex = parseInt(this.getAttribute("index"));
			if (this.className=='up') {return; }
			var offset = (myindex - index) * -800;
			index = myindex;
			animate(offset);
			showbutton();
		}
	}
}