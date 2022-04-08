<template lang="pug">
.editor-edit
  select-brand(v-if="selectBrandShow" modularCode="brand" @confirm="selectBrandConfirm" @cancel="selectBrandCancel")
  edit-header(headerInfo="营销-品牌展示")
  .editor-contaienr
    .editor-item.required
      .editor-item-title 模块标题
      .editor-item-content
        input.input(placeholder="最多8个字" maxlength="8" v-model="form.title" @blur="change")
    .editor-item.required
      .editor-item-title 品牌来源
      .editor-item-content(@click="openSelectBrand")
        .card(v-if="form.source.id")
          .card-cover.c-icon-moren
          .card-wrapper
            .card-title {{form.source.name}}
            .card-subtitle {{form.source.msg}}
          .card-handle 更换
        .link(v-else) +添加导航链接
</template>

<script>
// 横向滑动
import editHeader from '../../components/editHeader'
import selectBrand from './components/selectBrand'
export default {
  name: 'component_9_editor',
  components: {
    editHeader,
    selectBrand
  },
  props: {
    options: Object
  },
  data () {
    return {
      selectBrandShow: false,
      form: {
        title: '',
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
      const keys = [ 'title', 'query', 'source' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!Object.keys(this.form[key]).length
      })
    },
    selectBrandConfirm (option) {
      this.selectBrandShow = false
      this.form.source = option
      this.form.query = option.query
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    },
    selectBrandCancel () {
      this.selectBrandShow = false
    },
    openSelectBrand () {
      this.selectBrandShow = true
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
