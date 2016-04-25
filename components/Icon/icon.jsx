'use strict';
require('./icon.less');
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
	render(){
		return (
			<i style={this.props.style} className={this.props.icon?this.state.icon:''} ></i>
		)
	}
}
export { Icon as default };
