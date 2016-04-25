'use strict';
const validation = {
	tips:{
		required:		'不能为空',
		isMail:			'请填写正确的邮箱',
		isPhone:		'请输入正确的手机号码',
		isPwd:			'用户名或密码错误',
		isUsername:		'用户名或密码错误',
		isValiCode:		'验证码错误',
		noUsername:		'请输入用户名',
		noPwd:			'请填写密码',
		noMail:			'请填写邮箱',
		noPhone:		'请填写手机号',
		noValiCode:		'请输入验证码'
	}
}

let errText = {
	required:{
		index:0,
		text:validation.tips.required
	},
	isMail:{
		index:1,
		text:validation.tips.isMail
	},
	isPhone:{
		index:1,
		text:validation.tips.isPhone
	},
	isPwd:{
		index:1,
		text:validation.tips.isPwd
	},
	isUsername:{
		index:1,
		text:validation.tips.isUsername
	},
	isValiCode:{
		index:1,
		text:validation.tips.isValiCode
	},
	noUsername:{
		index:1,
		text:validation.tips.noUsername
	},
	noPwd:{
		index:1,
		text:validation.tips.noPwd
	},
	noMail:{
		index:1,
		text:validation.tips.noMail
	},
	noPhone:{
		index:1,
		text:validation.tips.noPhone
	},
	noValiCode:{
		index:1,
		text:validation.tips.noValiCode
	}
};


export function getTipsByType(type){
	return errText[type];
}
export function setTipsByType(type,item,value){
	errText[type][item] = value;
}
