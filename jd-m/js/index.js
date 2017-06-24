
// 当页面加载完之后执行
window.onload = function () {
	//顶部通栏
	headerScroll();
	//倒计时
	cutDownTime();
	//轮播图
	banner();
};

//顶部通栏
function headerScroll () {
	// 1.获取导航栏的高度
	// 2.顶部通栏
	// 距离顶部的高度
	// document.querySelector('.jd_nav').offsetTop;
	// //元素自身的高度
	// document.querySelector('.jd_nav').offsetHeight;

	var navDom = document.querySelector('.jd_nav');

	var maxDistance = navDom.offsetTop + navDom.offsetHeight;

	var headerDom = document.querySelector('.jd_header');

	// headerDom.style.backgroundColor = 'rgba(201,21,35,0)';

	//注册事件
	window.onscroll=function  () {
		// console.log(123);
		var scrollDistabce = window.document.body.scrollTop;

		var percent = scrollDistabce/maxDistance;
		//判断距离顶部的距离
		if (percent>1) {

			percent = 1;
		}
		
		headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
	};
}
//倒计时
function cutDownTime () {
	//定义总时间
	var totalHour = 3;
	//吧3小时转化为秒
	var totalSec = 3*60*60;
	//拿到每一个li
	//
	// totalSec ++;
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');

	// console.log(liArr);
	//开始定时器
	var timeld = setInterval(function(){
		//倒计时为归零 待机时结束
		if (totalSec<=0) {
			clearInterval(timeld);

			console.log("结束啦!下次再来!");

			return;
		}
		//递减
		totalSec--;

		var h = Math.floor(totalSec/3600);
		var m = Math.floor(totalSec % 3600/60);
		var s= totalSec % 60;
		//赋值
		//小时
		liArr[0].innerHTML = Math.floor(h/10);
		liArr[1].innerHTML =  h%10;

		//分钟
		liArr[3].innerHTML = Math.floor(m/10);
		liArr[4].innerHTML = m%10;

		//秒
		liArr[6].innerHTML = Math.floor(s/10);
		liArr[7].innerHTML = s%10;
		
	},1000);
}
//轮播图
function banner () {

	var width = document.body.offsetWidth;
	var moveUl = document.querySelector('.banner_images');
	var indexLiArr = document.querySelectorAll('.banner_index li');
	var index = 1;

	var timeId = setInterval(function  () {
		index ++;

		moveUl.style.transition = 'all.3s';

		moveUl.style.transform = 'translateX('+index*width*-1+'px)';

	},2000);

	moveUl.addEventListener('webkitTransitionEnd',function(){
		console.log('11111');
		if (index>8) {
			index = 1;
			moveUl.style.transition = '';
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}else if (index<1) {
			index=8;
			moveUl.style.transition = '';
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}
			indexLiArr[index-1].className = 'current';
	});
	//定义初始变量
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;
	//触摸开始
	moveUl.addEventListener('touchstart',function(event){
		//清除定时器
		clearInterval(timeId);
		//关闭过渡
		moveUl.style.transform = '';

		// console.log('开始触摸');
		console.log('startX'+startX);
		startX = event.touches[0].clientX;
	});
	//触摸中
	moveUl.addEventListener('touchmove', function(event){

		moveX = event.touches[0].clientX-startX;
		// console.log('触摸中');
		console.log('moveX'+moveX);
		//移动ul默认位置
		moveUl.style.transform = 'translateX('+(moveX+index*-1*width)+'px)';
	});
	//离开触摸
	moveUl.addEventListener('touchend', function(event){
		var maxDistance = width/3;

		if (Math.abs(moveX)>maxDistance) {
			if (moveX>0) {
				index--;
			}else{
				index++;
			}
			moveUl.style.transition = 'all .3s';

			moveUl.style.transform = 'translateX('+(index*-1*width)+'px)';

		}else{
			moveUl.style.transition = 'all .3s';
			moveUl.style.transform = 'translateX('+(index*-1*width)+'px)';
		}

		timeId = setInterval(function () {
			index++;

			moveUl.style.transition = 'all .3s';

			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		},2000);
	});
}

	