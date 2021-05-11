<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <!-- <b-dropdown text="Account">
              <b-dropdown-item href="#">Setting</b-dropdown-item>
              <b-dropdown-item href="#">Change Password</b-dropdown-item>
            </b-dropdown> -->
            <b>{{ nameSLo }}</b>
          </li>
          <li class="nav-item">
            <b-button @click="logout">Đăng xuất</b-button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  computed: {
    filtersearch: function() {},
    routeName() {
      const { zet } = this.$route;
      return this.capitalizeFirstLetter(zet);
    }
  },
  data() {
    return {
      search: "",
      activeNotifications: false,
      nameSLo: null
    };
  },
  created() {
    let token = JSON.parse(window.localStorage.getItem("auth"));
    this.nameSLo = token.name;
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    },
    getUsername() {
      axios.get("");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style>
.mr-sm-2 {
  border-radius: 12px;
}
.my-2 my-sm-search {
  border-radius: 12px;
}
footer.bg3.p-t-75.p-b-32 {
  position: relative;
  width: 100%;
  /* height: 100%; */
  bottom: 0;
}
</style>
