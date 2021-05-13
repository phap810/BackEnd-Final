<template>
  <mdb-card>
    <mdb-card-body>
      <mdb-row>
        <mdb-col lg="8" class="mb-4">
          <mdb-tab pills justify color="primary">
            <h2>Payment</h2>
          </mdb-tab>
          <mdb-tab-content>
            <!--Card content-->
            <form>
              <!--Grid row-->
              <label for="email" class="">Email</label>
              <input
                type="text"
                value="123"
                id="email"
                class="form-control mb-4"
              />
              <div class="row">
                <!--Grid column-->
                <!--email-->

                <div class="col-md-6 mb-4">
                  <!--firstName-->
                  <label for="firstName" class="">Name</label>
                  <input type="text" id="firstName" v-model="checkout.name" class="form-control" />
                </div>
                <!--Grid column-->
                <!--Grid column-->
                <div class="col-md-6 mb-2">
                  <!--lastName-->
                  <label for="lastName" class="">Phone</label>
                  <input type="tel" v-model="checkout.phone" class="form-control" />
                </div>
                <!--Grid column-->
              </div>
              <!--Grid row-->
              <!--address-->
              <label for="address" class="">Address</label>
              <input
                type="text"
                id="address"
                v-model="checkout.address"
                class="form-control mb-4"
                placeholder="Example: 123 Nguyễn Thái Học, Quy Nhơn"
              />

              <label for="address" class="">Note</label>
              <textarea class="form-control mb-4" v-model="checkout.note" rows="4" cols="50">
              </textarea>
              <label for="address" class="">Mothod</label>
              <b-form-select
                v-model="checkout.method"
                :options="options"
              ></b-form-select>
              <hr />
              <!-- <mdb-btn @click="payment()" color="primary" size="lg" block type="submit"
                >Payment</mdb-btn
              > -->
              <b-button variant="primary" @click="payment()" >Payment</b-button>
            </form>
          </mdb-tab-content>
        </mdb-col>
        <mdb-col lg="4" class="mb-4">
          <!--Card-->
          <mdb-card>
            <!--Card content-->
            <mdb-card-body>
              <h4 class="mb-4 mt-1 h5 text-center font-weight-bold">Summary</h4>
              <hr />
              <dl
                class="row"
                v-for="cart in carts"
                v-bind:key="cart.product_name"
              >
                <dd class="col-sm-8">
                  {{ cart.product_name }}
                </dd>
                <dd class="col-sm-4">{{ formatPrice(cart.product_price) }}Đ</dd>
              </dl>
              <hr />
              <dl class="row">
                <dt class="col-sm-8">
                  Total
                </dt>
                <dt class="col-sm-4">
                  $ 6000
                </dt>
              </dl>
            </mdb-card-body>
          </mdb-card>
          <!--/.Card-->
        </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbIcon,
  mdbCard,
  mdbView,
  mdbMask,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbTooltip,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbBtn,
  mdbTab,
  mdbTabItem,
  mdbTabContent,
  mdbTabPane,
  mdbSelect
} from "mdbvue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbCard,
    mdbView,
    mdbMask,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbTooltip,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbBtn,
    mdbTab,
    mdbTabItem,
    mdbTabContent,
    mdbTabPane,
    mdbSelect
  },
  data() {
    return {
      options: [
        { value: 1, text: "Giao tận nơi (COD)" },
        { value: 2, text: "Thanh toán online" }
      ],
      customer:[],
      checkout: {
        name:null,
        phone:null,
        address:null,
        note:null,
        method:null,
      }
    };
  },
  methods:{
        payment() {
          this.customer = JSON.parse(localStorage.getItem("customer"));
      let formData = new FormData();
      formData.append("name", this.checkout.name);
      formData.append("phone", this.checkout.phone);
      formData.append("address", this.checkout.address);
      formData.append("note", this.checkout.note);
      formData.append("payment", this.checkout.method);
      axios
        .post(`http://127.0.0.1:8000/api/bill/`+this.customer.id, formData)
        .then(res => {
          Swal.fire("Đã thanh toán!", "Thanh toán thành công.", "success");
        })
        .catch(error => {
          Swal.fire("Failed!", error, "warning");
        });
    },
  }

};
</script>

<style></style>
