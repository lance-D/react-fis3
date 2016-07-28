'use strict';

import React from "react";
import {dateEN,dateCN} from "../Utils/lang";
import Button from "../Button/button";
import Icon from "../Icon/icon";

class Months extends React.Component {
	handlePrevClick(){
		let _month = parseInt(this.props.month)-1,
			_year = parseInt(this.props.year);
		if(_month<1){
			_year--
			_month = 12
		}
		this.props.onChange(_year,_month);
	}
	handleNextClcik(){
		let _month = parseInt(this.props.month)+1,
			_year = parseInt(this.props.year);
		if(_month>12){
			_year++
			_month = 1
		}
		this.props.onChange(_year,_month);
	}
	preYear(){
		let _month = parseInt(this.props.month),
			_year = parseInt(this.props.year);
		if(_year>0){
			_year--
		}
		this.props.onChange(_year,_month);
	}
	nextYear(){
		let _month = parseInt(this.props.month),
			_year = parseInt(this.props.year);
		_year++;
		this.props.onChange(_year,_month);
	}
	render(){
		let monthItem = this.props.lang.toUpperCase() =='CN' ? dateCN.months[this.props.month-1] : dateEN.months[this.props.month-1];
		return(
			<div className="month-container">
				<Button className="link btn-left double-left" onClick={this.preYear.bind(this)}><Icon icon="double-arrow-left"/></Button>
				<Button className="link btn-left" onClick={this.handlePrevClick.bind(this)}><Icon icon="arrow-left"/></Button>
				<span>{this.props.year}{this.props.lang.toUpperCase() =='CN'?'年':'&nbsp;&nbsp;'}{monthItem}</span>
				<Button className="link btn-right" onClick={this.handleNextClcik.bind(this)}><Icon icon="arrow-right"/></Button>
				<Button className="link btn-right double-right" onClick={this.nextYear.bind(this)}><Icon icon="double-arrow-right"/></Button>
			</div>
		)
	}
}



export { Months as default}
