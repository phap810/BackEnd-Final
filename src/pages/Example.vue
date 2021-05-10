<template>
  <div class="supplier">
    <h2 class="boild">Suppliers</h2>
    <b-card no-body>
      <b-tabs card>
        <b-tab no-body title="All Product">
          <div class="products">
            <b-row align-h="center">
              <b-col
                cols="3"
                v-for="product in products"
                :key="product.name"
              >
                <div v-if="product.status != 2">
                  <div>
                    <div v-if="product.sale != null">
                      <b-badge class="sale" variant="danger"
                        >{{ product.sale }}%
                      </b-badge>
                    </div>
                    <img
                      :src="
                        'http://127.0.0.1:8000/uploads/product/' + product.img
                      "
                    />
                  </div>
                  <div class="infopr">
                    <div v-if="product.export_price != null">
                      <div class="importpr">
                        <strike
                          >{{ formatPrice(product.import_price) }}.Đ</strike
                        >
                      </div>
                      <div class="salepr">
                        {{ formatPrice(product.export_price) }}.Đ
                      </div>
                    </div>
                    <div v-else>
                      <div class="importpr">
                        {{ formatPrice(product.import_price) }}.Đ
                      </div>
                    </div>
                    <a
                      href="#"
                      @click="getDetail(product.id)"
                      class="showModal"
                      v-b-modal.modalshow
                      >QuickView</a
                    >
                    <p>{{ product.name }}</p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-tab>
        <div v-for="supplier in supliers" :key="supplier.id">
          <div v-if="supplier.status == 1">
            <b-tab @click="getSup1(supplier.id)" no-body :title="supplier.name">
              <div class="products">
                <b-row align-h="center">
                  <b-col
                    cols="3"
                    class="place-list"
                    v-for="product1 in products1"
                    :key="product1.id"
                  >
                    <div>
                      <div v-if="product1.sale != null">
                        <b-badge class="sale" variant="danger"
                          >{{ product1.sale }}%
                        </b-badge>
                      </div>
                      <img
                        :src="
                          'http://127.0.0.1:8000/uploads/product/' +
                            product1.img
                        "
                      />
                    </div>
                    <div class="infopr">
                      <div v-if="product1.export_price != null">
                        <div class="importpr">
                          <strike
                            >{{ formatPrice(product1.import_price) }}.Đ</strike
                          >
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
                      <a
                        href="#"
                        @click="getDetail(product1.id)"
                        class="showModal"
                        v-b-modal.modalshow
                        >QuickView</a
                      >
                      <p>{{ product1.name }}</p>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-tab>
          </div>
        </div>
      </b-tabs>
    </b-card>
    <div class="modalcart">
      <b-modal id="modalshow" hide-footer size="xl">
        <div class="wrapmodal">
          <div class="container">
            <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
              <b-row>
                <b-col lg="5">
                  <b-card img-alt="Image">
                    <img
                      style="max-width: 20rem"
                      :src="'http://127.0.0.1:8000/uploads/product/' + img"
                    />
                  </b-card>
                </b-col>
                <b-col lg="6">
                  <h4>
                    {{ name }}
                    <div v-if="sale != null">
                      <b-badge class="sale" variant="danger"
                        >{{ sale }}%
                      </b-badge>
                    </div>
                  </h4>
                  <div v-if="ex_price != null">
                    <div class="importpr">
                      <strike>{{ formatPrice(im_price) }}.Đ</strike>
                    </div>
                    <div class="salepr">{{ formatPrice(ex_price) }}.Đ</div>
                  </div>
                  <div v-else>
                    <div class="importpr">{{ formatPrice(im_price) }}.Đ</div>
                  </div>
                  <div class="choose">
                    <b-form-group label="Chọn màu">
                    <b-form-select class="color" v-model="color">
                      <option
                        v-for="color in listColor.data"
                        :key="color.id"
                        :value="color.id"
                      >
                        {{ color.color }}
                      </option>
                    </b-form-select>
                     </b-form-group>
                     <b-form-group label="Chọn size">
                    <b-form-select
                      class="size"
                      v-model="size"
                    >
                    <option
                        v-for="size in listSize.data"
                        :key="size.id"
                        :value="size.id"
                      >
                        {{ size.size }}
                      </option>
                    </b-form-select>
                     </b-form-group>
                    <b-form-spinbutton
                      class="count"
                      id="demo-sb"
                      v-model="quantity"
                      min="1"
                      max="50"
                    ></b-form-spinbutton>
                    <div class="actions">
                      <b-button
                        class="addtocart"
                        pill
                        variant="info"
                        @click="addItemToCart()"
                        >Add to cart</b-button
                      >
                      <!-- <b-button
                        class="buynow"
                        pill
                        variant="info"
                        @click="addItemToCart(product)"
                        >Buy now</b-button
                      > -->
                    </div>
                  </div>
                  <b-card-text>
                    {{ note }}
                  </b-card-text>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import CartModal from "./CartModal.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
