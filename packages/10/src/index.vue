<template lang="pug">
.c-crossslip
  .crossslip-header
    .crossslip-title {{options.title || '模块标题'}}
    .crossslip-more
      span 更多
      .c-icon-right
  .crossslip-content
    .crossslip-goods
      .crossslip-goods-item(v-for="item in options.list")
        .crossslip-goods-img(:style="{'background-image': `url(${item.original_img})`}")
          .crossslip-goods-img_info(v-if="!item.is_buy") 失效
        .crossslip-goods-name {{item.goods_name}}
        .crossslip-goods-price
          span.price_red ¥{{item.shop_price}}
          span.price_default ¥{{item.market_price}}
      .crossslip-goods-item(v-for="item,index in list" v-if="!options.list || (index + 1 > options.list.length)")
        .crossslip-goods-img(:style="{'background-image': `url(${item.original_img})`}")
        .crossslip-goods-name {{item.goods_name}}
        .crossslip-goods-price
          span.price_red ¥{{item.shop_price}}
          span.price_default ¥{{item.market_price}}
      .crossslip-goods-more
        .crossslip-goods-more_text 查看更多
        .c-icon-right
</template>

<script>
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_10',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: '',
          list: []
        }
      }
    }
  },
  'options.category.id' (val, oldVal) {
    if (val !== oldVal) this.getGroupGoods()
  },
  data () {
    return {
      list: [
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' }
      ],
      sectionId: '10'
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.options.list = data
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    if (this.options && this.options.category && this.options.category.id) {
      this.getGroupGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
.c-crossslip {
  background: #FFFFFF;
  .crossslip-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 0;
    .crossslip-title {
      font-size: 17px;
      color: #333333;
      font-weight: 600;
    }
  }
  .crossslip-more {
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
  .crossslip-content {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    background: #fff;
    overflow-x: auto;
    .crossslip-goods {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px 6.5px;
      .crossslip-goods-item {
        flex-shrink: 0;
        text-align: center;
        margin: 0 3.5px;
        text-align: center;
        .crossslip-goods-img {
          position: relative;
          width: 110px;
          height: 110px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          border-radius: 5px;
          .crossslip-goods-img_info {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            font-size: 12px;
            color: #fff;
            width: 100%;
            height: 20px;
            left: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0 0 5px 5px;
          }
        }
        .crossslip-goods-name {
          font-size: 12px;
          color: #333333;
          font-weight: 600;
          line-height: 16.5px;
          max-width: 95px;
          margin: 5px auto;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .crossslip-goods-price{
          font-size: 13px;
          line-height: 18.5px;
          .price_red {
            color: #C2212A;
          }
          .price_default {
            margin-left: 5px;
            color: #999999;
            text-decoration: line-through;
          }
        }
      }
      .crossslip-goods-more {
        height: 108.5px;
        padding: 14px 19px;
        margin: 0 3.5px;
        background: #FBF9F3;
        border-radius: 5px;
        color: #CBC5B2;
        font-size: 12px;
        text-align: center;
        .crossslip-goods-more_text {
          writing-mode: vertical-lr;
          letter-spacing: 5px;
        }
      }
    }
  }
}
</style>
