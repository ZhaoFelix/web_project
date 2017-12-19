var t, //循环
c=10,   //图片数量
a,     //随机数
b=1;   //执行的次数
k=0; //每次读取数组的起始地址
 var count=90; //刷卡人数
var original=new Array;//原始数组 
var prizeArr = new Array;//获奖名单数组

 /*jsp数据读取*/
 jQuery(document).ready(function () {
				jQuery.ajax({
					type: "GET",
					url: "http://scc.sbs.edu.cn/ext/1220choujiang/info.jsp",
					dataType: "jsonp",
					jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
					jsonpCallback: "handle",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据								
					success: function (data) {
						var len = data.result.length;//所有刷卡人数
						//alert(len);
						//使用循环将请的数据存储到数组originnal[]
						for(var i=0;i<len;i++){
							//original[i] ="学号："+data.result[i].stuempno+" "+"姓名："+data.result[i].custname+" "+"学院："+data.result[i].deptname
							original[i] =data.result[i].stuempno;
							//detail[i]=data.result[i].stuempno+" "+" "+data.result[i].custname
							console.log(original[i]);//打印出最初的存储数据
						}
						//从结果中随机抽中270个人数
						for(var j=0;j<len;j++){
							original.sort(function(){ return 0.5 - Math.random(); }); 
						}
						/*
						for(var j=0;j<10;j++){
							 window.location.href="http://scc.sbs.edu.cn/ext/prize/insert.jsp?xsbh="+original[j]+"&name=%E6%B5%8B%E8%AF%95&prizetype=1";
						}*/
						//数据上传，记录中奖名单
						for(var j=0;j<270;j++){
						jQuery.ajax({
						type: "GET",
						//url: "http://scc.sbs.edu.cn/ext/prize/insert.jsp?xsbh="+original[j]+"&name=%E6%B5%8B%E8%AF%95&prizetype=1",
							url: "http://scc.sbs.edu.cn/ext/prize/insert.jsp?xsbh="+original[j]+"&name=xx&prizetype=1",
							dataType: "jsonp",
						jsonp: " ",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
						jsonpCallback: " ",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据								
						success: function (data){
							//alert(data.result[0]);
						},
						error: function (){
							
						}
							});
						}
					},
					error: function (e, d) {
						//jQuery(".sb-slider").html("数据错误，请联系管理员！");
					}
				});
				
			});
				
function huoqu2(){
     a = Math.floor(Math.random()*c+1);
	console.log(a);
     $('#all-picture').html("<img src='images/demo"+a+".png' id='img-sdf1' width='100%' height='100%'>");
}

function start(){
  $('#btn-kfj').html("<button id='button' type='button' onclick='stop()' class='btn btn-danger btn-default'>点击暂停</button>");
   //huoqu2();
   t=setInterval("huoqu2()",50);
}
function restart(){
	 t=setInterval("huoqu2()",50);
	    $('#btn-kfj').html("<button id='button' type='button' onclick='stop()' class='btn btn-danger btn-default'>点击结束</button>");
}
function reset(){
	b=b+1;
	k=k+30;
	if(b!=10){
		$('#btn-kfj').html("<button id='button' type='button' onclick='start()' class='btn btn-success btn-default'>第"+b+"次抽奖</button>");
	}
	else {
		$('#btn-kfj').html("<button id='button' type='button' onclick='stop()' class='btn btn-success btn-default'>抽奖结束</button>");
		
	}
	$("#choujiangrenyuan").children().remove();	

	}

function stop(){
	clearInterval(t);
   if (b!=10) {
	   $('#all-picture').html(" ");
	   console.log(original);
	   for (var i=k;i<30+k;i++){ //i=一次显示几个人
	//获取中奖人员
		//var j = Math.floor(Math.random()*c+1);
	   //$('#is-picture').append("<img class='img-chosed' src='images/demo"+original[i]+".jpg' id='img-sdf1' width='10%' >");
	   $('#choujiangrenyuan ').append("<li><p>"+original[i]+"</p></li>");
	   
	}
   $('#btn-kfj').html("<button id='button' type='button'  onclick='reset()'  class='btn btn-warning btn-default' data-toggle='modal' >清空数据</button>");  
   }
   else {
	   alert("所有奖品已发放完毕！")  
   }
   $("#title").css("color","#fff");
   
}
