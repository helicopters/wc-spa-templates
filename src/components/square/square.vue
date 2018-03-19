<style scoped lang="less">
.out-box {
	height: 0;
	position: relative;
	.inner-box {
		position: absolute;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		.end-box {
			height: 100%;
			width: 100%;
		}
	}
}	
</style>
<template>
	<div class="out-box" ref="box">
		<div class="inner-box">
			<div class="end-box">
				<slot/>
			</div>
		</div>
	</div>	
</template>
<script>
/*
	这玩意只是一个容器, 所以不要在它上面设置一些样式, 包括你想要给他设置
	背景图什么的. 应该这样用: 

	<square size="33%">
		<div class="content">
		</div>
	</square>
*/
	export default {
		name: 'Square',
		props: {
			size: ''
		},
		mounted () {
			if (!this.size) {
				throw new Error('Square: 没给 size');
			}
			this.$refs.box.style.width = this.size;
			this.$refs.box.style.paddingBottom = this.size;
		}
	}
</script>