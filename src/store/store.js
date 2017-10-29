import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    showStockChart: false
  },
  mutations: {
    toggleStockChart: (state) => {
      state.showStockChart = !state.showStockChart
    }
  }
})
