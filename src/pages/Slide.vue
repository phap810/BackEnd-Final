<template>
  <div class="carousel">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="2800"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Summer 2021"
        text="Xu hướng hot trong năm 2021."
        img-src="https://theme.hstatic.net/200000104423/1000577263/14/ms_banner_img2.jpg?v=1031"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://theme.hstatic.net/200000104423/1000577263/14/ms_banner_img3.jpg?v=1032">
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="http://theme.hstatic.net/200000104423/1000577263/14/ms_banner_img5.jpg?v=1031"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide
      caption="Spring 2021">
        
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="http://theme.hstatic.net/200000104423/1000577263/14/ms_banner_img4.jpg?v=1031"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
<style scoped>
.carousel{
  position: relative;
  margin-top: 79px;
}
</style>