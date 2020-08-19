import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fiedx: true
  },
  mutations: {
    fie(...s) {
      this.state.fiedx = s[1];
    }
  },
  actions: {

  }
})
