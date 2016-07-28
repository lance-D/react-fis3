// 用原生js封装 XHR


// 创建XML对象 忽略IE6 及其以下 浏览器
function createXHR (){
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}else{
		throw new Error('浏览器版本过低或不支持XHR对象');
	}
}
// 将传送的数据 url参数化

function getURLParmas(data){
	let a = [],i=0;
	for (var k in data) {
		k ? a[i++] = k + '=' + data[k] : '';
	}
	return a.join('&')
}


export function fetch (obj){
	let xhr = createXHR();
	obj.async = obj.async || true;
	obj.data = getURLParmas(obj.data);
	if (obj.method.toLowerCase() === 'get') {
		obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
	}
	if (obj.async === true) {   //true表示异步，false表示同步 //使用异步调用的时候，需要触发readystatechange 事件
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
				callback();
			}
		};
	}

	xhr.open(obj.method, obj.url, obj.async);//默认异步

	if (obj.method.toLowerCase() === 'post') {	//post方式需要自己设置http的请求头，来模仿表单提交。
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.send(obj.data);
	} else {
		xhr.send(null);
	}
	if (obj.async === false) {  //同步
		callback();
	}

	function callback() {
		if (xhr.status == 200) {  //判断http的交互是否成功，200表示成功
			obj.success(JSON.parse(xhr.responseText));			//回调传递参数
		} else {
			console.log('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}
	}
}


// 用法：

/**
ajax({
	method : 'post',
	url : 'demo.php',
	data : {
		'name' : 'JR',
		'age' : 22
	},
	success : function (message) {
		alert(message);
	}
});

*/
