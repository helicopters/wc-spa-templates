## 上拉加载

## 引入方式
```shell
npm i wc-pullup-load --save-dev

import wcPullupLoad from 'wc-pullup-load'
Vue.use(wcPullupLoad);
```

## 使用方式
```html
<wc-pullup-load ref="p" @end="more"/>

不需要用这个组件包裹列表.
它只是起了一个代码容器的效果.

在每次加载结束之后, 需要手动解锁一下:
this.$refs.p.unlock();
```


## 问题
* 在多个 tab 都存在 offset 的时候怎么办, 
维护多个 offset, 而不是使用多个 wc-pullup-load, 这个需要注意下. 








1. 只是需要一个地方可以容纳一下监听效果而已,


1. 这个玩意, 只是一段代码需要有地方使用而已. 而且需要一个回调而已. 所以做一个 mixins, 不是更好吗. 
还是组件的形式吧. 然后可以加上一个默认的效果, lock 效果也可以去掉. 

2. 然后还有, lock 这个操作, 不想要了. 真的好难啊. 

多个tab切换的时候, 需要不同的触发事件还是就一个触发事件呢. 

可能引入的方式就是这样

<wc-pullup-load ref="pullup" @end="more"/>

然后就可以使用了. 

