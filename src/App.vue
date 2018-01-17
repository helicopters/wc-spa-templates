<template>
	<div id="app">
		<router-view></router-view>
		<group>
			<cell> title</cell>
			<x-textarea/>
		</group>

	</div>
</template>
<script>
	import {Group, Cell, XTextarea} from 'vux'
	export default {
		name: 'app',
		components: {
			Group,
			Cell,
			XTextarea
		}
	}
</script>