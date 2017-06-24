//轮播图
function banner () {
	//自动轮播
	//获取屏幕宽度
	var width = document.body.offsetWidth;
	var moveUl = document.querySelector('.banner_images');
	//添加过度
	moveUl.style.transition = 'all.5s';

	var indexLiArr = document.querySelectorAll('.banner_index li');

	//定义index索引值 记录当前值
	index = 1;

	//开启定时器
	var timeId = setInterval(function  () {
		//累加
		index++;
		//判断 不间断循环
		if (index>=9) {
			index=1;

			//关闭过度
			moveUl.style.transition = '';

		}
		//修改ul的位置
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';

		//修改li标签的外观
		//清空li的默认样式
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}	
			//为li标签添加样式
			indexLiArr[index-1].className='current';

	},2000);

	//过度结束事件
	
	//手指拨动
}