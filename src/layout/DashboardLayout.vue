<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/admin/product-list">
        <i class="fa fa-product-hunt"></i>
        <p>Product list</p>
      </sidebar-link>
      <sidebar-link to="/admin/bill">
        <i class="nc-icon nc-notes"></i>
        <p>Bill list</p>
      </sidebar-link>
      <sidebar-link to="/admin/category">
        <i class="nc-icon nc-paper-2"></i>
        <p>Category</p>
      </sidebar-link>
      <sidebar-link to="/admin/suppliers">
        <i class="nc-icon nc-badge"></i>
        <p>Suppliers</p>
      </sidebar-link>
      <sidebar-link to="/admin/users">
        <i class="fa fa-users"></i>
        <p>Users</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "../components/Footer/ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
import BaseDropdown from "../components/BaseDropdown.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    BaseDropdown
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
