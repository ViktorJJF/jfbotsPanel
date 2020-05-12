<template>
  <div class="page-container">
    <sidebar></sidebar>
    <div class="main-content">
      <navbar></navbar>
      <router-view></router-view>
      <v-footer></v-footer>
      <overlay></overlay>
    </div>
    <success-snackbar></success-snackbar>
  </div>
</template>

<script>
import sidebar from "@/components/adminPanel/sidebar";
import navbar from "@/components/adminPanel/navbar";
import vFooter from "@/components/adminPanel/footer";
import { addCustomScript } from "@/utils/utils";
import successSnackbar from "@/components/global/success";
import overlay from "@/components/global/overlay";
export default {
  components: {
    sidebar,
    navbar,
    vFooter,
    successSnackbar,
    overlay,
  },
  mounted() {
    addCustomScript("assets/js/line-chart.js");
    addCustomScript("assets/js/pie-chart.js");
    addCustomScript("assets/js/plugins.js");
    addCustomScript("assets/js/scripts.js");
  },
};
</script>

<style lang="scss" scoped></style>
