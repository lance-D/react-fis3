'use strict';
export function showErrTips(ele,errType,text){
	let nextEle = ele.nextElementSibling;
	if(nextEle && nextEle.className === 'error-tips'){
		let currType = ele.nextElementSibling.getAttribute('data-type');
		if(currType !== errType){
			ele.nextElementSibling.innerHTML = '<em></em>'+text;
			ele.nextElementSibling.setAttribute('data-type',currType);
		}else{
			ele.nextElementSibling.innerHTML = '<em></em>'+text;
			ele.nextElementSibling.setAttribute('data-type',errType);
		}
		ele.nextElementSibling.style.maxHeight = '16px';
	}else{
		let newEle=document.createElement('span');
		newEle.setAttribute('class','error-tips');
		newEle.setAttribute('data-type',errType);
		newEle.innerHTML = '<em></em>'+text;
		ele.parentNode.appendChild(newEle);
		newEle.style.maxHeight = '16px';
	}

};
