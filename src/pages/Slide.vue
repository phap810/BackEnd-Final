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
        img-src="data:image/jpeg;base64,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"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Trend 2021</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide
      caption="Spring 2021">
        
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
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