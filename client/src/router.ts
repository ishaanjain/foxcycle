import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ToDos from "./views/ToDos.vue";
<<<<<<< HEAD
=======
import MyProfile from "./views/MyProfile.vue";
>>>>>>> 741e3335db43397093bd5c5fd609569345cb4687

Vue.use(Router);

@@ -21,6 +22,11 @@ export default new Router({
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/todos",
      name: "todos",
      component: ToDos
<<<<<<< HEAD
=======
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
>>>>>>> 741e3335db43397093bd5c5fd609569345cb4687
    }
  ]
});