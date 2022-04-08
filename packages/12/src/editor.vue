<template lang="pug">
.edit
  edit-header(headerInfo="导航-左滑图片导航")
  category-modal(
    v-if="showCategory"
    modularCode="topdown_nav"
    @close="closeCategoryModal"
    @confirm="confirmCategory"
  )
  icon-modal(
    v-if="showIconModal"
    @close="closeIocnModal"
    @change="confirmIocn"
  )
  custom-pages(
    v-show="showCustomPages"
    @close="closeCustomPages"
    @confirm="confirmCustomPages"
  )
  .edit-content
    .edit-form-item
      .edit-form-item-title 导航
      .edit-form-item-info 本模块支持添加6个导航。
      .edit-form-item-bd(v-for="item, index in form.navbars")
        .edit-form-item_header
          .edit-form-item_title 导航{{index + 1}}
          .edit-form-item_handle
            span(v-if="index != 0" @click="moveUp(item, index)") 上移
            span.edit-form-item_handle-del(v-if="index >= 6" @click="deletaImg(item, index)") 删除
        .edit-form-item_img(v-if="item.icon" @click="selectIcon(index)")
          img(:src="item.icon")
        .edit-form-item_upload(v-else @click="selectIcon(index)")
          .c-icon-add
        .edit-form-item_input
          input(placeholder="导航名称，最多4个字" maxlength="4" v-model="item.icon_name" @change="changeName(item)")
        .edit-form-item_category(v-if="item.linkType === 'category'")
          .category-item-goods_img
            .c-icon-moren
          .category-item-goods_info
            .category-item-goods_name {{item.category.name}}
            .category-item-goods_price {{item.category.msg}}
          .category-item-goods_handle(@click="toggleTooltip(item)") 更换
            .tooltip(v-if="item.showTooltip" style="top: 27px; right: 0")
              .tooltip_li(@click="addLink(index)") 商品列表链接
              .tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
        .edit-form-item_category(v-if="item.linkType === 'customPage'")
          .category-item-goods_img
            .c-icon-moren
          .category-item-goods_info
            .category-item-goods_name 微页面：{{item.pageName}}
          .category-item-goods_handle(@click="toggleTooltip(item)") 更换
            .tooltip(v-if="item.showTooltip" style="top: 27px; right: 0")
              .tooltip_li(@click="addLink(index)") 商品列表链接
              .tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
        .edit-form-item_link(v-if="!item.linkType" @click.stop="toggleTooltip(item)") +添加导航链接
          .tooltip(v-if="item.showTooltip")
            .tooltip_li(@click="addLink(index)") 商品列表链接
            .tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import categoryModal from '../../components/categoryModal'
