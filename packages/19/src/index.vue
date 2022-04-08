<template lang="pug">
.brand
  .brand-title(v-if="options.title") {{options.title}}
  .brand-default(v-if="!options.list || !options.list.length")
    img(:src="img")
  .brand-item(v-else v-for="item in options.list")
    .brand-header
      .brand-detail
        .brand-logo(:style="{ 'background-image': `url(${item.logo})` }")
        .brand-bd
          .brand-name
            .brand-name-bd {{item.name}}
            .brand-name-bandle
              span 进入店铺
              i.c-icon-right
          .brand-item-style {{item.cat_name}} | {{item.style.join(' ')}}
    .brand-superiority(:class="{'brand-superiority-bg' : item.paragraph}") {{item.paragraph}}
    .brand-cover(v-if="item.cover")
      img(:src="item.cover")
    .brand-image(v-else)
      .brand-image-item(v-for="url, index in item.images" v-if="index < 4")
        img(:src="url")
</template>

<script>
// 导航
import { getGoodsByCondition } from 'api'
export default {
  name: 'component_19',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    }
  },
  data () {
    return {
      img: '//static.chaodp.com/designer/pinpai2_big.png',
      sectionId: '19'
    }
  },
  methods: {
    async getGroupGoods () {
      try {
        const { data } = await getGoodsByCondition({ ...this.options.query })
        data.forEach(item => {
          if (item.superiority.length) item.paragraph = item.superiority.join('  ')
          else item.paragraph = ''
        })
        this.options.list = data
      } catch (err) {
        console.log(err)
        this.$message.error(err.msg)
      }
    }
  },
  created () {
    if (this.options && this.options.list && this.options.list.length) {
      this.getGroupGoods()
    }
  }
}
</script>
<style lang="scss" scoped>
.brand-title {
  font-size: 17px;
  color: #333333;
  font-weight: 600;
  padding: 10px;
  border-bottom: 1px solid #EDEDED;
}
.brand-item {
  padding: 10px;
  margin-top: 10px;
  border-bottom: 1px solid #EDEDED;
  &:last-child {
    border-bottom: none;
  }
}
.brand-header {
  display: flex;
  justify-content: space-between;
}
.brand-detail {
  display: flex;
  width: 100%;
}
.brand-logo {
  width: 65px;
  min-width: 65px;
  height: 65px;
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.brand-bd {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 10px;
  align-items: flex-start;
}
.brand-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand-name-bd {
  max-width: 180px;
  font-size: 15px;
  color: #333333;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.brand-name-bandle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 24px;
  background: #F8F8F8;
  border-radius: 12px;
  font-size: 12px;
  color: #666666;
  span {
    display: inline-block;
    line-height: 1;
  }
  i {
    font-size: 10px;
  }
}
.brand-item-style {
  font-size: 13px;
  color: #000000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 280px;
}
.brand-superiority {
  padding: 3.5px 5px;
  font-size: 13px;
  min-height: 25px;
  color: #FC8433;
  font-weight: 600;
  line-height: 18px;
  max-width: 100%;
  border-radius: 2px;
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &.brand-superiority-bg {
    background: #FFF9F4;
  }
}
.brand-cover {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.brand-image {
  width: 100%;
  display: flex;
  align-items: center;
  .brand-image-item {
    width: 80px;
    height: 80px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      margin-right: 0;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
