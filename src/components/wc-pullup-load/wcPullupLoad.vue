<template>
	<div class="wc-up-load">
		<slot/>
	</div>
</template>
<script>
	export default {
		props: {
		},
		data () {
			return {
				isLock: false
			}
		},
		mounted () {
			setTimeout(()=>{
				document.addEventListener('touchmove', this.handler, false);
				document.addEventListener('scroll', this.handler, false);
			},300);
		},
		methods: {
			unlock () {
				this.isLock = false;
			},
			handler () {
				/* 屏幕高度 */
				let screenHeight = document.documentElement.clientHeight;
				/* 文档高度 */
				let pageHeight = document.body.clientHeight;
				/* 文档高度 - 屏幕高度, 就是当前能够滚动的最大高度 */
				let maxScrollHeight = pageHeight - screenHeight;

				
				/* 获取当前滚动条的位置 */
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;


				/* 如果当前滚动条位置已经超过或者大于最大的滚动值, 说明已经超过了 */
				if (scrollTop >= maxScrollHeight - 100 && !this.isLock) {
					this.isLock = true;
					this.$emit('end');
				}
			}
		}
	}
</script>