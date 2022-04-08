<template lang="pug">
.edit
  edit-header(headerInfo="营销-服务预约")
  .edit-content
    .edit-form-item
      .edit-form-item-title.edit-form-item-title_im 标题名称
      .edit-form-item-bd
        input.edit-form-item_input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
</template>

<script>
import editHeader from '../../components/editHeader'
export default {
  name: 'component_31_editor',
  components: {
    editHeader
  },
  props: {
    options: Object
  },
  data () {
    return {
      form: {
        title: ''
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
      const keys = [ 'title' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!this.form[key].length && this.form[key].length
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    change () {
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
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
