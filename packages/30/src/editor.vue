<template lang="pug">
.edit
  edit-header(headerInfo="广告-联动banner")
  category-modal(
    v-if="showCategory"
    modularCode="nav_banner"
    @close="closeCategoryModal"
    @confirm="confirmCategory"
  )
  add-goods-modal(
    v-if="showModal"
    @close="closeModal"
    @changeGoods="changeGoods"
  )
  custom-pages(
    v-show="showCustomPages"
    @close="closeCustomPages"
    @confirm="confirmCustomPages"
  )
  .edit-content
    .edit-form-header
      .edit-form-title 导航
      .edit-form-add(@click="addNav") 添加
    .edit-form-subtitle 本模块支持添加多个导航
    .edit-form-item(v-for="nav,navIndex in form.navgations")
      .edit-form-item-hd
        .edit-form-item-hd-title 导航{{navIndex+1}}
        .edit-form-item-hd-handle(@click="deleteNav(navIndex)") 删除
      input.edit-form-item-name(v-model="nav.name" @blur="change" maxLength="4")
      .edit-form-item-bd
        .banner-item(v-for="item, index in nav.banners")
          .banner-item-header
            .banner-item-name 图片{{index + 1}}
            .banner-item-handle
              .banner-item-del(@click="deletaImg(navIndex, index)") 删除
          .banner-item-img
            img(:src="item.img" :ref="`change_uploader_${navIndex}_${index}`")
            .banner-item-change 更换图片
          .banner-item-link(
            v-clickoutside="handleTooltipClose"
            @click.stop="toggleTooltip(item)"
            v-if="!item.linkType"
          ) +添加广告链接（选填）
            .banner-item-tooltip(v-if="item.showTooltip")
              .banner-item-tooltip_li(@click="goodsLink(navIndex, index)") 单个商品链接
              .banner-item-tooltip_li(@click="showCategoryModal(navIndex, index)") 商品列表链接
              .banner-item-tooltip_li(@click="showCustomPagesModal(navIndex, index)") 微页面链接
          .banner-item-goods(v-if="item.linkType === 'goods'")
            .banner-item-goods_img
              img(:src="item.goods.original_img")
            .banner-item-goods_info
              .banner-item-goods_name {{item.goods.goods_name}}
              .banner-item-goods_price ¥{{item.goods.selling_price}}
            .banner-item-goods_handle(
              v-clickoutside="handleTooltipClose"
              @click.stop="toggleTooltip(item)"
            ) 更换
              .banner-item-tooltip(v-if="item.showTooltip")
                .banner-item-tooltip_li(@click="goodsLink(navIndex, index)") 单个商品链接
                .banner-item-tooltip_li(@click="showCategoryModal(navIndex, index)") 商品列表链接
                .banner-item-tooltip_li(@click="showCustomPagesModal(navIndex, index)") 微页面链接
          .banner-item-goods(v-if="item.linkType === 'category'")
            .banner-item-goods_img
              .c-icon-moren
            .banner-item-goods_info
              .banner-item-goods_name {{item.category.name}}
              .banner-item-goods_price 共有{{item.category.num}}件商品
            .banner-item-goods_handle(
              v-clickoutside="handleTooltipClose"
              @click.stop="toggleTooltip(item)"
            ) 更换
              .banner-item-tooltip(v-if="item.showTooltip")
                .banner-item-tooltip_li(@click="goodsLink(navIndex, index)") 单个商品链接
                .banner-item-tooltip_li(@click="showCategoryModal(navIndex, index)") 商品列表链接
                .banner-item-tooltip_li(@click="showCustomPagesModal(navIndex, index)") 微页面链接
          .banner-item-goods(v-if="item.linkType === 'customPage'")
            .banner-item-goods_img
              .c-icon-moren
            .banner-item-goods_info
              .banner-item-goods_name 微页面：{{item.pageName}}
            .banner-item-goods_handle(
              :data-showTooltip="item.showTooltip"
              v-clickoutside="handleTooltipClose"
              @click.stop="toggleTooltip(item)"
            ) 更换
              .banner-item-tooltip(v-if="item.showTooltip")
                .banner-item-tooltip_li(@click="goodsLink(navIndex, index)") 单个商品链接
                .banner-item-tooltip_li(@click="showCategoryModal(navIndex, index)") 商品列表链接
                .banner-item-tooltip_li(@click="showCustomPagesModal(navIndex, index)") 微页面链接
      .edit-form-item-uploader(v-show="form.navgations[navIndex]['banners'].length < 6")
        .edit-form-item-uploader-wrapper(:ref="`add_uploader_${navIndex}`")
          p.edit-form-item-uploader-title +添加广告图片(最多可添加6张)
          p.edit-form-item-uploader-subtitle (图片建议尺寸640*810）
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import addGoodsModal from '../../components/addGoodsModal'
import categoryModal from '../../components/categoryModal'
import customPages from '../../components/customPages'
import Uploader from '../../../utils/uploader'
export default {
  name: 'component_30_editor',
  props: {
    options: Object
  },
  components: {
    editHeader,
    categoryModal,
    addGoodsModal,
    customPages
  },
  data () {
    return {
      navIndex: null,
      bannerIndex: null,
      showCategory: false,
      showCustomPages: false,
      showModal: false,
      showOption: false,
      showTooltip: false,
      form: {
        navgations: []
      }
    }
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
  computed: {
    valid () {
      return !!(this.form.navgations.length && this.form.navgations.every(nav => {
        return nav.name && nav.banners.length
      }))
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    deleteNav (index) {
      this.form.navgations.splice(index, 1)
      this[`add_uploader_${index}`] = null
    },
    change () {
      this.$emit('change', { options: {...this.form, isValid: this.valid} })
    },
    addNav () {
      this.form.navgations.push({
        name: `导航${this.form.navgations.length + 1}`,
        banners: []
      })
      this.$emit('change', { options: { ...this.form, isValid: this.valid } })
      this.$nextTick(() => {
        this.initAddUploader(this.form.navgations.length - 1)
      })
    },
    confirmCustomPages (item) {
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].pageId = item.id
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].pageName = item.name
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].linkType = 'customPage'
      this.$emit('change', { options: { ...this.form, isValid: this.valid } })
      this.showCustomPages = false
    },
    closeCustomPages () {
      this.showCustomPages = false
    },
    showCustomPagesModal (navIndex, index) {
      this.navIndex = navIndex
      this.bannerIndex = index
      this.showCustomPages = true
    },
    showCategoryModal (navIndex, index) {
      this.navIndex = navIndex
      this.bannerIndex = index
      this.showCategory = true
    },
    closeCategoryModal () {
      this.showCategory = false
    },
    confirmCategory (item) {
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].category = item
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].linkType = 'category'
      this.$emit('change', { options: { ...this.form, isValid: this.valid } })
      this.showCategory = false
    },
    closeModal () {
      this.showModal = false
    },
    changeGoods (item) {
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].goods = item
      this.form.navgations[this.navIndex]['banners'][this.bannerIndex].linkType = 'goods'
      this.$emit('change', { options: { ...this.form, isValid: this.valid } })
      this.showModal = false
    },
    toggleTooltip (item) {
      this.$set(item, 'showTooltip', !item.showTooltip)
    },
    goodsLink (navIndex, index) {
      this.navIndex = navIndex
      this.bannerIndex = index
      this.showModal = true
    },
    handleTooltipClose () {
      this.showTooltip = false
    },
    handleStyleClose () {
      this.showOption = false
    },
    toggleOption () {
      this.showOption = !this.showOption
    },
    deletaImg (navIndex, index) {
      this.form.navgations[navIndex].banners.splice(index, 1)
      this[`change_uploader_${index}`] = null
      this.$emit('change', { options: { ...this.form, isValid: this.valid } })
    },
    initAddUploader (index) {
      const opts = {
        browse_button: this.$refs[`add_uploader_${index}`],
        multi_selection: true,
        auto_start: true,
        mime_types: [
          { title: 'Image files', extensions: 'jpg,jpeg,png,bmp' }
        ],
        max_file_size: '2mb'
      }
      this[`add_uploader_${index}`] = new Uploader(opts)
      this[`add_uploader_${index}`].bind('FilesAdded', (up, file) => {
        if (up.fileAdditionError) this.$message.error(up.fileAdditionError)
      })
      this[`add_uploader_${index}`].bind('FileUploaded', (up, file, info) => {
        this.form.navgations[index]['banners'].push({
          img: `${up.domain}${JSON.parse(info).key}`
        })
        this.$nextTick(() => {
          this.initChangeUploader(this.form.navgations[index]['banners'].length - 1, index)
        })
      })
      this[`add_uploader_${index}`].bind('Error', (up, err, errTip) => {
        if (err.code === -600) {
          const ext = err.file.name.split('.').splice(-1)[0]
          if ('jpg,jpeg,png,bmp,gif'.indexOf(ext) > -1) this.$message.error('抱歉，您选择的图片超过 2 M')
        } else {
          this.$message.error(errTip)
        }
      })
      this[`add_uploader_${index}`].bind('UploadComplete', (up, files) => {
        this.$emit('change', { options: { ...this.form, isValid: this.valid } })
      })
      this[`add_uploader_${index}`].init()
    },
    initChangeUploader (index, navIndex) {
      const opts = {
        browse_button: this.$refs[`change_uploader_${navIndex}_${index}`],
        multi_selection: true,
        auto_start: true,
        mime_types: [
          { title: 'Image files', extensions: 'jpg,jpeg,png,bmp' }
        ],
        max_file_size: '2mb'
      }
      this[`change_uploader_${navIndex}_${index}`] = new Uploader(opts)
      this[`change_uploader_${navIndex}_${index}`].bind('FilesAdded', (up, file) => {
        if (up.fileAdditionError) this.$message.error(up.fileAdditionError)
      })
      this[`change_uploader_${navIndex}_${index}`].bind('FileUploaded', (up, file, info) => {
        this.$set(this.form.navgations[navIndex]['banners'][index], 'img', `${up.domain}${JSON.parse(info).key}`)
      })
      this[`change_uploader_${navIndex}_${index}`].bind('Error', (up, err, errTip) => {
        if (err.code === -600) {
          const ext = err.file.name.split('.').splice(-1)[0]
          if ('jpg,jpeg,png,bmp,gif'.indexOf(ext) > -1) this.$message.error('抱歉，您选择的图片超过 2 M')
        } else {
          this.$message.error(errTip)
        }
      })
      this[`change_uploader_${navIndex}_${index}`].bind('UploadComplete', (up, files) => {
        this.$emit('change', { options: { ...this.form, isValid: this.valid } })
      })
      this[`change_uploader_${navIndex}_${index}`].init()
    }
  },
  created () {
    this.form = { ...this.form, ...this.options }
  },
  mounted () {
    this.form.navgations.forEach((nav, navIndex) => {
      this.initAddUploader(navIndex)
      nav.banners.forEach((item, index) => {
        this.initChangeUploader(index, navIndex)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.edit {
  .edit-content {
    padding: 30px;
    .edit-form-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .edit-form-title {
      font-size: 14px;
      color: #151515;
      font-weight: 600;
      &:before {
        content: '*';
        font-size: 14px;
        color: #C2212A;
      }
    }
    .edit-form-add {
      font-size: 14px;
      color: #45B0D7;
      cursor: pointer;
    }
    .edit-form-subtitle {
      margin-top: 20px;
      font-size: 14px;
      color: #333333;
    }
    .edit-form-item {
      margin-top: 20px;
      margin-bottom: 30px;
      padding: 14px 20px;
      background: #FFFFFF;
      border: 1px solid #D7D7D7;
    }
    .edit-form-item-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .edit-form-item-hd-title {
      font-size: 14px;
      color: #333333;
    }
    .edit-form-item-hd-handle {
      font-size: 12px;
      color: #FF0000;
      cursor: pointer;
    }
    .edit-form-item-name {
      margin-top: 20px;
      width: 100%;
      height: 47px;
      border: 1px solid #D7D7D7;
      font-size: 14px;
      color: #333333;
      padding: 0 20px;
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
      &.edit-form-item-title_im {
        &:before {
          content: '*';
          color: #C2212A;
        }
      }
    }
  }
  .edit-form-item-bd {
    .edit-form-item-select {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 36px;
      padding: 0 10px;
      background: #FFFFFF;
      border: 1px solid #D7D7D7;
      font-size: 12px;
      color: #333333;
      cursor: pointer;
      .edit-form-item-select_info {
        position: absolute;
        width: 0;
        height: 0;
        right: 10px;
        top: 50%;
        transform: translateY(-30%);
        border-width: 4px;
        border-color: #000 transparent transparent transparent;
        border-style: solid;
      }
      .edit-form-item-select_bd {
        width: 100%;
        left: 0;
        top: 46px;
        position: absolute;
        padding: 5px 0;
        background: #FFFFFF;
        border: 1px solid #E5E5E5;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.08);
        border-radius: 2px;
        .edit-form-item-option {
           padding: 5px 10px;
           cursor: pointer;
           &:hover {
             background: #f5f7fa;
           }
        }
      }
    }
  }
}
.banner-item {
  position: relative;
  margin-top: 30px;
  .banner-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .banner-item-name {
      font-size: 12px;
      color: #333333;
    }
    .banner-item-handle {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999999;
      .banner-item-up {
        padding-right: 10px;
        border-right: 1px solid #D7D7D7;
        cursor: pointer;
      }
      .banner-item-del {
        padding-left: 10px;
        cursor: pointer;
        color: #FF0000;
      }
    }
  }
  .banner-item-img {
    position: relative;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    .banner-item-change {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      opacity: 0.5;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #FFFFFF;
      cursor: pointer;
    }
  }
  .banner-item-link {
    position: relative;
    font-size: 14px;
    color: #2CA9CB;
    margin-top: 15px;
    cursor: pointer;
    .banner-item-tooltip {
      top: 25px;
      left: 0;
    }
  }
}
.banner-item-tooltip {
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
  .banner-item-tooltip_li {
    padding: 5px 10px;
    line-height: 17px;
    &:hover {
      background: #f5f7fa;
    }
  }
}
.edit-form-item-uploader {
  margin-top: 20px;
  width: 100%;
  border: 1px dashed #2CA9CB;
  border-radius: 2px;
  font-size: 14px;
  color: #2CA9CB;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  padding: 7px;
  text-align: center;
}
.edit-form-item-uploader-wrapper {
  width: 100%;
  height: 100%;
}
.edit-form-item-uploader-title {
  font-size: 14px;
  color: #2CA9CB;
  line-height: 20px;
}
.edit-form-item-uploader-subtitle {
  font-size: 14px;
  color: #3F3F3F;
  line-height: 20px;
}

.banner-item-goods {
  position: relative;
  display: flex;
  width: 100%;
  height: 66px;
  padding: 10px;
  margin-top: 15px;
  background: #F7F7F7;
  .banner-item-goods_img {
    min-width: 46px;
    min-height: 46px;
    background: #DDDDDD;
    display: flex;
    align-items: center;
    justify-content: center;
    .c-icon-moren {
      font-size: 17px;
      color: #fff;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .banner-item-goods_info {
    flex: 1;
    margin-left: 10px;
    .banner-item-goods_name {
      font-size: 12px;
      color: #333333;
      line-height: 17px;
      max-width: 220px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .banner-item-goods_price {
      font-size: 12px;
      color: #999999;
      line-height: 17px;
      margin-top: 4px;
    }
  }
  .banner-item-goods_handle {
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
    .banner-item-tooltip {
      top: 35px;
      right: 0;
    }
  }
}
.option-enter, .option-leave {
  opacity: 0
}
.edit-form-item_checkbox {
  display: inline-block
}
.edit-form-item-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.checkbox-label {
  margin-left: 10px;
  font-size: 12px;
  color: #333333;
}
.checkbox {
  width: 20px;
  height: 20px;
  background: #F0F0F0;
  border: 1px solid #DDDDDD;
  border-radius: 2px;
  cursor: pointer;
  &.checkbox_active {
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
</style>
