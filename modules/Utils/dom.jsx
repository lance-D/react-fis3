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

export function getCSSAttr(ele,attr){
	if(ele.currentStyle) {
		return ele.currentStyle[attr]
	}else{
		return document.defaultView.getComputedStyle(ele,null)[attr]
	}
}


export function getText(ele){
	return (typeof ele.textContent == "string") ? ele.textContent : ele.innerText;
}
export function setText(ele,text){
	if(ele.textContent) {
		ele.textContent = text;
	}else{
		ele.innerText = text;
	}
}

/**
 * 获取制定元素左上角距离window左侧的距离
 * @param elem
 * @returns {*}
 */
export function getpageX (elem) {
    //检查我们是否已经到了根元素
    return elem.offsetParent ?
        //如果我们还能往上，则将当前偏移与向上递归的值相加
    elem.offsetLeft + getpageX( elem.offsetParent ) :
        //否则，取当前偏移
        elem.offsetLeft;
};
/**
 * 获取制定元素左上角距离window顶部的距离
 * @param elem
 * @returns {*}
 */
//计算元素的Y(垂直，顶)位置
export function getpageY (elem) {
    //检查我们是否已经到了根元素
    return elem.offsetParent ?
        //如果我们还能往上，则将当前偏移与向上递归的值相加
    elem.offsetTop + getpageY( elem.offsetParent ) :
        //否则，取当前偏移
        elem.offsetTop;
}

// 函数节流
// 应用于window的scroll事件，resize事件以及普通元素的mousemove事件，因为这些事件由于鼠标或滚轮操作很频繁，会导致回调连续触发
export function throttle(func, wait) {
    var timer = null;
    return function() {
        var self = this,
            args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            return typeof func === 'function' && func.apply(self, args);
        }, wait);
    }
}
