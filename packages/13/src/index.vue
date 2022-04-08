<template lang="pug">
.adver
  .adver-content(v-if="!options.advers || !options.advers.length")
    .adver-item(v-for="item in advers", :style="{'background-image': `url(${item.img})`}")
  .adver-content
    .adver-item(v-for="item in options.advers", :style="{'background-image': `url(${item.img || defaultImg})`}")
</template>

<script>
// 导航
export default {
  name: 'component_13',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          advers: []
        }
      }
    }
  },
  data () {
    return {
      defaultImg: 'https://static.chaodp.com/designer/bj_shangpin02.png',
      advers: [
        {
          img: 'https://static.chaodp.com/designer/bj_shangpin02.png'
        }, {
          img: 'https://static.chaodp.com/designer/bj_shangpin02.png'
        }
      ],
      sectionId: '13'
    }
  }
}
</script>
<style lang="scss" scoped>
.adver-content {
  display: flex;
  padding: 10px 6px;
}
.adver-item {
  width: 50%;
  height: 140px;
  margin: 0 4px;
  border-radius: 7px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
