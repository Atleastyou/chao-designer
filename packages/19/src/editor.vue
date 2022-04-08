<template lang="pug">
.edit
  edit-header(headerInfo="品牌-品牌展示02")
  brand-modal(@changeBrands="changeBrands" @close="closeBrands" v-if="showBrandModal")
  .edit-content
    .edit-form-item
      .edit-form-item-title 模块标题
      .edit-form-item-bd
        input.edit-form-item_input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
    .edit-form-item
      .edit-form-item-title.edit-form-item-title_im 品牌来源
      .edit-form-item_goods
        .goods-item(v-for="item, index in form.list")
          .goods-item-header
            .goods-item-title 品牌{{index + 1}}
            .goods-item-handle(@click="deleteBrand(item, index)") 删除
          .goods-item-bd
            .goods-item-img(:style="{ 'background-image': `url(${item.logo})` }")
            .goods-item-bd_info
              .goods-item-name {{item.name}}
              .goods-item-price 共有{{item.goods_num}}件商品
            .goods-item-bd_btn(@click="changeBrand(item, index)") 更换
      .edit-form-item-bd_btn(@click="openBrandModal") +添加品牌
</template>

<script>
import editHeader from '../../components/editHeader'
import brandModal from '../../components/brandModal.vue'
export default {
  name: 'component_19_editor',
  components: {
    editHeader,
    brandModal
  },
  props: {
    options: Object
  },
  data () {
    return {
      showBrandModal: false,
      brandIndex: null,
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
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!this.form[key].length && this.form[key].length >= 1
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    change () {
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    deleteBrand (item, index) {
      this.form.list.splice(index, 1)
      let idIndex = JSON.parse(this.form.query.brand_id).findIndex(row => row === item.id)
      let newBrand = JSON.parse(this.form.query.brand_id)
      newBrand.splice(idIndex, 1)
      this.form.query.brand_id = JSON.stringify(newBrand)
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    changeBrand (item, index) {
      this.brandIndex = index
      this.showBrandModal = true
    },
    closeBrands () {
      this.showBrandModal = false
    },
    changeBrands (brands) {
      let index = this.form.list.findIndex(item => item.id === brands.id)
      if (index >= 0) {
        this.$message.error('请不要添加重复商品')
        return
      }
      brands.is_buy = 1
      if (this.brandIndex !== null) {
        this.form.list[this.brandIndex] = brands
        this.brandIndex = null
      } else {
        this.form.list.push(brands)
      }
      let brand_ids = []
      this.form.list.forEach(item => { brand_ids.push(item.id) })
      this.form.query = { modular_code: 'brand', brand_id: JSON.stringify(brand_ids) }
      this.showBrandModal = false
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    openBrandModal () {
      this.showBrandModal = true
    }
  },
  mounted () {},
  created () {
    this.form = { ...this.form, ...this.options }
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
