<template lang="pug">
.edit
  edit-header(headerInfo="基础模块-定制求购")
  .edit-content
    .edit-form-item
      .edit-form-item-title 定制求购
      .edit-form-item-info 定制求购模块，为特殊组件，不可编辑。
      
</template>

<script>
import editHeader from '../../components/editHeader'
export default {
  name: 'component_15_editor',
  components: {
    editHeader
  },
  data () {
    return {}
  },
  methods: {},
  mounted () {},
  created () {}
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
  height: 64px;
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
