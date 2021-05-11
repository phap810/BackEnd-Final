<template>
  <div class="register">
    <b-container>
      <div class="register-form">
        <b-row class="justify-content-md-center mt-4">
          <b-col col md="5">
            <h2>Đăng ký tài khoản</h2>
            <!-- <b-card header="Login - Shoes Store"
          header-bg-variant="primary"
          header-text-variant="white">
          </b-card> -->
            <b-card-text>
              <b-form @submit.prevent="register">
                <b-form-group description="Enter your email" label="Email">
                  <b-form-input
                    v-model="customeradd.email"
                    required
                    type="email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  description="Enter your password"
                  label="Password"
                >
                  <b-form-input
                    v-model="customeradd.password"
                    required
                    type="password"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  description="Enter your Confimpasssword"
                  label="Confimpasssword"
                >
                  <b-form-input
                    v-model="customeradd.confirmpassword"
                    required
                    type="password"
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    class="filled-in"
                    v-model="acceptTerms"
                  />
                  <span>i have read &amp; accept the terms</span>
                </b-form-group>

                <b-form-group>
                  <b-button
                    block
                    variant="primary"
                    type="submit"
                    :disabled="acceptableSubmittion"
                    >SignUp</b-button
                  >
                </b-form-group>
              </b-form>
            </b-card-text>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <top-nav-home />
    <content-footer-home />
  </div>
</template>


<script>
import ContentFooterHome from "../components/Footer/ContentFooterHome.vue";
import TopNavHome from "../layout/TopNavHome.vue";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
Vue.use(VueAxios, axios);

export default {
  components: {
    ContentFooterHome,
    TopNavHome,
  },
  data() {
    return {
      customeruser: [],
      customeradd: {
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        confirmpassword: "",
      },
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    register() {
      const { name, password, confirmpassword } = this.customeradd;

      if (
        this.customeradd.name == null ||
        this.customeradd.password == null ||
        this.customeradd.confirmpassword == null
      ) {
        Swal.fire("Failed!", "Bạn phải nhập đầy đủ thông tin", "warning");
        return;
      }

      if (password.length < 6) {
        Swal.fire(
          "Mat khau khong hop le",
          "Mat khau phai tren 6 ky tu",
          "warning"
        );
      }

      if (confirmpassword !== password) {
        Swal.fire(
          "Mat khau khong trung khop",
          "Vui long kiem tra lai",
          "warning"
        );
        return;
      }

      Vue.axios
        .post(`http://127.0.0.1:8000/api/customer`, this.customeradd)
        .then((res) => {
          console.log("Thành công");
          Swal.fire("Đã thêm!", "Dang ky thanh cong!.", "success").then(() =>
            this.$router.push("/logincustomer")
          );
        })
        .catch((error) => {
          console.log("Lỗi", error);
          Swal.fire("Failed!", "Lỗi không thêm được", "warning");
        });
    },
  },
};
</script>

<style scoped>
.register {
  margin-top: 113px;
}
.register-form {
  margin-bottom: 48px;
}
h2 {
  text-align: center;
  text-transform: uppercase;
  font-weight: bolder;
  margin: auto;
  margin-bottom: 24px;
}
.btnlogin {
  margin: -50px 172px;
  padding: 10px 40px;
}
.filled-in {
  margin-right: 20px;
  height: 17px;
  width: 30px;
}
</style>