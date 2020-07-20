import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hydrated: false,
    footerHeight: null,
  },
  mutations: {
    setHydrated(state, val) {
      state.hydrated = val;
    },
    setFooterHeight(state, val) {
      state.footerHeight = val;
    },
  },
});
