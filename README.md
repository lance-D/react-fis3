#基于FIS3的react简单解决方案


### 使用方法

```
	1. git clone or dowload
	2. npm install -g fis3
	3. npm install
	4. fis3 release
	5. fis3 server start
```
###组件用法、解释
	tips: 所有自定义标签都可以是单或双标签
####按钮
```
	源码解析：
	
		<Button
			className='green'   // 类名，默认样式为btn --> 编译后为  class="btn green"
			onClick={callback}  // 单击按钮回调函数
			disabled				// 布尔值、是否禁用按钮
			text='按钮'			// 按钮文本
		/>
	
	示例：
		
		<Button>btn</Button>
		<Button className="green">green</Button>
		<Button className="red" text="red"/>
```
####复选框
```
	源码解析：
		
		<Checkbox 
			inline  			// 布尔值 是否是行内元素
			readOnly			// 布尔值 是否禁用
			checked			// 布尔值 是否默认选中
			text='复选框'		// string 复选框label 文本
			onChange={func}	// function 复选框值变化触发函数
		/>
	
	示例：
	
		<Checkbox text="复选框" inline/>
		<Checkbox text="默认选中的复选框" checked inline />
		<Checkbox text="默认选中只读复选框" checked readOnly inline />
		<Checkbox text="回调函数" onChange={handleClick} />  
```
####复选框组
```
	源码解析：
		
		<Checkboxgroup 
			inline  			// 布尔值 是否是行内元素
			readOnly			// 布尔值 是否禁用
			value='china'		// string 默认选中某一项、或者几项 用sep分割
			sep=','			// value 分割符 默认为逗号
			data={[...]}		// 数组 可以是 单数组 也可以是键值对
			onClick={func}	// function 复选框值变化触发函数
		/>
	
	示例：
	
		<Checkboxgroup data={[{"value":"China","text":"中国"},{"value":"Japan","text":"日本"},{"value":"KoreaC","text":"韩国"}]}
		 				  value="China" 
		 				  inline 
		 				  onClick={handleClick}
		/>
		<Checkboxgroup data={["中国","日本","韩国"]}
		 				  value="中国|日本" 
		 				  sep="|"
		 				  inline 
		 				  onClick={handleClick}
		/>
```

