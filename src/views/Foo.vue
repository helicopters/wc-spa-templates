<style lang="less" scoped>
	
</style>
<template>
	<div class="container">
		<h1>Hello World, Foo</h1>
		<div @click="to">去 Hello</div>
	</div>
</template>
<script>
	export default {
		methods: {
			to () {
				this.$router.push({
					path: '/hello'
				})
			}
		}
	}
</script>
