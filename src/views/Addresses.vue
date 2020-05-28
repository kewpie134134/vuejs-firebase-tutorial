<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 text-xs-right>
        <router-link :to="{ name: 'Address_edit' }">
          <v-btn color="info">
            連絡先追加
          </v-btn>
        </router-link>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers="headers" :items="addresses">
          <template v-slot:item.action="{ item }">
            <!-- 以下の記述で各行から編集ページへ遷移することが可能 -->
            <router-link
              :to="{ name: 'Address_edit', params: { address_id: item.id } }"
            >
              <v-icon small class="mr-2">mdi-pencil</v-icon>
            </router-link>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    // 左辺のthisは、dataのaddressesを取得するために使用。
    // 右辺のthis.$storeは、store内にアクセスするために使用、
    // こうすることで、storeにcomponentからアクセスすることが可能
    this.addresses = this.$store.state.addresses;
  },
  data() {
    return {
      // Vuetifyで表示する(v-data-table)データをあらかじめdataに格納しておく
      // textには表示する名前、valueにはプロパティ名を記述する
      headers: [
        { text: "名前", value: "name" },
        { text: "電話番号", value: "tel" },
        { text: "メールアドレス", value: "email" },
        { text: "住所", value: "address" },
        { text: "操作", value: "action", sortable: false },
      ],
      addresses: [],
    };
  },
};
</script>

<style scoped lang="scss">
// アイコンの下に表示されるアンダーラインを消すもの
a {
  text-decoration: none;
}
</style>
