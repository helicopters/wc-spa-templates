## 表单验证

wc-form 的方便, 依赖于定的数据结构很好. 在渲染和字段映射上面, 不需要再多做处理. 我想你不会
再想着再用那些你写恶心的渲染逻辑的. 真的是太恶心了. 我想想都烦, 写完了一点也不想动. 

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
:mock 是否显示 mock 按钮, 一键生成 mock 数据

> 事件
@send 发送验证码事件



## vux 组件的一些调用方式
* popuppicker 的二级联动, 传递的数据是和地址数据类似的. name,value, parent, 然后要记得
指定 popuppicker 的 column 属性. 否则不会生效的. 

* date 组件的 startDate
startDate: '1970/01/01',
endDate: '2018/01/01'
这玩意不仅仅限制了时间范围, 还控制了时间的样式是什么样子的, 所以你应该给出这样 2018-11-29



## 想做的
1. 获取 is-type 的返回值, 然后提示的更具体一些
2. 能快速渲染出数据出来. 节省我一堆时间多好.  //done












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
