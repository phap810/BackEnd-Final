<template>
  <div class="main-panel">
    <top-nav-home/>
    <slide></slide>
    <card></card>
    <supplier/>
    <content-footer-home></content-footer-home>
  </div>
</template>

<script>
  import ContentFooterHome from '../components/Footer/ContentFooterHome.vue'
  import Slide from '../pages/Slide.vue'
  import Card from '../pages/Card.vue'
  import TopNavHome from '../layout/TopNavHome.vue'
import Supplier from './Supplier.vue'
export default {
  components: { 
    TopNavHome,   
    ContentFooterHome,
    Slide,
    Card,
    Supplier,
    }
}
</script>

<style>

</style>