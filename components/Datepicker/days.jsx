'use strict';

import React from "react";
import {addClass,removeSiblingsClass} from "../Utils/dom";

class Days extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			year:this.props.year,
			month:this.props.month,
			day: this.props.day,
			value:this.props.value||''
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.year !== this.state.year){
			this.setState({year:nextProps.year})
		}
		if(nextProps.month !== this.state.month){
			this.setState({month:nextProps.month})
		}
		if(nextProps.day !== this.state.day){
			this.setState({day:nextProps.day})
		}
	}


	// 获取当前年 月对应的有多少天
	getMonthDays(){
		let year = this.state.year,
			month = this.state.month;
		return new Date(year,month,0).getDate()
	}
	// 获取当月1号是周几
	getWeekday(){
		let year = this.state.year,
			month = this.state.month;
		return new Date(year+'/'+month+'/1').getDay()
	}

	handleClick(e){
		let ele = e.target;
		removeSiblingsClass(e.target,'active');
		this.props.setDay(parseInt(ele.innerText));
	}
	render(){
		let monthDays = this.getMonthDays(),
			weekday = this.getWeekday(),
			otherMonth = [],
			currentMonth = [],
			day = this.state.day;
		for(let i = 0;i<weekday;i++){
			otherMonth[i]=i
		}
		for(let i=0;i<monthDays;i++){
			currentMonth[i]=i+1
		}
		let otherMonths = otherMonth.map(function(item,i){
			return (
				<li key={i} className="other_month"></li>
			)
		},this);
		let currentMonths = currentMonth.map(function(item,i){
			return (
				item == day ? <li key={i} className="day_item today" onClick={this.handleClick.bind(this)}>{item}</li>:<li key={i} className="day_item" onClick={this.handleClick.bind(this)}>{item}</li>
			)
		},this)
		return (
			<ul className="day_container clearfix">{otherMonths}{currentMonths}</ul>
		)
	}
}
export {Days as default};
