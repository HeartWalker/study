window.onload = function () {

    //事件源
    var box = document.getElementById("box");
    var screen1 = box.children[0];
    var ul = screen1.children[0];
    var ol = screen1.children[1];
    var ullis = ul.children;
    var imgWidth = screen1.offsetWidth;
    var arr = document.getElementById("arr");
    var arrleft = document.getElementById("left");
    var arrright = document.getElementById("right");
    var timmer =null;

    //动态生成按钮
    for (var i = 0; i < ullis.length; i++) {
        var liBtn = document.createElement("li");
        liBtn.innerHTML = i + 1;
        ol.appendChild(liBtn);
    }
    //追加第一张图片到最后
    var firstimg = ul.children[0].cloneNode(true);
    ul.appendChild(firstimg);
    //初始化第一个样式
    var ollis = ol.children;
    ollis[0].className = "current";

    //按钮绑定图片
    for (var i = 0; i < ollis.length; i++) {
        ollis[i].index = i;
        ollis[i].onmouseover = function () {
            for (var j = 0; j < ollis.length; j++) {
                ol.children[j].className = "";
            }
            this.className = "current";
            var target = -this.index * imgWidth;
            animate(ul, {"left":target});
            pic = this.index;
            square = this.index;
        }

    }
    //侧边按钮显示隐藏
    box.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timmer);
    }
    box.onmouseout = function () {
        arr.style.display = "none";
        timmer = setInterval(playNext,1500);
    }
    //点击侧边按钮移动图片
    var pic = 0;
    var square = 0;
    //右侧移动
    arrright.onclick = function () {
        playNext();

    }
    //左侧移动
    arrleft.onclick = function () {
        if (pic == 0) {
            pic = ullis.length - 1;
            ul.style.left = -(ullis.length - 1) * imgWidth + "px";

        }
        pic--;
        var target = -pic * imgWidth;
	    animate(ul, {"left":target});

        if (square > 0) {
            square--;
        } else {
            square = ollis.length - 1;
        }
        for(var i =0;i<ollis.length;i++){
            ollis[i].className = "";
        }
        ollis[square].className = "current";


    }

    //添加自动滚动
    timmer = setInterval(playNext,1500);
    function playNext(){

        if (pic == ullis.length-1 ) {
            ul.style.left = 0;
            pic = 0;
        }
        pic++;

        var target = -pic * imgWidth;
	    animate(ul, {"left":target});

	    // 按钮一起滚动
        if (square < ollis.length - 1) {
            square++;
        } else {
            square = 0;
        }
        for(var i =0;i<ollis.length;i++){
            ollis[i].className = "";
        }
        ollis[square].className = "current";


    }



}