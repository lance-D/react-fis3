'use strict';

import React from "react";
import {dateEN,dateCN} from "../Utils/lang";
import Button from "../Button/button";
import Icon from "../Icon/icon";

class Months extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang:this.props.lang||'CN',
			year:this.props.year,
			month:this.props.month
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.year !== this.state.year){
			this.setState({year:nextProps.year})
		}
		if(nextProps.month !== this.state.month){
			this.setState({month:nextProps.month})
		}
	}
	handlePrevClick(){
		let _month = parseInt(this.state.month)-1,
			_year = parseInt(this.state.year);
		if(_month<1){
			_year--
			_month = 12
		}
		this.setState({
			month:_month,
			year:_year
		});
		this.props.onChange(_year,_month);
	}
	handleNextClcik(){
		let _month = parseInt(this.state.month)+1,
			_year = parseInt(this.state.year);
		if(_month>12){
			_year++
			_month = 1
		}
		this.setState({
			month:_month,
			year:_year
		});
		this.props.onChange(_year,_month);
	}

	render(){
		let monthItem = this.state.lang.toUpperCase() =='CN' ? dateCN.months[this.state.month-1] : dateEN.months[this.state.month-1];
		return(
			<div className="month_container">
				<Button className="btn_link btn_left" onClick={this.handlePrevClick.bind(this)}><Icon icon="arrow-left"/></Button>
				<span>{this.state.year}{this.state.lang.toUpperCase() =='CN'?'年':'&nbsp;&nbsp;'}{monthItem}</span>
				<Button className="btn_link btn_right" onClick={this.handleNextClcik.bind(this)}><Icon icon="arrow-right"/></Button>
			</div>
		)
	}
}



export { Months as default}
