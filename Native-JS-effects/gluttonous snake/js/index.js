/**
 * Created by Administrator on 2016/2/9 0009.
 */
window.onload = function () {

	var box = document.getElementById("box");
	var btn = document.getElementById("btn");
	var btns = btn.children[0];
	var btnp = btn.children[1];
	var btnc = btn.children[2];
	var score = document.getElementById("score");
	var level = document.getElementById("level");
	//创建食物
	function Food(){
		var len = 24;
		this.xfood = 0;
		this.yfood = 0;
		this.piece = null;
		this.showfood = function () {
			if(this.piece == null){
				this.piece = document.createElement("div");
				this.piece.className = "food";
				box.appendChild(this.piece);

			}
			//食物坐标
			this.xfood = Math.floor(Math.random()*35);
			this.yfood = Math.floor(Math.random()*20);
			this.piece.style.left = this.xfood*len+"px";
			this.piece.style.top = this.yfood*len +"px";
			//box.appendChild(piece);
		}

	}


	//创建蛇
	function Snake(){
		var len = 24;
		var k = 0;
		var leve = 0;
		lev = 500;
		this.redirect = "right";
		score.innerHTML = k;
		level.innerHTML = leve;
		//蛇体[x坐标,y坐标,蛇节对象]
		this.snakebody = [[0,1,null],[1,1,null],[2,1,null],[3,1,null]];
		//蛇的初始化
		this.showsnake = function () {

			for(var i= 0;i<this.snakebody.length;i++){
				//this.snakebody[i];
				if(this.snakebody[i][2] == null){
					this.snakebody[i][2] = document.createElement("div");

					this.snakebody[i][2].className = "snakebody";
					if(i == this.snakebody.length-1){
						this.snakebody[i][2].className = "snaketitle";

					}
					box.appendChild(this.snakebody[i][2]);

				}
				//初始缺陷版
				//var jie = document.createElement("div");
				//jie.className = "snakebody";
				//if(i == this.snakebody.length-1){
				//	jie.className = "snaketitle";
				//
				//}
				//jie.style.left = this.snakebody[i][0]*len+"px";
				//jie.style.top = this.snakebody[i][1]*len+"px";


				this.snakebody[i][2].style.left = this.snakebody[i][0]*len+"px";
				this.snakebody[i][2].style.top = this.snakebody[i][1]*len+"px";
			}
		}
		
		//移动蛇
		this.movesnake = function () {
			//非蛇头蛇节移动
			for(var i = 0 ; i<this.snakebody.length-1;i++){
				this.snakebody[i][0] = this.snakebody[i+1][0];
				this.snakebody[i][1] = this.snakebody[i+1][1];
			}

			//右侧移动
			if(this.redirect == "right"){
				this.snakebody[this.snakebody.length-1][0] += 1;
			}
			//左侧移动
			if(this.redirect == "left"){
				this.snakebody[this.snakebody.length-1][0] -= 1;
			}
			//上移动
			if(this.redirect == "up"){
				this.snakebody[this.snakebody.length-1][1] -= 1;
			}
			//下移动
			if(this.redirect == "down"){
				this.snakebody[this.snakebody.length-1][1] += 1;
			}

			//判断蛇头碰到食物.
			var xSnake = this.snakebody[this.snakebody.length-1][0];
			var ySnake = this.snakebody[this.snakebody.length-1][1];

			if(xSnake == food.xfood && ySnake == food.yfood){
				//吃食物
				var newjie = [this.snakebody[0][0],this.snakebody[0][1]];
				this.snakebody.unshift(newjie);

				//分数
				k += 1;
				score.innerHTML = k;

				//等级
				if(lev >50 ){
					if(k%6 == 0){
						lev = lev-50;
						leve += 1;
						level.innerHTML = leve;
						clearInterval(snaketimmer);
						snaketimmer = setInterval("snake.movesnake()",lev);
					}
				}else {
					level.innerHTML = "MAX";
				}
				//重新生成食物
				food.showfood();
			}

			//控制蛇的移动范围
			if(xSnake<0 || xSnake>34 ||ySnake<0 || ySnake>19){
				clearInterval(snaketimmer);
				alert("game over");

				return false;
			}

			//不能吃到自己
			for(var j=0;j<this.snakebody.length-1;j++){
				if(this.snakebody[j][0] == xSnake && this.snakebody[j][1] == ySnake){
					alert("YOU KILLED YOURSELF");
					clearInterval(snaketimmer);
					return 0;
				}
			}

			//重新绘制坐标
			this.showsnake();
		}

	}


	//等级显示


	//实例食物
	var food = new Food();
	food.showfood();

	//实例蛇
	snake = new Snake();
	snake.showsnake();
	snake.movesnake();
	snaketimmer = null;


	//重新开始
	btns.onclick = function () {
		//setInterval(全局变量,事件);
		clearInterval(snaketimmer);

		//重置蛇的身体 清除盒子
		for(var i = box.children.length-1;i>=0; i--){
			box.removeChild(box.children[i]);
		}
		//初始化蛇身
		snake = new Snake();
		snake.showsnake();
		snake.movesnake();

		//初始化食物
		food.piece = null;
		food.showfood();
		snaketimmer = setInterval("snake.movesnake()",lev);


	}
	//暂停
	btnp.onclick = function(){
		clearInterval(snaketimmer);
	}

	//开始/继续
	btnc.onclick = function () {
		clearInterval(snaketimmer);
		snaketimmer = setInterval("snake.movesnake()",lev);
	}

	//设置键盘事件 控制蛇移动方向
	document.onkeydown = function(evt){
		var num = evt.keyCode; // 通过活动数字码来得到按下的键位
		if(num == 37){
			snake.redirect = "left";
		}
		if(num == 38){
			snake.redirect = "up";
		}
		if(num == 39){
			snake.redirect = "right";
		}
		if(num == 40){
			snake.redirect = "down";
		}
	}



}