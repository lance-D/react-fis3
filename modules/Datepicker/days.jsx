'use strict';

import React from "react";
import {addClass,removeSiblingsClass} from "../Utils/dom";

class Days extends React.Component {
	// 获取当前年 月对应的有多少天
	getMonthDays(){
		let year = this.props.year,
			month = this.props.month;
		return new Date(year,month,0).getDate()
	}
	// 获取当月1号是周几
	getWeekday(){
		let year = this.props.year,
			month = this.props.month;
		return new Date(year+'/'+month+'/1').getDay()
	}

	handleClick(e){
		let ele = e.target;
		removeSiblingsClass(e.target,'active');
		this.props.setDay(parseInt(ele.innerText||ele.textContent));
	}
	render(){
		let monthDays = this.getMonthDays(),
			weekday = this.getWeekday(),
			otherMonth = [],
			currentMonth = [],
			day = this.props.day;
		for(let i = 0;i<weekday;i++){
			otherMonth[i]=i
		}
		for(let i=0;i<monthDays;i++){
			currentMonth[i]=i+1
		}
		let otherMonths = otherMonth.map(function(item,i){
			return (
				<li key={i} className="other-month"></li>
			)
		},this);
		let currentMonths = currentMonth.map(function(item,i){
			return (
				item == day ? <li key={i} className="day-item today" onClick={this.handleClick.bind(this)}>{item}</li>:<li key={i} className="day-item" onClick={this.handleClick.bind(this)}>{item}</li>
			)
		},this)
		return (
			<ul className="day-container clearfix">{otherMonths}{currentMonths}</ul>
		)
	}
}
export {Days as default};
