'use strict';

import React from "react";
import {dateEN,dateCN} from "../Utils/lang";

class Weeks extends React.Component {
	render(){
		let weekdays = this.props.lang.toUpperCase()==='CN'?dateCN:dateEN;
		let weekItems = weekdays.weeks.map(function(item,i){
			return (
				<span key={i} className="week-item">{item}</span>
			)
		},this);

		return(
			<div className="week-container">{weekItems}</div>
		)
	}

}

export {Weeks as default};
