<template lang="pug">
.modal
  .modal-container
    .modal-header
      .modal-title 选择案例
      .c-icon-close(@click="close")
    .category-content
      .category-options-body(v-if="!isEmpty")
        .category-options(ref="cases")
          .category-option(v-for="item, index in options" @click="selectRadio(item)")
            .category-option-bd
              .category-option-radio(:class="{ 'category-option-radio_active' : item.is_radio }")
              .category-option-name {{item.title}}
            .category-option-ft {{item.msg}}
      .category-options-body.category-options-info(v-if="isEmpty")
        p 你还没有创建VR案例!
    .category-footer
      .category-footer-btn(@click="close") 取消
      .category-footer-btn.category-footer-btn_confirm(@click="confirm") 确定
</template>

<script>
import { getVrList } from 'api'
export default {
  name: 'vrModal',
  props: {
    modularCode: String,
    componentId: [String, Number]
  },
  data () {
    return {
      options: [],
      activeItem: {},
      tabType: null,
      isEmpty: false,
      isLoading: false,
      isLoaded: false,
      page: 1,
      pageSize: 20
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    selectRadio (item, parent = {}) {
      this.options.forEach(row => {
        row.is_radio = false
        if (row.id === item.id) {
          row.is_radio = true
        }
      })
      this.activeItem = { ...item }
    },
    confirm () {
      this.$emit('confirm', this.activeItem)
    },
    async getVrList () {
      try {
        this.isEmpty = false
        const { data } = await getVrList({ page: this.page, page_size: this.pageSize })
        if (data.ls.length) this.page += 1
        data.ls.forEach(item => {
          item.is_radio = false
        })
        this.options = data.ls
        if (!data.ls.length) this.isEmpty = true
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    async loadMore () {
      try {
        if (this.isLoading || this.isLoaded) return
        this.isLoading = true
        const { data } = await getVrList({ page: this.page, page_size: this.pageSize })
        data.ls.forEach(item => {
          item.is_radio = false
        })
        this.options = [...this.options, ...data.ls]
        if (!data.ls.length) this.isLoaded = true
        else this.page += 1
        this.$nextTick(() => {
          this.isLoading = false
        })
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
  },
  mounted () {
    let scrollEle = this.$refs.cases
    scrollEle.addEventListener('scroll', e => {
      const { scrollHeight, scrollTop, offsetHeight } = scrollEle
      if (scrollHeight - scrollTop - offsetHeight < 100) this.loadMore()
    })
  },
  created () {
    this.getVrList()
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
}
.category-options-body {
  height: 430px;
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
