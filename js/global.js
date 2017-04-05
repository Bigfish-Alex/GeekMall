//window.onload=function(){
//	var back=document.getElementById('back');
//	back.onclick=function(){
//		mui.back();
//	}
//}
var showapi_appid="26906";
var showapi_sign="b49688f784b44f86919b3baa484d36dd";

function formatterDateTime() {
var date=new Date()
var month=date.getMonth() + 1
    var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0"+ month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}
