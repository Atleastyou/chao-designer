<template lang="pug">
.modal
  .modal-container
    .modal-body
      .modal-close.c-icon-close(@click="cancel")
      .modal-title 选择跳转链接
      .brand-options
        .brand-option(v-for="item, index in options" @click="selectRadio(item)")
          .brand-option-bd
            .brand-option-radio(:class="{ 'brand-option-radio_active' : item.is_radio }")
            .brand-option-name
              span {{item.name}}
              span(style="color: #999") {{item.desc}}
          .brand-option-ft {{item.msg}}
    .modal-footer
      .modal-btn.modal-cancel(@click="cancel") 取消
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
      activeItem: {}
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    confirm () {
      this.$emit('confirm', { ...this.activeItem, query: { modular_code: this.modularCode } })
    },
    cancel () {
      this.$emit('cancel')
    },
    selectRadio (item) {
      this.options.forEach(row => {
        row.is_radio = row.id === item.id
      })
      this.activeItem = item
    },
    async getGoodsCondition (type) {
      try {
        const { data } = await getGoodsCondition({ modular_code: this.modularCode })
        data.forEach(item => {
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
  box-shadow: 0 2PX 12PX 0 rgba(0,0,0,0.06);
}
.modal-body {
  padding: 20PX 25PX;
  position: relative;
}
.modal-close {
  position: absolute;
  right: 25PX;
  top: 25PX;
  font-size: 10PX;
  color: #999;
  cursor: pointer;
}
.modal-title {
  font-size: 16PX;
  line-height: 1;
  color: #333333;
}
.modal-footer {
  width: 100%;
  height: 62PX;
  border: 1PX solid #E4E7ED;
  box-shadow: 0 2PX 12PX 0 rgba(0,0,0,0.06);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20PX;
}
.modal-btn {
  padding: 0 20PX;
  height: 36PX;
  line-height: 36PX;
  text-align: center;
  font-size: 14PX;
  color: #333;
  border-radius: 4PX;
  cursor: pointer;
  &.modal-cancel {
    border: 1PX solid #DCDFE6;
    color: #666;
    margin-right: 10PX;
  }
  &.modal-confirm {
    background: #FFBE28;
  }
}
.brand-options {
  margin-top: 30PX;
  height: 175PX;
  overflow-y: auto;
  .brand-option {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9.5PX 0;
    line-height: 17PX;
    .brand-option-bd {
      display: flex;
      align-items: center;
    }
    .brand-option-radio {
      width: 14PX;
      height: 14PX;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1PX solid #D5D8DE;
      cursor: pointer;
      &.brand-option-radio_active {
        position: relative;
        background: #2CA9CB;
        border-color: #2CA9CB;
        &:after {
          position: absolute;
          content: '';
          width: 4PX;
          height: 4PX;
          background: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
      }
    }
    .brand-option-name {
      margin-left: 10PX;
      font-size: 12PX;
      color: #333333;
    }
    .brand-option-ft {
      font-size: 12PX;
      color: #333333;
    }
  }
}
</style>