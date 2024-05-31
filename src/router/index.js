import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import MainPage from "../components/MainPage.vue";
import ProductList from "@/components/ProductList.vue";
import ViewProduct from "@/components/ViewProduct.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";
import CreateProduct from "@/components/CreateProduct.vue";
import UserList from "@/components/UserList.vue";
import ViewUser from "@/components/ViewUser.vue";
import UpdateUser from "@/components/UpdateUser.vue";

const routes = [
  { path: "/", component: LoginPage, name: "login" },
  { path: "/register", component: RegisterPage, name: "register" },

  // Product routes
  {
    path: "/home",
    component: MainPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      console.log("logout");
      localStorage.removeItem("token");
      next("/");
    },
  },
  {
    path: "/products",
    component: ProductList,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  { 
    path: '/view/:id', component: ViewProduct, name: 'view',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
    },
    { 
      path: "/update/:id", component: UpdateProduct, name: 'update',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }},
      { 
        path: '/create', component: CreateProduct, name: 'create',
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next()
          } else {
            next('/')
          }
        }
        },


  // User routes

  { path: "/userList", component: UserList, name: "userList" },
  { path: "/viewUser/:id", component: ViewUser, name: "viewUser" },
  { path: "/updateUser/:id", component: UpdateUser, name: "updateUser" },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
