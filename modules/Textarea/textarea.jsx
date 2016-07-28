'use strict';
import "./textarea.less";
import React from 'react';
import classname from 'classnames';

export default class Textarea extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			textValueLength:parseInt(this.props.maxlength),
			value:this.props.value || ''
		}
	}
	resizeTimeout = 0;
	decreaseDistance = 1; // 删除文本时 高度减小的单位
	componentWillReceiveProps(nextProps){
		if(nextProps.value !== this.state.value) {
			this.setState({value:nextProps.value})
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		if(nextState.value !== this.state.value ||  nextState.textValueLength !==  this.state.textValueLength){
			return true
		}else{
			return false
		}
	}
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
			this.handleKeyUp();
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

	handleHeight() {
		let areaDom = this.refs.area;
		if(!areaDom){
			return
		}
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
		let textLength = areaDOM.value.length > 0 ? areaDOM.value.replace(/[\r\n]/g,'').trim().length : 0;
		let maxlength = parseInt(this.props.maxlength);
		if(maxlength > textLength){
			this.setState({textValueLength: maxlength-textLength})
		}else if(maxlength == textLength){
			this.setState({textValueLength: maxlength-textLength});
			let indexofEnter = areaDOM.value.lastIndexOf('\n');
			if(indexofEnter > 0 && (areaDOM.value.length - indexofEnter) == 1 ) {
				areaDOM.value = areaDOM.value.substr(0,indexofEnter);
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
	handleChagne(e) {
		this.setState({value:e.target.value});
		this.handleKeyUp();
		this.handleHeight();
		if(this.props.onchange){
			this.props.onchange(...params)
		}
	}
	getValue(){
		return this.state.value;
	}
	setValue(text){
		this.setState({value:text})
	}
	render (){
		let className = classname('textarea-box',this.state.textValueLength == 0 && 'warning');
		let containerClass = classname('textarea-container',this.props.className);
		let {style,maxlength,text,width,value} = this.props;
		return (
			<div className={containerClass} style={{width:this.props.width}}>
				{this.props.text && <span className='textarea-label'>{this.props.text}</span>}
				<div onClick={this.handleClick.bind(this)}  className={className} >
					<textarea
						ref='area'
						onKeyUp={this.handleKeyUp.bind(this)}
						onChange={this.handleChagne.bind(this)}
						onKeyDown = {this.handleKeyUp.bind(this)}
						onBlur={this.handleBlur.bind(this)}
						value={this.state.value}
					>
					</textarea>
				</div>
				{this.props.maxlength && <span className="word-limit">还可以输入 <em>{this.state.textValueLength}</em> 个字</span>}
			</div>
		)
	}
}
