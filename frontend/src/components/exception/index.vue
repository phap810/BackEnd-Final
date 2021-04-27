<template>
  <a-layout class="exception">
    <div class="exception__content">
      <div v-if="config[type].img" class="imgBlock">
        <div class="imgEle" :style="{backgroundImage: `url(${config[type].img})`}" />
      </div>
      <div class="content">
        <h1>{{ config[type].title }}</h1>
        <div class="desc">
          {{ config[type].desc }}
        </div>
        <div class="actions">
          <a-button type="primary" icon="home" @click="handleToHome">
            Home
          </a-button>
        </div>
      </div>
    </div>
  </a-layout>
</template>

<script>
import types from './type';

export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data() {
    return {
      config: types
    };
  },
  methods: {
    handleToHome() {
      this.$router.push({ name: 'index' });
    }
  }
};
</script>

<style lang="scss" scoped>
  .exception {
    background: transparent;
    min-height: 68vh;

    &__content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        display: flex;
        flex-direction: column;

        &.imgBlock {
          margin-right: 30px;
          align-items: flex-end;
          .imgEle {
            width: 430px;
            height: 360px;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
        &.content {
          margin-left: 30px;

          h1 {
            font-size: 72px;
            line-height: 72px;
            color: #434e59;
          }
          .desc {
            margin-bottom: 16px;
            color: rgba(0,0,0,.45);
            font-size: 20px;
            line-height: 28px;
          }
        }
      }
    }

  }
</style>

