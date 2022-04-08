<template lang="pug">
.goods
  .goods-title(v-if="options.title") {{options.title}}
  .goods-defalut(v-if="!options.list || !options.list.length")
    .goods-defalut-img
      img(src="//static.chaodp.com/designer/dtsp_big.png")
      .goods-name 商品名称
      .goods-price
        .goods-price-span ¥1480
        .goods-price-label 进货价
        .goods-price-footer 赚 ¥1600
  .goods-item(v-else v-for="item in options.list")
    .goods-img
      img(:src="item.original_img")
    .goods-name {{item.goods_name}}
    .goods-price
      .goods-price-span ¥{{item.shop_price}}
</template>

<script>
// 导航
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_21',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    }
  },
  data () {
    return {
      img: '',
      sectionId: '21'
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.options.list = data
      } catch (err) {
        console.log(err)
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    if (this.options && this.options.list && this.options.list.length) {
      this.getGroupGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-title {
  font-size: 17px;
  color: #333333;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EDEDED;
}
.goods-defalut-img {
  padding: 10px 0;
}
.goods-item {
  padding-bottom: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 10px;
  }
}
.goods-img {
  width: 100%;
  height: 225px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.goods-name {
  margin-top: 10px;
  padding: 0 10px;
  font-size: 15px;
  color: #333333;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-price {
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-top: 10px;
}
.goods-price-span {
  color: #C2212A;
  font-size: 17px;
}
.goods-price-label {
  font-size: 11px;
  color: #999999;
  margin-left: 5px;
}
.goods-price-footer {
  margin-left: 27px;
  color: #C2212A;
  font-size: 11px;
}
</style>
