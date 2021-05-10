<template>
 <div class="loginform" >
    <b-container>
      <b-row class="justify-content-md-center mt-4">
        <b-col col md="5">
        <div class="header-registration"><h2>Đăng Kí tài Khoản</h2></div>
          
          <!-- <b-card header="Login - Shoes Store"
          header-bg-variant="primary"
          header-text-variant="white">
          </b-card> -->
          <b-card-text>
            <b-form @submit="onSubmit">
              <b-input-group class="mb-2"
              label="Email">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
                <b-form-input type="text" placeholder="Full Name"></b-form-input>
              </b-input-group>
              <b-form-group>
              
                <b-input-group class="mb-2">
                  <b-input-group-prepend is-text>
                  <b-icon icon="envelope"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input type="email" placeholder="me@example.com"></b-form-input>
                </b-input-group>
                <b-button block variant="primary" type="submit" :disabled="acceptableSubmittion">Login</b-button>
              </b-form-group>
            </b-form>
          </b-card-text>
 
          <!-- 
            <b-form @submit="onSubmit">
            <b-form-group
            description="Enter your email"
            label="Email">
              <b-form-input v-model="email" required type="email"></b-form-input>
          </b-form-group>
          <b-form-group
          description="Enter your password"
          label="Password">
              <b-form-input v-model="password" required type="password"></b-form-input>
          </b-form-group>
          -->
  

        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
export default {
  name: 'Registration',
}
</script>

<style scoped>
    .header-registration h2{
        text-align: center;
        text-transform: uppercase;
    font-weight: bolder;
    }

  .btnlogin{
    margin: -50px 172px;
    padding: 10px 40px;
  }
</style>