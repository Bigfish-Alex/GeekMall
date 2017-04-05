mui.init();
mui.ready(function(){
	//初始化滚动框
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005,
		indicators:false,
		bounce:true
	});
	
	//初始化轮播图
	var slider = mui("#slider");
	slider.slider({
		interval: 3000
	});
	
	//a链接
	mui('body').on('tap','a',function(){document.location.href=this.href;});
//	var tryPhoto=document.getElementById('tryPhoto');
//	tryPhoto.addEventListener('tap',function(){
//		mui('#picture').popover('toggle');
//	})
	
	//actionsheet
	mui('body').on('tap', '.mui-popover-action li>a', function() {
		var a = this,
			parent;
		//根据点击按钮，反推当前是哪个actionsheet
		for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
			if (parent.classList.contains('mui-popover-action')) {
				break;
			}
		}
		//关闭actionsheet
		mui('#' + parent.id).popover('toggle');
		switch (a.innerHTML){
			case '拍照':
				console.log('拍照');
				getImage(0);
				break;
			case '从相册中获取':
				console.log('从相册中获取');
				break;
			default:
				break;
		}
	});
	
	var logout=document.getElementById('logout');
	logout.onclick=function(){
		if(confirm('确认退出？')){
			mui.plusReady(function(){			
				plus.runtime.quit();
			})
		}
	}
	
	//功能区跳转
	var geekmall=document.getElementById('geekmall');
	geekmall.addEventListener('tap',function(){
		mui.openWindow('geekmall.html')
	});
	var geekinfo=document.getElementById('geekinfo');
	geekinfo.addEventListener('tap',function(){
		mui.openWindow('geekinfo.html')
	});
	var geekdiy=document.getElementById('geekdiy');
	geekdiy.addEventListener('tap',function(){
		mui.openWindow('geekdiy.html')
	});
	var geekgoto=document.getElementById('geekgoto');
	geekgoto.addEventListener('tap',function(){
		mui.openWindow('geekgoto.html')
	});
})

//angular部分
var app=angular.module('ckApp',[]);
app.controller('myController',function($scope,$http){
	$scope.username="BIGFISH";
	$scope.address="广州市天河区";
	$scope.moneyObj={
		yue:200,
		shouyi:100,
		leiji:300
	};
	
})

//mui.plusReady(function(){
//	plus.key.addEventListener('backbutton',function(){
//		if(confirm('确认退出？')){
//			plus.runtime.quit();
//		}
//	},false);	
//})
