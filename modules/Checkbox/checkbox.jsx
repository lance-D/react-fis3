'use strict';
import "./checkbox.less";
import React,{ PropTypes } from "react";
import Icon from "../Icon/icon";
import classnames from "classnames";
class Checkbox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			checked: !!this.props.checked
		};
	}
	shouldComponentUpdate (nextProps,nextState) {
		return nextState.checked !== this.state.checked
	}
	handleChange(e){
		if(this.props.readOnly){
			return;
		}
		if(this.props.onChange) {
			this.props.onChange(e);
		}
	}
	handleClick(e){
		if(this.props.readOnly){
			return;
		}
		var input = e.target.tagName!='LABEL'?e.target.closest('label').querySelector('input'):e.target.querySelector('input');
		this.setState({
			checked: input.checked
		});
	}
	getValue(){
		return this.state.checked ? (this.props.value||true) : false
	}
	setValue(value){
		let checked = value === true || value ===1 || value === this.props.value;
		this.setState({checked});
	}

	render(){
		let className = classnames('checkbox',this.props.inline && 'inline');
		return (
			<label style= {this.props.style} className={className} onClick={this.handleClick.bind(this)}>
				<input type='checkbox'
						disabled = {this.props.readOnly}
						onChange = {this.handleChange.bind(this)}
						/>
				<Icon icon={this.state.checked ? 'checkedbox':'checkbox'} />
				{this.props.text}
				{this.props.children}
			</label>
		)
	}
}

Checkbox.propTypes = {
	style:PropTypes.object,
	inline:PropTypes.bool,
	readOnly:PropTypes.bool,
	checked:PropTypes.bool,
	onChange:PropTypes.func,
	text:PropTypes.string,
	children:PropTypes.any
}


export {Checkbox as default};
