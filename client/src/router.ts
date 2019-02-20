import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Home from "./views/Home.vue";
import MyProfile from "./views/MyProfile.vue";
import NewProduct from "./views/NewProduct.vue";
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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: "/services",
      name: "service",
      component: Services
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
    },
    {
      path: "/products",
      name: "products",
      component: Products
    },
    {
      path: "/products/newproduct",
      name: "newProduct",
      component: NewProduct
    }
  ]
});
