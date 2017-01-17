window.onload = function () {
	var wrap = document.getElementById("wrap");
	var slide = document.getElementById("slide");
	var ul = slide.children[0];
	var ulLis = ul.children;
	var arrow = document.getElementById("arrow");
	var arrLeft = document.getElementById("arrLeft");
	var arrRight = document.getElementById("arrRight");
	var timer = null;

	//鼠标经过盒子改变箭头透明度
	wrap.onmouseover = function () {
		clearInterval(timer);
		animate(arrow, {"opacity": 1});
	}
	wrap.onmouseout = function () {
		timer = setInterval(toRight, 2000);
		animate(arrow, {"opacity": 0});
	}

	//图片布局
	var config = [//图片位置 配置
		{
			width: 400,
			top: 20,
			left: 50,
			opacity: 0.2,
			zIndex: 2
		},//0
		{
			width: 600,
			top: 70,
			left: 0,
			opacity: 0.8,
			zIndex: 3
		},//1
		{
			width: 800,
			top: 100,
			left: 200,
			opacity: 1,
			zIndex: 4
		},//2
		{
			width: 600,
			top: 70,
			left: 600,
			opacity: 0.8,
			zIndex: 3
		},//3
		{
			width: 400,
			top: 20,
			left: 750,
			opacity: 0.2,
			zIndex: 2
		}//4
	];

	//初始化图片
	assign();
	//分配图片函数
	function assign() {
		for (var i = 0; i < ulLis.length; i++) {
			animate(ulLis[i], config[i], null, function () {
					flag = true;
				}
			);
		}
	}

	//图片向右滚动函数
	function toRight() {
		config.push(config.shift());
		assign();
	}

	//自动滚动图片
	timer = setInterval(toRight, 2000);

	//设置标记 阻止箭头多次点击 叠加事件
	var flag = true;
	//点击左右箭头 滚动图片
	arrRight.onclick = function () {
		if (flag) {
			flag = false;
			toRight();
		}

	}
	arrLeft.onclick = function () {
		if (flag) {
			flag = false;
			config.unshift(config.pop());
			assign();
		}
	}

	//获取布局中的最大层级
	var zindexMax = [];
	for (var i = 0; i < config.length; i++) {
		zindexMax[i] = config[i].zIndex;
	}
	var zindexMaxValue = getM(zindexMax).max.value;

	//点击图片 显示图片 提高层级到最高
	for (var i = 0; i < ulLis.length; i++) {
		ulLis[i].index = i;
		ulLis[i].onclick = function () {
			if (flag) {
				flag = false;
				for (var j = 0; j < ulLis.length; j++) {
					if (config[this.index].zIndex != zindexMaxValue) {
						config.unshift(config.pop());
					} else {
						assign();
					}
				}
			}
		}
	}


}
