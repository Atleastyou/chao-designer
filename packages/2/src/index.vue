<template lang="pug">
.c-shopinfo
  .c-shopinfo-default(v-if="!options.bgImg")
    .c-icon-image
    .c-shopinfo-default_bd
      .c-shopinfo-default_header
        .c-shopinfo-default_name 云店名称
        .c-shopinfo-default_address
          .c-icon-address
          .c-shopinfo-address_text 店铺详细地址
          .c-icon-right
      .c-shopinfo-phone
        .c-icon-phone
        .c-shopinfo-phone_text 联系客服
  .c-shopinfo-content(v-else :style="{'background-image': `url(${options.bgImg})`}")
    .c-shopinfo-content_bd
      .c-shopinfo-company
        .c-shopinfo-name {{options.name || '云店名称'}}
        .c-shopinfo-address
          .c-icon-address
          .c-shopinfo-address_text {{options.address || '店铺详细地址'}}
          .c-icon-right
      .c-shopinfo-phone
        .c-icon-phone
        .c-shopinfo-phone_text 联系客服
</template>

<script>
// 店铺信息
export default {
  name: 'component_2',
  props: {
    options: {
      type: Object,
      default: () => { return {
        name: '云店名称',
        address: '店铺详细地址'
      } }
    }
  },
  data () {
    return {
      sectionId: '2'
    }
  },
  created () {
    this.options.isValid = true
  }
}
</script>
<style lang="scss" scoped>
.c-shopinfo {
  width: 100%;
  height: 150px;
  padding: 10px;
  background: #fff;
  .c-shopinfo-default {
    position: relative;
    width: 100%;
    height: 100%;
    background: #DAE7F4;
    border-radius: 10px;
    .c-icon-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #84C4DB;
      font-size: 36px;
    }
    .c-shopinfo-default_bd {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 65.5px;
      padding: 10px 15px;
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.60) 100%);
      border-radius: 0 0 10px 10px;
      z-index: 999;
    }
    .c-shopinfo-default_header {
      color: #fff;
      .c-shopinfo-default_name {
        font-size: 17px;
        color: #FFFFFF;
        line-height: 24px;
        font-weight: 600;
      }
      .c-shopinfo-default_address {
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 16px;
        color: #fff;
        margin-top: 5px;
        .c-icon-address {
          margin-right: 5px;
          font-size: 14px;
          padding-top: 3px;
        }
        .c-icon-right {
          margin-left: 5px;
          font-size: 8px;
          padding-top: 3px;
        }
      }
    }
  }
  .c-shopinfo-content_bd {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 65.5px;
      padding: 10px 15px;
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.60) 100%);
      border-radius: 0 0 10px 10px;
      z-index: 999;
    }
  .c-shopinfo-content {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .c-shopinfo-company {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .c-shopinfo-name {
    margin-bottom: 5px;
    font-size: 17px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 24px;
  }
  .c-shopinfo-address_text {
    max-width: 175px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .c-shopinfo-address {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    .c-icon-address {
      margin-right: 5px;
      font-size: 14px;
    }
    .c-icon-right {
      margin-left: 5px;
    }
  }
  .c-shopinfo-phone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    .c-icon-phone {
      margin-bottom: 5px;
      font-size: 26px;
    }
    .c-shopinfo-phone_text {
      line-height: 14px;
      font-size: 10px;
      color: #FFFFFF;
    }
  }
}
</style>
