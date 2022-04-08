<template lang="pug">
.adver
  img(:src="options.img || img")
</template>

<script>
// 导航
export default {
  name: 'component_15',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      img: 'https://static.chaodp.com/designer/s_banner_1.png',
      sectionId: '15'
    }
  },
  created () {
    this.options.isValid = true
  }
}
</script>
<style lang="scss" scoped>
.adver {
  width: 100%;
  padding: 10px;
  img {
    width: 100%;
    height: 64px;
  }
}
</style>
