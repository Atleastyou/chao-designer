<template lang="pug">
.group
  .group-header
    .group-header-title
      span.group-header-title_bd {{options.title}}
      span.group-header-title_tag(v-if="options.subtitle") {{options.subtitle}}
    .group-header-more
      span 更多
      .c-icon-right
  .group-content
    .group-purchase-card
      .group-purchase-handle
        .c-icon-refresh
        span 换一换
      .group-purchase-preview
        .group-purchase-preview-tag(v-if="form.info.hasDiscount")
          span 立减
          span.group-purchase-preview_price {{form.info.old_shop_price - form.info.shop_price}}元
        img(:src="form.info.img_url")
      .group-purchase-wrapper
        .group-purchase-wrapper-info
          .group-purchase-name {{form.info.name}}
          .group-purchase-total 共有{{form.info.goods_num}}款商品
        .group-purchase-wrapper-price
          span ¥{{form.info.shop_price}}
          span.price-info 价格 ¥{{form.info.old_shop_price}}
    .group-goods
      .group-goods-item(v-for="item, index in form.info.goods")
        img(:src="item.original_img")
        .c-icon-add-preview(v-if="index + 1 !== form.info.goods.length")
    .group-purchase-desc {{form.info.brief_introduction}}
</template>

<script>
// 特价爆款
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_6',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: '组合购',
          subtitle: ''
        }
      }
    }
  },
  data () {
    return {
      form: {
        title: '组合购',
        subtitle: '',
        info: {
          hasDiscount: false,
          img_url: 'https://static.chaodp.com/designer/bj_shangpin02.png',
          name: '组合名称',
          goods_num: 'N',
          shop_price: '99',
          old_shop_price: '199',
          brief_introduction: '组合购描述',
          goods: [
            {
              original_img: 'https://static.chaodp.com/designer/bj_shangpin01.png'
            }, {
              original_img: 'https://static.chaodp.com/designer/bj_shangpin01.png'
            }, {
              original_img: 'https://static.chaodp.com/designer/bj_shangpin01.png'
            }
          ]
        }
      },
      sectionId: '6'
    }
  },
  watch: {
    'options.id' (val, oldVal) {
      if (val) this.getGroupGoods()
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.form.info = data
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    this.form = { ...this.form, ...this.options }
    if (this.options && this.options.id) this.getGroupGoods()
    if (!this.options || !this.options.title) this.options.title = '组合购'
  }
}
</script>
<style lang="scss" scoped>
.group {
  padding: 10px;
  background: #FFFFFF;
  .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .group-header-title {
      display: flex;
      align-items: flex-end;
      font-size: 17px;
      color: #333333;
      .group-header-title_bd {
        font-weight: 600;
        line-height: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .group-header-title_tag {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        height: 17px;
        padding: 0 5px;
        background-image: linear-gradient(-270deg, #FFD247 0%, #FF8529 100%);
        border-radius: 3px;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
    .group-header-more {
      font-size: 12px;
      color: #999999;
      .c-icon-right {
        margin-left: 5px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  .group-content {
    width: 100%;
    height: 314.5px;
    margin-top: 10px;
    padding: 12px;
    background: #FFFFFF;
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.08);
    border-radius: 10px;
    .group-purchase-card {
      position: relative;
      display: flex;
      align-items: flex-end;
      .group-purchase-handle {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        color: #999999;
        .c-icon-refresh {
          font-size: 12px;
          color: #999999;
          margin-right: 5px;
        }
      }
      .group-purchase-preview {
        position: relative;
        flex: 0 0 160px;
        height: 160px;
        background: #DAE7F4;
        border-radius: 7px;
        .group-purchase-preview-tag {
          position: absolute;
          left: -12px;
          width: 60px;
          height: 40px;
          background: #333333;
          border-radius: 0 7px 7px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          span {
            font-size: 12px;
            color: #fff;
            &.group-purchase-preview_price {
              font-size: 13px;
              color: #FFBE28;
            }
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .group-purchase-wrapper {
        margin-left: 12px;
        height: 160px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .group-purchase-wrapper-info {
          .group-purchase-name {
            width: 100%;
            margin-top: 33px;
            font-size: 15px;
            color: #333333;
            font-weight: 600;
            line-height: 21px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            white-space: normal;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .group-purchase-total {
            margin-top: 5px;
            font-size: 12px;
            color: #999999;
            line-height: 17px;
          }
        }
        .group-purchase-wrapper-price {
          display: flex;
          align-items: center;
          font-size: 17px;
          color: #C2212A;
          line-height: 24px;
          .price-info {
            margin-left: 10px;
            font-size: 11px;
            color: #999999;
            line-height: 16px;
          }
        }
      }
    }
  }
  .group-goods {
    width: 100%;
    height: 90px;
    margin-top: 12px;
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F5F5F5;
    border-radius: 5px;
    .group-goods-item {
      display: flex;
      align-items: center;
      height: 70px;
      margin-right: 13px;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 70px;
        height: 70px;
      }
      .c-icon-add-preview {
        margin-left: 12.5px;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .group-purchase-desc {
    margin-top: 7px;
    font-size: 13px;
    color: #333333;
    line-height: 18px;
  }
}
</style>
