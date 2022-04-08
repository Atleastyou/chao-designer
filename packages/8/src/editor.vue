<template lang="pug">
.editor
  select-group-shop(v-if="selectGroupShopShow" modularCode="group" @confirm="selectGroupShopConfirm" @cancel="selectGroupShopCancel")
  edit-header(headerInfo="营销-拼单团购")
  .editor-content
    .edit-form
      .edit-form-item
        .edit-form-item-title 模块标题
        .edit-form-item-bd
          input.edit-form-item_input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
      .edit-form-item
        .edit-form-item-title 二级标题
        .edit-form-item-bd
          input.edit-form-item_input(placeholder="最多8个字" maxlength="8" v-model="form.subtitle" @blur="change")
      .edit-form-item
        .edit-form-item-title 拼单团购来源
        .edit-form-item-bd(@click="opensSlectGroupShop")
          .edit-form-item_section(v-if="form.source.id")
            .edit-form-item_icon.c-icon-moren
            .edit-form-item_info
              .edit-form-item_category {{form.source.name}}
              .edit-form-item_num {{form.source.msg}}
            .edit-form-item_handle 更换
          .edit-form-item-link(v-else) +添加来源链接
</template>

<script>
import editHeader from '../../components/editHeader'
import selectGroupShop from './components/selectGroupShop'
export default {
  name: 'component_8_editor',
  components: {
    editHeader,
    selectGroupShop
  },
  props: {
    options: Object
  },
  data () {
    return {
      selectGroupShopShow: false,
      form: {
        title: '',
        subtitle: '',
        source: {},
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
      const keys = [ 'title', 'subtitle', 'query', 'source' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!Object.keys(this.form[key]).length
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    selectGroupShopConfirm (option) {
      this.selectGroupShopShow = false
      this.form.source = option
      this.form.query = option.query
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    selectGroupShopCancel () {
      this.selectGroupShopShow = false
    },
    opensSlectGroupShop () {
      this.selectGroupShopShow = true
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
.editor-header {
  padding: 30px;
  border-bottom: 1px solid #E5E5E5;
  .editor-title {
    margin-bottom: 30px;
    font-size: 18px;
    color: #333333;
    font-weight: 600;
    line-height: 25px;
  }
  .editor-tip {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
}
.editor-content {
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
