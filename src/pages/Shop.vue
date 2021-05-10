<template>
  <div class="allproduct">
    <h2 class="boild">Category</h2>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab no-body title="All Product">
            <div class="products">
              <b-row align-h="center">
                <b-col
                  cols="3"
                  class="place-list"
                  v-for="product in products"
                  :key="product.name"
                >
                  <div>
                    <div v-if="product.sale != null">
                      <b-badge class="sale" variant="danger"
                        >{{ product.sale }}%
                      </b-badge>
                    </div>
                    <img
                      class="img_shop"
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
                </b-col>
              </b-row>
            </div>
          </b-tab>
          <div v-for="category in categorys" :key="category.id">
            <div v-if="category.status == 1">
              <b-tab
                @click="getCate1(category.id)"
                no-body
                :title="category.name"
              >
                <div class="products">
                  <b-row>
                    <b-col
                      class="place-list"
                      v-for="product1 in products1"
                      :key="product1.id"
                      style=""
                    >
                      <div>
                        <div v-if="product1.sale != null">
                          <b-badge class="sale" variant="danger"
                            >{{ product1.sale }}%
                          </b-badge>
                        </div>
                        <img
                          class="img_shop"
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
                              >{{
                                formatPrice(product1.import_price)
                              }}.Đ</strike
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
                      <div class="content_img">
                        <div v-if="sale != null">
                          <b-badge class="sale" variant="danger"
                            >{{ sale }}%
                          </b-badge>
                        </div>
                        <img
                          style="max-width: 20rem, max-height: 20rem"
                          :src="'http://127.0.0.1:8000/uploads/product/' + img"
                        />
                      </div>
                    </b-card>
                  </b-col>
                  <b-col lg="6">
                    <h4>
                      {{ name }}
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
                      <b-form-select
                        class="size"
                        v-model="selected"
                        :options="size"
                      ></b-form-select>
                      <b-form-select
                        class="color"
                        v-model="selecteds"
                        :options="color"
                      ></b-form-select>
                      <b-form-spinbutton
                        class="count"
                        id="demo-sb"
                        v-model="value"
                        min="1"
                        max="50"
                      ></b-form-spinbutton>
                      <div class="actions">
                        <b-button
                          class="addtocart"
                          pill
                          variant="info"
                          @click="addItemToCart(product)"
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
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </b-card-text>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <top-nav-home />
    <content-footer-home />
  </div>
</template>

<script>
import ContentFooterHome from "../components/Footer/ContentFooterHome.vue";
import TopNavHome from "../layout/TopNavHome.vue";
import CartModal from "./CartModal.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
export default {
  components: { CartModal, TopNavHome, ContentFooterHome },
  data() {
    return {
      img: null,
      name: null,
      ex_price: null,
      im_price: null,
      sale: null,
      products: [],
      products1: [],
      categorys: [],
    };
  },
  created() {
    this.getCate();
    this.getProduct();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    addItemToCart(product) {
      this.cart.push(product);
      console.log(this.cart);
    },
    getCate() {
      Vue.axios
        .get("http://127.0.0.1:8000/api/category")
        .then((resp) => {
          this.categorys = resp.data.data;
        })
        .catch(function (error) {
          console.log("Loi:", error);
        });
    },
    getCate1(id) {
      Vue.axios
        .get("http://127.0.0.1:8000/api/product-category/" + id)
        .then((resp) => {
          this.products1 = resp.data.data;
        })
        .catch(function (error) {
          console.log("Loi:", error);
        });
    },
    getProduct() {
      Vue.axios
        .get("http://127.0.0.1:8000/api/product")
        .then((resp) => {
          this.products = resp.data.data;
        })
        .catch(function (error) {
          console.log("Loi:", error);
        });
    },
    getDetail(id) {
      var self = this;
      console.log("http://127.0.0.1:8000/api/product/", id);
      Vue.axios
        .get("http://127.0.0.1:8000/api/product/" + id)
        .then(function (resp) {
          self.name = resp.data.data.name;
          self.ex_price = resp.data.data.export_price;
          self.im_price = resp.data.data.import_price;
          self.img = resp.data.data.img;
          self.sale = resp.data.data.sale;
          console.log("Data:", resp.data.data);
        })
        .catch(function (error) {
          console.log("Loi:", error);
        });
    },
  },
};
</script>

<style scoped>
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
  position: absolute;

      right: 141px;
    top: 33px;

}
.products {
  margin-top: 50px;
}
.img_shop {
  height: 260px;
  max-width: 100%;
}
.content_img{
  position: relative;
}
</style>
