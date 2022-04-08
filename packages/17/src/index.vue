<template lang="pug">
.adver
  .adver-bg(:style="{ 'background-image': `url(${options.cover ? options.cover : img})` }")
    img(src="https://static.chaodp.com/designer/play.png")
    .adver-text VR播放
    .adver-name(v-if="options.cover") {{options.title}}
</template>

<script>
// 导航
export default {
  name: 'component_17',
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
      img: '',
      sectionId: '17'
    }
  },
  created () {}
}
</script>
<style lang="scss" scoped>
.adver {
  width: 100%;
  padding: 10px;
  .adver-bg {
    position: relative;
    width: 100%;
    height: 253px;
    border-radius: 12px;
    background-color: #DAE7F4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .adver-text {
    margin-top: 8px;
    font-size: 14px;
    color: #FFFFFF;
  }
}
.adver-name {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-radius: 0 0 12px 12px;
  background-image: linear-gradient(-180deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.67) 100%);
  padding: 10px;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 20px;
}
</style>
