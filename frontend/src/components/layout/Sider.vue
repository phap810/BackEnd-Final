<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    breakpoint="lg"
    width="250px"
    @collapse="onCollapse"
  >
    <div class="logo">
      <h2 class="logo__title">
        <b>
          <router-link :to="{ name: 'index' }">Katalyst</router-link></b>
      </h2>
    </div>

    <a-menu
      id="menu"
      theme="dark"
      mode="inline"
      :selected-keys="currentKeys"
      :default-open-keys="defaultOpenIndex"
      @select="onSelect"
    >
      <template v-for="item in menu">
        <a-menu-item
          v-if="!item.children"
          :key="item.route.name"
        >
          <a-icon v-if="item.icon" :type="item.icon" />
          <span>{{ $t('menu.' + item.label) }}</span>
        </a-menu-item>

        <template v-if="item.children">
          <a-sub-menu :key="item.index">
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{ $t('menu.' + item.label) }}</span>
            </span>

            <a-menu-item
              v-for="child in item.children"
              :key="child.route.name"
            >
              <a-icon v-if="child.icon" :type="child.icon" />
              <span>{{ $t('menu.' + child.label) }}</span>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: 'Sider',
  props: {
    collapsed: {
      type: Boolean,
      default: () => false
    },
    onCollapse: {
      type: Function,
      default: () => {}
    },
    menu: {
      type: Array,
      default: () => []
    },
    currentKeys: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    defaultOpenIndex() {
      return this.menu.reduce((acc, cur) => {
        if (cur.children) acc.push(cur.index);
        return acc;
      }, []);
    }
  },
  methods: {
    onSelect({ key }) {
      this.$router.push({ name: key });
    }
  }
};
</script>
