<template>
  <!-- sidebar menu area start -->
  <div class="sidebar-menu">
    <div class="sidebar-header">
      <div class="logo">
        <a href="/">
          <img src="/assets/images/botProfile.png" alt="logo" width="80%" />
        </a>
      </div>
      <b-row align-h="center">
        <b class="text-white">Restobot</b>
      </b-row>
    </div>
    <div class="main-menu">
      <div class="menu-inner">
        <nav>
          <ul class="metismenu" id="menu">
            <li
              v-for="(item, idx) in items"
              :key="item.id"
              :class="{ active: idx === activeIndex }"
              @click="getActiveIndex(idx)"
            >
              <router-link :to="item.to">
                <i :class="item.icon"></i>
                <span class="sidebar-font">{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          id: 1,
          title: "Dashboard",
          to: { name: "dashboard" },
          icon: "ti-dashboard",
        },
        {
          id: 2,
          title: "Listado de usuarios",
          to: { name: "listUsers" },
          icon: "ti-dashboard",
        },
        {
          id: 3,
          title: "Pedidos pendientes",
          to: { name: "pendingOrders" },
          icon: "fa fa-table",
        },
        {
          id: 4,
          title: "Menú de hoy",
          to: { name: "dailyMenu" },
          icon: "fa fa-table",
        },
        {
          id: 5,
          title: "La Carta",
          to: { name: "carte" },
          icon: "fa fa-table",
        },
        {
          id: 6,
          title: "Listado de platos",
          to: { name: "listDishes" },
          icon: "fa fa-table",
        },
        {
          id: 7,
          title: "Configuración",
          to: { name: "config" },
          icon: "fa fa-table",
        },
      ],
    };
  },
  methods: {
    getActiveIndex(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-font {
  font-size: 18px;
}
</style>
