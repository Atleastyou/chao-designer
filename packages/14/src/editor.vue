<template lang="pug">
.edit
  edit-header(headerInfo="广告-三张广告")
  category-modal(
    v-if="showCategory"
    modularCode="wheel_ad"
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
    .edit-form-item
      .edit-form-item-title.edit-form-item-title_im 广告图片
      .edit-form-item-info 大图尺寸346*420，小图尺寸346*200，支持png，jpg格式图片。
      .edit-form-item-bd
        .banner-item(v-for="item, index in form.advers")
          .banner-item-header
            .banner-item-name 图片{{index + 1}}
          .banner-item-img(:ref="`uploader_${index}`" :id="`uploader_${index}`")
            img(:src="item.img || defaultImg")
            .banner-item-change 上传图片
          .banner-item-link(
            v-clickoutside="handleTooltipClose"
            @click.stop="toggleTooltip(item)"
            v-if="!item.linkType"
          ) +添加广告链接（选填）
            .banner-item-tooltip(v-if="item.showTooltip")
              .banner-item-tooltip_li(@click="goodsLink(index)") 单个商品链接
              .banner-item-tooltip_li(@click="showCategoryModal(index)") 商品列表链接
              .banner-item-tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
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
                .banner-item-tooltip_li(@click="goodsLink(index)") 单个商品链接
                .banner-item-tooltip_li(@click="showCategoryModal(index)") 商品列表链接
                .banner-item-tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
          .banner-item-goods(v-if="item.linkType === 'category'")
            .banner-item-goods_img
              .c-icon-moren
            .banner-item-goods_info
              .banner-item-goods_name {{item.category.name}}
              .banner-item-goods_price {{item.category.msg}}
            .banner-item-goods_handle(
              v-clickoutside="handleTooltipClose"
              @click.stop="toggleTooltip(item)"
            ) 更换
              .banner-item-tooltip(v-if="item.showTooltip")
                .banner-item-tooltip_li(@click="goodsLink(index)") 单个商品链接
                .banner-item-tooltip_li(@click="showCategoryModal(index)") 商品列表链接
                .banner-item-tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
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
                .banner-item-tooltip_li(@click="goodsLink(index)") 单个商品链接
                .banner-item-tooltip_li(@click="showCategoryModal(index)") 商品列表链接
                .banner-item-tooltip_li(@click="showCustomPagesModal(index)") 微页面链接
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import addGoodsModal from '../../components/addGoodsModal'
import categoryModal from '../../components/categoryModal'
import customPages from '../../components/customPages'
import Uploader from '../../../utils/uploader'
let timer = null
export default {
  name: 'component_14_editor',
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
      bannerIndex: null,
      showCategory: false,
      showCustomPages: false,
      showModal: false,
      showOption: false,
      showTooltip: false,
      defaultImg: 'https://static.chaodp.com/designer/bj_banner05.png',
      form: {
        isValid: false,
        advers: [
          {
            img: '',
            showTooltip: false,
            goods: {},
            category: {},
            linkType: ''
          }, {
            img: '',
            showTooltip: false,
            goods: {},
            category: {},
            linkType: ''
          }, {
            img: '',
            showTooltip: false,
            goods: {},
            category: {},
            linkType: ''
          }
        ]
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
  watch: {
    'form.advers': {
      handler: function (val) {
        let num = 0
        val.forEach(item => {
          if (item.img) num++
        })
        if (val.length == num) {
          this.form.isValid = true
        } else {
          this.form.isValid = false
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    confirmCustomPages (item) {
      this.form.advers[this.bannerIndex].pageId = item.id
      this.form.advers[this.bannerIndex].pageName = item.name
      this.form.advers[this.bannerIndex].linkType = 'customPage'
      this.$emit('change', { options: { ...this.form } })
      this.showCustomPages = false
    },
    closeCustomPages () {
      this.showCustomPages = false
    },
    showCustomPagesModal (index) {
      this.bannerIndex = index
      this.showCustomPages = true
    },
    showCategoryModal (index) {
      this.bannerIndex = index
      this.showCategory = true
    },
    closeCategoryModal () {
      this.showCategory = false
    },
    confirmCategory (item) {
      this.form.advers[this.bannerIndex].category = item
      this.form.advers[this.bannerIndex].linkType = 'category'
      this.$emit('change', { options: { ...this.form } })
      this.showCategory = false
    },
    closeModal () {
      this.showModal = false
    },
    changeGoods (item) {
      this.form.advers[this.bannerIndex].goods = item
      this.form.advers[this.bannerIndex].linkType = 'goods'
      this.$emit('change', { options: { ...this.form } })
      this.showModal = false
    },
    toggleTooltip (item) {
      item.showTooltip = !item.showTooltip
    },
    goodsLink (index) {
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
    initUploader () {
      try {
        let that = this
        this.form.advers.forEach((item, index) => {
          const opts = {
            browse_button: this.$refs[`uploader_${index}`],
            multi_selection: true,
            auto_start: true,
            mime_types: [
              { title: 'Image files', extensions: 'jpg,jpeg,png,bmp' }
              // { title: 'Video files', extensions: 'flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4' }
            ],
            max_file_size: '2mb',
            type_max_file_size: {
              'jpg,jpeg,png,bmp,': 10485760
            }
          }
          let newUploader = new Uploader(opts)
          newUploader.bind('FilesAdded', (up, file) => {
            if (up.fileAdditionError) {
              that.$message.error(up.fileAdditionError)
            }
          })
          newUploader.bind('FileUploaded', (up, file, info) => {
            that.$set(item, 'img', `${up.domain}${JSON.parse(info).key}`)
          })
          newUploader.bind('Error', (up, err, errTip) => {
            if (err.code === -600) {
              const ext = err.file.name.split('.').splice(-1)[0]
              if ('jpg,jpeg,png,bmp,gif'.indexOf(ext) > -1) that.$message.error('抱歉，您选择的图片超过 2 M')
            } else {
              that.$message.error(errTip)
            }
          })
          newUploader.bind('UploadComplete', (up, files) => {
            that.$emit('change', { options: { ...that.form } })
          })
          newUploader.init()
        })
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  mounted () {
    this.initUploader()
  },
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
      }
    }
  }
  .banner-item-img {
    position: relative;
    width: 100%;
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
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
.edit-content-btn {
  width: 100%;
  height: 34px;
  border: 1px dashed #2CA9CB;
  border-radius: 2px;
  font-size: 14px;
  color: #2CA9CB;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  p {
    line-height: 20px;
  }
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
  .banner-item-goods_info {
    flex: 1;
    margin-left: 10px;
    .banner-item-goods_name {
      font-size: 12px;
      color: #333333;
      line-height: 17px;
      max-width: 264px;
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
