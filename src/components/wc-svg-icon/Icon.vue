<style lang="less" scoped>
/* 为防止样式冲突, 给样式改了 class名*/
.wc-spinner {
  -webkit-animation: wc-spinner 2s infinite linear;
  animation: wc-spinner 2s infinite linear;
}

@-webkit-keyframes wc-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes wc-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

</style>
<template>
	<svg version="1.1" :width="width ? width : _width" :height="height ? height: _height" :viewBox="box" :class="animationMap">
		<path :d="path.d" :fill="fill ? fill: path.fill" :stroke="path.stroke" v-for="path in icon.paths"/>
	</svg>	
</template>
<script>
	import convert from './utils/parse'

	export default {
		props: ['name', 'fill', 'height', 'width', 'animation'],
	    computed: {
			normalizedScale() {
				let scale = this.scale;
				scale = typeof scale === 'undefined' ? 1 : Number(scale);
				if (isNaN(scale) || scale <= 0) {
					console.warn(`Invalid prop: prop "scale" should be a number over 0.`, this);
					return 1;
				}
				return scale
			},

			icon() {
				/* ## 路径配置在这里 */
				let xml = require(`!xml-loader!../../assets/${this.name}.svg`);
				const t = xml.svg.$.viewBox.split(' ');
				return {
					width: t[2],
					height: t[3],
					paths: convert.SVGtoArray(xml.svg)
				}
			},
			box() {
				return `0 0 ${this.icon.width} ${this.icon.height}`
			},
			_width() {
				return this.icon.width / 56 * this.normalizedScale
			},
			_height() {
				return this.icon.height / 56 * this.normalizedScale
			},
			animationMap () {
				let map = {
					'rotate': 'wc-spinner'
				}
				return map[this.animation]
			}
	    }
	}
</script>