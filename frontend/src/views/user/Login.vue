<template>
  <a-layout id="login">
    <a-layout-header>
      <a-button @click="$emit('changeLocale')">
        <span>{{ $t('layout.header.language') }}</span>
      </a-button>
    </a-layout-header>
    <a-layout-content>
      <div class="form-content">
        <h1 class="text-center app-title">
          <span class="kkday">
            <img src="@/assets/img/kkday_logo.svg" alt="">
          </span>
          <span class="ml-10">Katalyst</span>
        </h1>
        <a-divider>{{ $t('login.title') }}</a-divider>
        <a-alert v-if="hasError" type="error" :message="$t('login.error')" class="mb-15" />
        <a-form
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, message: $t('login.validateEmail') }
                  ],
                  validateTrigger: 'change'
                }
              ]"
              :disabled="loading"
              :placeholder="$t('login.holderEmail')"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: $t('login.validatePassword') }] }
              ]"
              :disabled="loading"
              type="password"
              :placeholder="$t('login.holderPassword')"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
                'remember',
                { initialValue: true }
              ]"
              :default-checked="true"
            >
              {{ $t('login.remember') }}
            </a-checkbox>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :loading="loading"
            >
              {{ $t('login.buttonLogin') }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script>
import Footer from '@/components/layout/Footer';

export default {
  name: 'Login',
  components: {
    Footer
  },
  data() {
    return {
      loading: false,
      hasError: null
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          const { email, password } = values;
          this.$store.dispatch('handleLogin', { email, password })
            .then(() => {
              this.$notification.success({
                message: 'Log in success!'
              });
              this.$router.push({ name: 'index' });
            })
            .catch(err => {
              const { data } = err.response;
              this.hasError = data.meta;
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '@/components/layout/style/utils.scss';

  #login {
      min-height: 100vh;

      .ant-layout-header {
        background: transparent;
        .ant-btn{
          top: 10px;
          float: right;
        }
      }
      .ant-layout-content {
        display: flex;
        justify-content: center;
      }
      .form-content {
        width: 50%;
        max-width: 400px;
        height: 100%;
        margin-top: 60px;

        .ant-divider {
          margin-top: 45px;
          &:before,
          &:after {
            border-top: 1px solid #dedede;
          }
        }
        .app-title {
          font-weight: 300;
        }
      }
      .login-form {
        .login-form-forgot {
          float: right;
        }
        .login-form-button {
          width: 100%;
        }
      }
  }
</style>

