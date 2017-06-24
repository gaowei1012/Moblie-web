window.onload = function () {
	headerScroll();

	cutDownTime();

	banner();
}

function headerScroll() {
	
	var navDom = document.querySelector('.jd_nav');

	var maxDistance = navDom.offsetTop + navDom.offsetHeight;

	var headerDom = document.querySelector('.jd_header');

	headerDom.style.backgroundColor = 'rgba(201,21,35,0)';


	window.onscroll = function () {
		var scrollDistance = window.document.body.scrollTop;
		var percent = scrollDistance / maxDistance;
		console.log(percent);

		if (percent>1) {
			percent=1;
		}

		headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';

	}


}

function cutDownTime() {
	var totalHour = 3 ;

	var totalSec = 3*60*60;

	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');

	var timeId = setInterval(function () {

		if (totalSec<=0) {

			clearInterval(timeId);

			console.log('结束啦,你买不到了哦');

			return;
		}

		totalSec--;

		var hour = Math.floor(totalSec / 3600);
		var minute = Math.floor(totalSec % 3600 /60);
		var sec =totalSec % 60;


		liArr[0].innerHTML =Math.floor(hour/10) ;  // 十位 41 / 10  =4.1 所以要取整数
		liArr[1].innerHTML =hour%10 ; // 个位

		liArr[3].innerHTML = Math.floor(minute/10);// 是为 55/10 = 5.5 取整
		liArr[4].innerHTML = minute%10;

		liArr[6].innerHTML = Math.floor(sec/10); 
		liArr[7].innerHTML = sec%10; 



	},1000)
}


function banner() {

	var width = document.body.offsetWidth;
	var moveUl = document.querySelector('.banner_images');
	var indexLiArr = document.querySelectorAll('.banner_index li');
	var index = 1;
	var timeId = setInterval(function () {
		index++;
		moveUl.style.transition = 'all .3s';
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';

	},1000);


	moveUl.addEventListener('webkitTransitionEnd',function () {
		console.log('过渡结束');

		if (index>8) {
			index = 1;

			moveUl.style.transition = '';

			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}else if(index<1){
			index= 8;

			moveUl.style.transition = '';

			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}

		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}

		indexLiArr[index-1].className = 'current';

	})



	var startX = 0;

	var moveX = 0;

	var distanceX = 0;


	moveUl.addEventListener('touchstart',function (event) {
		clearInterval(timeId);

		moveUl.style.transition = '';

		startX = event.touches[0].clientX;

	})

	moveUl.addEventListener('touchmove',function (event) {
		moveX = event.touches[0].clientX - startX;

		moveUl.style.transform = 'translateX('+(moveX+index*-1*width)+'px)';
	})


	moveUl.addEventListener('touchend',function (event) {

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
		},1000)
	})
}