<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="openSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>マイアドレス帳</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <SideNav />
    </v-content>
  </v-app>
</template>

<script>
import SideNav from "./components/SideNav";
export default {
  name: "App",
  components: {
    SideNav,
  },
  data: () => ({
    //
  }),
  methods: {
    openSideMenu() {
      // this.$storeでストアにアクセス可能。
      // storeはdispatchという関数を持っており、
      // dispatch経由でactionを呼び出すことが可能。
      // ここでは'toggleSideMenu'の文字列を渡すことで、
      // actionで設定したtoggleSideMenu関数を呼び出している。
      this.$store.dispatch("toggleSideMenu");
    },
  },
};
</script>
