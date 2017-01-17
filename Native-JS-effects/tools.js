//scroll()网页页面卷曲兼容性封装
function scroll() {
	//主流浏览器
	if (window.pageYOffset != null) {
		return {
			"top": window.pageYOffset,
			"left": window.pageXOffset
		}
	} else if (document.compatMode == "CSS1Compat") {
		//DTD 标准模式
		return {
			"top": document.documentElement.scrollTop,
			"left": document.documentElement.scrollLeft
		}
	} else {
		//怪异模式
		return {
			"top": document.body.scrollTop,
			"left": document.body.scrollLeft
		}
	}
}

//网页可视区域兼容性封装
function client() {
	if (window.innerWidth != null) {
		//主流浏览器
		return {
			"width": window.innerWidth,
			"height": window.innerHeight
		}
	} else if (document.compatMode == "CSS1Compat") {
		//标准模式
		return {
			"width": document.documentElement.clientWidth,
			"height": document.documentElement.clientHeight
		}
	} else {
		return {
			"width": document.body.clientWidth,
			"height": document.body.clientHeight
		}
	}
}

//获取任意计算后的css样式兼容性封装
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		//IE6 7 8
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, null)[attr];
	}
}

//缓动函数框架封装
function animate(obj, json, stepDenominator, fn) {
	clearInterval(obj.timer);
	if (Boolean(arguments[2]) == false) {
		stepDenominator = 10;
	}
	obj.timer = setInterval(function () {
			//设置标记 保证所有json对象都达到目标值才清除定时器
			var flag = true;
			for (var k in json) {
				//透明度渐变
				if (k == "opacity") {
					var target = parseInt(json[k] * 100);
					var leader = parseInt(getStyle(obj, k) * 100);
					var step = (target - leader) / stepDenominator;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					obj.style[k] = (leader + step) / 100;

				} else if (k == "zIndex") {
					//改变层级
					obj.style[k] = json[k];
				} else {
					//改变单位是px的属性
					var target = json[k];
					var leader = parseInt(getStyle(obj, k)) || 0;
					var step = (target - leader) / stepDenominator;
					//解决最后不能到达目标位置
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					obj.style[k] = leader + step + "px";
				}
				if (leader != target) {
					flag = false;
				}
			}
			if (flag) {
				clearInterval(obj.timer);
				//添加函数
				if (fn) {
					fn();
				}
			}

		}
		,
		17
	)
}

//获取一纬数组最小最大值 与其坐标 相等值取第一个
function getM(arr) {
	var min = {};
	min.index = 0;
	min.value = arr[0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < min.value) {
			min.index = i;
			min.value = arr[i];
		}

	}

	var max = {};
	max.index = 0;
	max.value = arr[0];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > max.value) {
			max.index = i;
			max.value = arr[i];
		}

	}
	return {
		"min": min,
		"max": max
	};
}