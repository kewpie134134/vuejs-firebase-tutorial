<template>
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img
            src="https://avatars2.githubusercontent.com/u/1363954?s=460&v=4"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Kazuya Kojima</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- routerを拡張したものなので、":to="でリンク先のnameを指定すればページ遷移する -->
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "ホーム", icon: "mdi-home", link: { name: "Home" } },
        { title: "連絡先一覧", icon: "mdi-menu", link: { name: "Addresses" } },
      ],
    };
  },
};
</script>
