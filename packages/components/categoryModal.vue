<template lang="pug">
.modal
  .modal-container
    .modal-header
      .modal-title 选择跳转链接
      .c-icon-close(@click="close")
    .category-content
      .category-tabs
        .category-tab(
          v-for="item, index in tabs"
          :class="{ 'category-tab_active' : tabIndex === index }"
          @click="changeTab(item, index)"
        ) {{item.title}}
      .category-options-body(v-if="!isEmpty")
        .category-options(v-if="tabType != 'category' && tabType != 'keyword' && tabType != 'self_category'")
          .category-option(v-for="item, index in options" @click="selectRadio(item)")
            .category-option-bd
              .category-option-radio(:class="{ 'category-option-radio_active' : item.is_radio, 'category-option-radio_disable' : item.is_disable }")
              .category-option-name {{item.name}}
            .category-option-ft {{item.msg}}
        .category-options(v-else)
          .category-option-item(v-for="item, index in options")
            .category-option-title {{item.name}}
            .category-option(v-for="son, sonIndex in item.lower" @click="selectRadio(son, item)")
              .category-option-bd
                .category-option-radio(:class="{ 'category-option-radio_active' : son.is_radio }")
                .category-option-name {{son.name}}
              .category-option-ft {{son.msg}}
      .category-options-body.category-options-info(v-if="isEmpty")
        p 你还未进行自定分类，
        p 快去「商品-分类管理」中设置吧！
    .category-footer
      .category-footer-btn(@click="close") 取消
      .category-footer-btn.category-footer-btn_confirm(@click="confirm") 确定
</template>

<script>
import { getGoodsTabs, getGoodsCondition } from 'api'
export default {
  name: 'categoryModal',
  props: {
    modularCode: String,
    componentId: [String, Number]
  },
  data () {
    return {
      tabs: [],
      options: [],
      tabIndex: 0,
      activeItem: {},
      tabType: null,
      isEmpty: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    selectRadio (item, parent = {}) {
      if (item.is_disable) {
        return
      }
      if (this.tabType !== 'category' && this.tabType !== 'keyword' && this.tabType !== 'self_category') {
        this.options.forEach(row => {
          row.is_radio = false
          if (row.id === item.id) {
            row.is_radio = true
          }
        })
      } else {
        this.options.forEach(row => {
          row.lower.forEach(son => {
            son.is_radio = false
            if (son.id === item.id) son.is_radio = true
          })
        })
      }
      this.activeItem = { ...item, type: this.tabType, parent_name: parent.name ? parent.name : '' }
    },
    confirm () {
      this.$emit('confirm', this.activeItem)
    },
    changeTab (item, index) {
      this.tabIndex = index
      this.options = []
      this.tabType = item.type
      this.getGoodsCondition()
    },
    async getGoodsTabs () {
      try {
        const { data } = await getGoodsTabs({ modular_code: this.modularCode })
        this.tabs = data
        this.tabType = this.tabs[0].type
        this.getGoodsCondition()
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    async getGoodsCondition (type) {
      try {
        this.isEmpty = false
        const { data } = await getGoodsCondition({ type: this.tabType })
        if (this.tabType === 'category' || this.tabType === 'keyword' || this.tabType === 'self_category') {
          data.forEach(item => {
            item.lower.forEach(son => {
              son.is_radio = false
            })
          })
        } else {
          if ((parseFloat(this.componentId) === 10 || parseFloat(this.componentId) === 11) && this.tabType === 'other') {
            data.forEach(row => {
              row.is_disable = true
              if (parseFloat(row.id) === 5) row.is_disable = false
            })
          }
          data.forEach(item => {
            item.is_radio = false
          })
        }
        this.options = data
        if (!data.length) this.isEmpty = true
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    this.getGoodsTabs()
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
  width: 575px;
  height: 572px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border-radius: 4px;
  background: #fff
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  line-height: 16px;
  .modal-title {
    font-size: 16px;
    color: #333333;
  }
  .c-icon-close {
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
}
.category-content {
  margin-top: 5px;
  .category-tabs {
    display: flex;
    align-items: center;
    padding: 0 25px;
    .category-tab {
      padding: 5px 0;
      margin-right: 43.4px;
      font-size: 14px;
      color: #303133;
      line-height: 20px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.category-tab_active {
        position: relative;
        color: #2CA9CB;
        &:after {
          position: absolute;
          content: '';
          width: 100%;
          height: 2px;
          background: #2CA9CB;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
}
.category-options-body {
  height: 395px;
  &.category-options-info {
    margin-top: 24px;
    padding-top: 100px;
  }
  p {
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: center;
  }
}
.category-options {
  padding: 0 25px;
  margin-top: 24px;
  height: 100%;
  overflow-y: auto;
  .category-option {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9.5px 0;
    border-bottom: 1px solid #E5E5E5;
    line-height: 17px;
    .category-option-bd {
      display: flex;
      align-items: center;
    }
    .category-option-radio {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1px solid #D5D8DE;
      cursor: pointer;
      &.category-option-radio_disable {
        background: #CCCCCC;
        cursor: no-drop;
      }
      &.category-option-radio_active {
        position: relative;
        background: #2CA9CB;
        border-color: #2CA9CB;
        &:after {
          position: absolute;
          content: '';
          width: 4px;
          height: 4px;
          background: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
      }
    }
    .category-option-name {
      margin-left: 10px;
      font-size: 12px;
      color: #333333;
    }
    .category-option-ft {
      font-size: 12px;
      color: #333333;
    }
  }
}
.category-option-item {
  margin-bottom: 30px;
  .category-option-title {
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    margin-bottom: 10px;
  }
}
.category-footer {
  width: 100%;
  height: 62px;
  padding: 0 20px;
  background: #FFFFFF;
  border: 1px solid #E4E7ED;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border-radius: 0 0 4px 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .category-footer-btn {
    margin: 0 5px;
    padding: 8px 20px;
    line-height: 20px;
    font-size: 14px;
    color: #666666;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    &.category-footer-btn_confirm {
      background: #FFBE28;
      border-color: #FFBE28;
      color: #333333;
    }
  }
}
</style>