####输入框
```
	源码解析：
	
		<Input type='username|mail|phone|password' // type 非必填也可以是已列出的选项，与isValid配合使用
				required 						// 是否必填
				readOnly						// 是否只读
				className=''					// class类名 默认已添加input类
				text='label'					// input label标题
				placeholder=''				
				isValid						// 是否校验 校验type对应的规则
				icon='arrow-up'			   // 添加icon
				onBlur={func}				   // 失焦回调
				onFocus={func}				// 获焦回调
				onChange={func}				// 值改变触发回调
		/>
		
	示例：
		
		<Input type='username' className='demo_item fl' text="用户名" placeholder="请输入正确的用户名"  isValid />
		<Input type='mail' text="邮箱" className='demo_item fl' placeholder="请输入正确的邮箱"  isValid />
		<Input type='mail' text="邮箱(必填)" className='demo_item fl' placeholder="请输入正确的邮箱，必填项" required isValid />
```
####输入框组
```
	源码解析：
	
		<Inputgroup type='search' 			// type 非必填也可以是已列出的选项，与isValid配合使用
					required 				   // 是否必填
					readOnly					// 是否只读
					className=''				// class类名 默认已添加input类
					text='label'				// 按钮文本
					placeholder=''			
					icon='search'				// 按钮icon
					onKeyUp={func}			// 回车触发函数
					onClick={func}		   // 单击按钮触犯函数
				   onChange={func}			// 值改变触发回调
		/>
		
	示例：
		
		<Inputgroup type="search" icon="search" width="400px" placeholder="请输入搜索的内容"/>
		<Inputgroup type="paste" text='复制链接' value="https://easy.lagou.com/pub" width="600px" readOnly placeholder="请输入搜索的内容" onClick={handlePaste} />
		
```
####下拉框
```
	源码解析：
	
		<Select icon="arrow-down" 			        // 下拉图标
				data={['选项一','选项二','选项三']}   // 下拉数据组成的数组
				className="demo_item fl"           // class类 默认为select
				placeholder="单项选择"              // placeholder
				defaultValue=""                    // 默认选中某项 仅用于单选下拉框
				mult							        // 布尔值 是否多选
				onSelected={func}                  // 选择回调
		/>
	
	示例：
	
		<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} className="demo_item fl" placeholder="单项选择" defaultValue=""/>
		<Select icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} mult className="demo_item fl" placeholder="多项选择" defaultValue="" onSelected={hanleSelected}/>
```
####日期时间选框
```
	源码解析：
		
		<Datepicker style={{width:"365px"}} 
						type="date"  			        // 默认为日期时间选框 type="date|time"
						className="demo_item fl" 
						placeholder="请选择日期"
						step="30"				        // 时间间隔						timeStart="9"	              // 开始时间 24小时制，超过无效，且开始应小于结束
						timeEnd="17"	              // 结束时间 24小时制，超过无效，且开始应小于结束
						format="yyyy-MM-dd"	       // 时间格式 默认为'yyyy-MM-dd HH:mm'
						lang="EN|CN"		           // 中英文 不区分大小写			
		/>
	
	示例：
		<Datepicker style={{width:"365px"}} type="date"  className="demo_item fl" placeholder="请选择日期"/>
		<Datepicker style={{width:"365px"}} className="demo_item fl" placeholder="请选择日期时间" step="30" timeStart="9" timeEnd="19" />
```
####确认框
```
	源码解析：
		
		<Confirm 
			text="这是一个确认框，确认框带title,触发元素为text(默认)"   // 确认框主体信息
			className="demo_item" 
			title="确认信息" 					                        // 确认框标题
			btnType="text|icon|btn"	                              // 触发确认框类型 默认为text
			btnTpl="点击弹出确认框"                                 // 触发确认框文本与btnType对应 如btnType="icon" btnTpl="arrow-down"
			handleOK={func}                                      // 确认按钮触发函数
			handleCancel={func}                                  // 单击关闭或者取消触发函数
			clickOutClose                                        // 布尔值 点击空白处是否关闭确认框
		/>
	
	示例：
	
		<Confirm text="这是一个确认框，确认框带title,触发元素为text(默认)" className="demo_item" title="确认信息" btnTpl="点击弹出确认框" handleOK={handleOK} clickOutClose />
		<Confirm text="这是一个确认框，确认框但不带标题,修改btnType来触发确认框,如icon，btn" className="demo_item" btnType="icon" btnTpl="candidate" handleOK={handleOK}/>
```
####模态框
```
	源码解析：
	
		<Modal 
			title="模态框标题"           // 模态框标题
			btnType="text|icon|btn"    //  触发确认框类型 默认为text
			btnTpl="模态框"             //  触发确认框文本与btnType对应 如btnType="icon" btnTpl="arrow-down"  必填项
			className=""
			hasCancelBtn				    // 是否含取消按钮
			cancelText="取消"           // 如果hasCancelBtn为true 设置取消按钮文本为cancelText，默认为“取消”
			okText="确定"               // 确认按钮文本 默认为确定
			handleClose                // 布尔值 单击空白处是否关闭模态框框
			handleOK={func}		       // 单击确定触发函数
			handleClose={func}         // 单击关闭或者取消触发函数
		/>
	
	示例：
		
		<Modal title="模态框标题" btnTpl="模态框">
			这里放模态框内容
		</Modal>
		
		<Modal title="模态框标题" btnTpl="模态框">
			<h4>输入框</h4>
			<Input style={{width:"300px"}} text="姓名" placeholder="请输入姓名" />
			<h4>输入框组</h4>
			<Inputgroup type="search" icon="search" width="400px" placeholder="请输入搜索的内容"/>
		</Modal>
		
		<Modal title="模态框标题" btnTpl="模态框2" btnType="green active" style={{marginLeft:"50px"}}>
			<h4>下拉框组</h4>
			<Select style={{width:"300px"}} icon="arrow-down" data={['选项一','选项二','选项三','选项四','选项五','选项六','选项七']} placeholder="单项选择" defaultValue=""/>
			<h4>时间日期选框</h4>
			<Datepicker style={{width:"365px"}} type="date" placeholder="请选择日期"/>
		</Modal>
```























