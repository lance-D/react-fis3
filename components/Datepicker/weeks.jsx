'use strict';

import React from "react";
import {dateEN,dateCN} from "../Utils/lang";

class Weeks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang:this.props.lang||'CN'
		}
	}
	render(){
		let weekdays = this.state.lang.toUpperCase()==='CN'?dateCN:dateEN;
		let weekItems = weekdays.weeks.map(function(item,i){
			return (
				<span key={i} className="week_item">{item}</span>
			)
		},this);

		return(
			<div className="week_container">{weekItems}</div>
		)
	}

}

export {Weeks as default};
