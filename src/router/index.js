import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import MainPage from "../components/MainPage.vue";
import ProductList from "@/components/ProductList.vue";
import ViewProduct from "@/components/ViewProduct.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";
import CreateProduct from "@/components/CreateProduct.vue";

const routes = [
  { path: "/", component: LoginPage, name: "login" },
  { path: "/register", component: RegisterPage, name: "register" },
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
        }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
