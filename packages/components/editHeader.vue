<template lang="pug">
.edit-header
  .edit-header-title 组件编辑
  .edit-header-info {{headerInfo}}
</template>

<script>
export default {
  name: 'editHeader',
  props: {
    headerInfo: String
  }
}
</script>

<style lang="scss" scoped>
.edit-header {
  padding: 30px;
  border-bottom: 1px solid #E5E5E5;
  .edit-header-title {
    font-size: 18px;
    color: #333333;
    margin-bottom: 30px;
    font-weight: 600;
  }
  .edit-header-info {
    font-size: 14px;
    color: #333333;
  }
}
</style>
