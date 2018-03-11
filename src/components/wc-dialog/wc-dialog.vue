<style lang="less" scoped>
.wc-enter {
    opacity: 0;
    .wc-popup {
        transform: translate3d(-50%, -50%, 0) scale(1.185);
    }
}
.wc-enter-active, .wc-leave-active {
    transition: all .4s;
    .wc-popup {
        transition: all .4s;
    }
}
.wc-leave-active {
    opacity: 0;
}  
.wc {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .75);
    z-index: 998;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);


}

/* 内部的弹窗内容 */
.wc-popup {
    position: fixed;

    top: 50%;
    left: 50%;

    overflow: hidden;


    display: block;
    transform: translate3d(-50%, -50%, 0) scale(1);

}
</style>
<template>
    <transition name="wc">
        <div class="wc" v-if="isShow">
            <div class="wc-popup">
                <slot/>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                isShow: false
            }
        },
        methods: {
            show () {
                this.isShow = true;
            },
            hide () {
                this.isShow = false;
            }
        }
    }
</script>