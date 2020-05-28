import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    addresses: [],
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    // mutationの関数の引数にはstateが自動で渡される
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    addAddress(state, address) {
      state.addresses.push(address);
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    logout() {
      // 以下で、firebaseのauth()の機能でログアウト可能となる。
      firebase.auth().signOut();
    },
    // googleの認証機能へアクセスするための実装
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    // actionではcontextが自動的に引数にわたってくる。
    // contextのうち、commit関数だけを受け取る場合は以下のように記述する。
    toggleSideMenu({ commit }) {
      // mutationの関数を呼び出す際に使用される
      commit("toggleSideMenu");
    },
    // 第2引数にはactionでわたってくる値をセットできる
    // firestore にデータを格納する処理を記述する
    // actionの引数にはgettersも取得できるので、以下のように記述することができる
    addAddress({ getters, commit }, address) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .add(address);
      }
      commit("addAddress", address);
    },
  },
  getters: {
    // gettersの関数にはstateが自動的にわたってくる！
    // そのため、stateからdataを取得し、加工したデータをコールバック関数で返す。
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
    // firebaseから取得できるlogin_userにはuidが付与されているのでそれを取得する
    uid: (state) => (state.login_user ? state.login_user.uid : null),
  },
  modules: {},
});
