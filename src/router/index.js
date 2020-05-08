import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "admin",
  component: () => import("@/layouts/admin.vue"),
}];

const router = new VueRouter({
  routes
});

export default router;