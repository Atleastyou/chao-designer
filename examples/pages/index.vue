<template lang="pug">
  .index
    .container
      .wrapper
        .module-cate(v-for="group in modules")
          .module-cate-name {{group.type_name}}
          .module-list
            router-link.module-item(v-for="item in group.list" :key="item.id" :to="{ name: 'preview', params: { id: item.id } }")
              img.module-item-preview(:src="item.s_img")
              .module-item-name {{item.modular_name}}
</template>
<script>
import { moduleList } from 'api'
export default {
  name: 'index',
  data () {
    return {
      modules: []
    }
  },
  methods: {
    async getModuleList () {
      try {
        const { data } = await moduleList()
        this.modules = data
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getModuleList()
  }
}
</script>
<style lang="scss" scoped>
.index {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #414a56;
}
.container {
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
  border-radius: 30px;
  overflow: hidden;
  width: 375px;
}
.wrapper {
  width: 390px;
  height: 667px;
  overflow-y: auto;
}
.module-cate {
  padding: 20px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: -1px;
    height: 1px;
    background: #eee;
  }
}
.module-cate-name {
  font-size: 16px;
  padding: 0 10px;
  font-weight: 600;
}
.module-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.module-item {
  padding: 10px;
  width: 50%;
  max-width: 115px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
}
.module-item-preview {
  width: 100%;
}
.module-item-name {
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  color: #333;
}
</style>