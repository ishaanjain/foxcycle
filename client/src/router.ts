import Vue from "vue";
import Router from "vue-router";
import Something from "./views/About.vue";
import Employees from "./views/Employees.vue";
import Home from "./views/Home.vue";
import MyProfile from "./views/MyProfile.vue";
import ProductDetail from "./views/ProductDetail.vue"
import Products from "./views/Products.vue";
import Services from "./views/Services.vue";
import Checkout from "./views/Checkout.vue";
import Tracking from "./views/Tracking.vue";
import Success from "./views/Success.vue";
import ServiceDetail from "./views/ServiceDetail.vue";
import Cart from "./views/Services.vue";
import Orders from "./views/Orders.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/",
      name: "cart",
      component: Cart
    },
    {
      path: "/products",
      name: "products",
      component: Products
    },
    {
      path: "/products/:id",
      name: "product detail",
      component: ProductDetail,
      props: true
    },
    {
      path: "/services",
      name: "service",
      component: Services
    },
    {
      path: "/services/:id",
      name: "service detail",
      component: ServiceDetail,
      props: true
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders
    },
    {
      path: "/employees",
      name: "employees",
      component: Employees
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Something
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
    },
    {
      path: "/tracking",
      name: "tracking",
      component: Tracking
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/success",
      name: "success",
      component: Success
    },
  ]
});