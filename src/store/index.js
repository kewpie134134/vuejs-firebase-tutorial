import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
  },
  mutations: {
    // mutationの関数にはstateが自動で渡される
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {
    // actionではcontextが自動的に引数にわたってくる。
    // contextのうち、commit関数だけを受け取る場合は以下のように記述する。
    toggleSideMenu({ commit }) {
      // mutationの関数を呼び出す際に使用される
      commit("toggleSideMenu");
    },
  },
  modules: {},
});
