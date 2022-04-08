<template lang="pug">
.edit
  edit-header(headerInfo="基础模块-商品搜索")
  .edit-content
    .edit-content-header
      .edit-content-title 热门搜索词
      .edit-content-info
        span 设置关键词，可引导买家搜索相关内容；
        span.tooltip(@click="showTooltip" v-clickoutside="handleStyleClose") 查看示例
          .edit-tooltip(transition="tooltip" v-if="show")
            img(src="https://static.chaodp.com/designer/ss_remen.jpg")
    .edit-keywords
      .edit-keyword-item(v-for="item, index in form.keywords")
        .keyword-item-header
          .keyword-item-title 关键词{{index + 1}}
          .keyword-item-handle
            span.keyword-item-handle_up(v-if="index != 0" @click="moveUp(item , index)") 上移
            span.keyword-item-handle_del(@click="deletaKeyword(item , index)") 删除
        .keyword-item-input
          input(v-model="item.value" placehodler="最多10个字" maxlength="10" @change="changeKeyword($event, item, index)")
      .edit-keyword-btn(@click="addKeyword") +添加热门搜索词
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import Uploader from '../../../utils/uploader'
export default {
  name: 'component_1_editor',
  props: {
    options: Object
  },
  directives: {
    clickoutside: {
      bind: function (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el._vueClickOutside_ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind: function (el, binding) {
        document.removeEventListener('click', el._vueClickOutside_)
        delete el._vueClickOutside_
      }
    }
  },
  components: {
    editHeader
  },
  data () {
    return {
      show: false,
      form: {
        keywords: []
      }
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    showTooltip () {
      this.show = !this.show
    },
    handleStyleClose () {
      this.show = false
    },
    changeKeyword (ev, item, index) {
      item.value = ev.target.value
      this.$emit('change', { options: { ...this.options, ...this.form } })
    },
    addKeyword () {
      this.form.keywords.push({ value: '' })
    },
    moveUp (item, index) {
      this.form.keywords[index] = this.form.keywords.splice(index - 1, 1, this.form.keywords[index])[0]
      this.$emit('change', { options: { ...this.options, ...this.form } })
    },
    deletaKeyword (item, index) {
      this.form.keywords.splice(index, 1)
      this.$emit('change', { options: { ...this.options, ...this.form } })
    }
  },
  created () {
    this.form = { ...this.form, ...this.options }
    // if (this.options && this.options.keywords) this.keywords = [ ...this.options.keywords ]
  },
}
</script>

<style lang="scss" scoped>
.edit {
  .edit-content {
    padding: 30px;
    .edit-content-header {
      .edit-content-title {
        margin-bottom: 10px;
        font-size: 14px;
        color: #333333;
        font-weight: 600;
      }
      .edit-content-info {
        font-size: 12px;
        color: #999999;
        .tooltip {
          position: relative;
          color: #2CA9CB;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
.edit-tooltip {
  position: absolute;
  width: 160px;
  height: 277px;
  padding: 10px;
  top: 35px;
  right: 0;
  background: #FFFFFF;
  border: 1px solid #E4E7ED;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    border-color: transparent;
    border-style: solid;
    position: absolute;
    border: 1px solid #E4E7ED;
    transform: rotate(45deg);
    border-right-color: #fff;
    border-bottom-color: #fff;
    top: -9px;
    right: 15px;
    background: #fff;
    // border-width: 6px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.tooltip-enter, .tooltip-leave {
  opacity: 0
}
.edit-keywords {
  .edit-keyword-item {
    margin-top: 30px;
    .keyword-item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .keyword-item-title {
        font-size: 14px;
        color: #333333;
        font-weight: 600;
      }
      .keyword-item-handle {
        font-size: 12px;
        color: #999999;
        .keyword-item-handle_up {
          padding-right: 9px;
          border-right: 1px solid #D7D7D7;
          cursor: pointer;
        }
        .keyword-item-handle_del {
          padding-left: 9px;
          cursor: pointer;
        }
      }
    }
    .keyword-item-input {
      width: 100%;
      height: 34px;
      input {
        margin-top: 9px;
        width: 100%;
        height: 100%;
        padding: 8.5px 10px;
        font-size: 12px;
        color: #333333;
        display: block;
        background: #FFFFFF;
        border: 1px solid #D7D7D7;
      }
    }
  }
}
.edit-keyword-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  height: 34px;
  border: 1px dashed #2CA9CB;
  border-radius: 2px;
  font-size: 14px;
  color: #2CA9CB;
  cursor: pointer;
}
</style>
