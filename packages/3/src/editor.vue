<template lang="pug">
.edit
  edit-header(headerInfo="广告-轮播广告")
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
      .edit-form-item-title 图片显示尺寸
      .edit-form-item-bd
        .edit-form-item-select(v-clickoutside="handleStyleClose" @click="toggleOption") {{form.sizeValue}}
          .edit-form-item-select_info
          .edit-form-item-select_bd(v-if="showOption" transition="option")
            .edit-form-item-option(
              v-for="item in sizes"
              :lable="item.lable"
              @click="selectSize(item)"
            ) {{item.value}}
    .edit-form-item
      .edit-form-item-title 广告图片
      .edit-form-item-info 支持png，jpg格式图片。
      .edit-form-item-bd
        .banner-item(v-for="item, index in form.banners")
          .banner-item-header
            .banner-item-name 图片{{index + 1}}
            .banner-item-handle
              .banner-item-up(v-if="index != 0" @click="moveUp(item, index)") 上移
              .banner-item-del(@click="deletaImg(item, index)") 删除
          .banner-item-img(
            :style="{ 'height': `${form.size}px`, 'background-image': `url(${item.img})` }"
          )
            .banner-item-change(:ref="`uploader_${index}`" :id="`uploader_${index}`") 更换图片
          .banner-item-link(
            :data-showTooltip="item.showTooltip"
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
              :data-showTooltip="item.showTooltip"
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
              .banner-item-goods_price 共有{{item.category.num}}件商品
            .banner-item-goods_handle(
              :data-showTooltip="item.showTooltip"
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
    .edit-content-footer
      .edit-content-btn(ref="handleUploader")
        p +添加广告图片
        p （建议尺寸710*{{form.size * 2}}）
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
  name: 'component_3_editor',
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
      sizes: [
        {
          lable: 100,
          value: '显示尺寸710*200'
        }, {
          lable: 200,
          value: '显示尺寸710*400'
        }, {
          lable: 300,
          value: '显示尺寸710*600'
        }
      ],
      bannerIndex: null,
      showCategory: false,
      showCustomPages: false,
      showModal: false,
      showOption: false,
      showTooltip: false,
      form: {
        isValid: false,
        banners: [],
        size: 100,
        sizeValue: '显示尺寸710*200'
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
    'form.banners' (val) {
      if (val.length) {
        this.form.isValid = true
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.initUploader()
        }, 500)
      } else {
        this.form.isValid = false
      }
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    confirmCustomPages (item) {
      this.form.banners[this.bannerIndex].pageId = item.id
      this.form.banners[this.bannerIndex].pageName = item.name
      this.form.banners[this.bannerIndex].linkType = 'customPage'
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
      this.form.banners[this.bannerIndex].category = item
      this.form.banners[this.bannerIndex].linkType = 'category'
      this.$emit('change', { options: { ...this.form } })
      this.showCategory = false
    },
    closeModal () {
      this.showModal = false
    },
    changeGoods (item) {
      this.form.banners[this.bannerIndex].goods = item
      this.form.banners[this.bannerIndex].linkType = 'goods'
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
    selectSize (item) {
      this.form.size = item.lable
      this.form.sizeValue = item.value
      this.$emit('change', { options: { ...this.form } })
    },
    moveUp (item, index) {
      this.form.banners[index] = this.form.banners.splice(index - 1, 1, this.form.banners[index])[0]
      this.$emit('change', { options: { ...this.form } })
    },
    deletaImg (item, index) {
      this.form.banners.splice(index, 1)
      this.$emit('change', { options: { ...this.form } })
      this.initHandleUploader()
    },
    initUploader () {
      try {
        let that = this
        this.form.banners.forEach((item, index) => {
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
            },
            type_max_file_count: {
              'jpg,jpeg,png,bmp,gif': 5,
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
    },
    initHandleUploader () {
      try {
        let that = this
        let num = 5 - this.form.banners.length
        const opts = {
          browse_button: this.$refs.handleUploader,
          multi_selection: true,
          auto_start: false,
          mime_types: [
            { title: 'Image files', extensions: 'jpg,jpeg,png,bmp' }
            // { title: 'Video files', extensions: 'flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4' }
          ],
          max_file_size: '2mb',
          type_max_file_size: {
            'jpg,jpeg,png,bmp,': 10485760
          },
          type_max_file_count: {
            'jpg,jpeg,png,bmp,gif': num,
          }
        }
        this.newUploader = new Uploader(opts)
        // newUploader.bind('BeforeUpload', (up, file) => {
        // })
        this.newUploader.bind('FilesAdded', (up, file) => {
          // console.log(that.form.banners)
          if (up.fileAdditionError) {
            that.$message.error('广告图最多添加5张')
          } else {
            this.newUploader.start()
          }
        })
        this.newUploader.bind('FileUploaded', (up, file, info) => {
          that.form.banners.push({ img: `${up.domain}${JSON.parse(info).key}`, showTooltip: false, goods: {}, category: {}, linkType: '' })
        })
        this.newUploader.bind('Error', (up, err, errTip) => {
          if (err.code === -600) {
            const ext = err.file.name.split('.').splice(-1)[0]
            if ('jpg,jpeg,png,bmp,gif'.indexOf(ext) > -1) that.$message.error('抱歉，您选择的图片超过 2 M')
          } else {
            that.$message.error(errTip)
          }
        })
        this.newUploader.bind('UploadComplete', (up, files) => {
          that.$emit('change', { options: { ...that.form } })
        })
        this.newUploader.init()
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  mounted () {
    this.initHandleUploader()
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
      &:before {
        content: '*';
        color: #C2212A;
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
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
  height: 54px;
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
</style>
