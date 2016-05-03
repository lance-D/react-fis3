'use strict';


import React from "react";
import Button from "../Button/button";
import Icon from "../Icon/icon";

class Time extends React.Component {
	static defaultProps = {
		timeArr: [],
		value:''
	}
	constructor(props) {
		super(props);
		this.state ={
			step:this.props.step,
			timeStart:this.props.timeStart,
			timeEnd:this.props.timeEnd,
			scrollHeight:this.props.scrollHeight||40, // 点击上 下 箭头滚动距离
			value:this.props.value||''
		}
	}

	getInitHoursArr(){
		let hoursArr=[];
		for(let i=0;i<=24;i++){
			if(i<10){
				hoursArr.push('0'+i+':00')
			}else{
				hoursArr.push(i+':00')
			}
		}
		return hoursArr;
	}
	formatTime(time){
		if(time <10){
			return '0'+time;
		}else{
			return time;
		}
	}
	getHoursArr(){
		let _step = parseInt(this.state.step) || 0,
			_start = parseInt(this.state.timeStart) || 0,
			_end = parseInt(this.state.timeEnd) || 24;
		let arr = this.props.timeArr;
		for(let i= _start;i <= _end;i++){
			for(let j= 0; j <= 60 && i < _end;j+=_step){
				if(j<60){
					arr.push(this.formatTime(i)+':'+this.formatTime(j))
				}
			}
			if(i === _end){
				arr.push(this.formatTime(i)+':00');
			}
		}
		return arr;
	}

	handleClick(i,e){
		e.stopPropagation();
		let ele = e.target;
		this.props.setTime(ele.innerText);
	}

	clickUp(e){
		e.stopPropagation();
		let ele = e.target.parentNode.className==='time_container'?e.target.parentNode:e.target.parentNode.parentNode,
		scrollTop = ele.scrollTop,
		maxScrollHeight = ele.scrollHeight;
		if(scrollTop<maxScrollHeight){
			ele.scrollTop -= this.state.scrollHeight;
		}
	}

	clickDown(e){
		e.stopPropagation();
		let ele = e.target.parentNode.className==='time_container'?e.target.parentNode:e.target.parentNode.parentNode,
		scrollTop = ele.scrollTop,
		maxScrollHeight = ele.scrollHeight;
		if(scrollTop<maxScrollHeight){
			ele.scrollTop += this.state.scrollHeight;
		}
	}

	render(){
		let timeArr = this.state.step ? this.getHoursArr() : this.getInitHoursArr();

		let tiemItems = timeArr.map(function(item,i){
			return (
				<span key={i} className="time_item" onClick={this.handleClick.bind(this,i)}>{item}</span>
			)
		},this)

		return (
			<div className="time_container">
				<Button className="btn_link btn_up" onClick={this.clickUp.bind(this)}><Icon icon="arrow-up"/></Button>
				{tiemItems}
				<Button className="btn_link btn_down" onClick={this.clickDown.bind(this)}><Icon icon="arrow-down"/></Button>
			</div>
		)
	}
}

export {Time as default};
