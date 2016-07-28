'use strict';

import React,{ PropTypes } from "react";
import ReactDOM from "react-dom"
import classnames from "classnames";
import Input from "../Input/input"
import Button from "../Button/button";
import Icon from "../Icon/icon";


class Inputgroup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value:this.props.value
		}
	}

	handleKeyUp(e){
		let value = e.target.value.trim();
		if(value && this.props.type === 'search'){
			if(e.keyCode === 13 || e.which === 13){
				console.log('你要搜索的内容是：'+encodeURIComponent(value))
			}
		}
	}

	handleClick(e){
		e.stopPropagation();
		let value = e.currentTarget.previousSibling.getElementsByClassName('input')[0].value.trim();
		if(value && this.props.type === 'search'){
			console.log('你要搜索的内容是：'+encodeURIComponent(value));
		}
		if(this.props.onClick){
			this.props.onClick(e);
		}
	}

	/**
	 * 初始化组件 动态计算input的长度
	 */
	componentDidMount(){
		let componentWidth = parseInt(this.props.width),
			componentDom = ReactDOM.findDOMNode(this),
			btnWidth = componentDom.getElementsByClassName('btn')[0].offsetWidth;
		componentDom.getElementsByClassName('input-item')[0].style.width = (componentWidth - btnWidth)+'px';

	}
	handleChange(e){
		let value = e.currentTarget.value.trim();
		this.setState({value})
	}

	render(){
		let className = classnames('input-group',this.props.className);
		return (
			<div className={className} style={this.props.style}>
				<Input placeholder={this.props.placeholder}
					readOnly={this.props.readOnly}
					value = {this.state.value}
					onKeyUp = {this.handleKeyUp.bind(this)}
					onChange = {this.handleChange.bind(this)}
				/>
				<Button className='green active' onClick={this.handleClick.bind(this)}>
					<Icon icon={this.props.icon||''} />
					{this.props.text}
				</Button>
				{this.props.children}
 			</div>

		)
	}

}

Inputgroup.propTypes = {
	type:PropTypes.string.isRequired,
	readOnly:PropTypes.bool,
	text:PropTypes.string,
	icon:PropTypes.string,
	children:PropTypes.any,
	onKeyUp:PropTypes.func,
	onChange:PropTypes.func

}
export {Inputgroup as default};
