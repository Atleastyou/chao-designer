<template lang="pug">
.toast(v-show="show" transition="toast") {{msg}}
</template>
<script>
import { mapActions, mapState } from 'vuex'
let timer = null
export default {
  name: 'c-toast',
  methods: {
    ...mapActions([
      'toast'
    ])
  },
  watch: {
    show (value) {
      if (value) {
        clearTimeout(timer)
        setTimeout(() => {
          this.toast({show: false, msg: ''})
        }, 2000)
      }
    }
  },
  computed: {
    ...mapState({
      show: state => state.modal.toast.show,
      msg: state => state.modal.toast.msg
    })
  }
}
</script>
<style scoped>
.toast {
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 250px;
  white-space: pre;
  padding: 10px;
  color: #fff;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .7);
  transition: opacity .6s ease;
  transform: translate(-50%, -50%);
  z-index: 9999999999;
  font-size: 14px;
}

.toast-enter, .toast-leave {
  opacity: 0
}
</style>
