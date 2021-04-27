<template>
  <a-layout id="screen">
    <Sider
      :collapsed="collapsed"
      :on-collapse="handleMenuCollapse"
      :menu="menu"
      :current-keys="[highLightItem]"
    />

    <a-layout>
      <Header
        :collapsed="collapsed"
        :on-collapse="handleMenuCollapse"
        :locale="locale"
        @changeLocale="$emit('changeLocale')"
        @changeHidden="isHidden = !isHidden"
      />

      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
          <router-link
            v-if="item.route"
            :to="item.route"
          >
            {{ breadCrumbDisplay(item.label) }}
          </router-link>
          <span v-else>{{ breadCrumbDisplay(item.label) }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>

      <a-layout-content id="content">
        <router-view />
      </a-layout-content>

      <Footer />
    </a-layout>

    <RightSider v-if="!isHidden" />
  </a-layout>
</template>
<script>
import Sider from './Sider';
import Header from './Header';
import Footer from './Footer';
import RightSider from './RightSider';
import { mapGetters } from 'vuex';

export default {
  name: 'Layout',
  components: {
    Sider,
    Header,
    Footer,
    RightSider
  },
  props: {
    locale: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      collapsed: false,
      isHidden: true
    };
  },
  computed: {
    ...mapGetters([
      'menu'
    ]),
    highLightItem() {
      const currentRoute = this.$route.name;
      if (this.breadList.length > 2) {
        const { route = null } = this.breadList[1];
        return route && route.name || currentRoute;
      }
      return currentRoute;
    },
    breadList() {
      return this.$route.meta && this.$route.meta.breadcrumb || [];
    }
  },
  methods: {
    handleMenuCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    breadCrumbDisplay(source) {
      if (typeof source === 'function') {
        return source(this.$route.params);
      }
      return this.$t('menu.' + source);
    }
  }
};
</script>
<style lang="scss" src="./style/index.scss"></style>
