<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div>
            <h2>Sign In</h2>
            <form class="form-group" @submit.prevent="login">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
              />
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
              <input type="submit" class="btn btn-primary" @click="doLogin" />
              <p>
                Don't have an account?
                <router-link class="item-menu" to="/registercustomer"
                  >Registry in here</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <top-nav-home />
    <content-footer-home />
  </div>
</template>
<script>
import swal from "sweetalert2";
import ContentFooterHome from "../components/Footer/ContentFooterHome.vue";
import TopNavHome from "../layout/TopNavHome.vue";

export default {
  components: {
    ContentFooterHome,
    TopNavHome,
  },
  data() {
    return {
       email: "", 
       password: "" ,
    };
  },
  methods: {
    // callAPILogin(form) {
    //   return this.axios.post(`http://127.0.0.1:8000/api/login-customer`, form);
    // },
    // login() {
    //   const { email, password } = this.loginForm;

    //   if (!email) {
    //     swal.fire("Vui long nhap email", null, "warning");
    //   }

    //   if (!password) {
    //     swal.fire("Vui long nhap mat khau", null, "warning");
    //   }

    //   this.callAPILogin({ email, password })
    //     .then(() =>
    //       swal.fire(
    //         "Thanh cong",
    //         "Dang nhap thanh cong, ban se duoc chuyen ve trang chu",
    //         "success"
    //       )
    //     )
    //     .then(() => this.$router.push("/"))
    //     .then(() => this.$router.go())
    //     .catch((e) => {
    //       console.log("EEE", e);
    //       swal.fire(
    //         "That bai",
    //         "Dang nhap that bai. Vui long thu lai",
    //         "error"
    //       );
    //     });
    // },
    //},
        login(event) {
      event.preventDefault()  
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("logincustomer", { email, password })
        .then(() => this.$router.push("/"))
        .then(() => this.$router.go())
      },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 48px;
}
p {
  line-height: 1rem;
}
h2 {
  text-align: center;
  text-transform: uppercase;
  font-weight: bolder;
}
.card {
  padding: 20px;
}

.form-group input {
  margin-bottom: 20px;
}

.login-page {
  margin-top: 100px;
  align-items: center;
  background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

h1 {
  margin-bottom: 1.5rem;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>