<style lang="less" scoped>
@import '../less/mixins.less';

.container {
	display: flex;
	flex-wrap:wrap;
	justify-content:space-around;
	.item {
		margin-top: 20px;
		height: 100px;
		width: 100px;
		flex-shrink:0;
		// background: red;

		display: flex;
		align-items:center;
		justify-content:center;
		color:white;
		font-size: 20px;
		flex-direction:column;

		input {
		    width: 100%;
		    font-size: 21px;
		    /* display: none; */
		    // background: red;
		    outline: none;
		    border: none;
		    color: white;
		    text-align: center;			
		}
	}
}
</style>
<template>
	<div class="container">
		<div class="item" v-for="(value, key) in color" :key="key" :style="{'backgroundColor': value}">
			<p>{{value}}</p>

			<input type="text" contenteditable="true" @click="fn" :value="'.c('+value + ')'"  :style="{'backgroundColor': value}">
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				color: [
					'red',
					'#333'
				]
			}
		},
		mounted () {
			document.title = '颜色表达页面';
		},
		methods: {
			fn (e) {
				// e.target.select();
				// console.log(e.target)
				var dom = e.target;
				// document.querySelc
				dom.select();
				document.execCommand("Copy");
				// console.log(dom.onselect)
				  // var Url2=document.getElementById("biao1");  
				  // Url2.select(); // 选择对象  
				   // 执行浏览器复制命令  
				  // alert("已复制好，可贴粘。"); 

			}
		}
	}
</script>
