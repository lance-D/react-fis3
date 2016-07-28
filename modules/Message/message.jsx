'use strict';
import './message.less';
import React from 'react';
import Notify from 'rc-notification';

let defaultDuration = 1.5;
let message;
let defaultTop;
let key = 1;

function getMessage () {
	message = Notify.newInstance({
		prefixCls:'message-box',
		style:{
			top:defaultTop
		}
	});
	return message
}

function getMessageConfig(args){
	let duration = args.duration || defaultDuration;
	let message = getMessage();
	message.notice({
		content:(
			<div>
				{args.type && <i className={`icon-${args.type}`} /> }
				<span className='message-text'>{args.content}</span>
			</div>
		),
		duration,
		onClose:args.onClose,
		key,
		style:{}
	});
	return (function(){
		let target = key++;
		return function(){
			message.removeNotice(target);
		}
	}())
}

const Messages = {
	info(content,duration,onClose){
		return getMessageConfig({content,type:'info',duration,onClose})
	},
	success(content,duration,onClose){
		return getMessageConfig({content,type:'success',duration,onClose})
	},
	warning(content,duration,onClose){
		return getMessageConfig({content,type:'warning',duration,onClose})
	},
	error(content,duration,onClose){
		return getMessageConfig({content,type:'error',duration,onClose})
	},
	destroy (){
		if(message){
			message.destroy();
			message = null ;
		}
	},
	config(optinos){
		if('top' in optinos) {
			defaultTop = options.top
		}
		if('duration' in options) {
			defaultDuration = options.duration
		}
	}
};
export default Messages;
