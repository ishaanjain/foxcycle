import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Employees from "./views/Employees.vue";
import Home from "./views/Home.vue";
import MyProfile from "./views/MyProfile.vue";
import ProductDetail from "./views/ProductDetail.vue"
import Products from "./views/Products.vue";
import Services from "./views/Services.vue";

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
      component: About
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
    }
  ]
});
