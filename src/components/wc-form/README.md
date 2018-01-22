## 表单验证

> 依赖
vux
lodash

> 调用方式
```html
<wc-form v-model="form" ref="form">
	<button @click="save">保存</button>
</wc-form>
```

```javascript
save () {
	let result = this.$refs.form.save();
	...
}
```


> 配置选项
:form 数据
:disabled 是否禁用表单, 即不可编辑状态

> 事件
@send 发送验证码事件



## vux 组件的一些调用方式
* popuppicker 的二级联动, 传递的数据是和地址数据类似的. name,value, parent, 然后要记得
指定 popuppicker 的 column 属性. 否则不会生效的. 





```javascript
联动效果
form: {
	deep: true,
	handler (n) {
		if (n.category.value[0] == 2) {
			n.hello.show = true;
		}
	}
}
```
