'use strict';

import "./dropmenu.less";
import React,{ PropTypes } from "react";
import classnames from 'classnames';
import {isClickInner} from "../Utils/dom";
import {formatData} from "../Utils/array";

export default class Dropmenu extends React.Component {
	state = {
		show:false
	}
	show() {
		this.setState({show:true})
	}
	hide(){
		this.setState({show:false})
	}
	handleSelect(e){
		this.hide();
		if(this.props.onClick){
			this.props.onClick(e)
		}
	}
	componentDidMount(){
        document.addEventListener('click',function(e){
            e.stopPropagation();
            let ele = e.target,
                targetEle = this.refs.dropMenu;
            if(this.state.show && !isClickInner(ele,targetEle)){
                this.hide();
            }

        }.bind(this))
    }
	render() {
		let className = classnames('drop-container',this.props.className,this.state.show && 'active');
		let item = this.props.data &&  this.props.data.map(item => {
			return(
				<li key={i} onClick={this.handleSelect.bind(this)}>{item}</li>
			)
		});
		let children = React.Children.map(this.props.children,child =>{
			return (
				child &&  <li onClick={this.handleSelect.bind(this)}>{child}</li>
			)
		});
		return(
			<div ref='dropMenu' className={className}>
				<span className='drop-menu-label' onClick={this.show.bind(this)}>{this.props.text} {this.props.icon && <i className={this.props.icon}></i>}</span>
				<ul className='drop-menu'>
					{item}
					{children}
				</ul>
			</div>
		)
	}
}
