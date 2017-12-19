var t, //循环
	c=10,   //图片数量
	a,     //随机数
	b,
	xm,
	xy,
	round=0;   //结果数
var count=0; //刷卡人数
var huojiang=10; //获奖人数
var original=new Array;//原始数组
var original_xh=new Array;//到场学号
var original_xm=new Array;//到场姓名
var original_xy=new Array;//到场学院
var original_xh1=new Array;//到场学号
var original_xm1=new Array;//到场姓名
var original_xy1=new Array;//到场学院


var data1;
var strHtml = '<ul style="color:white;list-style:none;height:210px;overflow:hidden;">';
//给原始数组original赋值
/**for (var i=0;i<count;i++){
	original[i]=i+1; 
		} */
/********************/
jQuery(document).ready(function () {
	jQuery.ajax({
		type: "GET",
		url: "http://scc.sbs.edu.cn/ext/1220choujiang/info.jsp",
		dataType: "jsonp",
		jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "handle",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
		success: function (data) {
			data1=data;
			count = data.result.length;
			//alert(count);
			for(var i=0;i<count;i++){
				original[i] =data.result[i].stuempno;
				original_xh[i]=data.result[i].stuempno;
				original_xm[i]=data.result[i].custname;
				original_xy[i]=data.result[i].deptname;
				//alert(original[i]);
			}
			console.log(count);
			//从结果中随机抽中10个人数
			for(var j=0;j<10;j++){
				original.sort(function(){ return 0.5 - Math.random(); });
				//console.log(original[j]+j);//终端打印出随机产生的数据
				//alert(original[j]);
			}
		},
		error: function (e, d) {
		}
	});
});
/********************/
function huoqu2(){
	//a = Math.floor(Math.random()*c+1);
		//alert(original_list[i]);
	$('#all-picture').html("<ul style='width:50%;list-style:none;float: left;margin-top:1.5em;font-size:2em;'><li><span>学号:"+original_xh[round]+"</span></li><li><span>姓名:"+original_xm[round]+"</span></li><li><span>学院:"+original_xy[round]+"</span></li></ul><img src='http://scc.sbs.edu.cn/ext/1220choujiang/photo.jsp?id="+original_xh[round]+"' id='img-sdf1' width='100' style='margin-top: 2em;margin-right:3em;float:right;'>");
	if(round==count-1){round=0;}
	else{round++;}
	console.log(round);
}

function start(){
	b=1;
	$('#btn-kfj').html("<button id='button' type='button' onclick='stop()' class='btn btn-danger btn-default'>点击暂停</button>");
	t=setInterval("huoqu2()",100);
}
function restart(){
	b=2;
	t=setInterval("huoqu2()",50);
	$('#btn-kfj').html("<button id='button' type='button' onclick='stop()' class='btn btn-danger btn-default'>点击结束</button>");
}
function reset(){

	$('#btn-kfj').html("<button id='button' type='button' onclick='restart()' class='btn btn-success btn-default'>第二次抽奖</button>");
	$("#is-picture").children().remove();
}

function stop(){
	clearInterval(t);
	
	if(b==1){
		$('#all-picture').html("");
		for (var i=0;i<5;i++){ //i=一次显示几个人
		//console.log(original[i]+"Hello");
		for(var j=0;j<original_xh.length;j++){
			if(original_xh[j]==original[i]){
				xm=original_xm[j];
				xy=original_xy[j];
			}
		}
			//获取中奖人员
			var strHtml="<div class='img-chosed' style='background: url(images/demo.png);background-size:267px 170px;width: 20%;height: 100%;float: left;overflow: hidden;'>";
			strHtml+="<ul style='width:50%;float: left;margin-top:1em;overflow: hidden;'><li>"+original[i]+"</br>"+xm+"</br>"+xy+"</li></ul>";
			strHtml+="<img src='http://scc.sbs.edu.cn/ext/1220choujiang/photo.jsp?id="+original[i]+"' id='img-sdf1' width='77' height='90' style='margin-left: 0.3em;margin-top: 1.2em;'></div>";
			$('#is-picture').append(strHtml);
		}
		$('#btn-kfj').html("<button id='button' type='button'  onclick='reset()'  class='btn btn-warning btn-default' data-toggle='modal' >点击重置</button>");
	}
	else if(b==2){
		$('#all-picture').html(" ");
		for (var i=5;i<10;i++){ //i=一次显示几个人
			//获取中奖人员
			for(var j=0;j<original_xh.length;j++){
				if(original_xh[j]==original[i]){
					xm=original_xm[j];
					xy=original_xy[j];
				}
			}
			//获取中奖人员
			var strHtml="<div class='img-chosed' style='background: url(images/demo.png);background-size:267px 170px;width: 20%;height: 100%;float: left;overflow: hidden;'>";
			strHtml+="<ul style='width:50%;margin-top:1em;float: left;overflow: hidden;'><li>"+original[i]+"</br>"+xm+"</br>"+xy+"</li></ul>";
			strHtml+="<img src='http://scc.sbs.edu.cn/ext/1220choujiang/photo.jsp?id="+original[i]+"' id='img-sdf1' width='77' height='90' style='margin-left:  0.3em;margin-top: 1.2em;'></div>";
			$('#is-picture').append(strHtml);
		}
		$('#btn-kfj').html("<button id='button' type='button' onclick='stop()'  class='btn btn-success btn-default'>点击开始</button>");
		b=3;
	}
	else{
		alert("所有奖品已发放完毕！")
	}
	$("#title").css("color","#fff");

}
