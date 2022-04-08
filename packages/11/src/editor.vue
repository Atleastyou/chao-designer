<template lang="pug">
.editor
  category-modal(v-show="sourceModalShow" componentId="11" modularCode="cascade" @confirm="sourceConfirm" @close="sourceCancel")
  edit-header(headerInfo="商品-瀑布流")
  .editor-contaienr
    .editor-item(v-if="isLast")
      .editor-item-title 设置加载方式
      .editor-item-content
        label.checkbox
          .checkbox-wrapper
            input.checkbox-input(v-model="form.pullToTop" type="checkbox" @change="change")
            .checkbox-box(:class="{'checked': form.pullToTop}")
          .checkbox-text 上拉自动加载更多
        p.editor-item-tip 该加载模式只适用于该模块为首页最底部的模块时。
    .editor-item.required
      .editor-item-title 模块标题
      .editor-item-content
        input.input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
    .editor-item.required
      .editor-item-title 商品来源
      .editor-item-content(@click="openSourceModal")
        .card(v-if="form.source.id")
          .card-cover.c-icon-moren
          .card-wrapper
            .card-title {{form.source.name}}
            .card-subtitle {{form.source.msg}}
          .card-handle 更换
        .link(v-else) +添加来源链接
</template>

<script>
import { mapActions } from 'vuex'
import { goodsList } from 'api'
import editHeader from '../../components/editHeader'
import categoryModal from '../../components/categoryModal'
export default {
  name: 'component_11_editor',
  components: {
    editHeader,
    categoryModal
  },
  props: {
    isLast: {
      type: Boolean,
      default: true
    },
    options: Object
  },
  data () {
    return {
      sourceModalShow: false,
      form: {
        pullToTop: false,
        title: '',
        source: {},
        query: {}
      }
    }
  },
  watch: {
    isLast (val) {
      if (!val) {
        this.form.pullToTop = false
      }
    },
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
      const keys = [ 'title', 'query', 'source' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!this.form[key].length && this.form[key].length >= 4
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    async sourceConfirm (source) {
      try {
        this.form.source = source
        this.form.query = { ...source.condition, modular_code: 'cascade' }
        this.form.linkType = 'category'
        this.sourceModalShow = false
        this.$emit('change', { options: {...this.form, isValid: this.isValid} })
      } catch ({msg}) {
        this.$message.error(msg)
      }
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
.editor {
  width: 400px;
}
.editor-contaienr {
  padding: 30px;
}
.editor-item {
  margin-bottom: 30px;
  &.required {
    .editor-item-title {
      &:before {
        content: '*';
        color: #C2212A;
        font-weight: 500;
      }
    }
  }
}
.editor-item-title {
  font-size: 14px;
  color: #151515;
  line-height: 20px;
  font-weight: 500;
}
.editor-item-content {
  margin-top: 10px;
}
.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  .checkbox-wrapper {
    height: 20px;
    width: 20px;
    position: relative;
  }
  .checkbox-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .checkbox-box {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 2px;
    &.checked {
      position: relative;
      background: #2CA9CB;
      border-color: #2CA9CB;
      &:after {
        position: absolute;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 10px;
        left: 6px;
        top: 2px;
        transform: rotate(45deg);
        width: 5px;
      }
    }
  }
  .checkbox-text {
    font-size: 12px;
    color: #333333;
    margin-left: 8px;
    user-select: none;
  }
}
.editor-item-tip {
  margin-top: 10px;
  line-height: 17px;
  font-size: 12px;
  color: #999999;
}
.input {
  appearance: none;
  outline:none;
  width: 100%;
  height: 36px;
  padding: 0 10px;
  background: #FFFFFF;
  border: 1px solid #D7D7D7;
  font-size: 12px;
  color: #333333;
}
.link {
  font-size: 12px;
  cursor: pointer;
  color: #2CA9CB;
}
.card {
  background: #F7F7F7;
  height: 66px;
  padding: 10px;
  display: flex;
  position: relative;
  cursor: pointer;
}
.card-cover {
  width: 46px;
  height: 46px;
  line-height: 46px;
  background: #DDDDDD;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
.card-wrapper {
  margin-left: 10px;
}
.card-title {
  font-size: 12px;
  line-height: 17px;
  color: #333333;
}
.card-subtitle {
  font-size: 12px;
  margin-top: 4px;
  color: #999999;
}
.card-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #FFFFFF;
  padding: 0 5px;
  height: 27px;
  line-height: 27px;
  background: #666666;
  cursor: pointer;
}
</style>
