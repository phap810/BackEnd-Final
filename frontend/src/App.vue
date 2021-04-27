<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <div :key="(!!locale).toString()">
        <router-view :locale="locale" @changeLocale="changeLocale" />
      </div>
    </a-locale-provider>
  </div>
</template>
<script>
/** Internationalization */
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW';

/** Vue-i18n */
import i18n from '@/i18n';

export default {
  name: 'App',
  data() {
    return {
      locale: enUS
    };
  },
  methods: {
    changeLocale() {
      if (this.locale === enUS) {
        this.locale = zhTW;
        i18n.locale = 'zh';
      } else {
        this.locale = enUS;
        i18n.locale = 'en';
      }
    }
  }
};
</script>
