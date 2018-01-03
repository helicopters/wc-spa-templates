## wc-svg-icon
基于 Vue & SVG 的 icon 解决方案

## 感谢
[vue-svg-icon](https://github.com/cenkai88/vue-svg-icon)
项目中对 SVG 进行解析的代码, 直接从上面的项目中拿过来用的, 感谢.

[Font-Awesome](https://github.com/FortAwesome/Font-Awesome)
动画效果来自于它. 

## Install
```shell
npm i wc-svg-icon --save-dev

// main.js
import Icon from 'wc-svg-icon';
import 'wc-svg-icon/style.css';
Vue.use(Icon);

备注: style.css 不强制要求引入, 不引入也可以正常运行, 只是 animation 参数无效.
```


## Usage
```javascript
<icon name="xxxx"/>

这里的 'xxxx' 是你给定的 SVG 图标的名称. 比如说你现在有 10 个 SVG 图标, 你需要做的事情是:
1. 在 node_modules 里面找到 wc-svg-icon 目录
2. 把这 10个图标, 拷贝到 wc-svg-icon 目录中.
```


## Config
icon 组件接受以下 props 配置选项:

```shell
name:	图标的名称, 需要和 SVG 名相同, 不需要带路径.比如:
<icon name="hello"/>

fill:	SVG 图标的 fill 颜色, 默认会使用 SVG 原本的颜色, 如果你传递了 fill 属性, 则会使用你所传递的.比如:
<icon name="hello" fill="red"/> // 此时图标会呈现 red 色. 

height:	控制 SVG 图标的高度
width:	控制 SVG 图标的宽度

当然你也可以通过为 <icon> 添加 class 的方式来设置 SVG 的样式. 
<icon class="foo"/>
之所以把 fill, height, width 单独提出来是因为这些对我而言经常用到.

animation:	设置图标的动画效果, 比如:
<icon animation="rotate"/>
... 当前只支持一种效果, 就是 rotate(旋转).
其实这个玩意有点鸡肋, 建议如果需要 animation 效果的同学, 可以直接自己写 animation 或者引入 animate.css
然后这样:
<icon class="animated bounce"/>
```


## 一些问题
> 后续会不断的添加一些默认的 SVG icon, 由于打包的时候没有引入的icon 不会打包进项目, 所以icon的个数
不会影响到打包的体积大小. 

> 如果你是希望将本项目直接拷贝到自己的项目中使用
* 拷贝 src/wc-svg-icon 目录
* 安装 xml-loader 依赖:
```shell
npm i xml-loader --save-dev
```
* 所有的图标放在 wc-svg-icon/icons 下即可. 
