import customPages from '../../components/customPages'
import iconModal from '../../components/iconModal'
let timer = null
export default {
  name: 'component_12_editor',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          navbars: [
            { icon: '', icon_name: '' }, 
            { icon: '', icon_name: '' },
            { icon: '', icon_name: '' },
            { icon: '', icon_name: '' },
            { icon: '', icon_name: '' },
            { icon: '', icon_name: '' }
          ]
        }
      }
    }
  },
  components: {
    editHeader,
    categoryModal,
    iconModal,
    customPages
  },
  data () {
    return {
      showCustomPages: false,
      showIconModal: false,
      showCategory: false,
      selectIndex: null,
      form: {
        navbars: [
          { icon: '', icon_name: '' }, 
          { icon: '', icon_name: '' },
          { icon: '', icon_name: '' },
          { icon: '', icon_name: '' },
          { icon: '', icon_name: '' },
          { icon: '', icon_name: '' }
        ]
      }
    }
  },
  computed: {
    isValid () {
      return this.form.navbars.every(item => item.icon && item.icon_name)
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    confirmCustomPages (item) {
      this.form.navbars[this.selectIndex].pageId = item.id
      this.form.navbars[this.selectIndex].pageName = item.name
      this.form.navbars[this.selectIndex].linkType = 'customPage'
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
      this.showCustomPages = false
    },
    closeCustomPages () {
      this.showCustomPages = false
    },
    showCustomPagesModal (index) {
      this.selectIndex = index
      this.showCustomPages = true
    },
    toggleTooltip (item) {
      this.$set(item, 'showTooltip', !item.showTooltip)
    },
    addNav () {
      this.form.navbars.push({ icon: '', icon_name: '' })
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
    },
    selectIcon (index) {
      this.showIconModal = true
      this.selectIndex = index
    },
    closeIocnModal () {
      this.showIconModal = false
    },
    confirmIocn (item) {
      this.form.navbars[this.selectIndex].icon = item.icon
      this.showIconModal = false
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
    },
    changeName (item) {
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
    },
    addLink (index) {
      this.showCategory = true
      this.selectIndex = index
    },
    moveUp (item, index) {
      this.form.navbars[index] = this.form.navbars.splice(index - 1, 1, this.form.navbars[index])[0]
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
    },
    deletaImg (item, index) {
      this.form.navbars.splice(index, 1)
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
    },
    closeCategoryModal () {
      this.showCategory = false
    },
    confirmCategory (item) {
      this.form.navbars[this.selectIndex].category = item
      this.form.navbars[this.selectIndex].linkType = 'category'
      this.$emit('change', { options: { ...this.form, isValid: this.isValid } })
      this.showCategory = false
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
    .edit-form-item_handle {
      font-size: 12px;
      color: #999999;
      line-height: 17px;
      span {
        cursor: pointer;
        padding-right: 10px;
      }
      .edit-form-item_handle-del {
        padding-left: 10px;
        padding-right: 0;
        border-left: 1px solid #999;
      }
    }
  }
  .edit-form-item-bd {
    margin-top: 30px;
    .edit-form-item_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .edit-form-item_title {
      font-size: 12px;
      color: #333333;
    }
    .edit-form-item_img {
      width: 80px;
      height: 80px;
      margin-top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .edit-form-item_upload {
      width: 80px;
      height: 80px;
      margin-top: 10px;
      border: 1px dashed #999999;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
      .c-icon-add {
        font-size: 20px;
        color: #999;
      }
    }
    .edit-form-item_input {
      width: 100%;
      height: 36px;
      margin-top: 10px;
      input {
        width: 100%;
        height: 100%;
        padding: 9.5px 10px;
        background: #FFFFFF;
        border: 1px solid #D7D7D7;
        font-size: 12px;
      }
    }
    .edit-form-item_link {
      margin-top: 15px;
      line-height: 20px;
      font-size: 14px;
      color: #2CA9CB;
      cursor: pointer;
      position: relative;
    }
    .tooltip {
      position: absolute;
      width: 160px;
      padding: 5px 0;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.08);
      border-radius: 2px;
      z-index: 99;
      font-size: 12px;
      color: #333333;
      .tooltip_li {
        padding: 5px 10px;
        line-height: 17px;
        &:hover {
          background: #f5f7fa;
        }
      }
    }
  }
}
.edit-form-item_category {
  position: relative;
  display: flex;
  width: 100%;
  height: 66px;
  padding: 10px;
  margin-top: 15px;
  background: #F7F7F7;
  .category-item-goods_img {
    width: 46px;
    height: 46px;
    background: #DDDDDD;
    display: flex;
    align-items: center;
    justify-content: center;
    .c-icon-moren {
      font-size: 17px;
      color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .category-item-goods_info {
    flex: 1;
    margin-left: 10px;
    .category-item-goods_name {
      font-size: 12px;
      color: #333333;
      line-height: 17px;
      max-width: 264px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .category-item-goods_price {
      font-size: 12px;
      color: #999999;
      line-height: 17px;
      margin-top: 4px;
    }
  }
  .category-item-goods_handle {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 34px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #FFFFFF;
    background: #666666;
    cursor: pointer;
    .category-item-tooltip {
      top: 35px;
      right: 0;
    }
  }
}
.edit-form-item_btn {
  width: 100%;
  height: 34px;
  border: 1px dashed #2CA9CB;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #2CA9CB;
  cursor: pointer;
}
.option-enter, .option-leave {
  opacity: 0
}
</style>
