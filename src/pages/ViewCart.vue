<template>
  <div class="viewcart-1">
    <h2>View Cart</h2>
    <b-container fluid class="content">
      <b-table
        sticky-header
        class="table-ct"
        striped
        hover
        :items="items"
        :fields="fields"
        head-variant="dark"
      >
        <template v-slot:cell(actions)="data">
          <b-button
            variant="primary"
            size="sm"
            class="mr-2"
            @click="payment(data.id)"
            >Payment</b-button
          >
          <b-button variant="danger" size="sm" @click="delete(data.id)"
            >Remove</b-button
          >
        </template>
      </b-table>
      <b-button class="paym" variant="primary" v-b-modal.modal-center
        >Payment</b-button
      >
      <b-link class="comeback" href="#" to="/home">
        <b-icon icon="arrow-return-left"></b-icon>
        Continue Purchase</b-link
      >
    </b-container>
    <top-nav-home />
    <content-footer-home />
    <b-modal size="xl" class="pay" id="modal-center" hide-footer>
      <h3>Shoes Store</h3>
      <b-row>
        <b-col lg="4">
          <b-form-input
            class="ipmd"
            v-model="text"
            placeholder="Enter your phone number"
          ></b-form-input>
          <b-form-input
            class="ipmd"
            v-model="text"
            placeholder="Enter your email"
          ></b-form-input>
          <b-form-input
            class="ipmd"
            v-model="text"
            placeholder="Enter your name"
          ></b-form-input>
          <b-form-input
            class="ipmd"
            v-model="text"
            placeholder="Enter your adress"
          ></b-form-input>
        </b-col>
        <b-col lg="4">
          <b-form-textarea
            class="ipmd"
            id="textarea"
            v-model="text"
            placeholder="Enter description"
            rows="4"
            max-rows="8"
          ></b-form-textarea>
          <b-form-radio
            class="ipmd"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Thanh toán khi nhận hàng"
            >Payment on delivery</b-form-radio
          >
          <b-form-radio
            class="ipmd"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Chuyển khoản"
            v-b-toggle.collapse-1
            >Transfer payments
            <b-collapse id="collapse-1" class="mt-2">
              <div
                id="divmethod"
                class="divmethod"
                style="overflow: hidden; display: block"
              >
                <strong
                  >Ngân hàng Vietcombank (Ngân hàng ngoại thương Việt
                  Nam)</strong
                ><br />
                - Số tài khoản: 52480201022<br />
                - Chủ tài khoản: Bùi Khắc Huy<br />
                - Chi nhánh: Lê Thành Phương - Phường 2
              </div>
            </b-collapse>
          </b-form-radio>
        </b-col>
        <b-col lg="4">
          <h3>Invoice Details</h3>
          <b-table
            sticky-header
            class="table-bill"
            striped
            hover
            :items="bill"
            :fields="info"
          >
            <template v-slot:cell(actions)="data">
              <b-icon
                icon="backspace"
                aria-hidden="true"
                size="sm"
                @click="delete data.id"
              ></b-icon>
            </template>
          </b-table>
          <div class="total">
            <div>Total:</div>
            <b-badge variant="light" class="prtotal">$25.54</b-badge>
          </div>
        </b-col>
      </b-row>
      <b-button pill variant="success" class="btsubmit"
        >Order Complete</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ContentFooterHome from "../components/Footer/ContentFooterHome.vue";
import TopNavHome from "../layout/TopNavHome.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
export default {
  components: { ContentFooterHome, TopNavHome },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Product Name"
        },
        {
          key: "price",
          label: "Price"
        },
        {
          key: "img",
          label: "Image",
        },
        {
          key: "size",
          label: "Size",
        },
        {
          key: "color",
          label: "Color",
        },
        {
          key: "quantity",
          label: "Quantity",
        },
        {
          key: "total",
          label: "Total",
        },
        {
          key: "actions",
          label: "Actions"
        }
      ],
      items: [
        {
          name: "Huy",
          price: "120 vnd",
          img: "23",
          size: "39",
          color: "đen",
          quantity:"2",
          total: "240 vnd"
        }
      ],
      info: [
        {
          key: "name",
          label: ""
        },
        {
          key: "size",
          label: ""
        },
        {
          key: "color",
          label: ""
        },
        {
          key: "amount",
          label: ""
        },
        {
          key: "price",
          label: ""
        },
        {
          key: "actions",
          label: ""
        }
      ],
      bill: [
        {
          name: "Adidas",
          size: "Size40",
          color: "Black",
          amount: "1",
          price: "$25.54"
        },
        {
          name: "Converse",
          size: "Size41",
          color: "Black",
          amount: "1",
          price: "$30.25"
        }
      ]
    };
  },
    created() {
      this.getItem();
  },
  methods:{
    getItem(){
      axios.get(`http://127.0.0.1:8000/api/view-cart`)
      .then((resp) =>{
        console.log(resp);
        console.log("đã có đata");
      })
      .then((res) => {
         console.log(res);
        console.log("đã có đata 11");
      })
     
    }
  }
  
};
</script>

<style scoped>
.viewcart-1 {
  margin-top: 80px;
}
h3 {
  text-align: center;
  font-weight: bolder;
}
h2 {
  font-weight: bolder;
  text-transform: uppercase;
  text-align: center;
  margin-top: 130px;
}
.content {
  margin-bottom: 30px;
}
.table-ct {
  color: black;
}
.ipmd {
  margin-top: 20px;
}
.btsubmit {
  display: block !important;
  margin: 30px auto 0 !important;
}
.prtotal {
  float: right;
  margin-top: -21px;
}
.paym {
  display: block !important;
  margin: 30px auto 0 !important;
}
.comeback {
  margin-bottom: 30px !important;
}
.table-bill {
  display: block;
}
</style>
