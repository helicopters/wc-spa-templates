<style lang="less">
  .container {
    // background: red;
    // display: flex;
    // justify-content: center;
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
    <van-switch v-model="checked" />
    <van-picker :columns="columns" @change="onChange" />
  </div>
</template>
<script>
  import qs from 'query-string'
  export default {
    name: 'Index',
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      checked: true
    };
  },
  methods: {
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    }
  },
    mounted () {
      console.log(process.env.NODE_ENV);


    }
  }
</script>