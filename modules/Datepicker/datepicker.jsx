'use strict';

import "./datepicker.less";

import React,{ PropTypes } from "react";
import classnames from "classnames";
import Input from "../Input/input";
import Months from "./months";
import Weeks from "./weeks";
import Days from "./days";
import Time from "./time";
import {addClass,removeClass,hasClass,isClickInner} from "../Utils/dom";
import {formatTime} from "../Utils/string";
import {showErrTips} from "../Utils/errTips";

class Datepicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false,
			value:this.props.value||'',
			selectedDay:'',
			selectedTime:'',
			currDate: this.props.currDate ? new Date(this.props.currDate) : new Date()
		}
	}
	componentWillReceiveProps (nextProps){
		if(nextProps.value !== this.state.value) {
			this.setState({value:nextProps.value})
		}
		if(nextProps.currDate !== this.state.currDate) {
			if(nextProps.currDate){
				this.setState({currDate:new Date(nextProps.currDate)})
			}else{
				this.setState({currDate:new Date()})
			}
		}
	}

	// 处理左右箭头改变年月
	handleMonthChange(year,month){
		let newDate = new Date(year+'/'+month+'/1');
		this.setState({currDate:newDate})
	}
	componentDidMount(){
		let _this = this;
		document.addEventListener('click',function(e){
			e.stopPropagation();
			let ele = e.target,
				targetEle = _this.refs.datepicker;
			if(_this.state.show && !isClickInner(ele,targetEle)){
				_this.hide();
				_this.refs.datepickerText.validation();
			}

		})
	}
	validation(text){
		if(this.props.required) {
			this.refs.datepickerText.validation(text);
		}
	}
	// 设置input的值
	setDateValue(){
		let type = this.props.type,format = this.props.format||'yyyy-MM-dd',date;
		let _year = this.state.currDate.getFullYear();
		let _month = this.state.currDate.getMonth()+1<10?('0'+(this.state.currDate.getMonth()+1)):(this.state.currDate.getMonth()+1).toString();
		let _day = this.state.selectedDay<10?('0'+this.state.selectedDay):this.state.selectedDay.toString();
		switch (type) {
			case 'date':
				date = formatTime(_year.toString()+_month+_day,format);
				break;
			case 'time':
				date = this.state.selectedTime;
				break;
			default:
				date = formatTime(_year.toString()+_month+_day,format)+' '+this.state.selectedTime
		}
		this.setState({value:date});
	}
	getValue(){
		return this.state.value
	}
	hide(){
		this.setState({show:false})
	}
	clear(){
		this.setState({value:''});
	}
	show(){
		this.setState({show:true})
	}
	handleClick(e){
		e.stopPropagation();
		if(this.props.readOnly){
			return
		}
		// 如果有错误提示信息 则关闭
		this.refs.datepickerText.hideErrTips();
		let show = this.state.show;
		if(!show){
			this.show();
		}
	}

	// 处理单击某天
	handleSetDay(day){
		let _this = this;
		_this.setState({selectedDay:day});
		setTimeout(function() {
			_this.setDateValue();
			if(_this.props.type === 'date'){
				_this.hide();
			}
		}, 0);
	}

	handleSetTime(time){
		let _this = this;
		_this.setState({selectedTime:time});
		setTimeout(function() {
			_this.setDateValue();
			if(_this.props.type !== 'date'){
				_this.hide();
			}
		}, 0);
	}
	render(){
		let _year = this.state.currDate.getFullYear();
		let _month = this.state.currDate.getMonth()+1;
		let _day = this.state.currDate.getDate();
		let className = classnames('datepicker',this.props.className,this.state.show?'active':'');
		let {timeStart,timeEnd,...ohter} = this.props;
		return (
			<div ref='datepicker' className={className} style={this.props.style}>
				<Input {...ohter} ref='datepickerText' placeholder={this.props.placeholder} icon={this.props.icon || "re-interview"} text={this.props.text} btmLine={this.props.btmLine && true} horizontal={this.props.horizontal && true} value={this.state.value} onClick={this.handleClick.bind(this)} readOnly/>
				<div className="datepicker-container clearfix">
					<div className="datepicker-date fl" style={this.props.type ==='time'?{display:'none'}:{display:'block'}}>
						<Months lang={this.props.lang||'CN'} year={_year} month={_month} onChange={this.handleMonthChange.bind(this)}/>
						<Weeks lang={this.props.lang||'CN'}/>
						<Days year={_year} month={_month} day={_day} setDay={this.handleSetDay.bind(this)}/>
					</div>
					<div className="datepicker-time fl" style={this.props.type ==='date'?{display:'none'}:{display:'block'}} >
						<Time step={this.props.step} timeStart={this.props.timeStart} timeEnd={this.props.timeEnd} setTime={this.handleSetTime.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}
Datepicker.propTypes = {
	style:PropTypes.object,
	placeholder:PropTypes.string,
	lang:PropTypes.string,
	type:PropTypes.string,
	format:PropTypes.string,
	step:PropTypes.string,
	timeStart:PropTypes.string,
	timeEnd:PropTypes.string
}
export {Datepicker as default};
