<template>
  <div class="about">
    <b-card
        overlay
        img-src="https://picsum.photos/900/250/?image=3"
        img-alt="Card Image"
        text-variant="white"
    >
        <h2>About</h2>
    <b-card-text class="ct text">
      Thank you for your support and use of the store's products.
    </b-card-text>
    </b-card>
    <div class="ct wrap">
     <b-row >
        <b-col>
            <h3>Our Story</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia veniam maiores dolorum alias perspiciatis unde ab quos corrupti vitae. Consequatur aspernatur facere amet nihil consectetur incidunt mollitia animi reiciendis tenetur?</p>

        </b-col>
        <b-col>
            <b-img class="how-bor1 " thumbnail fluid src="https://preview.colorlib.com/theme/cozastore/images/about-01.jpg" alt="Image 1"></b-img>
        </b-col>      
        </b-row>
        <b-row>
        <b-col>
                <b-img class="how-bor2 " thumbnail fluid src="https://preview.colorlib.com/theme/cozastore/images/about-02.jpg" alt="Image 1"></b-img>
        </b-col>
        <b-col>
            <h3>Our Story</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem est repellat aut quibusdam. Quaerat adipisci blanditiis, quo deleniti facilis, hic voluptatem consectetur quidem quia veniam ullam ipsum delectus labore deserunt.</p>
        </b-col>  
        </b-row>
    </div>
    <top-nav-home/>
    <content-footer-home/>
  </div>
</template>

<script>
import ContentFooterHome from "../components/Footer/ContentFooterHome.vue";
import TopNavHome from '../layout/TopNavHome.vue';
export default {
    components:{
        ContentFooterHome,
        TopNavHome,
    }
}
</script>

<style scoped>
    .text {
  text-align: center;
  color: black;

}
.about{
    text-align: center;
    margin-top: 79px;
}
.how-bor1,.how-bor2{
    box-shadow: 2px 2px 7px;
}
.wrap{
    margin: 25px 25px;
    padding: 15px 15px;
}
</style>