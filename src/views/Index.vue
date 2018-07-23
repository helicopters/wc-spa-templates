<style lang="less">
  .container {
    // background: red;
    display: flex;
    justify-content: center;
  }
  .icon {
    color: yellow;
    fill: red;
    height: 20px;
  }
</style>
<template>
  <div class="container">
    欢迎
    <Icon name="team" class="icon"/>
  </div>
</template>
<script>
  import qs from 'query-string'
  export default {
    name: 'Index',
    mounted () {
      console.log(process.env.NODE_ENV);


    }
  }
</script>