## 表单验证

必须要使用 vux 来事件

```html
<wc-form v-model="form">
</wc-form>
```


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

















提示 检验 都省却了  
禁用也可以实现  通过替换的形式  
但是形形色色的验证 

{
name
type
value
placeholer
validator
desc 
   max
   min
   ...
}

而且要熟悉的呀

验证就要 循环列表

改值就要改一个地方

返回一个通过验证的 值 对象 
完全可行我觉得

返回一个


初始化要简单

所以还是一个对象包裹对象的形式  
还要有数据
还要支持什么的

反正不会太难




[{}, {}, {}]

{
	content: {},
	xxx: {},
	yyy: {}
}

{
	type: 'text|tel|number|textearea|poppicker|...',
	placeholder: '',
	data: [],
	disabled: ,
	validator: 
	xxx:
}


1. 边框问题
2. 






/*
接受的参数 form

{
	// 这里的字段名就是最终生成的 form 的字段名
	content: {
		type: 'number',
		placeholder: 'xxx',
		name: '',  // 描述当前字段的名称
		value: '' // 当前指向的 vmodel 值. 
		data: poppicker 的渲染值

	},
	,
}

整个的逻辑是这样
1 用户写一份 json 数据,
转换成一个 list
根据 list 渲染表单出来

用户点击保存按钮, 可以有其他更多的按钮
去校验用户的输入值. 给出提示
 
最终 emit 一份对应的表单出来.


流程走的通, 但是渲染呢. 

只要我能保证渲染的时候, 字段都是同样的, 那么渲染就不会很难. 

添加 form 禁用的功能

修改样式等. 


以及强依赖于 vux, 所以组件的引入等也要考虑清楚. 
最终

<wc-form :form="form" :disabled="false">
</wc-form>


1. 带验证码的输入框的那种

      <x-input title="验证码" class="weui-cell_vcode">
        <img slot="right" class="weui-vcode-img" src="https://i.loli.net/2017/09/18/59bf7f32425d5.jpg">
      </x-input>
      <x-input title="发送验证码" class="weui-vcode">
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>

这种通过 slot 的形式

你没有办法把这种带 slot 的东西, 给出来, 普通场景可以实现.
甚至于可以通过增加一种类型来实现. 


   <group title="object options">
      <radio fill-mode fill-label="Other" fill-placeholder="other" :options="radio003" @on-change="change"></radio>
    </group>

    radio 


input.text
input.tel

btn.primary
btn.warn
btn.succes

按钮的多种种类

整个表单的样式是什么样子的, 都是可以被调整的. 

先穷举, 再列出来一份完整的带配置 json
然后设置样式

以及一种带单位的那种 input 形式, 都是要考虑到的. 
图片上传也是. 




// 没做的

x-selector 我觉得完全可以通过 popuppicker 来实现

search 

rater

range 这个是我觉得暂时不需要做的. 比较少用, 你看我这么多次, 都没有用过. 

				<!-- <group> -->
			    <popup-radio
			    	v-if="data.type=='popupradio'" 
					:title="data.name" 
					:options="data.data" 
					v-model="data.value">
			    </popup-radio>
			<!-- </group> -->

picker 我觉得完全可以用 poppicker 替代

inlineCancaler 用 datetime 替代



样式搞完了
然后是所有的元素的所有的属性, 这个是要给一份文档出


依次整理每一个组件的属性, 以及规划所有的给定的值, 我是要给出来一份文档的. 


统一 name value 形式
统一value 都是字符串
给定禁用状态


下面的一些场景
1. 带验证码的形式
2. 上一个为 x 的时候, 下一个再显示. 这个联动的时候. 怎么处理
3. auto-size 这种怎么处理


带验证码的形式, 经常见到. 这个没办法, 只能单独开一份 code 的形式.

但是通过定制的方式, 这种就不太好处理, 我的意思是扩展性不会很高. 扩展性不高的. 
能不能直接就是说, 单独一份代码, 也不用 if 或者 list, 不能, 

扩展性以后再说吧. 

还有表单有一些默认的字段, 比如说 type, 以及一些不能放到表单里面的, 比如说 logo 什么的. 

列表项目的某一个选项, 依赖于另外一个项目的某一个值的存在才存在的. 
这个我们可以控制, 为每一个选项都设置一个值, 然后设置一个 on-change 事件, 这样我们就可以动态的去改
数组的数据了. 

我觉得还是让用户自己来加比较好. 但是用户自己加的话, 是不能预先固定位置的. 这个要想清楚了. 

联动显示不好处理啊. 用户可以声明吗, 如果可以的话, 我们
我觉


1. 组件不需要为用户的错误传递参数的形式买单
2. 不应该做容错处理的

3. 

好像处理已经结束了, 日, 我还没明白到底怎么回事啊. 就结束了. 这个到底是什么情况呢. 
我需要整理一下这块的代码是怎么个情况. 

反正我是觉得, 有点奇怪, 自己还是没有思考好的这块. 


我们的需求, 等以后再说, 但是这里的显示隐藏

按钮的禁用状态, 在所有的 required 字段都有值的场景下, 



反思一下为毛走错路了. 这个是有问题的, 走错导致自己夺走了合理









