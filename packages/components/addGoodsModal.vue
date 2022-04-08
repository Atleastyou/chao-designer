<template lang="pug">
.modal
  .modal-container
    .modal-header
      .modal-title
        span 添加商品
        .source 商品来源为{{source.name}}商品列表
      .c-icon-close(@click="close")
    .modal-search
      .modal-search-label 商品名:
      .modal-search-input
        input(placeholder="请输入商品名称" v-model="keyword")
      .modal-search-handle(@click="getGoodsList") 搜索
    .goods-content
      .goods-content-title 全部商品：
      .goods-body(ref="groupGoods" v-if="goods.length")
        .goods-item(v-for="item in goods")
          .goods-item-img
            img(:src="item.original_img")
            .c-icon-select.goods-item-select(
              :class="{'c-icon-select_active' : item.isSelect}"
              @click="selectGoods(item)"
            )
          .goods-item-bd
            .goods-item-name {{item.goods_name}}
            .goods-item-params
              .goods-item-price
                .goods-item_sell
                  span 经销价
                  span.goods-item_sell_price  ¥{{item.selling_price}}
                .goods-item_sell 会员价  ¥{{item.shop_price}}
                .goods-item_sell 零售价  ¥{{item.market_price}}
              .goods-item-repertory
                span 工厂库存：
                span.goods-item-repertory_num {{item.store_count}}
      .goods-body.goods-body-info(ref="groupGoods" v-else) 未找到商品
    .modal-footer
      .modal-btn(@click="close") 取消
      .modal-btn.modal-btn_confirm(@click="confirm") 确定
</template>

<script>
import { goodsList } from 'api'
import { mapActions } from 'vuex'
export default {
  name: 'addGoodsModal',
  props: {
    source: {
      type: Object,
      default: () => {
        return {
          condition: {}
        }
      }
    }
  },
  data () {
    return {
      page: 1,
      pageSize: 12,
      goods: [],
      keyword: '',
      isLoading: false,
      isLoaded: false
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    close () {
      this.$emit('close')
    },
    confirm () {
      this.goods.forEach(item => {
        if (item.isSelect) this.$emit('changeGoods', item)
      })
    },
    async getGoodsList () {
      try {
        this.page = 1
        this.goods = []
        let query = {
          page: this.page,
          page_size: this.pageSize,
          goods_from: 'all',
          shop_id: this.shopId
        }
        if (this.keyword) query.keyword = this.keyword
        const { data } = await goodsList({ ...query, ...this.source.condition })
        if (data.list.length) this.page += 1
        data.list.forEach(item => {
          item.isSelect = false
        })
        this.goods = data.list
      } catch (err) {
        console.log(err)
      }
    },
    async loadMore () {
      try {
        if (this.isLoading || this.isLoaded) return
        this.isLoading = true
        let query = {
          page: this.page,
          page_size: this.pageSize,
          goods_from: 'all',
          shop_id: this.shopId
        }
        if (this.keyword) query.keyword = this.keyword
        const { data } = await goodsList({ ...query, ...this.source.condition })
        data.list.forEach(item => {
          item.isSelect = false
        })
        this.goods = [...this.goods, ...data.list]
        if (!data.list.length) this.isLoaded = true
        else this.page += 1
        this.$nextTick(() => {
          this.isLoading = false
        })
      } catch (err) {
        console.log(err)
      }
    },
    selectGoods (item) {
      this.goods.forEach(row => {
        row.isSelect = false
        if (item.goods_id === row.goods_id) row.isSelect = true
      })
    },
  },
  mounted () {
    let scrollEle = this.$refs.groupGoods
    scrollEle.addEventListener('scroll', e => {
      const { scrollHeight, scrollTop, offsetHeight } = scrollEle
      if (scrollHeight - scrollTop - offsetHeight < 100) this.loadMore()
    })
  },
  created () {
    this.getGoodsList()
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-container {
  width: 795px;
  height: 572px;
  background: #F5F5F7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border-radius: 4px;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  line-height: 16px;
  .modal-title {
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      color: #333333;
    }
    .source {
      font-size: 12px;
      color: #999999;
      margin-left: 20px;
    }
  }
  .c-icon-close {
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
}
.goods-body-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
}
.modal-search {
  display: flex;
  align-items: center;
  padding:  0 25px;
  .modal-search-label {
    margin-right: 10px;
    font-size: 12px;
    color: #333333;
  }
  .modal-search-input {
    width: 280px;
    height: 28px;
    margin-right: 20px;
    input {
      font-size: 12px;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border: 1px solid #D7D7D7;
      padding: 8px 10px;
    }
  }
  .modal-search-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 30px;
    background: #2CA9CB;
    border-radius: 2px;
    font-size: 12px;
    color: #FFFFFF;
    cursor: pointer;
  }
}
.goods-content {
  margin-top: 30px;
  .goods-content-title {
    padding: 0 25px;
    font-size: 12px;
    line-height: 12px;
    color: #333333;
    margin-bottom: 20px;
  }
  .goods-body {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 362px;
    padding: 0 20px;
    overflow-y: auto;
    .goods-item {
      width: 235px;
      margin: 0 5px 10px;
      background: #FFFFFF;
      border-radius: 2px;
      padding: 12px;
      .goods-item-img {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 211px;
        background: #F5F5F5;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .goods-item-select {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 20px;
          color: #c6c6c6;
          cursor: pointer;
          &.c-icon-select_active {
            color: #2ca9cb;
          }
        }
      }
      .goods-item-bd {
        margin-top: 12px;
        .goods-item-name {
          font-size: 10px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .goods-item-params {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .goods-item_sell {
            line-height: 18px;
            font-size: 10px;
            color: #999999;
            .goods-item_sell_price {
              color: #c2212a;
            }
          }
          .goods-item-repertory {
            font-size: 10px;
            color: #999999;
            .goods-item-repertory_num {
              color: #151515;
            }
          }
        }
      }
    }
  }
}
.modal-footer {
  width: 100%;
  height: 62px;
  padding: 0 20px;
  background: #FFFFFF;
  border: 1px solid #E4E7ED;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border-radius: 0px 0px 4px 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .modal-btn {
    margin: 0 5px;
    padding: 8px 20px;
    line-height: 20px;
    font-size: 14px;
    color: #666666;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    &.modal-btn_confirm {
      background: #FFBE28;
      border-color: #FFBE28;
      color: #333333;
    }
  }
}
</style>
