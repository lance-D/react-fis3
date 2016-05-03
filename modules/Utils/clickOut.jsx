'use strict';

import ReactDOM from "react-dom";
import {isOutside} from './dom'


/**
 * 单击react 组件外面
 */

export function clickOut(Component,e){
	Component.prototype.getClickOutEvents = function () {
		let fn = this.state.checkClickOutMethod;
		if(!fn){
			fn = (e) => {
				let ele = ReactDOM.findDOMNode(this),
					currEle = e.target;
				if(ele !== currEle && !isOutside(ele,currEle)){
					this.componentClickAway();
				}
			}
			this.setState({checkClickOutMethod:fn})
		}
		return fn
	}

	

};
