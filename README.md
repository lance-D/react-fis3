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
	tips: 所有自定义标签都可以是单闭合或者双闭合标签
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
				className=''					// class类名 默认已添加input类				text='label'					// input label标题
				placeholder=''				
				isValid						// 是否校验 校验type对应的规则
				icon='arrow-up'			   // 添加icon 				onBlur={func}				   // 失焦回调 				onFocus={func	}				// 获焦回调
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
					readOnly					// 是否只读					className=''				// class类名 默认已添加input类					text='label'				// 按钮文本
					placeholder=''			
					icon='search'				// 按钮icon 					onKeyUp={func}			// 回车触发函数				   onClick={func	}		   // 单击按钮触犯函数
				   onChange={func}			// 值改变触发回调
		/>
		
	示例：
		
		<Inputgroup type="search" icon="search" width="400px" placeholder="请输入搜索的内容"/>
		<Inputgroup type="paste" text='复制链接' value="https://easy.lagou.com/pub" width="600px" readOnly placeholder="请输入搜索的内容" onClick={handlePaste} />
		
```




























