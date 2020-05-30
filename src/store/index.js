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
    addAddress(state, { id, address }) {
      address.id = id; // addressにidが浮揚される
      state.addresses.push(address);
    },
    updateAddress(state, { id, address }) {
      // アドレスオブジェクトが存在するインデックスを調べている
      const index = state.addresses.findIndex((address) => address.id === id);
      // 調べたインデックスの位置に新しいアドレスオブジェクトを代入して更新完了
      state.addresses[index] = address;
    },
    deleteAddress(state, { id }) {
      // アドレスオブジェクトが存在するインデックスを調べている
      const index = state.addresses.findIndex((address) => address.id === id);
      // indexの箇所から1つの要素を削除(splice())
      state.addresses.splice(index, 1);
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    fetchAddresses({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/addresses`)
        .get() // get関数を実行すると非同期にデータを取得し、then関数の引数でget()の結果を受け取ることが可能
        .then((snapshot) => {
          // snapshotはquery_snapshotというオブジェクト、配列とは厳密には異なる(配列っぽく扱える)
          snapshot.forEach((doc) =>
            commit("addAddress", { id: doc.id, address: doc.data() })
          );
        });
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
          .add(address)
          .then((doc) => {
            // add()のコールバック関数にはdocument_referencesオブジェクトがわたってくるので、
            // then関数の引数docで受け取る。
            // データをcommitの第2引数で渡す必要があるため、以下のようにオブジェクトの形で渡すようにする。
            commit("addAddress", { id: doc.id, address });
          });
      }
    },
    updateAddress({ getters, commit }, { id, address }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .doc(id) // doc()でidを渡して、更新対象を指定している
          .update(address) // doc()で指定し、update()で更新処理を走らせる(非同期処理)
          .then(() => {
            //update()は非同期処理のため、then()でコールバック関数を受け取る
            commit("updateAddress", { id, address });
          });
      }
    },
    deleteAddress({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .doc(id) // doc()でidを渡して、削除対象を指定している
          .delete() // doc()で指定し、delete()で削除処理を走らせる(非同期処理)
          .then(() => {
            //delete()は非同期処理のため、then()でコールバック関数を受け取る
            commit("deleteAddress", { id });
          });
      }
    },
  },
  getters: {
    // gettersの関数にはstateが自動的にわたってくる！
    // そのため、stateからdataを取得し、加工したデータをコールバック関数で返す。
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
    // firebaseから取得できるlogin_userにはuidが付与されているのでそれを取得する
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    // 関数を返す関数を表す
    // 引数idで、idにマッチした物を取得する使い方ができる
    getAddressById: (state) => (id) =>
      state.addresses.find((address) => address.id === id),
  },
  modules: {},
});
