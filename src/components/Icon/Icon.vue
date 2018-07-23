<template>
	<svg 
    version="1.1" 
    :width="width ? width : _width" 
    :height="height ? height: _height" 
    :viewBox="box" 
    @click="fn">
		<path 
      :d="path.d" 
      :fill="fill ? fill : path.fill" 
      :stroke="path.stroke" 
      v-for="path in icon.paths"/>
	</svg>	
</template>
<script>
  import convert from './utils/parse'
  export default {
    props: ['name', 'fill', 'height', 'width'],
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
      }
    },
    methods: {
      fn() {
        this.$emit('click')
      }
    }
  }
</script>