<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <!-- <b-nav-form>
            <b-form-input
              class="mr-sm-2"
              v-model="search"
              placeholder="Search"
              @keyup="searchUnit"
            ></b-form-input>
          </b-nav-form> -->
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Chờ xác nhận</h4>
              <table class="table category">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th>ID</th>
                      <th>Tên khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Phương thức thanh toán</th>
                      <th>Ngày đặt</th>
                      <th>Chú thích</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr
                    v-for="bill in bill1.data"
                    v-bind:key="bill.id"
                    v-if="bill.status == 1"
                  >
                    <td>{{ bill.id }}</td>
                    <td>{{ bill.customer_id }}</td>
                    <td>{{ bill.total }}</td>
                    <td>{{ bill.payment }}</td>
                    <td>{{ bill.dateorder }}</td>
                    <td>{{ bill.note }}</td>
                    <td>
                      <div v-if="bill.status == 1">
                        <b-badge variant="success">Chờ xác nhận</b-badge>
                      </div>
                      <div v-else-if="bill.status == 2">
                        <b-badge variant="danger">Đang vận chuyển</b-badge>
                      </div>
                      <div v-else>
                        <b-badge variant="warning">Gửi thành công</b-badge>
                      </div>
                    </td>
                    <td>
                      <b-button
                        variant="outline-info"
                        v-b-modal.modal-center
                        @click="show(bill.id)"
                        >Show</b-button
                      >
                      <b-button variant="outline-primary" @click="edit(bill.id)"
                        >Check</b-button
                      >
                      <b-button
                        variant="outline-danger"
                        @click="delete1(bill.id)"
                        >Hủy</b-button
                      >
                    </td>
                  </tr>
                </tbody>
                <b-modal
                  size="xl"
                  id="modal-center"
                  ref="modal"
                  title="THÔNG TIN CHI TIẾT HÓA ĐƠN"
                  @show="resetModal"
                  @hidden="resetModal"
                  @ok="handleOk"
                >
                  <table class="table">
                    <thead>
                      <tr v-bind:key="id">
                        <th>
                          <h4><b>THÔNG TIN KHÁCH HÀNG</b></h4>
                          <p>Tên khách hàng: {{ name }}</p>
                          <p>Email: {{ email }}</p>
                          <p>Số điện thoại: {{ phone }}</p>
                          <p>Địa Chỉ: {{ address }}</p>
                          <h4><b>THÔNG TIN ĐƠN HÀNG</b></h4>
                          <table class="table">
                            <tr>
                              <th>STT</th>
                              <th>Sản phẩm</th>
                              <th>Hình ảnh</th>
                              <th>Màu</th>
                              <th>Size</th>
                              <th>Số lượng</th>
                              <th>Đơn giá</th>
                              <th>Tổng giá</th>
                            </tr>
                            <tr
                              v-for="bill0 in billDetail"
                              v-bind:key="bill0.id"
                            >
                              <td>{{ bill0.id_bill }}</td>
                              <td>{{ bill0.name }}</td>
                              <td>
                                <img
                                  v-bind:src="
                                    'http://127.0.0.1:8000/uploads/product/' +
                                      bill0.img
                                  "
                                  width="100"
                                  alt="product"
                                />
                              </td>
                              <td>{{ bill0.color }}</td>
                              <td>{{ bill0.size }}</td>
                              <td>{{ bill0.amount }}</td>
                              <td>{{ bill0.price }}</td>
                              <td>{{ bill0.price * bill0.amount }}</td>
                            </tr>
                          </table>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </b-modal>
              </table>
            </template>
          </card>
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Đang vận chuyển</h4>
              <table class="table category">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th>ID</th>
                      <th>Tên khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Phương thức thanh toán</th>
                      <th>Ngày đặt</th>
                      <th>Chú thích</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr
                    v-for="bill in bill1.data"
                    v-bind:key="bill.id"
                    v-if="bill.status == 2"
                  >
                    <td>{{ bill.id }}</td>
                    <td>{{ bill.customer_id }}</td>
                    <td>{{ bill.total }}</td>
                    <td>{{ bill.payment }}</td>
                    <td>{{ bill.dateorder }}</td>
                    <td>{{ bill.note }}</td>
                    <td>
                      <div v-if="bill.status == 1">
                        <b-badge variant="success">Active</b-badge>
                      </div>
                      <div v-else>
                        <b-badge variant="danger">Inactive</b-badge>
                      </div>
                    </td>
                    <td>
                      <b-button
                        variant="outline-info"
                        v-b-modal.modal-center
                        @click="show(bill.id)"
                        >Show</b-button
                      >
                      <b-button variant="outline-primary" @click="edit(bill.id)"
                        >Check</b-button
                      >
                      <b-button
                        variant="outline-danger"
                        @click="delete1(bill.id)"
                        >Hủy</b-button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </card>
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Đã hoàn thành</h4>
              <table class="table category">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th>ID</th>
                      <th>Tên khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Phương thức thanh toán</th>
                      <th>Ngày đặt</th>
                      <th>Chú thích</th>
                      <th>Trạng thái</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr
                    v-for="bill in bill1.data"
                    v-bind:key="bill.id"
                    v-if="bill.status == 3"
                  >
                    <td>{{ bill.id }}</td>
                    <td>{{ bill.customer_id }}</td>
                    <td>{{ bill.total }}</td>
                    <td>{{ bill.payment }}</td>
                    <td>{{ bill.dateorder }}</td>
                    <td>{{ bill.note }}</td>
                    <td>
                      <div v-if="bill.status == 1">
                        <b-badge variant="success">Chờ xác nhận</b-badge>
                      </div>
                      <div v-else-if="bill.status == 2">
                        <b-badge variant="danger">Đang vận chuyển</b-badge>
                      </div>
                      <div v-else>
                        <b-badge variant="warning">Gửi thành công</b-badge>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
