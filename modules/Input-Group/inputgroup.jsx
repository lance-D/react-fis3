'use strict';

import React from "react";
import ReactDOM from "react-dom"
import classnames from "classnames";
import Input from "../Input/input"
import Button from "../Button/button";
import Icon from "../Icon/icon";


class Inputgroup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value:this.props.value,
			text:this.props.text,
			icon:this.props.icon,
			type:this.props.type
		}
	}

	handleKeyUp(e){
		let value = e.target.value.trim();
		if(value && this.state.type === 'search'){
			if(e.keyCode === 13 || e.which === 13){
				console.log('你要搜索的内容是：'+encodeURIComponent(value))
			}
		}
	}

	handleClick(e){
		e.stopPropagation();
		let value = e.currentTarget.previousSibling.getElementsByClassName('input')[0].value.trim();
		if(value && this.state.type === 'search'){
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
		componentDom.getElementsByClassName('input_item')[0].style.width = (componentWidth - btnWidth)+'px';

	}
	handleChange(e){
		let value = e.currentTarget.value.trim();
		this.setState({value})
	}

	render(){
		let className = classnames(this.props.className,'input_group');
		return (
			<div className={className} style={this.props.style}>
				<Input placeholder={this.props.placeholder}
					readOnly={this.props.readOnly}
					value = {this.state.value}
					onKeyUp = {this.handleKeyUp.bind(this)}
					onChange = {this.handleChange.bind(this)}
				/>
				<Button className='btn_green btn_active' onClick={this.handleClick.bind(this)}>
					<Icon icon={this.state.icon||''} />
					{this.state.text}
				</Button>
				{this.props.children}
 			</div>

		)
	}

}


export {Inputgroup as default};
