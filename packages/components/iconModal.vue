<template lang="pug">
.modal
  .modal-container
    .modal-header
      .modal-title 添加图片
      .c-icon-close(@click="close")
    .modal-content
      .modal-tabs
        .modal-tab(
          v-for="item, index in tabs"
          :class="{ 'modal-tab_active': tabIndex === index }"
          @click="changeTab(item, index)"
        ) {{item.value}}
      .modal-body(v-if="tabLabel === 'system'")
        .modal-icon-list(v-for="item in icons")
          .modal-icon-item-title {{item.name}}
          .modal-icon-item-body
            .modal-icon_item(
              v-for="row, index in item.list"
            )
              img(
                @click="selectIcon(row, 'system')"
                :src="row.icon"
                :class="{ 'modal-icon_item-active': row.isActive }"
              )
              .modal-icon_item-name {{row.icon_name}}
      .modal-body(v-else)
        .modal-body-icons
          .modal-icon-item
            .modal-icon-item-upload(ref="handleUploader")
              .c-icon-add
          .modal-icon-item(
            v-for="item, index in icons"
          )
            img(
              :src="item.icon"
              :class="{ 'modal-icon-item_active': item.isActive }"
              @click="selectIcon(item, 'dt')"
            )
            input(placeholder="点击命名", v-model="item.icon_name" @change="changeIconName($event, item)")
            .modal-icon-item-handle(@click="delIcon(item, index)") 删除
    .modal-footer
      .modal-footer-info 提示：建议上传尺寸100*100的图片
      .modal-footer-handle
        .modal-btn(@click="close") 取消
        .modal-btn.modal-btn-confirm(@click="confirm") 确定
</template>

<script>
import { getIcon, postAddIcon, postDelIcon, postEditIcon } from 'api'
import { mapActions } from 'vuex'
import Uploader from '../../utils/uploader'
export default {
  name: 'iconModal',
  data () {
    return {
      tabs: [
        {
          value: '我的图片',
          label: 'dt'
        }, {
          value: '图标库',
          label: 'system'
        }
      ],
      uploadIcons: [],
      icons: [],
      activeIcon: {},
      tabIndex: 0,
      tabLabel: 'dt'
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    close () {
      this.$emit('close')
    },
    changeTab (item, index) {
      this.tabIndex = index
      if (item.label !== this.tabLabel) {
        this.tabLabel = item.label
        this.getIcon()
      }
    },
    confirm () {
      this.$emit('change', this.activeIcon)
    },
    async changeIconName (ev, item) {
      try {
         await postEditIcon({ icon_name: item.icon_name, icon_id: item.icon_id })
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    selectIcon (item, type) {
      if (type === 'system') {
        this.icons.forEach(row => row.list.forEach(col =>{
          col.isActive = false
          if (col.icon_id === item.icon_id) {
            col.isActive = true
          }
        }))
      } else {
        this.icons.forEach(row => {
          row.isActive = false
          if (row.icon_id === item.icon_id) {
            row.isActive = true
          }
        })
      }
      this.activeIcon = item
    },
    async delIcon (item, index) {
      try {
        await postDelIcon({ icon_id: item.icon_id })
        this.icons.splice(index, 1)
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    async getIcon () {
      try {
        const { data } = await getIcon({ type: this.tabLabel })
        if (this.tabLabel === 'dt') {
          data.list.forEach(item => {
            item.isActive = false
          })
        } else {
          data.list.forEach(item => {
            item.list.forEach(row => {
              row.isActive = false
            })
          })
        }
        this.icons = data.list
      } catch (err) {
        this.$message.error(err.msg)
      }
    },
    initUploader () {
      try {
        let that = this
        const opts = {
          browse_button: this.$refs.handleUploader,
          multi_selection: true,
          auto_start: true,
          mime_types: [
            { title: 'Image files', extensions: 'jpg,jpeg,png,bmp' }
            // { title: 'Video files', extensions: 'flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4' }
          ],
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
          that.uploadIcons.push(`${up.domain}${JSON.parse(info).key}`)
        })
        newUploader.bind('Error', (up, err, errTip) => {
          if (err.code === -600) {
            const ext = err.file.name.split('.').splice(-1)[0]
            if ('jpg,jpeg,png,bmp,gif'.indexOf(ext) > -1) that.$message.error('抱歉，您选择的图片超过 10 M')
          } else {
            that.$message.error(errTip)
          }
        })
        newUploader.bind('UploadComplete', async (up, files) => {
          try {
            const { data } = await postAddIcon({ icon: JSON.stringify(that.uploadIcons) })
            that.icons = [...data, ...that.icons]
            that.uploadIcons = []
          } catch (err) {
            that.$message.error(err.msg)
          }
        })
        newUploader.init()
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    this.getIcon()
  },
  mounted () {
    this.initUploader()
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-container {
  width: 575px;
  height: 572px;
  background: #F5F5F7;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border-radius: 4px;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  line-height: 16px;
  .modal-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333333;
  }
  .c-icon-close {
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
}
.modal-tabs {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #303133;
  line-height: 20px;
  padding: 0 25px;
  .modal-tab {
    padding: 5px 0;
    margin-right: 29.4px;
    cursor: pointer;
    &.modal-tab_active {
      position: relative;
      color: #2CA9CB;
      &:after {
        position: absolute;
        content: '';
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #2CA9CB;
      }
    }
  }
}
.modal-body {
  height: 424px;
  overflow: auto;
}
.modal-body-icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 0 15px;
  width: 100%;
  .modal-icon-item {
    position: relative;
    width: 80px;
    margin: 0 10px 20px;
    cursor: pointer;
    img {
      width: 100%;
      height: 80px;
      border: 2px solid rgba(0, 0, 0, 0);
      &.modal-icon-item_active {
        border-color: #FFBE28;
      }
    }
    &:hover {
      .modal-icon-item-handle {
        display: inline-block;
      }
    }
    input {
      margin-top: 10px;
      border: 0;
      width: 100%;
      max-width: 80px;
      outline: none;
      height: 17px;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0);
      color: #333333;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .modal-icon-item-handle {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      position: absolute;
      bottom: 27px;
      left: 0;
      background: rgba(0,0,0,0.50);
      font-size: 12px;
      color: #FFFFFF;
      display: none;
      cursor: pointer;
    }
  }
}
.modal-icon-item-upload {
  width: 80px;
  height: 80px;
  border: 1px dashed #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #999;
}
.modal-icon-list {
  margin-top: 30px;
  padding: 0 15px;
}
.modal-icon-item-title {
  padding: 0 10px;
  font-size: 14px;
  color: #999999;
  line-height: 20px;
}
.modal-icon-item-body {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .modal-icon_item {
    width: 80px;
    margin: 0 10px 20px;
    img {
      border: 2px solid rgba(0, 0, 0, 0);
      width: 100%;
      height: 80px;
      &.modal-icon_item-active {
        border-color: #FFBE28;
      }
    }
    .modal-icon_item-name {
      margin-top: 10px;
      font-size: 12px;
      max-width: 80px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #333333;
    }
  }
}
.modal-footer {
  width: 100%;
  height: 62px;
  background: #FFFFFF;
  border: 1px solid #E4E7ED;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  border-radius: 0px 0px 4px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .modal-footer-info {
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    margin-left: 5px;
  }
  .modal-footer-handle {
    display: flex;
    align-items: center;
    .modal-btn {
      width: 68px;
      height: 36px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      color: #666666;
      &.modal-btn-confirm {
        background: #FFBE28;
        border-color: #FFBE28;
        color: #333333;
      }
    }
  }
}
</style>
