## 基于微信 js-sdk 的图片上传.

## 引用

```html
<wc-upload
	@upload="v=>files.push(v)"
	@del="index=>files.splice(index, 1)"
	:list="previewList"
	:max="9">
</wc-upload>

// 配置说明
upload 方法: 在每次上传成功一张图片, 都会触发, 在这个事件里面把 URL 放到里面即可
del: 就是用户删除的时候, 会把用户当前删掉的 index 给你, 你再删除一遍;
list: 这个一般是在需要初始化渲染的时候才会用, 比如说刚开始的时候列表里面就有几个图
max: 表示用户的最大上传图片数量. 
type: 默认是 list, 可以改成 logo 形式. 
```

```javascript

data () {
	return {
		// 用来存放初始化预览的 list 
		previewList: [],
		// 另外一个用来存放用户上传的list,
	}
}

// 在一个异步的返回之后
	
	this.previewList = res.data;
	this.realFiles = res.data;


```

## 为什么预览不能和真实保存的 list 是同一个 list
因为如果是同一个 list, 那么在你把真实 url 放到 list 里面的时候, 是会影响到预览的. 


## 一些问题
* 有时候你在页面上把 list 给打印出来, 会导致一些无缘无故的 bug, 比如说上传图片不显示
* js-sdk 要升级到 1.2 版本才可以
* 使用背景图模式是不可以的, 必须要使用 img 标签才可以预览.
* 有一个, 微信授权的url, 必须要把 hash 值后面给去掉 
	
	要不然授权挂了, 会出现这么一种现象: 
	用户进入到一个页面, 点击上传按钮, 不能点击
	刷新一下
	点击就有反应了. 

原因分析: 因为没刷新之前的 url 实际上是 land page, 导致即使授权成功也没有用. 


## 要支持一些模式
* 列表类型的图片上传模式  done
* 单个图片的上传模式, 比如 logo 上传 done
* 多个并行的单张图片, 比如上传身份证什么的  done
























