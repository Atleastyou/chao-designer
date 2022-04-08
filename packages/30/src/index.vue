<template lang="pug">
  .nav-banner
    .nav-list
      .nav-list-wrapper
        .nav-item(
          v-if="mySwiper"
          v-for="item,index in navgations"
          :class="{'active': mySwiper.realIndex >= item.start && mySwiper.realIndex < item.end}"
          @click="handleClickNav(item)"
        ) {{item.name}}
    .nav-banners.swiper-no-swiping(ref="swiper")
      .swiper-wrapper
        .banner-slide.swiper-slide(v-for="item,index in banners" :key="index" :style="{'background-image': `url(${item.img})`}")
          .swiper-number {{item.number}}/{{item.total}}
</template>

<script>
// 导航
import { getGoodsByCondition } from 'api'
import Swiper from '../../../utils/swiper.min.js'
const demoBanners = [
  { img: 'https://static.chaodp.com/designer/ldgg_1.png' },
  { img: 'https://static.chaodp.com/designer/ldgg_1.png' },
  { img: 'https://static.chaodp.com/designer/ldgg_1.png' }
]
export default {
  name: 'component_30',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          navgations: []
        }
      }
    }
  },
  watch: {
    'options.navgations' (val) {
      this.transformData()
      this.$nextTick(() => {
        if (!this.banners.length) return
        this.mySwiper.update(true)
        this.mySwiper.reLoop()
        this.mySwiper.startAutoplay()
      })
    }
  },
  data () {
    return {
      mySwiper: null,
      sectionId: '30',
      navgations: [],
      banners: []
    }
  },
  methods: {
    transformData () {
      const banners = []
      const navgations = (this.options.navgations && this.options.navgations.length) ? this.options.navgations : [{ name: '导航1', banners: demoBanners }]
      navgations.forEach((nav) => {
        nav.start = banners.length
        nav.end = banners.length + nav.banners.length
        nav.banners.forEach((banner, bannerIndex) => {
          banner.number = bannerIndex + 1
          banner.total = nav.banners.length
        })
        banners.push(...nav.banners)
      })
      this.banners = banners
      this.navgations = navgations
    },
    handleClickNav ({ start }) {
      this.mySwiper.slideTo(start)
    },
    createdSwiper () {
      this.mySwiper = new Swiper(this.$refs.swiper, {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: this.banners.length,
        autoplay: 3000,
        noSwiping: true,
        observer: true,
        onProgress: function (swiper, progress) {
          for (let i = 0; i < swiper.slides.length; i++) {
            let slide = swiper.slides.eq(i)
            let slideProgress = swiper.slides[i].progress
            let scale = 1 - Math.abs(slideProgress) / 12
            let zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
            slide.transform('scale(' + scale + ')')
            slide.css('zIndex', zIndex)
            slide.css('opacity', 1)
            if (Math.abs(slideProgress) > 3) {
              slide.css('opacity', 0)
            }
          }
        },
        onSetTransition: function (swiper, transition) {
          for (let i = 0; i < swiper.slides.length; i++) {
            let slide = swiper.slides.eq(i)
            slide.transition(transition)
          }
        }
      })
    }
  },
  mounted () {
    this.transformData()
    this.$nextTick(() => {
      this.createdSwiper()
    })
  }
}
</script>
<style lang="scss" scoped>
.nav-banner {
  padding: 20px 10px;
  overflow: hidden;
}
.nav-list {
  height: 22px;
  overflow: hidden;
}
.nav-list-wrapper {
  padding: 0 20px;
  overflow-x: auto;
  white-space: nowrap;
}
.nav-item {
  display: inline-block;
  margin-right: 25px;
  font-size: 14px;
  color: #333333;
  line-height: 22px;
  cursor: pointer;
  transition: all .4s;
  &.active {
    font-size: 16px;
    font-weight: 600;
  }
  &:last-child {
    margin-right: 0;
  }
}
.nav-banners {
  margin-top: 12px;
}
.banner-slide {
  position: relative;
  width: 320px;
  height: 402px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px;
}
.swiper-number {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
  color: #fff;
  z-index: 999;
}
</style>
