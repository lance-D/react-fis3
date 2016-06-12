'use strict';

import React,{ PropTypes } from "react";
import classnames from "classnames";
import Radio from "./radio";
import {formatData} from "../Utils/array";


class Radiogroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value : this.props.value,
			data : formatData(this.props.data)
		}
	}

	componentWillReceiveProps (nextProps){
		if(nextProps.value !== this.state.value) {
			this.setValue(nextProps.value)
		}
		if(nextProps.data !== this.state.data){
			this.setState({ data: formatData(nextProps.data) })
		}
	}

	setValue (value){
		this.setState({value})
	}

	getValue (){
		return this.state.value
	}

	handleChange (value) {
	    if (this.props.readOnly) {
	      	return;
	    }
	    this.setState({ value });
		if(this.props.onChange){
			this.props.onChange();
		}
  	}
	render(){
		let className = classnames(this.props.className,'radio-group');
		let items = this.state.data.map((item,i) => {
			return (
				<Radio key = {i}
					disabled = {this.props.readOnly}
					checked = {this.state.value == item.value}
					onClick = {this.handleChange.bind(this)}
          			value = {item.value}
					text = {item.text}
				/>
			)
		});
		return (
			<div style={this.props.style} className={className}>{items}</div>
		)
	}
}
Radiogroup.propTypes = {
	style:PropTypes.object,
	readOnly:PropTypes.bool,
	checked:PropTypes.bool,
	onClick:PropTypes.func,
	data:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,
	value:PropTypes.string,
	className:PropTypes.string,
	onChange:PropTypes.func
}

export { Radiogroup as default }
