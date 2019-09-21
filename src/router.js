import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import base from "./router/base";
import test from "./router/test";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/Home',
      name:'Home',
      component:Home,
      children:[
        ...base,
        ...test
      ]
    }
    // {
    //   path: "/",
    //   name: "Login",
    //   component: Login
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () =>
    //   //   import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
