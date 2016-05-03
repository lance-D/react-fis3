'use strict';

import "./icon.less";
import React from "react";
let prefix = 'icon-';

class Icon extends React.Component {
	constructor(props){
		super(props);
		this.state = { icon: prefix+this.props.icon }
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.icon != this.props.icon){
			this.setState({icon: prefix+nextProps.icon})
		}
	}
	handleClick(e){
		if(this.props.onClick){
			this.props.onClick(e);
		}
	}
	render(){
		return (
			<i style={this.props.style} className={this.props.icon?this.state.icon:''} onClick={this.handleClick.bind(this)}></i>
		)
	}
}
export { Icon as default };
