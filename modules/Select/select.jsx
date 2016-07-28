'use strict';


import "./select.less";

import React,{ PropTypes } from "react";
import classnames from "classnames";
import Button from "../Button/button";
import Input from "../Input/input.jsx";
import Icon from "../Icon/icon";
import {formatData,contain} from "../Utils/array";
import {addClass,removeClass,removeSiblingsClass,isClickInner,getCSSAttr} from "../Utils/dom";


class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false,
			value:this.props.value||'',
			selectedArr:[],
			showErrTips:'',
			data:this.props.data
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.value !== this.state.value){
			this.setState({value:nextProps.value})
		}
		if(nextProps.data !== this.state.data){
			this.setState({data:nextProps.data})
		}
	}
	componentWillMount(){
		let defaultValue = this.props.defaultValue;
		let selectedArr = this.state.selectedArr;
		if(!this.props.mult && !contain(selectedArr,defaultValue) && defaultValue){
			selectedArr.push(defaultValue);
		}
	}
	componentDidMount(){
		let _this = this,
			selectEle = _this.refs.select;
			this.listenerClick(selectEle);
		if(this.props.horizontal && this.props.text){
			selectEle.querySelector('.select-container').style.width = parseInt(getCSSAttr(selectEle,'width')) - 70+'px';
		}
	}
	listenerClick(selectEle) {
		let _this = this;
		document.addEventListener('click',function(e){
			e.stopPropagation();
			let currEle = e.target;
			if(!isClickInner(currEle,selectEle)){
				_this.hide();
			}
		});
	}
	componentWillUnmount() {
		document.removeEventListener('click',this.listenerClick)
	}
	show(){
		this.state.data.length > 0 && this.setState({show:true})
	}
	hide(){
		this.setState({show:false})
	}
	/**
	 * 获取焦点 显示下拉菜单
	 */
	handleFocus(e){
		if(this.state.data.length > 0) {
			this.show();
		}
		if(this.props.filterValue) {
			this.filterData();
		}
	}

	/**
	 * 多选 单击已选值 删除 并移除 相应菜单项的active
	 */
	removeSelectedItem(i,e){
		e.stopPropagation();
		let selectedArr = this.state.selectedArr,
			newArr=[];
		for(let item of selectedArr){
			if(parseInt(item.key) !== i){
				newArr.push(item)
			}else{
				let selectEMenu = e.currentTarget.parentNode.nextSibling;
				removeClass(selectEMenu.getElementsByTagName('li')[i],'active');
			}
		}
		this.setState({selectedArr:newArr});
	}
	getValue(){
		return this.props.editable?this.state.value:this.state.selectedArr.toString();
	}
	validation(text){
		if(this.props.editable) {
			this.refs.selectInput.validation(text)
		}else{
			this.setState({showErrTips:true});
			this.showErrTips(text);
		}
		return false
	}
	clear(){
		this.setState({selectedArr:[],value:''})
	}
	/**
	 * 点击下拉菜单项 关闭 菜单
	 */
	handleSelect(i,e){
		let text = e.currentTarget.innerText||e.currentTarget.textContent;
		let selectMenu = e.currentTarget.parentElement;
		let selectedArr = this.state.selectedArr;
		if(this.props.readOnly){
			return
		}
		if(this.props.mult){
			selectedArr.push(
				<em key={i} className='selected-item'
					onClick={this.removeSelectedItem.bind(this,i)}
					dangerouslySetInnerHTML={{__html: text}}>
				</em>
			);
		}else{
			selectedArr.length = 0;
			 if(this.props.editable){
			 	this.setState({value:text});
			 }
			selectedArr.push(text);
			removeSiblingsClass(e.currentTarget,'active');
			this.hide();
			e.stopPropagation();
		}
		this.setState({selectedArr:selectedArr});
		this.setState({showErrTips:false});
		addClass(e.currentTarget,'active');
		if(this.props.onSelected){
			this.props.onSelected(e);
		}
	}
	handleChange(e){
		this.setState({value:e.target.value});
	}
	hanleKeyUp(){
		this.filterData();
	}
	filterData(){
		let value = this.refs.selectInput.getValue()||'';
		let filterValue = this.props.filterValue;
		if(typeof filterValue === 'string' && filterValue.length>0){
			let arr = [];
			arr = this.state.data.map((item) => {
				if(item[filterValue].indexOf(value) > -1) {
					item['show'] = true
				}else{
					item['show'] = false
				}
				return item;
			})
			this.setState({data:arr});
		}
	}
	showErrTips(text){
		return (
			<span className='error-tips'><em></em>{text}</span>
		)
	}
	getSelectItems(){
		if(this.props.filterValue) {
			return formatData(this.state.data).map((item,i)=>{
				return (
					<li key={i} data-value={item[this.props.keyValue || 'value']} style={{display:item.show ? 'block' : 'none'}}
					onClick={this.handleSelect.bind(this,i)} className={item[this.props.keyText || 'text']===this.props.defaultValue?'active':''}>
					{item[this.props.keyText || 'text']}
					</li>
				)
			}.bind(this))
		}else{
			return formatData(this.state.data).map((item,i)=>{
				return (
					<li key={i} data-value={item[this.props.keyValue || 'value']} onClick={this.handleSelect.bind(this,i)} className={item[this.props.keyText || 'text']===this.props.defaultValue?'active':''}>
					{item[this.props.keyText || 'text']}
					</li>
				)
			}.bind(this))
		}
	}
	render(){
		let className = classnames('select',this.props.horizontal &&  'horizontal',this.props.className,this.state.show?'active':''),
			selectedArr = this.state.selectedArr;
		let selectItems = this.getSelectItems();
		let btnClass = classnames('select-btn',this.props.btmLine && 'btm-line');
		return (
			<div ref='select' style={this.props.style} className={className}>
				{this.props.text && <span className={'select-label'} >{this.props.text}</span>}
				<div className='select-container'>
					{this.props.editable?
						(<div className={'editable-input'}  >
							<Input ref="selectInput" btmLine={this.props.btmLine && true}
									onChange={this.handleChange.bind(this)}
									placeholder={this.props.placeholder}
									required={this.props.required} value={this.state.value}
									icon={this.props.icon || 'arrow-down'}
									onKeyUp={this.hanleKeyUp.bind(this)}
									onFocus={this.handleFocus.bind(this)}
									iconClick={this.clear.bind(this)}
							/>
						</div>):
						(<Button className={btnClass}  onClick={this.show.bind(this)}>
							{selectedArr.length>0 ? selectedArr : <span className="placeholder">{this.props.placeholder} </span>}
							<Icon icon={this.props.icon || 'arrow-down'} />
						</Button>)
					}
					<ul className='select-menu'>
						{selectItems}
					</ul>
				</div>
				{this.state.showErrTips && this.showErrTips()}
			</div>
		)
	}
}
Select.propTypes = {
	style:PropTypes.object,
	data:PropTypes.oneOfType([PropTypes.array,PropTypes.func]).isRequired,
	className:PropTypes.string,
	mult:PropTypes.bool,
	placeholder:PropTypes.string,
	icon:PropTypes.string
}
export {Select as default};
