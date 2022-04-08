<template lang="pug">
.edit
  select-link-modal(
    :modularCode="modularCode"
    v-if="showModal"
    @close="closeModal"
    @change="changeGroup"
  )
  edit-header(headerInfo="营销-特价爆款")
  .edit-content
    .edit-form-item
      .edit-form-item-title 特价爆款来源
      .edit-form-item-bd
          .edit-form-item-link(@click="change" v-if="!form.id") +添加导航链接
          .edit-form-item-container(v-else)
            .edit-form-item-body
              .edit-form-item-body_btn(@click="change") 更换
              .edit-form-item-icon
                .c-icon-moren
              .edit-form-item_info
                .edit-form-item_name {{form.name}}
                .edit-form-item_num 共有{{form.num}}个组合
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import selectLinkModal from '../../components/selectLinkModal'
export default {
  name: 'component_7_editor',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    editHeader,
    selectLinkModal
  },
  data () {
    return {
      modularCode: 'explosive',
      showModal: false,
      form: {}
    }
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
      const keys = [ 'query' ]
      return keys.every(key => {
        if (typeof this.form[key] === 'string') return !!this.form[key]
        if (typeof this.form[key] === 'object' && this.form[key] instanceof Array) return !!Object.keys(this.form[key]).length
        if (typeof this.form[key] === 'object') return !!Object.keys(this.form[key]).length
      })
    },
    change () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    changeGroup (item) {
      this.form = {...this.form, ...item}
      this.showModal = false
      this.$emit('change', { options: {...this.form, isValid: this.isValid} })
    }
  },
  mounted () {},
  created () {
    this.form = { ...this.form, ...this.options }
  },
}
</script>

<style lang="scss" scoped>
.edit {
  .edit-content {
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
  }
  .edit-form-item-bd {
    .edit-form-item-input {
      width: 100%;
      height: 36px;
      input {
        width: 100%;
        height: 100%;
        padding: 9.5px 10px;
        background: #FFFFFF;
        border: 1px solid #D7D7D7;
        font-size: 12px;
        color: #333333;
      }
    }
    .edit-form-item-link {
      font-size: 14px;
      color: #2CA9CB;
      line-height: 20px;
      cursor: pointer;
    }
    .edit-form-item-container {
      width: 100%;
      height: 66px;
      background: #F7F7F7;
      .edit-form-item-body {
        position: relative;
        display: flex;
        align-items: center;
        padding: 10px;
        .edit-form-item-body_btn {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 27px;
          right: 0;
          bottom: 0;
          background: #666666;
          font-size: 12px;
          color: #FFFFFF;
          line-height: 17px;
          cursor: pointer;
        }
      }
      .edit-form-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        background: #DDDDDD;
        .c-icon-moren {
          font-size: 17px;
          color: #fff;
        }
      }
      .edit-form-item_info {
        margin-left: 10px;
      }
      .edit-form-item_name {
        font-size: 12px;
        color: #333333;
        line-height: 17px;
      }
      .edit-form-item_num {
        margin-top: 4px;
        font-size: 12px;
        color: #999999;
        line-height: 17px;
      }
    }
  }
}
.option-enter, .option-leave {
  opacity: 0
}
</style>
