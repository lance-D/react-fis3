'use strict';

import {getTipsByType} from "../Utils/lang";

export function afterErrTips(ele,errType){
	let nextEle = ele.nextElementSibling;
	if(nextEle && nextEle.className === 'error_tips'){
		let currType = ele.nextElementSibling.getAttribute('data-type');
		if(currType !== errType && getTipsByType(currType).index < getTipsByType(errType).index){
			ele.nextElementSibling.innerHTML = '<em></em>'+getTipsByType(currType).text;
			ele.nextElementSibling.setAttribute('data-type',currType);
		}else{
			ele.nextElementSibling.innerHTML = '<em></em>'+getTipsByType(errType).text;
			ele.nextElementSibling.setAttribute('data-type',errType);
		}
		ele.nextElementSibling.style.maxHeight = '16px';
	}else{
		let newEle=document.createElement('span');
		newEle.setAttribute('class','error_tips');
		newEle.setAttribute('data-type',errType);
		newEle.innerHTML = '<em></em>'+getTipsByType(errType).text;
		ele.parentNode.appendChild(newEle);
		newEle.style.maxHeight = '16px';
	}

};
