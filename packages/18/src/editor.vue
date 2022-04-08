<template lang="pug">
.edit
  edit-header(headerInfo="广告-自定义广告热区")
  category-modal(
    v-if="showCategory"
    modularCode="wheel_ad"
    @close="closeCategoryModal"
    @confirm="confirmCategory"
  )
  add-goods-modal(
    v-if="showGoods"
    @close="closeGoodsModal"
    @changeGoods="confirmGoods"
  )
  custom-pages(
    v-show="showCustomPages"
    @close="closeCustomPagesModal"
    @confirm="confirmCustomPages"
  )
  .edit-content
    .edit-form-item
      .edit-form-item-title.edit-form-item-title_im 广告图片
      .edit-form-item-info 图片尺寸不限，支持png，jpg格式图片。
    .edit-content-footer(v-show="!form.cover")
      .edit-content-btn(ref="handleUploader")
        p +添加广告图片
    .hot-point(v-show="form.cover")
      .hot-point-header
        .hot-point-title 热区
        .hot-point-uploader(@click="changeCover") 更换图片
      .hot-point-list
        img.hot-point-image(:src="form.cover" ref="cover")
        template(v-if="imageWidth && imageHeight")
          VueDragResize.hot-point-item(
            v-for="item, index in form.points"
            :key="index"
            :isActive="true"
            :parentLimitation="true"
            :preventActiveBehavior="true"
            :w="item.width * imageWidth"
            :h="item.height * imageHeight"
            :minw="30"
            :minh="30"
            :parentW="imageWidth"
            :parentH="imageHeight"
            :x="item.left * imageWidth"
            :y="item.top * imageHeight"
            :z="index"
            :stickSize="8"
            :sticks="['tl', 'tr', 'br', 'bl']"
            @dragstop="changePoint(arguments[0], index)"
            @resizestop="changePoint(arguments[0], index)"
          )
            .hot-point-index {{index + 1}}
      .hot-point-add(@click="addHotPoint") +添加新热区
    .link-list
      .link-item(v-for="item,index in form.points")
        .link-header
          .link-header-title 热区{{index + 1}}
          .link-header-delete(@click="deleteHotPoint(index)") 删除
        .link-add(v-if="!item.linkType" @click.stop="toggleTooltip(index)") +添加广告链接
          .tooltip(v-show="item.showTooltip")
            .tooltip-item(@click="showGoodsModal(index)") 单个商品链接
            .tooltip-item(@click="showCategoryModal(index)") 商品列表链接
            .tooltip-item(@click="showCustomPagesModal(index)") 微页面链接
        .card(v-else)
          template(v-if="item.linkType === 'goods'")
            .card-cover
              img(:src="item.goods.original_img")
            .card-wrapper
              .card-title {{item.goods.goods_name}}
              .card-subtitle ¥{{item.goods.selling_price}}
          template(v-if="item.linkType === 'category'")
            .card-cover
              .c-icon-moren
            .card-wrapper
              .card-title {{item.category.name}}
              .card-subtitle 共有{{item.category.num}}件商品
          template(v-if="item.linkType === 'customPage'")
            .card-cover
              .c-icon-moren
            .card-wrapper
              .card-title 微页面：{{item.pageName}}
          .card-handle(@click.stop="toggleTooltip(index)") 更换
            .tooltip(v-show="item.showTooltip")
              .tooltip-item(@click="showGoodsModal(index)") 单个商品链接
              .tooltip-item(@click="showCategoryModal(index)") 商品列表链接
              .tooltip-item(@click="showCustomPagesModal(index)") 微页面链接
</template>

