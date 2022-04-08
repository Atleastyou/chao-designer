import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 严格模式，禁止双向绑定（v-model）
  modules: {
    modal
  }
})
