import _ from 'lodash'

const MODAL = {
  TOAST: 'TOAST'
}

const initialState = {
  toast: { // 二级侧边栏
    show: false,
    msg: ''
  }
}

const mutations = {
  [MODAL.TOAST] (state, payload) {
    state.toast = {
      ...state.toast,
      ...payload
    }
  }
}

const actions = {
  toast ({ commit }, payload) {
    console.log(payload)
    commit(MODAL.TOAST, payload)
  }
}

const getters = {}

export default {
  state: _.cloneDeep(initialState),
  mutations,
  actions,
  getters
}
