<template>
  <a-layout-header id="header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click.native="trigger"
    />

    <div class="user-wrapper">
      <span class="action">
        <a-badge count="5">
          <a-icon type="bell" />
        </a-badge>
      </span>

      <a-dropdown>
        <span class="action">
          <a-avatar class="avatar" size="small" icon="user" />
          <span>{{ user && user.name || 'admin' }}</span>
        </span>
        <a-menu
          slot="overlay"
          @click="onClick"
        >
          <a-menu-item key="1">
            <a-icon type="user" />
            <span>帳戶設置</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="setting" />
            <span>權限管理</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout">
            <a-icon type="logout" />
            <span>登出</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <a-button class="header-lang-button" @click="$emit('changeLocale')">
        <span>{{ $t('layout.header.language') }}</span>
      </a-button>

      <a-icon
        class="trigger"
        type="appstore"
        @click="$emit('changeHidden')"
      />
    </div>
  </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  props: {
    locale: {
      type: Object,
      default: () => null
    },
    collapsed: {
      type: Boolean,
      default: () => false
    },
    onCollapse: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    trigger() {
      this.onCollapse(!this.collapsed);
    },
    onClick({ key }) {
      switch (key) {
        case 'logout':
          this.logoutAction();
          break;
      }
    },
    logoutAction() {
      const { email = null } = this.user || {};
      if (!email) return false;

      this.$store.dispatch('handleLogout', email)
        .then(() => {
          this.$notification.success({
            message: 'Log out success!'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-wrapper {
  float: right;
  padding: 0 10px;
  position: relative;
  a {
    position: relative;
  }
  .action {
    cursor: pointer;
    display: inline-block;
    padding: 0 15px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    height: 100%;
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .anticon {
      font-size: 16px;
      padding: 4px;
    }
  }
  .avatar {
    margin: 20px 8px 20px 0;
    vertical-align: middle;
  }
}
</style>

