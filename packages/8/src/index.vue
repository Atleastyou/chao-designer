<template lang="pug">
.goods
  .goods-header
    .goods-title
      p {{options.title || '模块标题'}}
      .goods-tag {{options.subtitle || '低价抢购'}}
    .goods-more
      span 更多
      .c-icon-right
  .goods-list.swiper-container-8.swiper-no-swiping
    .swiper-wrapper
      .goods-item.swiper-slide(v-for="item,index in list")
        .goods-img(:style="{'background-image': `url(${item.original_img})`}")
        .goods-price
          span.price_red ¥{{item.shop_price}}
          span.price_default ¥{{item.market_price}}
        .goods-name {{item.joiner_num}}人拼团
  .swiper-pagination-8
</template>

<script>
import { getGoodsByCondition } from 'api'
import swiper from '../../../utils/swiper.min.js'
export default {
  name: 'component_8',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: ''
        }
      }
    }
  },
  watch: {
    'options.source.id' (val) {
      if (val) this.getGroupGoods()
    }
  },
  data () {
    return {
      swiper: null,
      list: [
        { goods_name: '商品1', shop_price: '99', market_price: '199', joiner_num: 0, original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', joiner_num: 0, original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', joiner_num: 0, original_img: '//static.chaodp.com/designer/bj_shangpin04.png' }
      ]
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.list = data
        this.$nextTick(() => {
          this.swiper && this.swiper.update()
        })
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  mounted () {
    this.swiper = new Swiper('.swiper-container-8', {
      pagination: '.swiper-pagination-8',
      slidesPerView: 3,
      slidesPerGroup: 3,
      paginationClickable: true,
      noSwiping: true,
      autoplay: 3000,
      spaceBetween: 7
    })
  },
  created () {
    if (this.options && this.options.source && this.options.source.id) this.getGroupGoods()
  }
}
</script>
<style lang="scss" scoped>
.goods {
  background: #FFFFFF;
}
.goods-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.goods-title {
  display: flex;
  align-items: flex-end;
  p {
    font-size: 17px;
    line-height: 19px;
    color: #333333;
    font-weight: 600;
  }
  .goods-tag {
    font-size: 12px;
    color: #fff;
    margin-left: 5px;
    min-width: 50px;
    padding: 0 4px;
    height: 17px;
    line-height: 17px;
    text-align: center;
    background-image: linear-gradient(-270deg, #FE4A21 0%, #FF8529 100%);
    border-radius: 3px;
  }
}
.goods-more {
  display: flex;
  align-items: center;
  color: #999999;
  font-size: 12px;
  cursor: pointer;
  .c-icon-right {
    margin-left: 5px;
    font-size: 10px;
  }
}
.goods-list {
  padding: 0 10px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  z-index: 1;
}
.goods-item {
  width: 113.5px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
.goods-img {
  width: 113.5px;
  height: 113.5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 5px;
}
.goods-name {
  font-size: 11px;
  color: #333333;
  font-weight: 600;
  line-height: 16px;
}
.goods-price{
  font-size: 13px;
  line-height: 18.5px;
  margin-top: 5px;
  .price_red {
    color: #C2212A;
  }
  .price_default {
    font-size: 11px;
    margin-left: 5px;
    color: #999999;
    text-decoration: line-through;
  }
}
</style>
<style lang="scss">
.swiper-pagination-8 {
  padding: 10px;
  position: relative;
  text-align: center;
  .swiper-pagination-bullet {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: #DDDDDD;
    border-radius: 50%;
    margin-right: 4px;
    cursor: pointer;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      width: 8px;
      background: #FFBE28;
      border-radius: 2px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

