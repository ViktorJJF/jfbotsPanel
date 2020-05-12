import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    name: "admin",
    redirect: {
      name: "listUsers",
    },
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/adminPanel/dashboard"),
      },
      {
        path: "/pedidos-pendientes",
        name: "pendingOrders",
        component: () => import("@/views/adminPanel/pendingOrders"),
      },
      {
        path: "/la-carta",
        name: "carte",
        component: () => import("@/views/adminPanel/carte"),
      },
      {
        path: "/menu-de-hoy",
        name: "dailyMenu",
        component: () => import("@/views/adminPanel/dailyMenu"),
      },
      {
        path: "/listado-de-usuarios",
        name: "listUsers",
        component: () => import("@/views/adminPanel/listUsers"),
      },
      {
        path: "/listado-de-platos",
        name: "listDishes",
        component: () => import("@/views/adminPanel/listDishes"),
      },
      {
        path: "/configuracion",
        name: "config",
        component: () => import("@/views/adminPanel/config"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
