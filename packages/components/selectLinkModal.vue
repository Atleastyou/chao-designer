<template lang="pug">
.modal
  .modal-container
    .modal-body
      .modal-close.c-icon-close(@click="close")
      .modal-title 选择跳转链接
      .brand-options
        .brand-option(v-for="item, index in options" @click="selectRadio(item)")
          .brand-option-bd
            .brand-option-radio(:class="{ 'brand-option-radio_active' : item.is_radio }")
            .brand-option-name
              span {{item.name}}
              span.brand-option-name_desc {{item.desc}}
          .brand-option-ft 共有{{item.num}}件商品
    .modal-footer
      .modal-btn.modal-cancel(@click="close") 取消
      .modal-btn.modal-confirm(@click="confirm") 确定
</template>

<script>
import { getGoodsCondition } from 'api'
import { mapActions } from 'vuex'
export default {
  name: 'selectBrand',
  props: {
    modularCode: String
  },
  data () {
    return {
      options: [],
      activeOption: {}
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    close () {
      this.$emit('close')
    },
    selectRadio (item) {
      this.options.forEach(row => {
        row.is_radio = false
        if (row.id === item.id) {
          row.is_radio = true
          this.activeOption = row
        }
      })
    },
    confirm () {
      this.$emit('change', { ...this.activeOption, query: { modular_code: this.modularCode } })
    },
    async getGoodsCondition () {
      try {
        const { data } = await getGoodsCondition({ modular_code: this.modularCode })
        data.forEach(item => {
          if (this.modularCode === 'combination') {
            item.hasDiscount = parseFloat(item.old_shop_price) > parseFloat(item.shop_price) // 是否有优惠
          }
          item.is_radio = false
        })
        this.options = data
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    this.getGoodsCondition()
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
  width: 575PX;
  background: #fff;
  border-radius: 4PX;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
}
.modal-body {
  padding: 20px 25px;
  position: relative;
}
.modal-close {
  position: absolute;
  right: 25px;
  top: 25px;
  font-size: 10px;
  color: #999;
  cursor: pointer;
}
.modal-title {
  font-size: 16px;
  line-height: 1;
  color: #333333;
}
.modal-footer {
  width: 100%;
  height: 62px;
  border: 1px solid #E4E7ED;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
}
.modal-btn {
  padding: 0 20px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  &.modal-cancel {
    border: 1px solid #DCDFE6;
    color: #666;
    margin-right: 10px;
  }
  &.modal-confirm {
    background: #FFBE28;
  }
}
.brand-options {
  margin-top: 30px;
  height: 175px;
  overflow-y: auto;
  .brand-option {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9.5px 0;
    border-bottom: 1px solid #E5E5E5;
    line-height: 17px;
    .brand-option-bd {
      display: flex;
      align-items: center;
    }
    .brand-option-radio {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1px solid #D5D8DE;
      cursor: pointer;
      &.brand-option-radio_active {
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
    .brand-option-name {
      margin-left: 10px;
      font-size: 12px;
      color: #333333;
      .brand-option-name_desc {
        margin-left: 5px;
        font-size: 12px;
        color: #999999;
      }
    }
    .brand-option-ft {
      font-size: 12px;
      color: #333333;
    }
  }
}
</style>