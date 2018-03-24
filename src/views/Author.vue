<style>
.container {
background: white;
}
</style>
<template>
<div class="container">
</div>
</template>
<script>
export default {
	mounted () {
  		if (ls.get('token')) {
  			history.forward()
  		} else {
  			/* 设置当前页面标题 */
  			document.title = '授权中...'
  			this.fetchUserInfo()
  		}
  	},
  	methods: {
  		fetchUserInfo () {
  			wc.get({
  				path: 'user/wxinfo',
  				params: {
  					code: utils.parseUrl().code
  				}
  			}).then(res => {
  				if (res.code == 200) {
  					ls.set('token', res.data.token)
  					wc.config({
  						headers: {
  							token: ls.get('token')
  						}
  					})
  					this.$router.push({
  						path: ls.get('userWantToPage')
  					})
  				}
  			})
  		}
  	}
}
</script>