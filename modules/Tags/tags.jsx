'use strict';

import "./tags.less";
import React,{ PropTypes } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import {formatData} from "../Utils/array";

import Confirm from "../Confirm/confirm";

class Tags extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			tagArray:formatData(this.props.tagArray),
      		isAdd:false
		}
	}
  handleRemove(i){
    let array = this.state.tagArray;
    array.splice(i,1);
    this.setState({ tagArray: array });
  }
  addTag(event){
    if(event.target.value == ""){
      this.setState({isAdd:false});
    }else{
      let item = {text :event.target.value, value:event.target.value};
      let array = this.state.tagArray;
      if(array.length > 10){
        this.refs.confirmPop.show();
        this.setState({isAdd:false});
        event.target.value = "";
      }else{
        array.push(item);
        this.setState({ tagArray: array });
        this.setState({isAdd:false});
        event.target.value = "";
      }
    }
  }
  handleKeyPress(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addTag(e);
      return false;
    }
  }
  addTagShow(){
    this.setState({isAdd:true},()=>{
      this.refs.tagInput.focus();
    });
  }
  render(){
    let tagItem = this.state.tagArray.map((item,i) => {
      return (
        <span className="tag-item" key={i}>
          {item.text}
          <Icon icon='close' onClick={this.handleRemove.bind(this,i)}/>
        </span>
      )
    })
    return (
      <div className="tag-container clearfix">
	  	{this.props.text && <span className='tag-label'>{this.props.text}</span>}
        {tagItem}
        <div className="add-tag" style={this.state.isAdd?{display:'none'}:{display:'block'}} onClick={this.addTagShow.bind(this)}>
          <Icon icon='add'/>
          添加标签
        </div>
      	<Confirm text="只能设置十个以内的标签" title="超出限制" btnType="none" ref='confirmPop'/>
        <input style={this.state.isAdd ? {display:'block'}:{display:'none'}} type="text" maxLength="10" placeholder="输入标签" className="tag-input" onKeyPress={this.handleKeyPress.bind(this)} onBlur={this.addTag.bind(this)} value={this.state.value} ref='tagInput'></input>
      </div>
    )
  }
}
Tags.propTypes = {
	tagArray:PropTypes.oneOfType([PropTypes.array,PropTypes.func]),
}
export {Tags as default};
