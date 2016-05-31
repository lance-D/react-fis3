
'use strict';

import React,{ PropTypes } from "react";
import classnames from "classnames";
import Checkbox from "../Checkbox/checkbox";
import {formatData,contain} from "../Utils/array";

class Checkboxgroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.formatValue(this.props.value),
			data: formatData(this.props.data)
		};
	}
	formatValue(value){
		return this.toArray(value,this.props.sep)
	}

	toArray (value,sep){
		if(value === null || value === undefined){
			value = []
		}
		if(value instanceof Array){
			value = value
		}else if(typeof value === 'string'){
			value = value.split(sep||',')
		}else if(sep){
			value = value.map((v) => v.toString())
		}
		return value
	}



	handleChange (value) {
		if (this.props.readOnly) {
			return;
		}
		this.setState({ value });
	}
	render(){
		let className = classnames(this.props.className,'checkbox_group');
		let items = this.state.data.map((item,i) => {
			return (
				<Checkbox key = {i}
						checked = {contain(this.state.value,item.value)}
						disabled={this.props.readOnly}
						onClick = {this.handleChange.bind(this)}
						value= {item.value}
						text = {item.text}
						inline = {this.props.inline}
				/>
			)
		});
		return (
			<div style ={this.props.style} className = {className}>{items}</div>
		)
	}
}
Checkboxgroup.propTypes = {
	style:PropTypes.object,
	className:PropTypes.string,
	value:PropTypes.string,
	sep:PropTypes.string
}

export { Checkboxgroup as default}
