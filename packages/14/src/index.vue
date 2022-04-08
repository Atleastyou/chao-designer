<template lang="pug">
.adver
  .adver-content(v-if="!options.advers || !options.advers.length")
    .adver-left
      .adver-item(v-for="item, index in advers", v-if="index === 0", :style="{'background-image': `url(${item.img})`}")
    .adver-right
      .adver-item.adver-right-item(v-for="item, index in advers", v-if="index !== 0", :style="{'background-image': `url(${item.img})`}")
  .adver-content
    .adver-left
      .adver-item(v-for="item, index in options.advers", v-if="index === 0", :style="{'background-image': `url(${item.img || defaultImg})`}")
    .adver-right
      .adver-item.adver-right-item(v-for="item, index in options.advers", v-if="index !== 0", :style="{'background-image': `url(${item.img || defaultImg})`}")
</template>

<script>
// 导航
export default {
  name: 'component_14',
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
        }, {
          img: 'https://static.chaodp.com/designer/bj_shangpin02.png'
        }
      ],
      sectionId: '14'
    }
  }
}
</script>
<style lang="scss" scoped>
.adver-content {
  display: flex;
  padding: 10px 6px;
}
.adver-left {
  width: 50%;
  padding: 0 4px;
}
.adver-right {
  width: 50%;
  padding: 0 4px;
}
.adver-item {
  width: 100%;
  height: 210px;
  border-radius: 7px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &.adver-right-item {
    height: 100px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
