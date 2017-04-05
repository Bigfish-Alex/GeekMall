document.addEventListener('plusready', function(){
	//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
});


function scaned( t, r, f ) {
	console.log(t);
	console.log(r);
	console.log(f);
	var scanedRusult=document.getElementById('scanedRusult');
	scanedRusult.innerHTML="扫描结果："+r;
}

var imageArr=[];
//调用摄像头

function getImage(imgIndex,imgId){
	var cmr = plus.camera.getCamera();
	cmr.captureImage( function ( path ) {
		plus.gallery.save( path ,successCB=function(){
			var str=path;
			var arr=str.split('/');
			var keyPath='file:///storage/emulated/0/DCIM/Camera/'+arr[arr.length-1];						
			showImg( keyPath,imgIndex,imgId );			
		});
	}, function ( e ) {
		outSet( "取消拍照" );
	}, {filename:"_doc/gallery/",index:1} );
}
function showImg( url,imgIndex,imgId ){
	// 兼容以“file:”开头的情况
	if(0!=url.indexOf("file://")){
		url="file://"+url;
	}
	if(imgId==1){
		var showImg=document.getElementById('zjzmImg');
		showImg.src=url;
	}else if(imgId==2){
		var showImg=document.getElementById('zjfmImg');
		showImg.src=url;
	}
	
}

//mui.plusReady(function(){
//	plus.key.addEventListener('backbutton',function(){
//		window.history.go(-1);
//	},false);	
//})