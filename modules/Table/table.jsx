'use strict';
import './table.less';
import React from 'react';
import Checkbox from '../Checkbox/checkbox';
import {addClass,removeClass} from '../Utils/dom';


export default class Table extends React.Component {
	// selectAll(e){
	// 	let tableDOM = this.refs.table;
	// 	let labelDOMArr = Array.from(tableDOM.getElementsByTagName('tbody')[0].querySelectorAll('label'));
	// 	let selectAllValue = e.target.checked;
	// 	for(var i = 0 ,len= labelDOMArr.length;i<len;i++) {
	// 		if(selectAllValue){
	// 			if(!labelDOMArr[i].querySelector('input[type="checkbox"]').checked) {
	// 				labelDOMArr[i].querySelector('input[type="checkbox"]').checked = true;
	// 				removeClass(labelDOMArr[i].querySelector('i'),'icon-checkbox');
	// 				addClass(labelDOMArr[i].querySelector('i'),'icon-checkedbox');
	// 			}
	// 		}else{
	// 			labelDOMArr[i].querySelector('input[type="checkbox"]').checked = false;
	// 			removeClass(labelDOMArr[i].querySelector('i'),'icon-checkedbox');
	// 			addClass(labelDOMArr[i].querySelector('i'),'icon-checkbox');
	// 		}
	// 	}
	// 	// this.props.selectAll(selectAllValue,labelDOMArr);
	// }

	render(){
		let header = this.props.title.map((item,i)=>{
			if(this.props.editable && i === 0) {
				return (<th key={i}>{item}</th>)
			}
			return <th key={i}>{item}</th>
		});
		return (
			<table ref='table' className='table'>
				<thead>
					<tr>{header}</tr>
				</thead>
				<tbody>
					{this.props.data}
				</tbody>
			</table>
		)
	}
}
