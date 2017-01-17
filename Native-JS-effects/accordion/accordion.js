window.onload = function () {
	var box = document.getElementById("box");
	var ul = box.children[0];
	var ulLis = ul.children;

	//循环绑定背景图
	for (var i = 0; i < ulLis.length; i++) {
		ulLis[i].style.backgroundImage = "url(img/" + (i+1) + ".jpg)";
		//鼠标经过显示当前盒子背景
		ulLis[i].onmouseover = function () {
			for (var j = 0; j < ulLis.length; j++) {
				animate(ulLis[j], {"width": 100});
			}
			animate(this,{"width":800});
		}
		//鼠标离开 还原盒子宽度
		ulLis[i].onmouseout = function () {
			for(var k=0;k<ulLis.length;k++){
				animate(ulLis[k],{"width":240});
			}
		}
	}

}
