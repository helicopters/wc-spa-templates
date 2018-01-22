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
            /* 设置当前页面标题*/
            document.title = '授权中...';
            this.fetchUserInfo();
        },
        methods: {
            fetchUserInfo () {
                this.$loading.show('正在授权')
                this.$store.dispatch('auth', {
                    data: {
                        code: utils.parseUrl().code
                    }
                }).then(res=>{
                        this.$loading.hide();
                        if (res.code == 200) {

                            ls.set('token', res.data.token);

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