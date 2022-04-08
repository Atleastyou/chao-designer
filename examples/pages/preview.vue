<template lang="pug">
  .index
    .preview
      component(v-if="$route.params.id" :is="'component_' + $route.params.id" :options="options")
    .editor-container
      component(v-if="$route.params.id" :is="'component_' + $route.params.id + '_editor'" :options="options" @change="change")
</template>
<script>
export default {
  name: 'preview',
  data () {
    return {
      options: {}
    }
  },
  methods: {
    change (data) {
      console.log(data.options)
      this.options = { ...data.options }
    }
  }
}
</script>
<style lang="scss" scoped>
.index {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #414a56;
  min-height: 100vh;
  overflow-x: scroll;
}
.preview {
  flex: 0 0 375px;
  height: 667px;
  background: #fff;
  overflow: hidden;
}
.title {
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  color: #2f719c;
  margin-bottom: 10px;
}
.editor-container {
  flex: 0 0 400px;
  height: 667px;
  overflow-y: auto;
  background: #fff;
  padding-bottom: 40px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 4px solid #5b59d4;
  }
}
</style>
