window.onload = function () {
	function $(id) {
		return document.getElementById(id);
	}

	var register = $("register");
	var mask = $("mask");
	var box = $("box");
	var drop = $("drop");
	//var close = $("close");

	//点击显示登录框
	register.onclick = function () {
		mask.style.display = "block";
		box.style.display = "block";
		document.body.style.overflow = "hidden";
		//清除冒泡 阻止document.click事件
		var event = event || window.event;
		if (event && event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}


	//点击空白隐藏登录框
	document.onclick = function (event) {
		var event = event || window.event;
		var targetId = event.target ? event.target.id : event.srcElement.id;
		//去除指定id区域的点击隐藏登录框事件
		if (targetId != "box" && targetId != "drop" && targetId != "bd") {
			mask.style.display = "none";
			box.style.display = "none";
			document.body.style.overflow = "visible";
			box.style.left = 40 + "%";
			box.style.top = 40 + "%";
		}

	}

	//登录框可拖拽
	drop.onmousedown = function (event) {
		var event = event || window.event;
		var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
		var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
		var spaceX = pageX - box.offsetLeft;
		var spaceY = pageY - box.offsetTop;


		document.onmousemove = function (event) {
			var event = event || window.event;
			var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
			var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
			box.style.left = pageX - spaceX + "px";
			box.style.top = pageY - spaceY + "px";
			//清理选中的文字
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		}
	}
	document.onmouseup = function () {
		document.onmousemove = null;

	}


}