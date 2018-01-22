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
    background: rgba(0, 0, 0, .8);
    z-index: 998;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
.wc-popup {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1.185);
    text-align: center;
    overflow: hidden;
    color: #000;
    border-radius: 13px;
    width: 270px;
    display: block;
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
    background: white;
}
</style>
<template>
    <transition name="wc">
        <div class="wc">
            <div class="wc-popup">
                <slot/>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
    }
</script>