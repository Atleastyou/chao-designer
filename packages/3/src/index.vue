<template lang="pug">
.c-banner
  .c-banner-default(v-if="!options.banners || !options.banners.length")
    .c-banner-default-bd(:style="{ 'height': `${options.size}px` }")
      .c-icon-image
  .c-banner-contnet(v-else)
    .swiper-container-3.swiper-no-swiping(:style="{ 'height': `${options.size + 20}px` }")
      .swiper-wrapper
        .banner-slide.swiper-slide(v-for="item in options.banners")
          .banner-slide-img(:style="{'background-image': `url(${item.img})` }")
      .my-swiper-pagination
</template>

<script>
// 轮播广告
import Swiper from '../../../utils/swiper.min.js'
export default {
  name: 'component_3',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          size: 100,
          banners: []
        }
      }
    }
  },
  watch: {
    'options.banners' (val) {
      if (this.options.banners && this.options.banners.length) {
        this.$nextTick(() => {
          if (this.mySwiper) {
            this.mySwiper.update()
            this.mySwiper.startAutoplay()
          } else {
            this.createdSwiper()
          }
        })
      }
    }
  },
  data () {
    return {
      mySwiper: null,
      sectionId: '3'
    }
  },
  methods: {
    createdSwiper () {
      this.mySwiper = new Swiper('.swiper-container-3', {
        autoplay: 3000,
        noSwiping: true,
        observer:true,
        pagination: '.my-swiper-pagination'
      })
    }
  },
  mounted () {
    if (this.options.banners && this.options.banners.length) this.createdSwiper()
  },
  created () {
    if (!this.options || !this.options.size) this.options.size = 100
  }
}
</script>
<style lang="scss">
.my-swiper-pagination {
  .swiper-pagination-bullet {
    width: 4px;
    height: 4px;
    margin: 0 2px;
    background: #FFFFFF;
    border-radius: 50%;
    &.swiper-pagination-bullet-active {
      width: 8px;
      background: #FFBE28;
      border-radius: 2px;
    }
  }
  
}
</style>
<style lang="scss" scoped>
.c-banner {
  width: 100%;
}
.swiper-container-3 {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}
.c-banner-default {
  width: 100%;
  padding: 10px;
  .c-banner-default-bd {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #DAE7F4;
    border-radius: 10px;
    .c-icon-image {
      color: #84C4DB;
      font-size: 36px;
    }
  }
}
.swiper-container {
  height: 100px;
}
.banner-slide {
  padding: 10px;
  box-sizing: border-box !important;
  .banner-slide-img {
    width: 100%;
    height: 100%;
    background: #DAE7F4;
    border-radius: 10px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
.my-swiper-pagination {
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  z-index: 2;
}
</style>
