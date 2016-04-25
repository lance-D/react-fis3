'use strict';
require('./radio.less');
import React from "react";
import Icon from "../Icon/icon";

class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: !!this.props.checked
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.checked !== this.props.checked){
			this.setState({ checked: nextProps.checked})
		}
	}
	handleClick () {
	    if (this.props.onClick) {
	      this.props.onClick(this.props.value,this.props.index);
	    }
	}
	getValue(){
		return this.refs.input.checked ? (this.props.value || true) : false
	}
	setValue(){
		var checked = value === true || value ===1 || value === this.props.value;
		this.setState({checked});
	}

	hanleChange(e){
		let checked = e.currentTarget.checked;
		this.setState({checked})
	}
	render(){
		return (
			<label style={this.props.style} className='radio'>
				<input  type='radio'
						disabled={this.props.readOnly}
						checked={this.props.checked}
						onChange={this.hanleChange.bind(this)}
						onClick = {this.handleClick.bind(this)}
						value={this.props.value}
				/>
				<Icon icon={this.state.checked?'radio-on':'radio-off'} />
				{this.props.text}
				{this.props.children}
			</label>
		)
	}
}


export { Radio as default};
