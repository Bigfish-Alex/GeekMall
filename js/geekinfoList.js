var app=angular.module('infoApp',[]);
app.controller('infoController',function($scope){
	$(function(){
		$('.loader').show();
		$scope.infoList=[];
		$scope.allPage=10;
		$scope.currentPage=1;
		$.ajax({
		    type: 'post',
		    url: 'http://route.showapi.com/109-35',
		    dataType: 'json',
		    data: {
		        "showapi_timestamp": formatterDateTime(),
		         "showapi_appid": showapi_appid, //这里需要改成自己的appid
		         "showapi_sign": showapi_sign,  //这里需要改成自己的应用的密钥secret，
		         "channelId":'5572a108b3cdc86cf39001d9'
		    },
		    error: function(XmlHttpRequest, textStatus, errorThrown) {
		        mui.toast('网络错误')
		    },
		    success: function(result) {
		        console.log(result.showapi_res_body.pagebean) //console变量在ie低版本下不能用
		        $scope.allPage=result.showapi_res_body.pagebean.allPages;
		        $scope.infoList=result.showapi_res_body.pagebean.contentlist;
		        $scope.$apply();
		        $('.loader').hide();
		    }
		});
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: pulldownRefresh
				},
				up: {
					contentrefresh: '正在加载...',
					callback: pullupRefresh,
					contentnomore:'没有更多数据了'
				}
			}
		});
		/**
		 * 下拉刷新具体业务实现
		 */
		function pulldownRefresh() {
			var page=parseInt(Math.random(0,1)*$scope.allPage/5);
			console.log(page)
			$.ajax({
			    type: 'post',
			    url: 'http://route.showapi.com/109-35',
			    dataType: 'json',
			    data: {
			        "showapi_timestamp": formatterDateTime(),
			         "showapi_appid": showapi_appid, //这里需要改成自己的appid
			         "showapi_sign": showapi_sign,  //这里需要改成自己的应用的密钥secret，
			         "channelId":'5572a108b3cdc86cf39001d9',
			         "page":page
			    },
			    error: function(XmlHttpRequest, textStatus, errorThrown) {
			        mui.toast('网络错误')
			    },
			    success: function(result) {
			        console.log(result.showapi_res_body.pagebean)
			        $scope.currentPage=page;
			        $scope.allPage=result.showapi_res_body.pagebean.allPages;
			        $scope.infoList=result.showapi_res_body.pagebean.contentlist;
			        $scope.$apply();
			        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			    }
			});
		}
		/**
		 * 上拉加载具体业务实现
		 */
		function pullupRefresh() {
			$scope.currentPage+=1;
			console.log($scope.currentPage);
			$.ajax({
			    type: 'post',
			    url: 'http://route.showapi.com/109-35',
			    dataType: 'json',
			    data: {
			        "showapi_timestamp": formatterDateTime(),
			         "showapi_appid": showapi_appid, //这里需要改成自己的appid
			         "showapi_sign": showapi_sign,  //这里需要改成自己的应用的密钥secret，
			         "channelId":'5572a108b3cdc86cf39001d9',
			         "page":$scope.currentPage+1
			    },
			    error: function(XmlHttpRequest, textStatus, errorThrown) {
			        mui.toast('网络错误')
			    },
			    success: function(result) {
			        console.log(result.showapi_res_body.pagebean) //console变量在ie低版本下不能用
			        $scope.allPage=result.showapi_res_body.pagebean.allPages;
			        for(var i=0;i<result.showapi_res_body.pagebean.contentlist.length;i++){
				        $scope.infoList.push(result.showapi_res_body.pagebean.contentlist[i]);
			        }
			        $scope.currentPage+=1;
			        console.log($scope.infoList)
			        $scope.$apply();
			        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
			    }
			});
		}
		
		
		mui('#infoScroll').on('tap','.mui-table-view-cell',function(){
			localStorage.setItem('infoSrc',$(this).attr('linkto'));
			mui.openWindow('infoDetalis.html');
		})
	})
})