<template>
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
</template>

<script>
export default {
data(){
  return{
    cart: [],
  }
}
}
</script>

<style>

</style>