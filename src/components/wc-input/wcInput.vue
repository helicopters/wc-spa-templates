<style lang="less">
.wc-transition-box {
  /* 这个如果是 fixed 的布局 focus 没有办法聚焦*/
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  transform: translate(0,100%);
  transition: transform 300ms;
  display: none;
}
.transition-init {
  display: block;
}
.transition-diff {
  transform: translate(0,0);
}
  .wc-input-box {
    width: 100%;
    background: white;
    .wc-textarea {
      height: 180px;
      outline: none;
      border:none;
      resize:none;
      width: 100%;
      padding: 15px 18px;
      box-sizing: border-box;
      color:#333;
      font-size: 16px;
      border-radius: 0;
      display: block;
    }
  }
  .btn-bar {
    display: flex;
    align-items:center;
    justify-content:flex-end;
    height: 45px;
    .btn {
      font-size: 16px;
      margin-right: 25px;
    }
    .btn-cancel {
      color: #999;
    }
    .btn-success {
      margin-right: 15px;
      height: 30px;
      width: 75px;
      display: flex;
      background: #3773f7;
      color:white;
      border: 1px solid #3773f7;
      align-items:center;
      justify-content:center;
      // color:#3773f7;
      border-radius: 6px;
    }
  }
</style>
<template>
    <div class="wc-transition-box" @touchmove.prevent="m" ref="mask" @click="cancel">
      <div class="wc-input-box" @click.stop="fn">
        <textarea class="wc-textarea" v-model="inputVal" :placeholder="placeholder">
        </textarea>    
        <div class="btn-bar">
          <div class="btn btn-cancel" @click="cancel">取消</div>
          <div class="btn btn-success" @click="comment">评论</div>          
        </div>
      </div>
    </div>
</template>
<script>

  /* 进入 */
  function transitionEnter (el, init, diff) {
    el.classList.add(init);
    setTimeout(()=>{
      el.classList.add(diff);
    }, 50);
  }
  /* 离开 */
  function transitionLeave (el, init, diff) {
    el.classList.remove(diff);
    let handler = ()=>{
      el.classList.remove(init);
      el.removeEventListener('transitionend', handler, false);
    }
    el.addEventListener('transitionend', handler, false);
  }
  let _scrollTop = 0;
  export default {
    name: 'App',
    data () {
      return {
        inputVal: ''
      }
    },
    props: ['placeholder'],
    watch: {
      value (v) {
        if (v) {
          this.show();
        } else {
          this.hide();
        }
      }
    },
    methods: {
      fn () {},
      m (e) {
        e.preventDefault();
      },
      /* 隐藏 */
      hide () {
        transitionLeave(this.$refs.mask, 'transition-init', 'transition-diff');
        /*恢复滚动位置*/
        document.body.scrollTop = _scrollTop;
      },
      /* 显示 */
      show () {
        /* 动画 */
        transitionEnter(this.$refs.mask, 'transition-init', 'transition-diff');
        /* 聚焦 */
        document.querySelector('.wc-textarea').focus();
        /* 保存 scrollTop */
        _scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      },
      cancel () {
        this.inputVal = '';
        this.hide();
      },
      comment () {
          this.hide();
          this.$emit('comment', this.inputVal);
      }
    }
  }
</script>