Vue.use(VueAxios, axios);
export default {
  data() {
    return {
      search: "",
      listType: [],
      isEdit: false,
      bill1: [],
      formadd: {
        customer_id: "",
        total: "",
        payment: "",
        dateorder: null,
        note: 1,
        status: null
      },
      formedit: {
        id: "",
        customer_id: "",
        total: "",
        payment: "",
        dateorder: null,
        note: 1,
        status: null
      },
      billDetail: [],
      name: null,
      email: null,
      phone: null,
      address: null,
      options: [
        { value: 1, text: "Active" },
        { value: 2, text: "Inactive" }
      ]
    };
  },
  props: {
    columns: Array,
    data: Array
  },
  mounted() {},
  created() {
    this.getItem();
  },
  methods: {
    //         searchUnit() {
    //   axios.get("http://127.0.0.1:8000/api/bill?name=" + this.search).then(response => {
    //     this.bill1 = response.data;
    //   });
    // },
    show(id) {
      var self = this;
      this.formedit.id = id;
      console.log("http://127.0.0.1:8000/api/billDetail/", id);
      axios.get("http://127.0.0.1:8000/api/billDetail/" + id).then(res => {
        self.name = res.data.Customer.name;
        self.email = res.data.Customer.email;
        self.phone = res.data.Customer.phone;
        self.address = res.data.Customer.address;
        self.billDetail = res.data.BillDetail;

        console.log("data", res.data.BillDetail);
      });
    },
    getItem() {
      var self = this;
      Vue.axios
        .get("http://127.0.0.1:8000/api/bill")
        .then(function(resp) {
          self.bill1 = resp.data;
          console.log("Data:", resp.data.data);
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
    edit(id) {
      this.formedit.id = id;
      console.log("http://127.0.0.1:8000/api/bill/", id);
      axios
        .put("http://127.0.0.1:8000/api/bill/" + id)
        .then(res => {
          this.getItem();
          Swal.fire("Đã kích hoạt!", "Kich hoạt thành công.", "success");
          console.log("Thành công");
        })
        .catch(function(error) {
          Swal.fire("Failed!", "Lỗi không kích hoạt được", "warning");
          console.log("lỗi:", error);
        });
    },
    delete1(id) {
      this.formedit.id = id;
      console.log("http://127.0.0.1:8000/api/bill/", id);
      axios
        .delete("http://127.0.0.1:8000/api/bill/" + id)
        .then(res => {
          this.getItem();
          Swal.fire("Đã hủy!", "Hủy thành công.", "success");
          console.log("Thành công");
        })
        .catch(function(error) {
          Swal.fire("Failed!", "Hủy thất bại", "warning");
          console.log("lỗi:", error);
        });
    }
  }
};
</script>
<style>
.editcategory {
  border: none;
  padding: 4px 12px;
  margin-left: 1px;
  background-color: #0e6de9;
}
.editcategory:hover {
  color: #212529;
  background-color: #0e6de9;
}
.editcategory:active {
  color: #212529;
  background-color: #189ce9 !important;
}
.b-submit {
  background-color: rgb(248, 23, 23);
  color: black;
  padding: 14px 10px;
  display: inline;
  cursor: pointer;
  border-radius: 5px;
}
.b-close {
  background-color: rgb(160, 160, 158);
  color: black;
  padding: 8px 9px;
  display: inline;
  cursor: pointer;
  border-radius: 5px;
}

</style>
