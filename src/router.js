import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Main from "./views/Main.vue";
import ViewMovie from "./views/ViewMovie.vue";
import Moderator from "./views/Moderator.vue";
import EditMovie from "./views/EditMovie.vue";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/",
      name: "Main",
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/movie/:movie_id",
      name: "ViewMovie",
      component: ViewMovie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:movie_id",
      name: "EditMovie",
      component: EditMovie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/moderator",
      name: "Moderator",
      component: Moderator,
      meta: {
        requiresAuth: true
      }
    }
    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
