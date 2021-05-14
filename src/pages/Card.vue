<template>
  <div class="container">
    <div class="home-section-head">
      <h2 class="section-title">HOT DEAL</h2>
    </div>
    <b-row align-h="center">
      <b-col
        cols="4"
        class="place-list"
        v-for="product1 in products.data"
        :key="product1.id"
      >
        <b-card
          class="cardinfo"
          overlay
          text-variant="white"
        >
        <div>
          <img class="resize" :src="'http://127.0.0.1:8000/uploads/product/' + product1.img">
          <div class="product-coming-soon-2">Mới ra mắt</div>
        </div>
          
         <div v-if="product1.sale != null">
            <div class="infopr">
            <div v-if="product1.export_price != null">
              <div class="importpr">
                <strike>{{ formatPrice(product1.import_price) }}.Đ</strike>
              </div>
              <div class="salepr">
                {{ formatPrice(product1.export_price) }}.Đ
              </div>
            </div>
            <div v-else>
              <div class="importpr">
                {{ formatPrice(product1.import_price) }}.Đ
              </div>
            </div>
            <p>{{ product1.name }}</p>
          </div>
            </div>
          
        </b-card>
      </b-col>
    </b-row>
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
      product_id: null,
      img: null,
      name: null,
      ex_price: null,
      im_price: null,
      sale: null,
      products: [],
      products1: [],
    };
  },
  created() {
    this.getLatestProduct();
  },
  methods: {
    getLatestProduct() {
      var self = this;
      Vue.axios
        .get("http://127.0.0.1:8000/api/product-new")
        .then((resp) => {
          self.products = resp.data;
          console.log(resp.data);
        })
        .catch(function (error) {
          console.log("Loi:", error);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.resize{
  width: 260px;
  height: 195px;
}
p {
    font-size: 16px;
    line-height: 1.5;
    color: black;
}
.cardinfo {
  width: 300px;
  height: 300px;
  display: inline-block;
  padding: 15px 15px;
  margin: 10px 45px;
}
.product-coming-soon-2 {
    position: absolute;
    bottom: 94px;
    left: 17px;
    background: #e62117;
    color: white;
    padding: 2px 10px;
    font-weight: bold;
    font-size: 13px;
    border-radius: 20px;
}
.home-section-head {
  text-align: center;
}
.home-section-head .title,
.home-section-head h2 {
  color: #333333;
  padding: 30px;
  margin: 5px;
  font-size: 25px;
  text-transform: uppercase;
  bottom: 5px;
  left: 5px;
  font-weight: bold;
}
.products {
  margin-top: 50px;
}
.salepr {
  color: red;
}
.importpr{
  color:black;
}
.infopr{
  text-align: center;
}
</style>