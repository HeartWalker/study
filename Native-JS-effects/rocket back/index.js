window.onload = function () {
	var back = document.getElementById("backTop");
	var backTimer = null;
	var leader = 0;
	var topTarget = 0;
	var begBottom = parseFloat(getStyle(back, "bottom"));
	var endBottom = -100 + "px";


	function toButtom(){
		//滚动窗口时显示隐藏火箭图标
		if (scroll().top > 100) {
			back.style.display = "block";
			//火箭图标位置缓慢滚动到初始位置begBottom
			animate(back, {"bottom": begBottom}, 50);
		} else {
			back.style.display = "none";
			//重置火箭图标位置到页面下
			back.style.bottom = endBottom;

		}
	}
	window.onscroll = function () {
		toButtom();
	}


	topTarget = client().height;
	//改变窗口时重新获得火箭移动距离
	window.onresize = function () {
		topTarget = client().height;
	}

	//点击返回火箭图标
	back.onclick = function () {
		//清除窗口滚动事件 阻止点击事件发生时 两个animate运动函数冲突
		window.onscroll = null;
		//火箭返回图标缓慢到达顶部 通过提高bottom高度的方法 使其超出页面
		animate(back, {"bottom": topTarget}, 20, function () {
			window.onscroll = function () {
				toButtom();
			}
		});

		leader = scroll().top;
		//页面缓慢到达顶部
		clearInterval(backTimer);
		backTimer = setInterval(function () {
				var target = 0;
				var step = (target - leader) / 20;//分母与animate(back, {"bottom": topTarget}, 10, toButtom)中保持一致,获得较好的视觉效果
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				leader = leader + step;
				window.scrollTo(0, leader);
				if (leader == target) {
					clearInterval(backTimer);
				}

			}, 17
		)

	}

}
