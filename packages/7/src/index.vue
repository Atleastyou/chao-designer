<template lang="pug">
.c-hot(style="background-image: url(https://static.chaodp.com/designer/pic_tejia.jpg)")
  .c-hot-content
    .c-hot-goods(v-for="item, index in info" v-if="index < 4")
      .c-hot-goods_img(:style="{'background-image': `url(${item.original_img})`}")
      .c-hot-goods_price ¥{{item.shop_price}}
      .c-hot-goods_original ¥{{item.market_price}}
</template>

<script>
// 特价爆款
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_7',
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
      info: [
        {
          original_img: 'https://static.chaodp.com/designer/bj_shangpin03.png',
          shop_price: 99,
          market_price: 109
        }, {
          original_img: 'https://static.chaodp.com/designer/bj_shangpin03.png',
          shop_price: 99,
          market_price: 109
        }, {
          original_img: 'https://static.chaodp.com/designer/bj_shangpin03.png',
          shop_price: 99,
          market_price: 109
        }, {
          original_img: 'https://static.chaodp.com/designer/bj_shangpin03.png',
          shop_price: 99,
          market_price: 109
        }
      ],
      sectionId: '7'
    }
  },
  watch: {
    'options.id' (val, oldVal) {
      if (val !== oldVal) this.getGroupGoods()
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.info = data
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    if (this.options && this.options.id) this.getGroupGoods()
  }
}
</script>
<style lang="scss" scoped>
.c-hot {
  width: 100%;
  height: 253px;
  padding-bottom: 10px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .c-hot-content {
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    .c-hot-goods {
      width: 85px;
      height: 135px;
      border: 1px solid #FFAC0F;
      border-radius: 5px;
      background: #fff;
      text-align: center;
      .c-hot-goods_img {
        width: 100%;
        height: 85px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .c-hot-goods_price {
        margin-top: 7px;
        font-size: 13px;
        color: #C2212A;
        line-height: 18px;
      }
      .c-hot-goods_original {
        margin-top: 2.5px;
        font-size: 11px;
        color: #999999;
        text-decoration: line-through;
        line-height: 15px;
      }
    }
  }
}
</style>
