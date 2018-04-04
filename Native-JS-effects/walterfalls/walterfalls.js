window.onload = function () {
	//此方法要求写html时container中有足够的图片
	var container = document.getElementById("container");
	var boxes = container.children;
	var divWidth = container.clientWidth;
	var boxWidth = boxes[0].offsetWidth;


	var colume = parseInt(divWidth / boxWidth);
	//定义第一行图片高度数组
	var arrHeight = [];
    var arrHeightIndex;
    var arrHeightValue;
    walterfalls();
	//判断第一行图片个数
	function walterfalls(){
		for (var i = 0; i < boxes.length; i++) {
			if (i < colume) {
				arrHeight[i] = boxes[i].offsetHeight;
			} else {
				domPosition(boxes[i]);
			}
		}

	}

	//图片定位
    /**
	 *
     * @param dom {element}
     */
	function domPosition(dom) {
        arrHeightIndex = getM(arrHeight).min.index;
        arrHeightValue = getM(arrHeight).min.value;

        //分配下一张图片位置
        dom.style.position = "absolute";
        dom.style.top = arrHeightValue + "px";
        dom.style.left = boxes[arrHeightIndex].offsetLeft + "px";
        //重置最小高度的高度
        arrHeight[arrHeightIndex] = arrHeightValue + dom.offsetHeight;
    }

	//判断页面滚动到底部
	function toButtom() {
		//当页面卷曲高度与当前高度大于最后一个图片的高度
		if ((scroll().top + client().height) > boxes[boxes.length - 1].offsetTop) {
			return true;
		} else {
			return false;
		}
	}

	//页面滚动到底部 动态加载图片
	window.onscroll = function () {
		if (toButtom()) {
			//模仿后台数据
			//模拟获取后台数据
			var pictures = [
				{"src": "img/P_000.jpg"},
				{"src": "img/P_001.jpg"},
				{"src": "img/P_002.jpg"},
				{"src": "img/P_003.jpg"},
				{"src": "img/P_004.jpg"},
				{"src": "img/P_005.jpg"},
				{"src": "img/P_006.jpg"},
				{"src": "img/P_007.jpg"},
				{"src": "img/P_008.jpg"},
				{"src": "img/P_009.jpg"},
				{"src": "img/P_010.jpg"},
				{"src": "img/P_011.jpg"},
				{"src": "img/P_012.jpg"},
				{"src": "img/P_013.jpg"},
				{"src": "img/P_014.jpg"},
				{"src": "img/P_015.jpg"},
				{"src": "img/P_016.jpg"},
			];
			//追加图片
			for(var i=0;i<pictures.length;i++){
				var newNode = boxes[0].cloneNode(true);
				newNode.children[0].src = pictures[i].src;
                container.appendChild(newNode);
                domPosition(newNode);
			}
		}
	}


}
