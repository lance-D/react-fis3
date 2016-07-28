'use strict';

import "./confirm.less";
import React,{ PropTypes } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Button from "../Button/button";
import {hasClass,isClickInner} from "../Utils/dom";


class Confirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false,
			clickOutClose:this.props.clickOutClose||false,
			btnTpl:this.props.btnTpl||'未命名按钮', // 必填
			btnType:this.props.btnType||'text' // btnType : btn text icon
		}
	}
	handleOK(e){
		e.stopPropagation();
		if(this.props.handleOK){
			this.props.handleOK(e);
		}
		this.hide();
	}
	handleCancel(e){
		e.stopPropagation();
		if(this.props.handleCancel){
			this.props.handleCancel(e);
		}
		this.hide();
	}

	show(){
		if(this.props.onClick){
			this.props.onClick()
		}
		this.setState({show:true});
	}
	hide(){
		this.setState({show:false})
	}

	clickOutClose(){
		if(this.state.clickOutClose){
			this.hide()
		}
		if(this.props.clickOutClose && typeof this.props.clickOutCloseCallBack == 'function'){
			this.props.clickOutCloseCallBack().bind(this);
		}
	}

	getConfirmBtnHtml(){
		let btnType = this.state.btnType;
		switch (btnType) {
			case 'text':
				return (<span className='confirm-text-link' onClick={this.show.bind(this)}>{this.state.btnTpl}</span>)
				break;
			case 'icon':
				return (<Icon icon={this.state.btnTpl} onClick={this.show.bind(this)}/>)
				break;
			case 'none':
				return;
				break;
			default:
				return (<Button className={btnType} text={this.state.btnTpl} onClick={this.show.bind(this)}/>)
		}
	}
	render(){
		let containerClass = classnames('confirm-container',this.props.className,this.state.show?'open':'');
		let confirmBtnHtml = this.getConfirmBtnHtml();
		return (
			<div className={containerClass} style={this.props.style}>
				{confirmBtnHtml}
				<div className='confirm-mask' style={{display:this.state.show?'block':'none'}} onClick={this.clickOutClose.bind(this)}></div>
				<div className='confirm' >
					{this.props.title ? <div className='confirm-header'>{this.props.title}</div>:''}
					<div className='confirm-body'>
						{this.props.text}
						{this.props.children}
					</div>
					<div className='confirm-footer'>
						<span className='confirm-OK' onClick={this.handleOK.bind(this)}>{this.props.okText?this.props.okText:'确定'}</span>
						<span className='confirm-cancel' onClick={this.handleCancel.bind(this)}>{this.props.cancelText?this.props.cancelText:'取消'}</span>
					</div>
				</div>
			</div>
		)
	}
}

Confirm.propTypes = {
	text:PropTypes.string,
	btnTpl:PropTypes.string,
	btnType:PropTypes.string,
	clickOutClose:PropTypes.bool,
	style:PropTypes.object,
	className:PropTypes.string,
	title:PropTypes.string,
	handleOK:PropTypes.func,
	handleCancel:PropTypes.func,
	children:PropTypes.any

}
export {Confirm as default}
