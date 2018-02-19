<style lang="less" scoped>
@import '../../less/color.less';
.wc-tabbar-container {
	height: .5rem;
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-around;
	background: white;

	position: fixed;
	bottom: 0;
	box-shadow: 0 0 10px rgba(0,0,0,0.2);

	z-index: 100;

	.item {
		.icon {
			margin: 0 auto;
			display: block;

		}
		.text {
			text-align: center;
			font-size: 12px;
			margin-top: 2px;
		}
	}

	.active {
		// background: red;
		color: @sub-active;
		.icon {
			fill: @sub-active;
		}
	}
}	
</style>
<template>
	<div class="wc-tabbar-container">
		<div class="item" v-for="(value, key) in list" :key="key" :class="{'active': curIndex == key}" @click="fn(value, key)">
			<icon :name="value.name" class="icon"/>
			<p class="text">{{value.text}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Tabbar',
		data () {
			return {
				list: [{
					name: 'home',
					text: '会员商城',
					path: '/home'
				}, {
					name: 'category',
					text: '分类',
					path: '/category'
				},  {
					name: 'jifen',
					text: '积分商城',
					path: '/integralmall'
				},{
					name: 'car',
					text: '购物车',
					path: '/car'
				},{
					name: 'fenxiao',
					text: '分销',
					path: '/fenxiao'
				},{
					name: 'usercenter',
					text: '个人中心',
					path: '/usercenter'
				}],
				curIndex: -1
			}
		},
		mounted () {
			/* 设置进来的时候谁是 active 状态 */
			this.init();
		},
		methods: {
			init () {
				// console.log(this.$route.path);
				let curRoute = this.$route.path;

				this.list.forEach((item, index)=> {
					if (item.path == curRoute) {
						this.curIndex = index;
					}
				});
			},
			fn (value, index) {
				/* 当前点击的是已经是 active 的页面 */
				if (this.curIndex == index) {

				} else {
					this.curIndex = index;
					this.$router.push({
						path: value.path
					})
				}
			}
		}
	}
</script>