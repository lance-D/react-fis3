'use strict';
import './notification.less';
import React from 'react';

import Notify from 'rc-notification';
import assign from 'object-assign';

let defaultTop = 20;
let notify;
let defaultDuration = 3;

function getNotify() {
	if(notify) return notify;
	notify = Notify.newInstance({
		prefixCls:'notification',
		style:{
			top:defaultTop,
			right:0
		}
	});
	return notify;
}

const closeNotify = function(args){
	if(!args.onClose) return;
	args.onClose();
	if(args.key){
		Notification.close(args.key);
	}
}

function getNoticeConfig(args){
	const prefixCls = args.prefixCls || 'notify';
	let duration = args.duration === undefined ? defaultDuration : args.duration;
	let iconType = getIconType(args.type);
	getNotify().notice({
		content:(
			<div className={`${prefixCls}-content ${args.icon ? `${prefixCls}-icon` : ''}`} onClick={closeNotify.bind(this,args)}>
				{args.icon ? <i className={`icon-${args.icon}`} /> : null}
				<div className='notify-title'>{args.title}</div>
				<div className='notify-message'>{args.message}</div>
			</div>
		),
		duration,
		closable:true,
		onClose:args.onClose,
		key:args.key,
		style:{}
	})
}

function getIconType(type){
	let iconType = '';
	switch (type) {
		case 'success' :
			return iconType = 'icon-success';
		case 'info' :
			return iconType = 'icon-info';
		case 'error' :
			return iconType = 'icon-error';
		case 'warning' :
			return iconType = 'icon-warning';
		default:
			return iconType = 'icon-info'
	}
}


const Notification = {
	open(args) {
		getNoticeConfig(args);
	},
	close(key){
		if(notify){
			notify.removeNotice(key)
		}
	},
	config(options){
		if('top' in optinos) {
			defaultTop = options.top
		}
		if('duration' in options) {
			defaultDuration = options.duration
		}
	},
	destroy (){
		if(notify){
			notify.destroy();
			notify = null ;
		}
	}
};

['success', 'info', 'warning', 'error'].forEach((type) => {
  Notification[type] = (args) => Notification.open(assign({}, args, { icon: type }));
});

export default Notification;
