<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>連絡先編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="address.name" label="名前"></v-text-field>
              <v-text-field
                v-model="address.tel"
                label="電話番号"
              ></v-text-field>
              <v-text-field
                v-model="address.email"
                label="メールアドレス"
              ></v-text-field>
              <v-text-field
                v-model="address.address"
                label="住所"
              ></v-text-field>
              <div class="text-center">
                <!-- $routerでrouterオブジェクトにアクセス可能 -->
                <!-- push関数でページ遷移が可能 -->
                <v-btn @click="$router.push({ name: 'Addresses' })"
                  >キャンセル</v-btn
                >
                <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    // routeにaddress_idが含まれているかをこれでチェックする
    // パスに含まれるパラメータは$route.paramsから取得可能
    if (!this.$route.params.address_id) {
      return;
    }

    // 引数にidを渡し、該当するオブジェクトを取得する
    const address = this.$store.getters.getAddressById(
      this.$route.params.address_id
    );
    if (address) {
      this.address = address;
    } else {
      this.$router.push({ name: "Addresses" });
    }
  },
  data() {
    return {
      address: {},
    };
  },
  methods: {
    submit() {
      // 2. mapActoinsでactionの関数を登録することで、
      // thisで指定してstoreのaction関数にアクセス可能
      this.addAddress(this.address);
      this.$router.push({ name: "Addresses" });
      this.address = {};
    },
    // 1. mapActionsでstoreのaction関数を配列で登録しているから、
    // components内でaction関数を使用することが可能
    ...mapActions(["addAddress"]),
  },
};
</script>
