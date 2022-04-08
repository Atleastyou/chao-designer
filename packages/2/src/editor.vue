<template lang="pug">
.edit
  edit-header(headerInfo="基础模块-店铺信息")
  .edit-content
    .edit-content-title 门店图片
    .edit-content-info （建议尺寸710*260）支持png，jpg格式图片
    .edit-image-item
      //- .edit-image-header
        .edit-image-name 图片{{index + 1}}
        .edit-image-handle
          span.edit-image-handle-up(@click="moveUp(item, index)" v-if="index != 0") 上移
          span.edit-image-handle-delete(@click="deleteImg(item, index)") 删除
      //- .edit-image-bd(:style="{ 'background-image': `url(${item})` }")
      .edit-image-bd(ref="handleUploader")
        img(:src="form.bgImg")
        .banner-item-change 更换图片
    //- .edit-content-footer
      .edit-content-btn(ref="handleUploader")
        p +添加门店图片
        p （建议尺寸710*260）支持png，jpg格式图片
</template>

<script>
import { mapActions } from 'vuex'
import editHeader from '../../components/editHeader'
import Uploader from '../../../utils/uploader'
export default {
  name: 'component_2_editor',
  props: {
    options: Object
  },
  components: {
    editHeader
  },
  data () {
    return {
      form: {
        bgImg: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    // moveUp (item, index) {
    //   this.form.imgs[index] = this.form.imgs.splice(index - 1, 1, this.form.imgs[index])[0]
    //   this.form.bgImg = this.form.imgs[0]
    //   this.$emit('change', { options: { ...this.form } })
    // },
    // deleteImg (item, index) {
    //   this.form.imgs.splice(index, 1)
    //   this.form.bgImg = this.form.imgs[0]
    //   this.$emit('change', { options: { ...this.form } })
    //   this.initUploader()
    // },
    initUploader () {
      try {
        let that = this
        const opts = {
          browse_button: this.$refs.handleUploader,
          multi_selection: false,
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
        this.uploader = new Uploader(opts)
        this.uploader.bind('FilesAdded', (up, file) => {
          if (up.fileAdditionError) {
            that.$message.error('门店图片最多添加1张！')
          }
        })
        this.uploader.bind('FileUploaded', (up, file, info) => {
          that.form.bgImg = `${up.domain}${JSON.parse(info).key}`
        })
        this.uploader.bind('Error', (up, err, errTip) => {
          if (err.code === -600) {
            const ext = err.file.name.split('.').splice(-1)[0]
            if ('jpg,jpeg,png,bmp,gif'.indexOf(ext) > -1) that.$message.error('抱歉，您选择的图片超过 2 M')
          } else {
            that.$message.error(errTip)
          }
        })
        this.uploader.bind('UploadComplete', (up, files) => {
          that.$emit('change', { options: { ...that.form } })
        })
        this.uploader.init()
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
    .edit-content-title {
      font-size: 14px;
      color: #333333;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .edit-content-info {
      font-size: 12px;
      color: #999999;
      line-height: 17px;
    }
    .edit-content-btn {
      width: 100%;
      height: 54px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      border: 1px dashed #2CA9CB;
      border-radius: 2px;
      cursor: pointer;
      p {
        font-size: 14px;
        color: #2CA9CB;
        line-height: 20px;
      }
    }
  }
  .edit-image-item {
    margin-top: 30px;
    .edit-image-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .edit-image-name {
        font-size: 12px;
        color: #333333;
      }
      .edit-image-handle {
        font-size: 12px;
        color: #999999;
        cursor: pointer;
        span {
          padding: 0 10px;
          &.edit-image-handle-up {
            border-right: 1px solid #D7D7D7;
          }
          &.edit-image-handle-delete {
            padding-right: 0;
          }
        }
      }
    }
    .edit-image-bd {
      width: 100%;
      height: 125px;
      position: relative;
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
  }
}
</style>
