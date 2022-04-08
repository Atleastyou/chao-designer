<template lang="pug">
.serve
  .serve-title {{options.title}}
  .serve-item
    .serve-item-input 您的真实姓名
  .serve-item
    .serve-item-input 您的联系手机
  .serve-item
    .serve-item-select
      span 省
      label
    .serve-item-select
      span 市
      label
  .serve-item
    .serve-item-button 立即提交
</template>

<script>
// 导航
export default {
  name: 'component_31',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: ''
        }
      }
    }
  },
  data () {
    return {
      sectionId: '31',
      title: ''
    }
  },
  created () {
    if (this.options && !this.options.title) {
      this.options.title = '报名申请免费设计+量尺寸服务'
      this.options.isValid = true
    }
  }
}
</script>
<style lang="scss" scoped>
.serve {
  padding: 30px 38px 30px 37px;
}
.serve-title {
  text-align: center;
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}
.serve-item {
  display: flex;
  margin-top: 20px;
  .serve-item-input {
    width: 100%;
    padding: 13px 20px;
    line-height: 20px;
    font-size: 14px;
    color: #999999;
    border: 1px solid #D7D7D7;
  }
  .serve-item-select {
    position: relative;
    width: 140px;
    padding: 13px 20px;
    line-height: 20px;
    font-size: 14px;
    color: #999999;
    border: 1px solid #D7D7D7;
    &:first-child {
      margin-right: 20px;
    }
    label {
      position: absolute;
      top: 50%;
      right: 11px;
      transform: translateY(-40%);
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: #999;
    }
  }
}
.serve-item-button  {
  width: 268px;
  padding: 13px 0;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: #FFFFFF;
  font-weight: 600;
  line-height: 20px;
  background: #333333;
  border-radius: 5px;
}
</style>
