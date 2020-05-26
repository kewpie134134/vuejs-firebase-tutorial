import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBs-8zcRPBHRO20tdP3AoA6dQ-23k7lxNk",
  authDomain: "my-address-pj-c0a8f.firebaseapp.com",
  databaseURL: "https://my-address-pj-c0a8f.firebaseio.com",
  projectId: "my-address-pj-c0a8f",
  storageBucket: "my-address-pj-c0a8f.appspot.com",
  messagingSenderId: "662447248946",
  appId: "1:662447248946:web:aa24f1449e769610068e2b",
  measurementId: "G-0L6ZJ0HBJS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
