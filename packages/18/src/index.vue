<template lang="pug">
.hot-point
  .placeholder(v-if="!options.cover")
    p.placeholder-title 图片不限
    .placeholder-points
      .placeholder-point 热区1
      .placeholder-point 热区2
  .ad(v-else)
    img.ad-image(:src="options.cover" ref="cover")
    .ad-point(
      v-for="item,index in options.points"
      :style="getStyle(item, index)"
    )
</template>

<script>
// 导航
export default {
  name: 'component_18',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    'options.cover' (cover) {
      if (!cover) return
      const image = new Image()
      image.src = cover
      image.onload = () => {
        this.$nextTick(() => {
          this.imageWidth = this.$refs.cover.width
          this.imageHeight = this.$refs.cover.height
        })
      }
    },
  },
  data () {
    return {
      sectionId: '18',
      imageWidth: 0,
      imageHeight: 0
    }
  },
  methods: {
    getStyle (rect, index) {
      const { width, height, left, top } = rect
      return {
        width: width * this.imageWidth + 'px',
        height: height * this.imageHeight + 'px',
        left: left * this.imageWidth + 'px',
        top: top * this.imageHeight + 'px',
        zIndex: index
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.placeholder {
  width: 100%;
  height: 240px;
  background: #DAE7F4;
  text-align: center;
}
.placeholder-title {
  font-size: 12px;
  color: #FFFFFF;
  padding-top: 33px;
}
.placeholder-points {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.placeholder-point {
  width: 130px;
  height: 130px;
  line-height: 128px;
  background: #F9FBFF;
  border: 1px dashed #DAE7F4;
  font-size: 12px;
  color: #DAE7F4;
  &:first-child {
    margin-right: 20px;
  }
}

.ad {
  width: 100%;
  position: relative;
}
.ad-image {
  width: 100%;
}
.ad-point {
  position: absolute;
}
</style>
