<template>
  <div class="contact">
    <b-card
    overlay
    img-src="https://picsum.photos/900/250/?image=3"
    img-alt="Card Image"
    text-variant="white"
    >
    <h2>Contact</h2>
    <b-card-text class="ct text">
      Thank you for your support and use of the store's products.
    </b-card-text>
    </b-card>
    <b-row class="submit">
        <b-col lg="6">
            <h4> Send Us A Message</h4>
            <b-form-input class="ipemail" v-model="text" placeholder="Your Email Address"></b-form-input>
            <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="How Can We Help"
                rows="6"
                max-rows="8"
            ></b-form-textarea>
            <b-button block pill class="btsubmit">SUBMIT</b-button>
        </b-col>
        <b-col lg="6">
            <h3> Address</h3>
            <b-badge  variant="light">01 - Lê Thành Phương - Phường 2 - TP Tuy Hòa - Tỉnh Phú Yên</b-badge>
             <h3> Lets talk</h3>
            <b-badge class="link"  variant="light">+034.5610 784</b-badge>
             <h3> Sale Support</h3>
            <b-badge class="link"  variant="light">Shyneward123@gmail.com</b-badge>
        </b-col>
    </b-row>
    <top-nav-home/>
    <content-footer-home/>
  </div>
</template>

<script>
import ContentFooterHome from "../components/Footer/ContentFooterHome.vue";
import TopNavHome from '../layout/TopNavHome.vue';
export default {
  components: { ContentFooterHome, TopNavHome },
  data() {
   return {

   };
  },
};
</script>

<style scoped>
.cardcontact {
  text-align: center;
}
h2 {
  text-align: center;
  margin-top: 150px;
  text-transform: uppercase;
}
h4{
    text-align: center;
    margin-top: 25px;
    text-transform: uppercase;
}
.text {
  text-align: center;
  color: black;
}
.link {
  color: cornflowerblue;
}
.submit{
    padding-bottom: 50px;
    margin-left: 25px;
    margin-right: 25px;
}
.btsubmit{
    color:white;
    background: black;
    margin-top: 20px;
    outline: none;
}
.btsubmit:hover{
    background-position: top;
    background: rgba(72, 69, 248, 0.801);
}
.ipemail{
    margin-bottom: 15px;
}
.contact{
  margin-top: 79px;
}

</style>