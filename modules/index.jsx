'use strict';

import React from "react";
import ReactDOM from 'react-dom';

import { Button,Radiogroup,Checkbox,Checkboxgroup,Icon,Input,Inputgroup,Select,Datepicker,Confirm,Modal,Tags,Textarea,Notification,Messages} from  './main'

let handleClick =  function(){
	// handle click
	console.log('回调函数');
}

let handlePaste = function(e){
	console.log('处理粘贴的回调');
}

let hanleSelected = function (e){
	console.log('select 回调函数,你选择的是:'+e.currentTarget.innerText||e.currentTarget.textContent);
}

let handleOK = function (e){
	console.log('已确认')
}


const openNotification = function (){
	const key = `${new Date().getTime()}`;
	const closeNotify = function (){
		console.log(key);
	}
	Notification.open({
		title:'标题',
		message:'ddddddddd',
		duration: 0,
		key,
		onClose:closeNotify
	});

}
const openNotificationWithIcon = function() {
	Notification['warning']({
		title:'标题',
		message:'这是一个带图标的通知',
		duration:0
	})
}

const openMessage = function (){
	Messages.info('hsagasg')
}
const openMessageWithIcon = function(){

}

ReactDOM.render(
	<div className="main">
		<h2>按钮</h2>
		<div className="item">
			<Button>btn</Button>
			<Button className="green">green</Button>
			<Button className="red">red</Button>
			<Button className="green" disabled>disabled</Button>
			<Button className="green active">green active</Button>
			<Button className="red active">red active</Button>
			<Button className="green link">link</Button>
		</div>
		<h2>带图标按钮</h2>
		<div className="item">
			<Button className="green active"><Icon icon="yes"/>通过</Button>
			<Button className="green active"><Icon icon="no"/>拒绝</Button>
		</div>
		<h2>按钮大小</h2>
		<div className="item">
			<Button className="sm">这个是小按钮</Button>
			<Button className="">这个默认按钮</Button>
			<Button className="lg">这个是大按钮</Button>
		</div>
		<h2>单选框组</h2>
		<Radiogroup data={[{"value":"China","text":"中国"},{"value":"Japan","text":"日本"},{"value":"Korea","text":"韩国"}]} onChange={handleClick}/>
		<h2>复选框</h2>
		<div className="item">
			<Checkbox text="复选框" inline/>
			<Checkbox text="默认选中的复选框" checked inline />
			<Checkbox text="默认选中只读复选框" checked readOnly inline />
			<Checkbox text="回调函数" onChange={handleClick} />
		</div>
		<h2>复选框组</h2>
		<div className="item">
			<Checkboxgroup data={[{"value":"China","text":"中国"},{"value":"Japan","text":"日本"},{"value":"KoreaC","text":"韩国"}]} value="China" inline onClick={handleClick}/>
		</div>
		<h2>输入框</h2>
		<div className="item">
			<Input style={{width:"300px"}} placeholder="输入点什么"/>
			<h4>带label的input 竖直方向</h4>
			<Input style={{width:"300px"}} text="姓名" placeholder="请输入姓名" className='demo-item'/>
			<h4>带label的input 水平方向</h4>
			<Input style={{width:"300px"}} text="姓名" placeholder="请输入姓名" horizontal/>
			<Input style={{width:"300px",marginTop:"30px"}} text="用户姓名" placeholder="请输入用户姓名" horizontal/>
			<h4>带验证的input</h4>
			<div className= 'clearfix'>
				<Input text="必填" className='demo-item fl' placeholder="必填项" required isValid/>
				<Input type='username' className='demo-item fl' text="用户名" placeholder="请输入正确的用户名"  isValid />
				<Input type='mail' text="邮箱" className='demo-item fl' placeholder="请输入正确的邮箱"  isValid />
				<Input type='mail' text="邮箱(必填)" className='demo-item fl' placeholder="请输入正确的邮箱，必填项" required isValid />
				<Input type='phone' text="手机" className='demo-item fl' placeholder="请输入正确的手机号码"  isValid />
				<Input type='password' text="密码" className='demo-item fl' placeholder="请输入6-20位密码"  isValid />
			</div>
		</div>
		<h2>输入框组</h2>
		<div className="item">
			<h4>纯文本按钮</h4>
			<Inputgroup type="search" text='搜索' width="400px" placeholder="请输入搜索的内容" />
			<h4>纯icon按钮</h4>
			<Inputgroup type="search" icon="search" width="400px" placeholder="请输入搜索的内容"/>
			<h4>文本和icon的按钮</h4>
			<Inputgroup type="search" text=' 搜索' icon="search" width="400px" placeholder="请输入搜索的内容"/>
			<h4>搜索框只读</h4>
			<Inputgroup type="paste" text='复制链接' value="https://easy.lagou.com/pub/resume.htm?pubCode=e90cde5ba48d1af6990b880bef0857c6" width="600px" readOnly placeholder="请输入搜索的内容" onClick={handlePaste} />
		</div>
		<h2>自增Textarea</h2>
		<div className="item">
			<Textarea width="400px" placeholder="输入点什么" />
			<h4>限制输入字数</h4>
			<Textarea width="400px" maxlength="200" placeholder="输入点什么" spellcheck='false'/>
		</div>
		<h2>下拉框</h2>
		<div className="item clearfix">
			<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} className="demo-item fl" placeholder="单项选择" defaultValue="选项二"/>
			<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} mult className="demo-item fl" placeholder="多项选择" onSelected={hanleSelected}/>
		</div>
		<h2>时间日期选框</h2>
		<div className="item clearfix">
			<Datepicker style={{width:"365px"}} type="date"  className="demo-item fl" placeholder="请选择日期"/>
			<Datepicker style={{width:"365px"}} className="demo-item fl" placeholder="请选择日期时间" step="30" timeStart="9" timeEnd="19" />
		</div>
		<h2>确认框</h2>
		<div className="item clearfix">
			<Confirm text="这是一个确认框，确认框带title,触发元素为text(默认)" className="demo-item" title="确认信息" btnTpl="点击弹出确认框" handleOK={handleOK} clickOutClose />
			<Confirm text="这是一个确认框，确认框但不带标题,修改btnType来触发确认框,如icon，btn" className="demo-item" btnType="icon" btnTpl="candidate" handleOK={handleOK}/>
		</div>
		<h2>模态框</h2>
		<div className="item clearfix">
			<Modal title="模态框标题" btnTpl="模态框">
				这里放模态框内容
			</Modal>
		</div>
		<h2>组件嵌套</h2>
		<div className="item clearfix">
			<Confirm className="demo-item" title="确认信息" btnTpl="弹出框(确认框嵌入下拉框)" handleOK={handleOK} >
				<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} className="demo-item" placeholder="单项选择"/>
			</Confirm>
			<Modal title="模态框标题" btnTpl="模态框">
				<h4>输入框</h4>
				<Input style={{width:"300px"}} text="姓名" placeholder="请输入姓名" />
				<h4>输入框组</h4>
				<Inputgroup type="search" icon="search" width="400px" placeholder="请输入搜索的内容"/>
			</Modal>
			<Modal title="模态框标题" btnTpl="模态框2" btnType="green active" style={{marginLeft:"50px"}}>
				<h4>下拉框组</h4>
				<Select style={{width:"300px"}} icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} placeholder="单项选择"/>
				<h4>时间日期选框</h4>
				<Datepicker style={{width:"300px"}} type="date" placeholder="请选择日期"/>
			</Modal>
		</div>
		<h2>添加标签</h2>
		<div className="item clearfix">
			<Tags tagArray={['认真','勤奋']}/>
		</div>
		<h2>通知</h2>
		<div className="item clearfix">
			<p onClick={openNotification}>通知</p>
			<p onClick={openNotificationWithIcon}>带图标通知</p>
		</div>
		<h2>消息</h2>
		<div className="item clearfix">
			<p onClick={openMessage}>消息</p>
			<p onClick={openMessageWithIcon}>带图标消息</p>
		</div>
	</div>,
	document.getElementById('container')
);
