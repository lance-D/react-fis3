'use strict';

import {getTipsByType} from "../Utils/lang";

export function afterErrTips(ele,errType){
	if(ele.nextSibling && ele.nextSibling.getAttribute('class') === 'error_tips'){
		let currType = ele.nextSibling.getAttribute('data-type');
		if(currType !== errType && getTipsByType(currType).index < getTipsByType(errType).index){
			ele.nextSibling.innerHTML = '<em></em>'+getTipsByType(currType).text;
			ele.nextSibling.setAttribute('data-type',currType);
		}else{
			ele.nextSibling.innerHTML = '<em></em>'+getTipsByType(errType).text;
			ele.nextSibling.setAttribute('data-type',errType);
		}
		ele.nextSibling.style.maxHeight = '16px';
	}else{
		let newEle=document.createElement('span');
		newEle.setAttribute('class','error_tips');
		newEle.setAttribute('data-type',errType);
		newEle.innerHTML = '<em></em>'+getTipsByType(errType).text;
		ele.parentNode.appendChild(newEle);
		newEle.style.maxHeight = '16px';
	}

};
