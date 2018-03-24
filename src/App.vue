<template>
	<div id="app">
		<!-- 主要为了微信分享, 为所有页面注入默认的分享信息 -->
		<wx-share/>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
	}
</script>