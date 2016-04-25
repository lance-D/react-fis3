'use strict';
require('./button.less');
import React from "react";
import classnames from "classnames";

class Button extends React.Component {
	constructor(props){
		super(props);
		this.state = { disabled: this.props.disabled }
	}
	disable() {
	    this.setState({disabled: true});
	}
	enable() {
	    this.setState({disabled: false});
	}

	handleClick(e){
		if(this.props.onClick){
			this.props.onClick(e);
		}

	}
	render(){
		let className = classnames(this.props.className,'btn');
		return (
			<button type="button" style={this.props.style}
					onClick={this.handleClick.bind(this)}
					className={className}
					disabled={this.state.disabled} >
					{this.props.children}
			</button>
		);
	}
}


export { Button as default };
