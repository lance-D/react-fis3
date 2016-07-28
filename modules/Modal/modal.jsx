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
			case 'no':
				return ;
				break;
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

	/**
	 * 点击非弹框事件
	 */
	clickOutClose(){
		if(this.props.clickOutClose){
			this.hide()
		}
	}
	/**
	 * 确定事件
	 */
	handleOK(e){
		e.stopPropagation();
		if(this.props.handleOK){
			this.props.handleOK(e);
		}
	}

	/**
	 * modal Close X 按钮
	 * @param e
	 */
	handleClose(e){
		e.stopPropagation();
		if(this.props.handleCancel){
			this.props.handleCancel(e);
		}
		this.hide();
	}

	show(e){
		if(this.props.onClick){
			this.props.onClick(e)
		}
		this.setState({show:true});
	}
	hide(){
		//隐藏后的回调
		if(typeof this.props.hideCallBack == 'function'){
			this.props.hideCallBack();
		}
		this.setState({show:false});
	}
	render(){
		let containerClass = classnames('modal-container',this.props.className,this.state.show?'open':'');
		let modalBtnHtml = this.getModalBtnHtml();
		let modalCancelBtn = this.props.hasCancelBtn ? (<span className='modal-cancel' onClick={this.handleClose.bind(this)}>{this.props.cancelText?this.props.cancelText:'取消'}</span>) : '';
		return (
			<div className={containerClass}>
				{modalBtnHtml}
				<div className='modal-mask' onClick={this.clickOutClose.bind(this)}></div>
				<div ref='modal' className='modal' style={this.props.style}>
					{this.props.noClose ?"":<Icon icon='close' onClick={this.handleClose.bind(this)}/>}
					{this.props.title ? <div className='modal-header'>{this.props.title}</div>:''}
					<div className='modal-body'>
						{this.props.children}
					</div>
					{this.props.hasSubmitBtn ?
						<div className='modal-footer'>
							<span className='modal-OK' onClick={this.handleOK.bind(this)}>{this.props.okText?this.props.okText:'确认'}</span>
							{modalCancelBtn}
						</div>
						:''
					}
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
	btnTpl:PropTypes.string,
	hasCancelBtn:PropTypes.bool,
	title:PropTypes.string,
	okText:PropTypes.string,
	cancelText:PropTypes.string,
	handleOK:PropTypes.func,
	handleClose:PropTypes.func,
	children:PropTypes.any
}
export {Modal as default};
