<template lang="pug">
.brand
  .brand-header
    .brand-title {{options.title || '模块标题'}}
    .brand-more
      span 更多
      .c-icon-right
  .brand-list
    .brand-item(v-for="item in list")
      .brand-item-cover(:style="{'background-image': `url(${item.logo})`}")
      .brand-item-name {{item.name}}
</template>

<script>
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_9',
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
      list: [
        { name: '商品1', logo: '//static.chaodp.com/designer/bj_shangpin01.png' },
        { name: '商品1', logo: '//static.chaodp.com/designer/bj_shangpin01.png' },
        { name: '商品1', logo: '//static.chaodp.com/designer/bj_shangpin01.png' },
        { name: '商品1', logo: '//static.chaodp.com/designer/bj_shangpin01.png' }
      ],
      sectionId: '9'
    }
  },
  watch: {
    'options.source.id' (val, oldVal) {
      if (val !== oldVal) this.getGroupGoods()
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        this.list = data
      } catch (err) {
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    if (this.options && this.options.source && this.options.source.id && this.options.query && Object.keys(this.options.query).length) {
      this.getGroupGoods()
    } else {
      this.list = (this.options && this.options.list && this.options.list.length) ? this.options.list : this.list
    }
  } 
}
</script>
<style lang="scss" scoped>
.brand {
  background: #fff;
}
.brand-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0;
  .brand-title {
    font-size: 17px;
    color: #333333;
    font-weight: 600;
  }
}
.brand-more {
  display: flex;
  align-items: center;
  color: #999999;
  font-size: 12px;
  cursor: pointer;
  .c-icon-right {
    margin-left: 5px;
    font-size: 10px;
  }
}
.brand-list {
  padding: 10px 5px;
  display: flex;
}
.brand-item {
  margin: 0 5px;
  padding: 10px;
  background: #FBF9F3;
  border-radius: 5px;
  flex: 1;
  cursor: pointer;
}
.brand-item-cover {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.brand-item-name {
  font-size: 12px;
  color: #333333;
  margin-top: 5px;
  text-align: center;
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
