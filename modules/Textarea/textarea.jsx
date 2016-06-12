'use strict';
import "./textarea.less";
import React from 'react';
import classname from 'classnames';

export default class Textarea extends React.Component {

	resizeTimeout = 0;
	decreaseDistance = 1; // 删除文本时 高度减小的单位
	state = {textValueLength:parseInt(this.props.maxlength)} // 输入框初始文本长度
	
	componentDidMount() {
	 	const areaDom = this.refs.area;
	 	areaDom.style.height = `${areaDom.scrollHeight}px`;
	 	if (window.attachEvent) {
	      	window.attachEvent('onresize', this.resize.bind(this));
	    } else {
	      	window.addEventListener('resize', this.resize.bind(this));
	    }
	}
	resize (){
		window.clearTimeout(this.resizeTimeout);
	    this.resizeTimeout = window.setTimeout(() => {
	      	this.handleHeight();
	    }, 50);
	}
	componentWillUnmount() {
	    if (window.detachEvent) {
	      	window.detachEvent('onresize', this.resize.bind(this));
	    } else {
	      	window.removeEventListener('resize', this.resize.bind(this));
	    }
	}
	shouldComponentUpdate(nextProps,nextState) {
		return  this.state.textValueLength !== nextState.textValueLength
	}
	handleHeight() {
		const areaDom = this.refs.area;
	 	areaDom.style.height = `${areaDom.scrollHeight}px`;
	 	while (areaDom.clientHeight >= areaDom.scrollHeight) {
	      areaDom.style.height = `${areaDom.clientHeight - this.decreaseDistance}px`;
	    }
	}

	handleClick() {
		const areaDom = this.refs.area;
		areaDom.focus();
		areaDom.parentNode.style.borderColor = '#00b38a';
	}
	handleKeyUp() {
		if(!this.props.maxlength) {
			return 
		}
		let areaDOM = this.refs.area;
		let textLength = areaDOM.value.replace(/[\r\n]/g,'').trim().length;
		let maxlength = parseInt(this.props.maxlength);
		if(maxlength > textLength){
			this.setState({textValueLength: maxlength-textLength})
		}else if(maxlength == textLength){
			this.setState({textValueLength: maxlength-textLength});
			if(areaDOM.value.lastIndexOf('\n') > 0 && (areaDOM.value.lastIndexOf('\n') - areaDOM.value.length) == -2 ) {
				areaDOM.value = areaDOM.value.substring(0,areaDOM.value.lastIndexOf('\n')+2);
			}
		}
		else{
			let arr = areaDOM.value.split(/[\r\n]/i);
			let temp=0;
			let resultArr = [];
			for(let i = 0,leng = arr.length; i < leng; i++ ) {
				(temp + arr[i].length) >= maxlength ? resultArr.push(arr[i].substring(0,maxlength-temp)) : resultArr.push(arr[i]);
				temp += arr[i].length;
			}
			areaDOM.value = resultArr.join('\r\n');
		}
	}
	handleBlur() {
		this.refs.area.parentNode.style.borderColor ='#eee';
	}
	handleChagne() {
		this.handleKeyUp();
		this.handleHeight();
		if(this.props.onchange){
			this.props.onchange(...params)
		}
	}
	getValue(){
		return this.refs.area.value;
	}
	render (){
		let className = classname('textarea-box',this.state.textValueLength == 0 && 'warning');
		let wordNumber = this.get
		return (
			<div className={className} style={{width:this.props.width}} onClick={this.handleClick.bind(this)} > 
				<textarea
					style={this.props.style}
					ref='area' 
					onKeyUp={this.handleKeyUp.bind(this)}
					onChange={this.handleChagne.bind(this)}
					
					onBlur={this.handleBlur.bind(this)}
					placeholder={this.props.placeholder}>
				</textarea>
				{this.props.maxlength && <span className="word-limit">还剩 <em>{this.state.textValueLength}</em> 个字</span>}
			</div>
		)
	}
}