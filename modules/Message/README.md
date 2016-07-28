### React Messages 组件说明

#### 全局说明
1、组件是基于 [rc-notification](https://github.com/react-component/notification) ；
2、组件默认是出现1.5s，由配置项 `duration` ,若 `duration:0` 表示不会自动关闭；

### 示例
---
#### 全局方法

- `Messags.success(content,duration,onClose)`
- `Messags.error(content,duration,onClose)`
- `Messags.info(content,duration,onClose)`
- `Messags.warning(content,duration,onClose)`
- `Messags.destroy()`

#### 用法



1、基本用法
```jsx
const openMessage = function (){
	Messages.info('消息内容')
}
ReactDOM.render(<span onClick={openMessage}></span>,node)

```

2、修改出现时间
```jsx
const openMessage = function (){
	Messages.info('消息内容',5)
}
ReactDOM.render(<span onClick={openMessage}></span>,node)

```

3、带关闭回调
```jsx
const openMessage = function (){
	Messages.info('消息内容',5,function(){
		console.log('关闭回调')
	})
}
ReactDOM.render(<span onClick={openMessage}></span>,node)
```
