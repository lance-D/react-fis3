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
	let classArr = ele.classList||[];
	return classArr.length ? classArr.contains(className):false
};
// 移除兄弟元素的className，并给自己加上className
export function removeSiblingsClass(ele,className){
	let parentNode = ele.parentNode;
	let arr = parentNode.children;
	for(let i=0,len=arr.length;i<len;i++){
		removeClass(arr[i],className)
	}
	addClass(ele,className);
};

export function isClickInner(ele,parentEle){
	let node = ele.parentNode;
	while(node !== null){
		if(node == parentEle){
			return true
		}
		node = node.parentNode
	}
	return false
}