<script>
import editHeader from '../../components/editHeader'
import addGoodsModal from '../../components/addGoodsModal'
import categoryModal from '../../components/categoryModal'
import customPages from '../../components/customPages'
import Uploader from '../../../utils/uploader'
import VueDragResize from 'vue-drag-resize'
export default {
  name: 'component_18_editor',
  components: {
    editHeader,
    addGoodsModal,
    categoryModal,
    customPages,
    VueDragResize
  },
  props: {
    options: Object
  },
  data () {
    return {
      showCategory: false,
      showGoods: false,
      showCustomPages: false,
      pointWidth: 120,
      pointHeight: 80,
      imageWidth: 0,
      imageHeight: 0,
      currentPoint: '',
      form: {
        cover: '',
        points: []
      }
    }
  },
  watch: {
    'form.cover' (cover) {
      if (!cover) return
      const image = new Image()
      image.src = cover
      image.onload = () => {
        this.$nextTick(() => {
          this.imageWidth = this.$refs.cover.width
          this.imageHeight = this.$refs.cover.height
        })
      }
    }
  },
  methods: {
    isValid () {
      return this.form.cover && this.form.points.every(item => !!item.linkType)
    },
    confirmCategory (item) {
      this.form.points[this.currentPoint].category = item
      this.form.points[this.currentPoint].linkType = 'category'
      this.$emit('change', { options: { ...this.form, isValid: this.isValid() } })
      this.closeCategoryModal()
    },
    confirmGoods (item) {
      this.form.points[this.currentPoint].goods = item
      this.form.points[this.currentPoint].linkType = 'goods'
      this.$emit('change', { options: { ...this.form, isValid: this.isValid() } })
      this.closeGoodsModal()
    },
    confirmCustomPages (item) {
      this.form.points[this.currentPoint].pageId = item.id
      this.form.points[this.currentPoint].pageName = item.name
      this.form.points[this.currentPoint].linkType = 'customPage'
      this.$emit('change', { options: { ...this.form, isValid: this.isValid() } })
      this.closeCustomPagesModal()
    },
    closeCategoryModal () {
      this.showCategory = false
    },
    closeGoodsModal () {
      this.showGoods = false
    },
    closeCustomPagesModal () {
      this.showCustomPages = false
    },
    showGoodsModal (index) {
      this.currentPoint = index
      this.showGoods = true
    },
    showCategoryModal (index) {
      this.currentPoint = index
      this.showCategory = true
    },
    showCustomPagesModal (index) {
      this.currentPoint = index
      this.showCustomPages = true
    },
    handleTooltipClose (index) {
      this.form.points[index]['showTooltip'] = false
    },
    toggleTooltip (index) {
      this.form.points[index]['showTooltip'] = !this.form.points[index]['showTooltip']
    },
    changePoint (rect, index) {
      this.$set(this.form.points, index, {
        ...this.form.points[index],
        ...this.getPercent(rect)
      })
      this.$emit('change', { options: { ...this.form, isValid: this.isValid() } })
    },
    changeCover () {
      this.$confirm('更换图片后原链接等设置都将被删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$refs.handleUploader.nextSibling.children[0].click() // 手动唤起文件选择
      })
    },
    deleteHotPoint (index) {
      this.form.points.splice(index, 1)
      this.$emit('change', { options: { ...this.form, isValid: this.isValid() } })
    },
    addHotPoint () {
      if (this.form.points.length >= 9) {
        this.$message.error('最多添加9个热区')
        return
      }
      const rect = this.getPercent({
        width: this.pointWidth,
        height: this.pointHeight,
        left: this.imageWidth / 2 - (this.pointWidth / 2),
        top: this.imageHeight / 2 - (this.pointHeight / 2)
      })
      this.form.points.push({
        ...rect,
        showTooltip: false,
        target: {}
      })
      this.$emit('change', { options: { ...this.form, isValid: this.isValid() } })
    },
    // 因为在不同设备显示时，图片可能为不同大小，将热区信息转换为相对图片宽高的比例，在前端显示时热区大小、位置将等比图片。
    // 前端显示图片时，必须使用widthFix模式
    getPercent (rect) {
      return {
        width: rect.width / this.imageWidth,
        height: rect.height / this.imageHeight,
        left: rect.left / this.imageWidth,
        top: rect.top / this.imageHeight
      }
    },
    initHandleUploader () {
      let that = this
      const opts = {
        browse_button: this.$refs.handleUploader,
        multi_selection: false,
        replace: true,
        auto_start: true,
        mime_types: [
          { title: 'Image files', extensions: 'jpg,jpeg,png,bmp' }
        ],
        max_file_size: '2mb',
        type_max_file_size: {
          'jpg,jpeg,png,bmp,': 10485760
        }
      }
      this.newUploader = new Uploader(opts)
      this.newUploader.bind('FilesAdded', (up, file) => {
        this.form = { cover: '', points: [] }
        this.$emit('change', { options: { ...this.form, isValid: false } })
        if (up.fileAdditionError) that.$message.error(up.fileAdditionError)
      })
      this.newUploader.bind('FileUploaded', (up, file, info) => {
        this.form.cover = `${up.domain}${JSON.parse(info).key}`
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
        that.$emit('change', { options: { ...that.form, isValid: this.isValid() } })
      })
      this.newUploader.init()
    }
  },
  mounted () {
    this.initHandleUploader()
  },
  created () {
    this.form = { ...this.form, ...this.options }
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
}

.hot-point {
  margin-top: 30px;
}
.hot-point-header {
  display: flex;
  justify-content: space-between;
}
.hot-point-title {
  font-size: 12px;
  color: #333333;
}
.hot-point-uploader {
  font-size: 12px;
  color: #999999;
  cursor: pointer;
}
.hot-point-list {
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.hot-point-image {
  width: 100%;
  user-select: none;
}
.hot-point-item {
  cursor: move;
  &:before {
    outline: 1px dashed #D0021B!important;
    background: rgba(208,2,27,0.4);
  }
}
.hot-point-index {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #D0021B;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-size: 12px;
}
.hot-point-add {
  height: 34px;
  line-height: 34px;
  text-align: center;
  margin-top: 20px;
  background: #F5F5F7;
  border: 1px solid #EBEBEB;
  border-radius: 2px;
  font-size: 14px;
  color: #2CA9CB;
  cursor: pointer;
}


.link-item {
  margin-top: 30px;
}
.link-header {
  display: flex;
  justify-content: space-between;
}
.link-header-title {
  font-size: 12px;
  color: #333333;
}
.link-header-delete {
  font-size: 12px;
  color: #999999;
  cursor: pointer;
}
.link-add {
  font-size: 14px;
  color: #2CA9CB;
  margin-top: 10px;
  cursor: pointer;
  position: relative;
  .tooltip {
    top: 20px;
    left: 0;
  }
}

.card {
  background: #F7F7F7;
  display: flex;
  padding: 10px;
  position: relative;
  margin-top: 10px;
}
.card-cover {
  width: 46px;
  height: 46px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #DDDDDD;
  img {
    width: 100%;
  }
  .c-icon-moren {
    font-size: 17px;
    color: #fff;
  }
}
.card-wrapper {
  flex: 1;
  width: 0;
}
.card-title {
  font-size: 12px;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-subtitle {
  font-size: 12px;
  color: #999999;
  margin-top: 4px;
}
.card-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  background: #666;
  padding: 0 5px;
  height: 27px;
  line-height: 27px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  .tooltip {
    right: 0;
    top: 27px;
  }
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
}
.tooltip-item {
  padding: 5px 10px;
  line-height: 17px;
  &:hover {
    background: #f5f7fa;
  }
}
</style>
<style lang="scss">
  .vdr-stick {
    border-color: #D0021B!important;
  }
</style>
