'use strict';

import "./input.less";
import "../common/errtips.less";
import React,{ PropTypes } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import {regs} from "../Utils/regs";
import {showErrTips} from "../Utils/errTips";
import {addClass,removeClass} from "../Utils/dom";
import {validation} from "../Utils/lang";
class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			isChanged: this.props.isChanged
		}
	}
	componentWillReceiveProps (nextProps){
		if(nextProps.value !== this.state.value) {
			this.setValue(nextProps.value);
		}
	}
	componentDidMount(){
		let inputDom = this.refs.input;
		if(this.props.horizontal){
			inputDom.style.width = parseInt(inputDom.parentNode.style.width) - 70+'px';
		}
	}
	setValue(value){
		this.setState({value})
	}
	getValue(){
		return this.state.value
	}

	/**
	 * 隐藏错误提示，并将输入框重置
	 */
	hideErrTips(ele){
		let nextEle = ele.nextElementSibling;
		if(nextEle && nextEle.className == 'error-tips'){
			nextEle.style.maxHeight = '0';
			removeClass(ele,'input-warning')
		}
	}

	/**
	 * 验证 type 为 mail，phone，password等输入框，并显示相应错误提示
	 */
	validation(ele,type){
		// 验证必填
		let required = this.props.required;
		let value = ele.value.trim();
		let reg = regs[type];
		if(required && (value === undefined || value === null || value.length === 0)) {
			 this.handleValidte(ele,'required')
		}else {
			// 验证type对应的规则
			if(reg && !reg.test(value)) {
				this.handleValidte(ele,type)
			}
		}
	}

	handleValidte (ele,type){
		let text = validation.tips[type];
		showErrTips(ele,type,text);
		addClass(ele,'input-warning');
	}

	handleBlur(e){
		let _ele = e.currentTarget;
		let type = this.props.type;
		if(this.state.isChanged){
			this.props.isValid && this.validation(_ele,type)
		}
	}

	handleFocus(e){
		let _ele = e.currentTarget;
		this.hideErrTips(_ele);
	}

	handleChange(e){
		e.target.value.length >0 ? this.setState({isChanged:true}):'';
		this.setState({value:e.target.value})
	}

	render(){
		let className = classnames(this.props.className,'input-item',this.props.horizontal && 'horizontal');
		let {style,required,...others} = this.props;
		return (
			<div style={this.props.style} className ={className}>
				{this.props.text?<span className='input-label'>{this.props.text}</span>:''}
				<input ref='input' {...others}
					type={this.props.type === 'password' ? 'password' : 'text'}
					className='input'
					onBlur= {this.handleBlur.bind(this)}
					onFocus= {this.handleFocus.bind(this)}
					onChange = {this.handleChange.bind(this)}
				/>
				{this.props.icon?<Icon icon={this.props.icon}/>:''}
				{this.props.children}
			</div>
		)
	}
}
Input.propTypes = {
	style:PropTypes.object,
	type:PropTypes.string,
	required:PropTypes.bool,
	className:PropTypes.string,
	text:PropTypes.string,
	placeholder:PropTypes.string,
	isValid:PropTypes.bool,
	icon:PropTypes.string,
	children:PropTypes.any,
	onBlur:PropTypes.func,
	onFocus:PropTypes.func,
	onChange:PropTypes.func

}
/**
 * 默认所有值都是未改变的
 */
Input.defaultProps = {
	isChanged:false
}


export { Input as default};
