'use strict';
import './tips.less';
import React from 'react';
import Icon from '../Icon/icon'

class Tips extends React.Component {
	handleClick(e) {
		let ele = e.target.parentNode;
		ele.style.height = '0';
	}
	render(){
		return (
			<div className='tips'>
				{this.props.children}
				{this.props.text}
				<Icon icon='close' onClick={this.handleClick.bind(this)}/>
			</div>
		)
	}
}

export {Tips as default}
