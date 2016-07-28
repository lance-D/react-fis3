'use strict';

import "./errormessage.less";
import React,{ PropTypes } from "react";
import classnames from 'classnames';
import {isClickInner} from "../Utils/dom";
import {formatData} from "../Utils/array";

export default class ErrorMessage extends React.Component {
    state = {
        show:false,
        text:this.props.text
    }
    show() {
        this.setState({show:true})
    }
    hide(){
        this.setState({show:false})
    }
    setText(val){
        this.setState({text:val});
    }
    getText(){
        return this.state.text;
    }
    render() {
        let className = classnames('error-message',this.props.className,this.state.show && 'active');
        return(
            <span className={className} onClick={this.show.bind(this)}>{ <em className={this.props.icon}></em>} {this.state.text} </span>
        )
    }
}
