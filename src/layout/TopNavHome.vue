<template>
  <div class="topnavhome">
    <b-navbar class="topnavbar" toggleable="lg" type="dark">
      <b-navbar-brand href="#" to="/login">SHOES STORE</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav>
        <router-link class="item-menu" to="/home">Home</router-link>
        <router-link class="item-menu" to="/shop">Shop</router-link>
        <router-link class="item-menu" to="/about">About</router-link>
        <router-link class="item-menu" to="/contact">Contact</router-link>

        <div v-if="mail != null">
          <router-link class="item-menu" to="/viewcart"
            >Cart (<span class="total-count">{{ quantity_cart }}</span
            >)
            <b-icon icon="cart4" aria-hidden="true" class="iccart"></b-icon>
          </router-link>
          <router-link class="item-menu" to="/profile-customer">{{ mail }}</router-link>
          <b-button variant="primary" class="item-menu" @click="logout"
            >Đăng xuất </b-button
          >
        </div>
        <div v-else>
          <router-link class="item-menu" to="/logincustomer">Login</router-link>
        </div>
        <!-- <b-button class="cart-bt" to="/viewcart" data-toggle="modal" data-target="#cart">
          Cart (<span class="total-count"></span>)
          <b-icon icon="cart4" aria-hidden="true" class="iccart"></b-icon>
          </b-button> -->
      </b-navbar-nav>
      <b-collapse id="nav-collapse" is-nav> </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
export default {
  data() {
    return {
      mail: null,
      quantity_cart: null,
      customer: []
    };
  },
  created() {
    let token = JSON.parse(window.localStorage.getItem("customer"));
    this.mail = token.email;
  },
  async mounted() {
    this.total();
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logoutcustomer")
        .then(() => this.$router.go());
    },
    total() {
      var self = this;
      this.customer = JSON.parse(localStorage.getItem("customer"));
      console.log("local:", this.customer.id);
      axios
        .get("http://127.0.0.1:8000/api/total-cart/" + this.customer.id)
        .then(function(resp) {
          self.quantity_cart = resp.data.data;
        })
        .catch(function(error) {
          console.log("Loi cart:", error);
        });
    }
  }
};
</script>

<style scoped>
.item-menu {
  margin-left: 30px;
  /* color: black; */
}
.item-menu :hover {
  color: #01020c;
}
.item-cart {
  float: right;
}
.topnavhome {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
}
.cart-bt {
  margin: 15px 15px;
}
</style>
