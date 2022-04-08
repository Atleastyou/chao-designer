<template lang="pug">
.waterfall
  .waterfall-title {{options.title || '模块标题'}}
  .waterfall-list
    .waterfall-left
      .waterfall-item(v-for="item in goods.leftGoods")
        .waterfall-item-cover(:style="{'background-image': `url(${item.original_img})`}")
        .waterfall-item-box
          .waterfall-item-title {{item.goods_name}}
          .waterfall-item-price ¥{{item.shop_price}}
          .waterfall-item-disabled-price ¥{{item.market_price}}
    .waterfall-right
      .waterfall-item(v-for="item in goods.rightGoods")
        .waterfall-item-cover(:style="{'background-image': `url(${item.original_img})`}")
        .waterfall-item-box
          .waterfall-item-title {{item.goods_name}}
          .waterfall-item-price ¥{{item.shop_price}}
          .waterfall-item-disabled-price ¥{{item.market_price}}
  .waterfall-load(v-if="!options.pullToTop") 点击加载更多
</template>

<script>
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_11', // 瀑布流
  props: {
    isLast: {
      type: Boolean,
      default: true
    },
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
    isLast (val) {
      if (!val) this.options.pullToTop = false
    },
    'options.source.id' (val, oldVal) {
      if (val !== oldVal) this.getGroupGoods()
    }
  },
  data () {
    return {
      list: [
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' },
        { goods_name: '商品1', shop_price: '99', market_price: '199', original_img: '//static.chaodp.com/designer/bj_shangpin04.png' }
      ],
      sectionId: 11,
      goods: {
        leftGoods: [],
        rightGoods: []
      }
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.list = data
        this.goods = { leftGoods: [], rightGoods: [] }
        this.sort()
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    sort () {
      this.list.forEach((item, index) => {
        if (index % 2 === 0) this.goods.leftGoods.push(item)
        else this.goods.rightGoods.push(item)
      })
    }
  },
  created () {
    if (this.options && this.options.source && this.options.source.id && this.options.query && Object.keys(this.options.query).length) {
      this.getGroupGoods()
    } else {
      this.list = (this.options && this.options.list && this.options.list.length) ? this.options.list : this.list
      this.sort()
    }
  }
}
</script>
<style lang="scss" scoped>
.waterfall {
  background: #F2F2F2;
}
.waterfall-title {
  padding: 10px 10px 0;
  padding-bottom: 0;
  font-size: 17px;
  color: #333333;
  line-height: 24px;
  font-weight: 600;
}
.waterfall-list {
  padding: 5px;
}
.waterfall-left,.waterfall-right {
  width: 50%;
  display: inline-block;
  vertical-align: top;
}
.waterfall-item {
  padding: 5px;
  width: 100%;
  overflow: hidden;
}
.waterfall-item-cover {
  width: 100%;
  height: 172px;
  border-radius: 6px 6px 0 0;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
}
.waterfall-item-box {
  background: #FFF;
  padding: 10px 12px;
  border-radius: 0 0 6px 6px;
}
.waterfall-item-title {
  font-size: 13px;
  color: #333333;
  line-height: 18px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.waterfall-item-price {
  font-size: 18px;
  color: #C2212A;
  line-height: 25px;
  margin-top: 10px;
}
.waterfall-item-disabled-price {
  font-size: 11px;
  color: #999999;
  margin-top: 5px;
  line-height: 16px;
  text-decoration: line-through;
}
.waterfall-load {
  font-size: 13px;
  color: #999999;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 30px;
  cursor: pointer;
}
</style>
