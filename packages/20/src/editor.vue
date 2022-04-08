<template lang="pug">
.edit
  edit-header(headerInfo="商品-横向商品")
  add-goods-modal(v-if="addGoodsModalShow" :source="form.category" @changeGoods="addGoodsConfirm" @close="addGoodsCancel")
  .edit-content
    .edit-form-item
      .edit-form-item-title 模块标题
      .edit-form-item-bd
        input.edit-form-item_input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
    .edit-form-item
      .edit-form-item-title.edit-form-item-title_im 商品来源
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
      .edit-form-item-bd_btn(@click="openAddGoodsModal") +添加商品
</template>

<script>
import editHeader from '../../components/editHeader'
import addGoodsModal from '../../components/addGoodsModal.vue'
export default {
  name: 'component_20_editor',
  components: {
    editHeader,
    addGoodsModal
  },
  props: {
    options: Object
  },
  data () {
    return {
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
    fliter () {
      const keys = [ 'list' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!this.form[key].length && this.form[key].length
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    change () {
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    deleteGoods (item, index) {
      this.form.list.splice(index, 1)
      let newGoods = JSON.parse(this.form.query.goods_id)
      let idIndex = newGoods.findIndex(id => id === item.id)
      newGoods.splice(idIndex, 1)
      this.form.query.goods_id = JSON.stringify(newGoods)
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    changeGoods (item, index) {
      this.goodsIndex = index
      this.addGoodsModalShow = true
    },
    addGoodsCancel () {
      this.addGoodsModalShow = false
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
    openAddGoodsModal () {
      this.addGoodsModalShow = true
    }
  },
  mounted () {},
  created () {
    this.form = { ...this.form, ...this.options }
    console.log(this.form)
  }
}
</script>

<style lang="scss" scoped>
.edit {
  .edit-content {
    padding: 30px;
    .edit-form-item {
      margin-bottom: 30px;
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
    .edit-form-item-title {
      margin-bottom: 10px;
      font-size: 14px;
      color: #151515;
      font-weight: 600;
      &.edit-form-item-title_im {
        &:before {
          content: '*';
          color: #C2212A;
        }
      }
    }
  }
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
.edit-form-item_input {
  outline: none;
  width: 100%;
  height: 36px;
  padding: 9.5px 10px;
  font-size: 12px;
  background: #FFFFFF;
  border: 1px solid #D7D7D7;
}
</style>
