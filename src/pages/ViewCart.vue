<template>
  <div class="viewcart-1">
    {{ today.day }}<br />{{ today.date }}
    <h2>View Cart</h2>

    <b-container fluid class="content">
      <table class="table">
        <thead>
          <slot name="columns">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Img</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </slot>
        </thead>
        <tbody>
          <tr v-for="(cat, n) in cats" v-bind:key="n.product_id">
            <td>{{ cat.product_id }}</td>
            <td>{{ cat.size }}</td>
            <td>{{ cat.color }}</td>
            <td>{{ cat.quantity }}</td>
            <td>
              <b-button variant="danger" size="sm" @click="removeCat(n)"
                >Remove</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
      <b-button class="paym" variant="primary" v-b-modal.modal-center
        >Payment</b-button
      >
      <b-button class="paym" variant="primary" @click="clearAll()"
        >Clear cart</b-button
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
      cats: [],
      // fields: [
      //   {
      //     key: "name",
      //     label: "Product Name"
      //   },
      //   {
      //     key: "price",
      //     label: "Price"
      //   },
      //   {
      //     key: "img",
      //     label: "Image",
      //     sortable: true
      //   },
      //   {
      //     key: "size",
      //     label: "Size",
      //     sortable: true
      //   },
      //   {
      //     key: "color",
      //     label: "Color",
      //     sortable: true
      //   },
      //   {
      //     key: "quantity",
      //     label: "Quantity",
      //     sortable: true
      //   },
      //   {
      //     key: "total",
      //     label: "Total",
      //     sortable: true
      //   },
      //   {
      //     key: "actions",
      //     label: "Actions"
      //   }
      // ],
      // items: [
      //   {
      //     name: "Huy",
      //     price: "120 vnd",
      //     img: "23",
      //     size: "39",
      //     color: "đen",
      //     quantity: "2",
      //     total: "240 vnd"
      //   }
      // ],
      // info: [
      //   {
      //     key: "name",
      //     label: ""
      //   },
      //   {
      //     key: "size",
      //     label: ""
      //   },
      //   {
      //     key: "color",
      //     label: ""
      //   },
      //   {
      //     key: "amount",
      //     label: ""
      //   },
      //   {
      //     key: "price",
      //     label: ""
      //   },
      //   {
      //     key: "actions",
      //     label: ""
      //   }
      // ],
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
    this.getDetail();
  },
  mounted() {
    if (localStorage.getItem("cats")) {
      try {
        this.cats = JSON.parse(localStorage.getItem("cats"));
      } catch (e) {
        localStorage.removeItem("cats");
      }
    }
  },
  computed: {
    today: function() {
      var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = {
        day: weekday[today.getDay()],
        date: mm + "-" + dd + "-" + yyyy
      };

      return today;
    }
  },
  methods: {
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    clearAll() {
      this.cats = {};
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem("cats", parsed);
    },
    // getItem() {
    //   axios
    //     .get(`http://127.0.0.1:8000/api/view-cart`)
    //     .then(resp => {
    //       console.log(resp.data);
    //     })
    //     // .then(res => {
    //     //   this.items = res.data.map(product => {
    //     //     return {
    //     //       name: product.items.name,
    //     //       price: product.price,
    //     //       img: product.img,
    //     //       size: product.size,
    //     //       color: product.color,
    //     //       quantity: product.quantity,
    //     //       total: product.total,
    //     //     };
    //     //   });
    //     // })
    //     .catch(function(error) {
    //       console.log("Loi:", error);
    //     });
    // },
    getDetail() {
      var self = this;
      self.cats.product_id = id;
      console.log("http://127.0.0.1:8000/api/product/", id);
     axios.get("http://127.0.0.1:8000/api/product/" + id).then(function(resp) {
          console.log("Data:", resp.data.data);
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
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
  margin-top: 0px;
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
