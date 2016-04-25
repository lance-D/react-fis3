'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Button,Radiogroup,Checkbox,Checkboxgroup,Icon,Input,Inputgroup,Select} from  '../components/main'
let handleClick =  function(){
	// handle click
	console.log('回调函数');
}

let handlePaste = function(e){
	console.log('处理粘贴的回调');
}

let hanleSelected = function (e){
	console.log('select 回调函数,你选择的是:'+e.currentTarget.innerText);
}

ReactDOM.render(
	<div className="main">
		<h2>按钮</h2>
		<div className="item">
			<Button>btn</Button>
			<Button className="btn_green">green</Button>
			<Button className="btn_red">red</Button>
			<Button className="btn_green" disabled>disabled</Button>
			<Button className="btn_green btn_active">green active</Button>
			<Button className="btn_red btn_active">red active</Button>
			<Button className="btn_green btn_link">link</Button>
		</div>
		<h2>带图标按钮</h2>
		<div className="item">
			<Button className="btn_green btn_active"><Icon icon="yes"/>通过</Button>
			<Button className="btn_green btn_active"><Icon icon="no"/>拒绝</Button>
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
			<h4>带label的input</h4>
			<div className= 'clearfix'>
				<Input style={{width:"300px"}} text="姓名" placeholder="请输入姓名" className='demo_item fl'/>
			</div>
			<h4>带验证的input</h4>
			<div className= 'clearfix'>
				<Input text="必填"  className='demo_item fl' placeholder="必填项" required/>
				<Input type='username' className='demo_item fl' text="用户名" placeholder="请输入正确的用户名"  isValid />
				<Input type='mail' text="邮箱" className='demo_item fl' placeholder="请输入正确的邮箱"  isValid />
				<Input type='mail' text="邮箱(必填)" className='demo_item fl' placeholder="请输入正确的邮箱，必填项" required isValid />
				<Input type='phone' text="手机" className='demo_item fl' placeholder="请输入正确的手机号码"  isValid />
				<Input type='password' text="密码" className='demo_item fl' placeholder="请输入6-16位密码"  isValid />
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
		<h2>下拉框</h2>
		<div className="item clearfix">
			<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} className="demo_item fl" placeholder="单项选择" defaultValue=""/>
			<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} mult className="demo_item fl" placeholder="多项选择" defaultValue="" onSelected={hanleSelected}/>
		</div>
	</div>,
	document.getElementById('container')
);
