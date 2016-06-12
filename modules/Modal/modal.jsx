'use strict';
import "./modal.less";
import React,{ PropTypes } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Button from "../Button/button";
import {hasClass,isClickInner} from "../Utils/dom";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false
		}
	}
	getModalBtnHtml(){
		let btnType = this.props.btnType||'text';
		switch (btnType) {
			case 'text':
				return (<span className='modal-text-link' onClick={this.show.bind(this)}>{this.props.btnTpl||'未命名按钮'}</span>)
				break;
			case 'icon':
				return (<Icon icon={this.props.btnTpl} onClick={this.show.bind(this)}/>)
				break;
			default:
				return (<Button className={btnType} text={this.props.btnTpl} onClick={this.show.bind(this)}/>)
		}
	}
	clickOutClose(){
		if(this.props.clickOutClose){
			this.hide()
		}
	}
	handleOK(e){
		e.stopPropagation();
		if(this.props.handleOK){
			this.props.handleOK(e);
		}
		this.hide();
	}
	handleClose(e){
		e.stopPropagation();
		if(this.props.handleCancel){
			this.props.handleCancel(e);
		}
		this.hide();
	}

	show(){
		this.setState({show:true});
		// document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	}
	hide(){
		this.setState({show:false});
		// document.getElementsByTagName('body')[0].style.overflow = 'auto';
	}
	render(){
		let containerClass = classnames('modal-container',this.props.className,this.state.show?'open':'');
		let modalBtnHtml = this.getModalBtnHtml();
		let modalCancelBtn = this.props.hasCancelBtn ? (<span className='modal-cancel' onClick={this.handleClose.bind(this)}>{this.props.cancelText?this.props.cancelText:'取消'}</span>) : '';
		return (
			<div className={containerClass} style={this.props.style}>
				{modalBtnHtml}
				<div className='modal-mask' onClick={this.clickOutClose.bind(this)}></div>
				<div ref='modal' className='modal' >
					<Icon icon='close' onClick={this.handleClose.bind(this)}/>
					{this.props.title ? <div className='modal-header'>{this.props.title}</div>:''}
					<div className='modal-body'>
						{this.props.children}
					</div>
					<div className='modal-footer'>
						<span className='modal-OK' onClick={this.handleOK.bind(this)}>{this.props.okText?this.props.okText:'确定'}</span>
						{modalCancelBtn}
					</div>
				</div>
			</div>
		)
	}
}
Modal.propTypes = {
	style:PropTypes.object,
	className:PropTypes.string,
	clickOutClose:PropTypes.bool,
	btnType:PropTypes.string,
	btnTpl:PropTypes.string.isRequired,
	hasCancelBtn:PropTypes.string,
	title:PropTypes.string,
	okText:PropTypes.string,
	cancelText:PropTypes.string,
	handleOK:PropTypes.func,
	handleClose:PropTypes.func,
	children:PropTypes.any
}
export {Modal as default};
