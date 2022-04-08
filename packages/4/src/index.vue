<template lang="pug">
.c-adver
  .c-adver-default(v-if="!options.advers || !options.advers.length")
    .c-adver-default-bd
      .c-icon-image
  .c-adver-content(v-else)
    .c-adver-img(
      v-for="item in options.advers"
      :class="{ 'c-adver-img_margin' : options.isSpace }"
    )
      img(:src="item.img")
</template>

<script>
// 大图广告
export default {
  name: 'component_4',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          isSpace: false,
          advers: []
        }
      }
    }
  },
  data () {
    return {
      sectionId: '4'
    }
  },
  methods: {},
  created () {}
}
</script>
<style lang="scss" scoped>
.c-adver {
  width: 100%;
}
.c-adver-default {
  width: 100%;
  height: 230px;
  padding: 10px 0;
  .c-adver-default-bd {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #DAE7F4;
    .c-icon-image {
      color: #84C4DB;
      font-size: 36px;
    }
  }
}
.c-adver-content {
  padding: 10px 0;
  .c-adver-img {
    width: 100%;
    &.c-adver-img_margin {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
