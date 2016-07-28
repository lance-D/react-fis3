'use strict';

import "./input.less";
import React,{ PropTypes } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import {regs} from "../Utils/regs";
import {showErrTips} from "../Utils/errTips";
import {addClass,removeClass,getCSSAttr} from "../Utils/dom";
import {validation} from "../Utils/lang";
class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:this.props.value || '',
			isChanged: this.props.isChanged
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.value !== this.state.value) {
			this.setState({value:nextProps.value})
		}
	}
	componentDidMount(){
		let inputDom = this.refs.input;
		if(this.props.horizontal && this.props.text){
			inputDom.style.width = parseInt(getCSSAttr(inputDom.parentNode,'width')) - 70+'px';
		}
	}

	/**
	 * 隐藏错误提示，并将输入框重置
	 */
	hideErrTips(){
		let ele = this.refs.input;
		let hasErrTips = ele.parentNode.querySelector('span.error-tips');
		if(hasErrTips){
			hasErrTips.style.maxHeight = '0';
			removeClass(ele,'warning')
		}
	}

	/**
	 * 验证 type 为 mail，phone，password等输入框，并显示相应错误提示
	 */
	validation(text){
		// 验证必填
		let ele = this.refs.input;
		let type = this.props.type;
		let required = this.props.required;
		let value = ele.value.trim();
		let reg = regs[type];
		if(required && (value === undefined || value === null || value.length === 0)) {
			 this.handleValidte(ele,'required',text)
		}else {
			// 验证type对应的规则
			if(reg && !reg.test(value)) {
				this.handleValidte(ele,type,text);
			}
		}
	}

	handleValidte (ele,type,text){
		let tips = text || validation.tips[type];
		showErrTips(ele,type,tips);
		addClass(ele,'warning');
	}

	handleBlur(){
		if(this.props.readOnly){
			return
		}
		if(this.state.isChanged){
			this.props.isValid && this.validation()
		}
		if(this.props.onBlur){
			this.props.onBlur()
		}
	}

	handleFocus(){
		if(this.props.readOnly){
			return
		}
		this.hideErrTips();
		if(this.props.onFocus){
			this.props.onFocus()
		}
	}

	handleChange(e){
		if(this.props.readOnly){
			return
		}
		e.target.value.length >0 ? this.setState({isChanged:true}):'';
		this.setState({value:e.target.value});
		if(this.props.onChange){
			this.props.onChange(e)
		}
	}
	iconClick(e){
		if(this.props.iconClick){
			this.props.iconClick(e)
		}
	}
	setValue(text){
		this.setState({value:text})
	}
	getValue(){
		return this.state.value
	}
	clear(){
		this.setState({value:''})
	}
	hanleKeyUp(){
		if(this.props.onKeyUp){
			this.props.onKeyUp()
		}
	}
	render(){
		let {style,required,isChanged,horizontal,btmLine,placeholder,text,isValid,...others} = this.props;
		let className = classnames('input-item',this.props.horizontal && 'horizontal',this.props.className,this.props.btmLine && 'bottom-line');
		return (
			<div style={this.props.style} className ={className}>
				{this.props.text?<span className='input-label'>{this.props.text}</span>:''}
				<input ref='input' {...others}
					type={this.props.type === 'password' ? 'password' : 'text'}
					className='input'
					onBlur= {this.handleBlur.bind(this)}
					onFocus= {this.handleFocus.bind(this)}
					onChange = {this.handleChange.bind(this)}
					onKeyUp={this.hanleKeyUp.bind(this)}
					value = {this.state.value}
				/>
				{this.props.icon ? <Icon icon={this.props.icon} onClick={this.iconClick.bind(this)} />:''}
				{this.props.btmLine && <span className="dynamic-line"></span>}
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
