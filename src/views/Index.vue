<style lang="less">
  .container {
    background: red;
    display: flex;
    justify-content: center;
  }
</style>
<template>
  <div class="container">
    欢迎
  </div>
</template>
<script>
  export default {
    name: 'Index',
    mounted () {
      console.log(process.env.NODE_ENV)
    }
  }
</script>