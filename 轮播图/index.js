window.onload = function(){
	var container=document.getElementsByClassName('container')[0];
	var list = document.getElementsByClassName('list')[0];
	var buttons = document.getElementsByClassName('button')[0].getElementsByTagName('span');
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var index = 1;

	function showbutton(){
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].className == "up") {
				buttons[i].className = "";
				break;
			}
		}
		buttons[index - 1].className = "up";
	}

	function animate(offset){
		var left = parseInt(list.style.left)+ offset;
		var time = 300;
		var delay = 10;
		var speed = offset/(time/delay);

		function go(){
			if ((speed < 0 && parseInt(list.style.left) > left)  || (speed > 0 && parseInt(list.style.left) < left)) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go,delay);
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

	prev.onclick = function(){
		if (index == 1) {
			index = 5;
		}else {
			index--;
		}
		animate(800);
		showbutton();
	}

	next.onclick = function(){
		if (index == 5) {
			index = 1;
		}else {
			index++;
		}
		showbutton();
		animate(-800);
	}
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