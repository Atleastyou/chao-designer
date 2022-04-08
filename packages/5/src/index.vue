<template lang="pug">
.c-navbar
  .c-navbar-menu
    .c-navbar-content
      .c-navbar-item(v-for="item, index in options.navbars")
        .c-navbar-item_icon(v-if="!item.icon")
          .c-icon-image
        img(v-else :src="item.icon")
        .c-navbar-item_label {{item.icon_name ? item.icon_name : `导航${index + 1}`}}
</template>

<script>
// 导航
export default {
  name: 'component_5',
  props: {
    options: Object
  },
  data () {
    return {
      navbars: [
        { icon: '', icon_name: '' }, 
        { icon: '', icon_name: '' },
        { icon: '', icon_name: '' },
        { icon: '', icon_name: '' },
        { icon: '', icon_name: '' }
      ],
      sectionId: '5'
    }
  },
  created () {
    if (!this.options || !this.options.navbars || !this.options.navbars.length) this.options.navbars = this.navbars
  },
}
</script>
<style lang="scss" scoped>
.c-navbar {
  width: 100%;
  height: 87px;
  background: #fff;
  overflow: hidden;
  .c-navbar-menu {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    overflow: auto;
  }
  .c-navbar-content {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .c-navbar-item {
      flex-shrink: 0;
      text-align: center;
      margin: 0 10px;
    }
    .c-navbar-item_icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #DAE7F4;
      border-radius: 1px;
      .c-icon-image {
        font-size: 18px;
        color: #84C4DB;
      }
    }
    img {
      display: block;
      width: 44px;
      height: 44px;
      margin: 0 auto;
    }
    .c-navbar-item_label {
      margin-top: 5px;
      word-break: keep-all;
      font-size: 13px;
      color: #333333;
      text-align: center;
    }
  }
}
</style>
