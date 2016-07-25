### React Notification 组件说明

#### 全局说明
1、组件是基于 [rc-notification](https://github.com/react-component/notification) ；
2、组件默认是出现4.5s，由配置项 `duration` ,若 `duration:0` 表示不会自动关闭；

### 示例
---
#### 全局方法

- `Notification.success(config)`
- `Notification.error(config)`
- `Notification.info(config)`
- `Notification.warning(config)`
- `Notification.close(key: String)`
- `Notification.destroy()`


#### 全局配置
config 参数如下：

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ----------- |--------|
| title    | 通知提醒标题，必选                                 | React.Element or String      | 无     |
| message | 通知提醒内容，必选                                | React.Element or String      | 无     |
| key        | 当前通知唯一标志                                   | String      | 无     |
| onClose    | 点击默认关闭按钮时触发的回调函数                     | Function    | 无     |
| duration   | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭         | Number    | 4.5     |

1、基本用法
```jsx
const openNotification = function (){
	Notification.open({
		title:'标题',
		message:'这是通知内容'
	});
}
ReactDOM.render(<span onClick={openNotificationWidthIcon}></span>,node)

```

2、带图标的通知,共有四种带图标样式`[success,info,warning,info]`，默认 `info`
```jsx
const openNotification = function (type){
	return (
		Notification[type]({
			title:'标题',
			message:'这是通知内容'
		});
	)
}
ReactDOM.render(<span onClick={openNotificationWidthIcon}></span>,node)

```

3、带callback，需要说明的是，key必需是有且唯一的
```jsx
const openNotification = function (){
	const key = `${new Date().getTime()}`;
	const closeNotify = function (){
		console.log('这是里回调操作');
	};
	Notification.open({
		title:'标题',
		message:'这是通知内容',
		duration: 3,
		key,
		onClose:closeNotify
	});

}
ReactDOM.render(<span onClick={openNotification}></span>,node)
```
