<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- v-on:click.stopで親要素へのクリック情報伝搬を阻止している -->
      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>マイアドレス帳</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <SideNav />
      <v-container fluid fill-height align-start>
        <!-- 以下の一文でルートごとに設定したルートが表示される -->
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
// storeのaction関数をcomponentに組み込むことが可能
import { mapActions } from "vuex";
import SideNav from "./components/SideNav";
export default {
  name: "App",
  components: {
    SideNav,
  },
  // login_userの取得処理部分
  created() {
    // onAuthStateChanged()は、引数にユーザの認証状態が変わった時に
    // 呼び出されるコールバック関数を受け取る。
    // ログイン時は引数の関数が呼ばれ、コールバック関数にユーザのオブジェクトが、
    // ログアウト時はnullが入る。
    // ★ログイン/ログアウトは非同期処理★
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // このthisはstoreのaction関数を呼び出すために必要。
        this.setLoginUser(user);
      } else {
        this.deleteLoginUser();
      }
    });
  },
  data: () => ({
    //
  }),
  methods: {
    // 分割代入の形で、storeのaction関数を配列に登録することで
    // オブジェクトのstoreのactionを関数として呼び出すことが可能。
    ...mapActions([
      "toggleSideMenu",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
    ]),
  },
};
</script>
