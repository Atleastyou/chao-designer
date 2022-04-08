<template lang="pug">
.crossslip-edit
  add-goods-modal(v-if="addGoodsModalShow" :source="form.category" @changeGoods="addGoodsConfirm" @close="addGoodsCancel")
  category-modal(v-show="sourceModalShow" componentId="10" modularCode="lateral" @confirm="sourceConfirm" @close="sourceCancel")
  edit-header(headerInfo="商品-横向滑动")
  .crossslip-edit-content
    .edit-form
      .edit-form-item
        .edit-form-item-title 模块标题
        .edit-form-item-bd
          input.edit-form-item_input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
      .edit-form-item
        .edit-form-item-title 商品来源
        .edit-form-item-bd(@click="openSourceModal")
          .edit-form-item_section(v-if="form.category.id")
            .edit-form-item_icon.c-icon-moren
            .edit-form-item_info
              .edit-form-item_category {{form.category.name}}
              .edit-form-item_num {{form.category.msg}}
            .edit-form-item_handle 更换
          .edit-form-item-link(v-else) +添加来源链接
      .edit-form-item
        .edit-form-item-title 封面商品
        .edit-form-item-info(v-if="form.category.id") 请从商品来源列表中设置4-9个封面商品
        .edit-form-item-info(v-else) 请先添加商品来源链接。
        .edit-form-item-bd
          .edit-form-item-bd_btn(v-if="form.category.id" @click="openAddGoodsModal") +添加商品
          .edit-form-item_goods
            .goods-item(v-for="item, index in form.list")
              .goods-item-header
                .goods-item-title 商品{{index + 1}}
                .goods-item-handle(@click="deleteGoods(item, index)") 删除
              .goods-item-bd
                .goods-item-img(:style="{'background-image': `url(${item.original_img})`}")
                .goods-item-bd_info
                  .goods-item-name {{item.goods_name}}
                  .goods-item-price ¥{{item.shop_price}}
                .goods-item-bd_btn(@click="changeGoods(item, index)") 更换
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import categoryModal from '../../components/categoryModal'
import addGoodsModal from '../../components/addGoodsModal'
export default {
  name: 'component_10_editor',
  components: {
    editHeader,
    categoryModal,
    addGoodsModal
  },
  props: {
    options: Object
  },
  data () {
    return {
      sourceModalShow: false,
      addGoodsModalShow: false,
      goodsIndex: null,
      form: {
        title: '',
        list: [],
        category: {
          condition: {}
        },
        query: {}
      }
    }
  },
  computed: {
    isValid () {
      return this.fliter()
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    fliter () {
      const keys = [ 'title', 'list', 'category' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!this.form[key].length && this.form[key].length >= 4
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    deleteGoods (item, index) {
      this.form.list.splice(index, 1)
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    addGoodsConfirm (goods) {
      let index = this.form.list.findIndex(item => item.goods_id === goods.goods_id)
      if (index >= 0) {
        this.$message.error('请不要添加重复商品')
        return
      }
      goods.is_buy = 1
      if (this.goodsIndex !== null) {
        this.form.list[this.goodsIndex] = goods
        this.goodsIndex = null
      } else {
        this.form.list.push(goods)
      }
      let goods_ids = []
      this.form.list.forEach(item => { goods_ids.push(item.goods_id) })
      this.form.query = { modular_code: 'lateral', goods_id: JSON.stringify(goods_ids) }
      this.addGoodsModalShow = false
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    addGoodsCancel () {
      this.addGoodsModalShow = false
    },
    changeGoods (item, index) {
      this.goodsIndex = index
      this.addGoodsModalShow = true
    },
    openAddGoodsModal () {
      if (this.form.list.length >= 9) {
        this.$message.error('封面商品最多添加9个')
      } else {
        this.addGoodsModalShow = true
      }
    },
    sourceConfirm (source) {
      if (source.id !== this.form.category.id) {
        this.form.list = []
      }
      this.form.category = source
      this.form.linkType = 'category'
      this.sourceModalShow = false
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    sourceCancel () {
      this.sourceModalShow = false
    },
    openSourceModal () {
      this.sourceModalShow = true
    },
    change () {
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    }
  },
  created () {
    this.form = { ...this.form, ...this.options }
  }
}
</script>
<style lang="scss" scoped>
.crossslip-edit-header {
  padding: 30px;
  border-bottom: 1px solid #E5E5E5;
  .crossslip-edit-title {
    margin-bottom: 30px;
    font-size: 18px;
    color: #333333;
    font-weight: 600;
    line-height: 25px;
  }
  .crossslip-edit-tip {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
}
.crossslip-edit-content {
  padding: 30px;
  .edit-form-item {
    margin-bottom: 30px;
  }
  .edit-form-item-info {
    font-size: 14px;
    color: #999999;
  }
  .edit-form-item-title {
    margin-bottom: 10px;
    font-size: 14px;
    color: #151515;
    font-weight: 600;
    &:before {
      content: '*';
      color: #C2212A;
    }
  }
  .edit-form-item-link {
    font-size: 12px;
    cursor: pointer;
    color: #2CA9CB;
  }
  .edit-form-item_input {
    outline: none;
    width: 100%;
    height: 36px;
    padding: 9.5px 10px;
    font-size: 12px;
    background: #FFFFFF;
    border: 1px solid #D7D7D7;
  }
  .edit-form-item_section {
    position: relative;
    display: flex;
    width: 100%;
    height: 66px;
    padding: 10px;
    background: #F7F7F7;
    cursor: pointer;
    .edit-form-item_icon {
      width: 46px;
      height: 46px;
      line-height: 46px;
      background: #DDDDDD;
      text-align: center;
      font-size: 20px;
      color: #fff;
    }
    .edit-form-item_info {
      margin-left: 10px;
    }
    .edit-form-item_category {
      font-size: 12px;
      color: #333333;
    }
    .edit-form-item_num {
      margin-top: 4px;
      font-size: 12px;
      color: #999999;
    }
    .edit-form-item_handle {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px;
      font-size: 12px;
      color: #FFFFFF;
      line-height: 17px;
      background: #666666;
      cursor: pointer;
    }
  }
  .edit-form-item-bd_btn {
    width: 100%;
    height: 34px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #2CA9CB;
    border-radius: 2px;
    font-size: 14px;
    color: #2CA9CB;
    cursor: pointer;
  }
  .edit-form-item_goods {
    margin-top: 30px;
    .goods-item {
      margin-bottom: 30px;
    }
    .goods-item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .goods-item-title {
        font-size: 12px;
        color: #333333;
      }
      .goods-item-handle {
        font-size: 12px;
        color: #999999;
        cursor: pointer;
      }
    }
    .goods-item-bd {
      position: relative;
      display: flex;
      width: 100%;
      height: 66px;
      padding: 10px;
      background: #F7F7F7;
      .goods-item-img {
        display: flex;
        width: 46px;
        height: 46px;
        min-width: 46px;
        background-color: #FFFFFF;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .goods-item-bd_info {
        flex: 1;
        margin-left: 10px;
        .goods-item-name {
          max-width: 264px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          color: #333333;
        }
        .goods-item-price {
          margin-top: 4px;
          font-size: 12px;
          color: #999999;
        }
      }
      .goods-item-bd_btn {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 34px;
        height: 27px;
        font-size: 12px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #666666;
        cursor: pointer;
      }
    }
  }
}
</style>
