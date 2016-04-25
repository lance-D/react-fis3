'use strict';


export function on(ele,type,callback){
	if(ele.addEventListener){
		ele.addEventListener(type,callback)
	}else{
		ele.attachEvent('on'+type,function(){
			callback.call(ele);
		})
	}
};


export function off(ele,type,callback){
	if(ele.removeEventListener){
		ele.removeEventListener(type,callback)
	}else{
		ele.detachEvent('on' + type, callback);
	}
};


export function one(ele,type,callback){
	let typeArray = type.split(' ');
	let recursiveFunction = function(e){
		e.target.removeEventListener(e.type, recursiveFunction);
		return callback(e)
	}
	for (let i = typeArray.length - 1; i >= 0; i--){
		on(ele,typeArray[i],recursiveFunction)
	}
};
