<template lang="pug">
.c-search
  .c-search-input
    .c-search-input_placeholder.c-search-input_placeholder--center
      .c-icon-search
      .c-input-placeholder {{options.placeholder || '商品名、品牌'}}
</template>

<script>
// 商品搜索
export default {
  name: 'component_1',
  data () {
    return {
      sectionId: '1'
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    this.options.isValid = true
  }
}
</script>
<style lang="scss" scoped>
.c-search {
  position: relative;
  width: 100%;
  height: 56px;
  padding: 10px;
  background: #fff;
  .c-search-input {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    background: #F0F1F2;
    border-radius: 4px;
    .c-search-input_placeholder {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #999;
      font-size: 15px;
      &.c-search-input_placeholder--center {
        justify-content: center;
      }
      // .c-icon-search {
      //   padding-top: 3px;
      // }
      .c-input-placeholder {
        margin-left: 7px;
        line-height: 21px;
      }
    }
    
  }
}
</style>