Vue.use(VueAxios, axios);
export default {
  components: { CartModal },
  data() {
    return {
      product_id:null,
      size:null,
      color:null,
      quantity:null,
      listSize: [],
      listColor: [],
      img: null,
      name: null,
      ex_price: null,
      im_price: null,
      sale: null,
      note: null,
      supliers: [],
      cart: [],
      products: [],
      products1: []
    };
  },
  created() {
    this.getSupp();
    this.getProduct();
    this.getColor();
    this.getSize();
  },
  methods: {
        addItemToCart() {
      let formData = new FormData();
      formData.append("id", "239");
      formData.append("size_id", this.size);
      formData.append("color_id", this.color);
      formData.append("quantity", this.quantity);
      const config = {
        headers: { "Content-type": "multipart/form-data" }
      };
      console.log("NEw product", formData);
      axios
        .post(`http://127.0.0.1:8000/api/add-cart`, formData, config)
        .then(res => {
          Swal.fire("Đã thêm!", "Thêm sản phẩm vào giỏ hàng thành công.", "success");
        })
        .catch(error => {
          Swal.fire("Failed!", error, "warning");
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getDetail(id) {
      var self = this;
      console.log("http://127.0.0.1:8000/api/product/", id);
      Vue.axios
        .get("http://127.0.0.1:8000/api/product/" + id)
        .then(function(resp) {
          self.name = resp.data.data.name;
          self.ex_price = resp.data.data.export_price;
          self.im_price = resp.data.data.import_price;
          self.img = resp.data.data.img;
          self.sale = resp.data.data.sale;
          self.note = resp.data.data.note;
          console.log("Data:", resp.data.data);
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
    getColor() {
      Vue.axios
        .get("http://127.0.0.1:8000/api/product-color/239")
        .then(resp => {
          console.log(resp.data);
          this.listColor = resp.data;
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
        getSize() {
      Vue.axios
        .get("http://127.0.0.1:8000/api/product-size/239/139")
        .then(resp => {
          console.log(resp.data);
          this.listSize = resp.data;
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
    getSupp() {
      Vue.axios
        .get("http://127.0.0.1:8000/api/supplier")
        .then(resp => {
          this.supliers = resp.data.data;
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
    getSup1(id) {
      Vue.axios
        .get("http://127.0.0.1:8000/api/product-supplier/" + id)
        .then(resp => {
          this.products1 = resp.data.data;
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
    getProduct() {
      Vue.axios
        .get("http://127.0.0.1:8000/api/product")
        .then(resp => {
          this.products = resp.data.data;
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    }
  }
};
</script>

<style scoped>
.salepr {
  color: red;
}
.col-3 {
  -ms-flex: 0 0 25%;
  -webkit-box-flex: 0;
  flex: 0 0 25%;
  max-width: 25%;
  padding: 15px 10px;
}
.modal .modal-content .modal-body {
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  line-height: 1.9;
  height: 600px;
}
.modal .modal-content {
  margin: 0px 20px;
}
.choose {
  padding: 10px 10px;
  margin: 10px 50px;
  width: 200px;
}
.size {
  margin: 10px;
}
.color {
  margin: 10px;
}
.count {
  margin: 10px;
}
.addtocart {
  margin: 10px 38px;
}
.actions {
  display: inline-block;
}
.buttonselect {
  color: black;
  background-color: white;
  border-color: white;
  padding: 10px 20px;
}
.buttonselect:hover {
  color: red;
}
.boild {
  font-weight: bolder;
  text-transform: uppercase;
  margin-top: 120px;
  padding: 20px;
  padding-bottom: 15px;
}
.isotope-grid {
  position: relative;
  height: 1717.38px;
}
.block2-pic hov-img0 {
  width: 300px;
  height: 300px;
}
.place-list img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.infopr {
  text-align: center;
}
.sale {
  float: right;
}
.products {
  margin-top: 50px;
}
</style>
