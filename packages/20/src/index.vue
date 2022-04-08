<template lang="pug">
.goods
  .goods-title(v-if="options.title") {{options.title}}
  .goods-item(v-for="item in list" v-if="!options.list || !options.list.length")
    .goods-item-img
      img(:src="item.original_img")
    .goods-item-detail
      .goods-item-top
        .goods-item-name {{item.goods_name}}
      .goods-item-bottom
        .goods-item-price
          span ¥{{item.shop_price}}
  .goods-item(v-for="item in options.list")
    .goods-item-img
      img(:src="item.original_img")
    .goods-item-detail
      .goods-item-top
        .goods-item-name {{item.goods_name}}
        .goods-item-info {{item.superiority}}
      .goods-item-bottom
        .goods-item-price
          span ¥{{item.shop_price}}
        .goods-item-shop-info {{item.want_buy}}人想要
</template>

<script>
// 导航
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_20',
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
      sectionId: '20',
      list: [
        {
          goods_name: '商品名', shop_price: '99', market_price: '99', original_img: '//static.chaodp.com/designer/hxsp_big.png'
        }
      ]
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
.goods-item {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.goods-item-img {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #EDEDED;
  background: #fff;
  margin-right: 12px;
  border-radius: 7px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.goods-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.goods-item-shop-info {
  font-size: 11px;
  color: #35B0FF;
}
.goods-item-detail {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.goods-item-name {
  font-size: 15px;
  color: #333333;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-item-info {
  font-size: 11px;
  color: #FC802B;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-item-price {
  span {
    font-size: 17px;
    color: #D0021B;
    margin-right: 10px;
  }
  label {
    font-size: 11px;
    color: #999999;
  }
}
.goods-item-shop {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 11px;
  color: #999999;
  .goods-item-shop-bd {
    text-decoration: line-through;
  }
  .goods-item-shop-info {
    font-size: 11px;
    color: #35B0FF;
  }
}
</style>
