'use strict';
export function showErrTips(ele,errType,text){
	let errTips = ele.parentNode.querySelector('.error-tips');
	if(errTips){
		let currType = errTips.getAttribute('data-type');
		if(currType !== errType){
			errTips.innerHTML = '<em></em>'+text;
			errTips.setAttribute('data-type',currType);
		}else{
			errTips.innerHTML = '<em></em>'+text;
			errTips.setAttribute('data-type',errType);
		}
		errTips.style.maxHeight = '16px';
	}else{
		let newEle=document.createElement('span');
		newEle.setAttribute('class','error-tips');
		newEle.setAttribute('data-type',errType);
		newEle.innerHTML = '<em></em>'+text;
		ele.parentNode.appendChild(newEle);
		newEle.style.maxHeight = '16px';
	}

};
