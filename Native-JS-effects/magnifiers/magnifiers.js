window.onload = function () {
	var box = document.getElementById("box");
	var smallBox = document.getElementById("smallBox");
	var mask = document.getElementById("mask");
	var bigBox = document.getElementById("bigBox");
	var bigImg = bigBox.children[0];

	//鼠标经过盒子 显示mask 和 显示bigBox
	smallBox.onmouseover = function () {
		mask.style.display = "block";
		bigBox.style.display = "block";
	}
	//鼠标离开盒子 隐藏mask 和 隐藏bigBox
	smallBox.onmouseout = function () {
		mask.style.display = "none";
		bigBox.style.display = "none";
	}

	smallBox.onmousemove = function (event) {
		var event = event || window.event;
		//鼠标在页面上的座标
		var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
		var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
		//计算鼠标在smallBox中的座标
		var boxX = pageX - box.offsetLeft;
		var boxY = pageY - box.offsetTop;
		//根据鼠标在盒子中的座标去设置mask的位置
		var maskX = boxX - mask.offsetWidth / 2;
		var maskY = boxY - mask.offsetHeight / 2;

		//对maskX和maskY的取值范围进行限定 可以注释
		//if (maskX < 0) {
		//	maskX = 0;
		//}
		//if (maskX > smallBox.offsetWidth - mask.offsetWidth) {
		//	maskX = smallBox.offsetWidth - mask.offsetWidth;
		//}
		//if (maskY < 0) {
		//	maskY = 0;
		//}
		//if (maskY > smallBox.offsetHeight - mask.offsetHeight) {
		//	maskY = smallBox.offsetHeight - mask.offsetHeight;
		//}

		//对遮罩位置进行设置
		mask.style.left = maskX + "px";
		mask.style.top = maskY + "px";
		//按照比例移动 而且方向相反
		//比例就是 bigImg移动的总长度/mask移动的总长度
		//bigImg移动的总长度=bigImg的宽度-bigBox的宽度
		var bigImgToMove = bigImg.offsetWidth - bigBox.offsetWidth;
		//mask移动的总长度=smallBox的宽度-mask的宽度
		var maskToMove = smallBox.offsetWidth - mask.offsetWidth;
		//比例
		var rate = bigImgToMove / maskToMove;
		//根据比例以及遮罩的位置对大图片的位置进行设置
		bigImg.style.left = -rate * maskX + "px";
		bigImg.style.top = -rate * maskY + "px";

	}










}
