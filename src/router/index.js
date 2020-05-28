import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Addresses from "../views/Addresses.vue";
import AddressForm from "../views/AddressForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addresses",
    name: "Addresses",
    component: Addresses,
  },
  {
    // :address_id?にはidなどのパラメータが入る(例: 1, 50 など)(:の効果)
    // :address_id?に数字がない場合は、新規作成となるように実装する(?の効果)
    path: "/addresses/:address_id?/edit",
    name: "Address_edit",
    component: AddressForm,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
