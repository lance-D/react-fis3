'use strict';

/**
 * 常用dom操作
 */


 export function addClass(ele,className){
	 let currClass = ele.getAttribute('class'),
	 	 classArr = currClass?currClass.split(' '):[],
		 index = classArr.indexOf(className);
	 if(index === -1){
		 classArr.push(className)
	 }
	 let newClass = classArr.join(' ');
	 ele.setAttribute('class',newClass);
 };

export function removeClass(ele,className){
	let currClass = ele.getAttribute('class'),
		classArr = currClass?currClass.split(' '):[],
		index = classArr.indexOf(className);
	if(index > -1){
		classArr.splice(index,1);
	}
	let newClass = classArr.join(' ');
	ele.setAttribute('class',newClass);
};

export function hasClass(ele,className){
	let classArr = ele.classList;
	return classArr.contains(className)
};

export function removeSiblingsClass(ele,className){
	let parentNode = ele.parentNode;
	let arr = parentNode.children;
	for(let i=0;i<arr.length;i++){
		removeClass(arr[i],className)
	}
	addClass(ele,className);
};

/**
 * 判断是够出界
 */

export function isOutside(parent,child) {
	let pEle = child.parentNode;
	while (pEle !== null) {
		if(pEle === parent){
			return true
		}
		pEle = pEle.parentNode;
	}
	return false
};
