<template>
  <div>
    <a-layout-sider
      :trigger="null"
      collapsible
      :collapsed="collapsed"
      breakpoint="lg"
      class="right-sider"
    >
      <a-button type="primary">
        Text
      </a-button>
    </a-layout-sider>
  </div>
</template>

<script>
export default {
  name: 'RightSider',
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style scoped>
.right-sider {
  background: #fff;
  flex: 0 0 250px;
  max-width: 250px;
  min-width: 200px;
  height: 100%;
  border-left: 1px solid #f0f2f5;
  padding: 1rem;
}
</style>
