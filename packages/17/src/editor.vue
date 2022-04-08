<template lang="pug">
.edit
  edit-header(headerInfo="基础模块-VR全景图")
  vr-modal(v-if="show" @close="closeVrModal" @confirm="confirmVrModal")
  .edit-content
    .edit-form-item
      .edit-form-item-title.edit-form-item-title_im 选择VR案例
      .edit-form-item-bd_btn(@click="openModal" v-if="!form.id") +添加VR案例
      .edit-form-item_goods(v-else)
        .goods-item
          .goods-item-header
            .goods-item-title 案例
            .goods-item-handle(@click="deleteCase") 删除
          .goods-item-bd
            .goods-item-img(:style="{'background-image': `url(${form.cover})`}")
            .goods-item-bd_info
              .goods-item-name {{form.title}}
            .goods-item-bd_btn(@click="changeCase") 更换
</template>

<script>
import editHeader from '../../components/editHeader'
import vrModal from '../../components/vrModal'
export default {
  name: 'component_17_editor',
  components: {
    editHeader,
    vrModal
  },
  props: {
    options: Object
  },
  data () {
    return {
      show: false,
      form: {}
    }
  },
  computed: {
    isValid () {
      return !!this.form.id
    }
  },
  methods: {
    openModal () {
      this.show = true
    },
    deleteCase () {
      this.form = {}
      this.$emit('change', { options: { ...this.form, isValid: this.isValid} })
    },
    changeCase () {
      this.show = true
    },
    closeVrModal () {
      this.show = false
    },
    confirmVrModal (data) {
      this.form = data
      this.show = false
      this.$emit('change', { options: { ...this.form, isValid: this.isValid} })
    }
  },
  mounted () {},
  created () {
    this.form = { ...this.form, ...this.options }
    console.log(this.form)
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
</style>
