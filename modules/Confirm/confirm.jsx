'use strict';

import "./confirm.less";
import React from "react";
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
			text:this.props.text,// 必填
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
		this.setState({show:true});
	}
	hide(){
		this.setState({show:false})
	}

	clickOutClose(){
		if(this.state.clickOutClose){
			this.hide()
		}
	}

	getConfirmBtnHtml(){
		let btnType = this.state.btnType;
		switch (btnType) {
			case 'text':
				return (<span className='confirm_text_link' onClick={this.show.bind(this)}>{this.state.btnTpl}</span>)
				break;
			case 'icon':
				return (<Icon icon={this.state.btnTpl} onClick={this.show.bind(this)}/>)
				break;
			default:
				return (<Button className={btnType} text={this.state.btnTpl} onClick={this.show.bind(this)}/>)
		}
	}
	render(){
		let containerClass = classnames('confirm_container',this.props.className,this.state.show?'open':'');
		let confirmBtnHtml = this.getConfirmBtnHtml();
		return (
			<div className={containerClass} style={this.props.style}>
				{confirmBtnHtml}
				<div className='confirm_mask' style={{display:this.state.show?'block':'none'}} onClick={this.clickOutClose.bind(this)}></div>
				<div className='confirm' >
					<Icon icon='close' onClick={this.handleCancel.bind(this)}/>
					{this.props.title ? <div className='confirm_header'>{this.props.title}</div>:''}
					<div className='confirm_body'>
						{this.props.text}
						{this.props.children}
					</div>
					<div className='confirm_footer'>
						<span className='confirm_OK' onClick={this.handleOK.bind(this)}>{this.props.okText?this.props.okText:'确定'}</span>
						<span className='confirm_cancel' onClick={this.handleCancel.bind(this)}>{this.props.cancelText?this.props.cancelText:'取消'}</span>
					</div>
				</div>
			</div>
		)
	}
}

export {Confirm as default}
