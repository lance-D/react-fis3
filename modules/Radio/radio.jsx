'use strict';

import "./radio.less";
import React from "react";
import Icon from "../Icon/icon";

class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:this.props.value||'',
			checked: !!this.props.checked
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.checked !== this.props.checked){
			this.setState({ checked: nextProps.checked})
		}
		if(nextProps.value !== this.state.value){
			this.setState({ value: nextProps.value})
		}
	}
	handleClick () {
	    if (this.props.onClick) {
	      this.props.onClick(this.props.value,this.props.index);
	    }
	}
	getValue(){
		return this.refs.radio.checked ? (this.props.value || true) : false
	}
	setValue(){
		var checked = value === true || value ===1 || value === this.props.value;
		this.setState({checked});
	}

	hanleChange(e){
		let checked = e.currentTarget.checked;
		this.setState({checked});
	}
	render(){
		return (
			<label style={this.props.style} className='radio'>
				<input ref='radio'  type='radio'
						disabled={this.props.readOnly}
						checked={this.props.checked}
						onChange={()=>{}}
						onClick = {this.handleClick.bind(this)}
						value={this.state.value}
				/>
				<Icon icon={this.state.checked?'radio-on':'radio-off'} />
				{this.props.text}
				{this.props.children}
			</label>
		)
	}
}


export { Radio as default};
