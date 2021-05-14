<template>
  <div>
    <div class="container">
      <div class="customer">
        <h1>Thông tin khách hàng</h1>
        <b-form @submit.prevent="SubmitAdd">
          <b-form-group
            id="input-group-2"
            label="Full Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="formadd.name"
              placeholder="Enter name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Phone:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="formadd.phone"
              placeholder="Enter phone"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Address:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="formadd.address"
              placeholder="Enter address"
              required
            ></b-form-input>
          </b-form-group>
          <div class="update-btn">
            <b-button
              type="submit"
              @click="update()"
              class="btn-update"
              variant="primary"
              >Update</b-button
            >
          </div>
        </b-form>
      </div>
      <div class="history-product">
        <h2>Lịch sử mua hàng</h2>
        <table class="table category">
          <thead>
            <slot name="columns">
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Tên nhà cung cấp</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th>Trạng thái</th>
                <th>Action</th>
              </tr>
            </slot>
          </thead>
        </table>
      </div>
    </div>
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
      formadd: {
        name: "",
        phone: "",
        address: "",
      },
      customer: []
    };
  },
  created() {
    this.getItem();
  },
  methods:{
  SubmitAdd() {
    var self = this;
    this.customer = JSON.parse(localStorage.getItem("customer"));
    var edit=this.formadd;
    axios
      .put(`http://127.0.0.1:8000/api/customer/`+this.customer.id, edit)
      .then((res) => {
        self.getItem();
        console.log("Thành công");
        Swal.fire("Đã update!", "Update thông tin thành công.", "success");
      })
      .catch((error) => {
        this.getItem();
        Swal.fire("Failed!", error, "warning");
      });
  },
  getItem() {
    var self = this;
    this.customer = JSON.parse(localStorage.getItem("customer"));
    Vue.axios
      .get("http://127.0.0.1:8000/api/customer/"+this.customer.id)
      .then(function (resp) {
        self.formadd.name = resp.data.data.name;
        self.formadd.phone = resp.data.data.phone;
        self.formadd.address = resp.data.data.address;
      })
      .catch(function (error) {
        console.log("Loi:", error);
      });
  },
  },

};
</script>

<style scoped>
.container {
  margin-top: 113px;
}
#input-group-2 {
  margin-bottom: 1rem;
  width: 40%;
  margin: 0 auto;
}
.container h1 {
  text-align: center;
}
.history-product {
  border-top: 1px solid black;
}
.history-product h2 {
  text-align: center;
}
.btn-update {
  margin: 27px auto;
  display: block;
}
</style>