<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <b-nav-form>
            <b-form-input
              class="mr-sm-2"
              v-model="search"
              placeholder="Search"
              @keyup="searchUnit"
            ></b-form-input>
          </b-nav-form>
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Users list</h4>
              <p class="card-category">Here is a users</p>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-info btn-fill float-right"
                  v-b-modal.modal-prevent-closing
                >
                  Add
                </button>
              </div>
              <table class="table category">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Image</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="users in user.data" v-bind:key="users.id">
                    <td>{{ users.id }}</td>
                    <td>{{ users.name }}</td>
                    <td>{{ users.email }}</td>
                    <td>{{ users.phone }}</td>
                    <td>{{ users.address }}</td>
                    <td>
                      <img
                        v-bind:src="
                          'http://127.0.0.1:8000/uploads/user/' + users.img
                        "
                        width="100"
                        alt="product"
                      />
                    </td>
                    <td>
                      <div v-if="users.role == 1">
                        <b-badge variant="success">Admin</b-badge>
                      </div>
                      <div v-else>
                        <b-badge variant="danger">Staff</b-badge>
                      </div>
                    </td>
                    <td>
                      <div v-if="users.status == 1">
                        <b-badge variant="success">Active</b-badge>
                      </div>
                      <div v-else>
                        <b-badge variant="danger">Inactive</b-badge>
                      </div>
                    </td>
                    <td>
                      <a href="#" v-b-modal.modal-edit>
                        <i class="fa fa-eye"></i>
                      </a>
                      /
                      <a href="#" v-b-modal.modal-edit @click="edit(users.id)">
                        <i class="fa fa-edit"></i>
                      </a>
                      /
                      <a href="#" @click="clickDelete(users.id)">
                        <i class="fa fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <b-modal
                  size="lg"
                  id="modal-prevent-closing"
                  ref="modal"
                  title="Add users"
                  @show="resetModal"
                  @hidden="resetModal"
                  @ok="handleAdd"
                  cancel-title="Close"
                >
                  <form
                    @submit.prevent="SubmitAdd"
                    enctype="multipart/form-data"
                  >
                    <b-row>
                      <b-col lg="6">
                        <b-form-group
                          label="Code"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            v-model="formadd.code"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Name"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formadd.name"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Date of birth"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="date"
                            v-model="formadd.dateofbirth"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="phone"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formadd.phone"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Address"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formadd.address"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group
                          label="Email"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="email"
                            v-model="formadd.email"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Password"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="password"
                            v-model="formadd.password"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Confirm password"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="password"
                            v-model="formadd.confirmpassword"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group label="Image" label-for="name-input">
                          <b-form-file
                            v-model="formadd.img"
                            @change="onFileChange"
                            placeholder="Choose a image or drop it here..."
                            drop-placeholder="Drop image here..."
                          ></b-form-file>
                          <img class="img1" :src="image" />
                        </b-form-group>
                        <b-form-group label="Role">
                          <b-form-select
                            v-model="formadd.role"
                            :options="options"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </form>
                </b-modal>
                <b-modal
                  size="lg"
                  id="modal-edit"
                  ref="modal"
                  title="Edit users"
                  @show="resetModal"
                  @hidden="resetModal"
                  @Ok="handleEdit"
                  cancel-title="Close"
                >
                  <form
                    @submit.prevent="SubmitEdit"
                    enctype="multipart/form-data"
                  >
                    <b-row>
                      <b-col lg="6">
                        <b-form-group
                          label="Code"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            v-model="formedit.code"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Name"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formedit.name"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Date of birth"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="date"
                            v-model="formedit.dateofbirth"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="phone"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formedit.phone"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Address"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="text"
                            v-model="formedit.address"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="6">
                        <b-form-group
                          label="Email"
                          label-for="name-input"
                          invalid-feedback="Name is required"
                        >
                          <b-form-input
                            id="name-input"
                            type="email"
                            v-model="formedit.email"
                            required
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group label="Password" label-for="name-input">
                          <b-form-input
                            id="name-input"
                            type="password"
                            v-model="formedit.password"
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group
                          label="Confirm password"
                          label-for="name-input"
                        >
                          <b-form-input
                            id="name-input"
                            type="password"
                            v-model="formedit.confirmpassword"
                          >
                          </b-form-input>
                        </b-form-group>
                        <b-form-group label="Image" label-for="name-input">
                          <b-form-file
                            v-model="formedit.img"
                            @change="onFileChange"
                            placeholder="Choose a image or drop it here..."
                            drop-placeholder="Drop image here..."
                          ></b-form-file>
                          <!-- <input type="text" v-model="formedit.img"> -->
                          <div v-if="!show1">
                            <img
                              class="img1"
                              :src="
                                'http://127.0.0.1:8000/uploads/user/' +
                                  formedit.img
                              "
                            />
                          </div>
                          <img class="img1" :src="image" />
                        </b-form-group>
                        <b-form-group label="Role">
                          <b-form-select
                            v-model="formedit.role"
                            :options="options"
                          ></b-form-select>
                        </b-form-group>
                        <b-form-group label="Status">
                          <b-form-select
                            v-model="formedit.status"
                            :options="status"
                          ></b-form-select>
                        </b-form-group>
                        <b-button type="submit">Edit</b-button>
                      </b-col>
                    </b-row>
                  </form>
                </b-modal>
              </table>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";
Vue.use(VueAxios, axios);
export default {
  // name: "add-category",
  data() {
    return {
      search:"",
      show1: false,
      form: null,
      isEdit: false,
      options: [
        { value: 1, text: "Admin" },
        { value: 2, text: "Staff" }
      ],
      status: [
        { value: 1, text: "Active" },
        { value: 2, text: "InActive" }
      ],
      image: "",
      user: [],
      formadd: {
        id: "",
        code: "",
        name: "",
        dateofbirth: "",
        phone: "",
        address: "",
        email: "",
        img: null,
        password: "",
        role: "",
        status: "",
        confirmpassword: ""
      },

      formedit: {
        id: "",
        code: "",
        name: "",
        dateofbirth: "",
        phone: "",
        address: "",
        email: "",
        img: [],
        role: "",
        status: "",
        confirmpassword: ""
      }
    };
  },
  mounted() {},
  created() {
    this.getItem();
  },
  methods: {
            searchUnit() {
      axios.get("http://127.0.0.1:8000/api/user?name=" + this.search).then(response => {
        this.user = response.data;
      });
    },
    handleAdd(bvModalEvt) {
      let formData = new FormData();

      formData.append("code", this.formadd.code);
      formData.append("name", this.formadd.name);
      formData.append("dateofbirth", this.formadd.dateofbirth);
      formData.append("phone", this.formadd.phone);
      formData.append("address", this.formadd.address);
      formData.append("email", this.formadd.email);
      formData.append("password", this.formadd.password);
      formData.append("confirmpassword", this.formadd.confirmpassword);
      formData.append("role", this.formadd.role);
      formData.append("img", this.formadd.img);

      console.log("NEw product", formData);
      axios
        .post(`http://127.0.0.1:8000/api/user`, formData)
        .then(res => {
          this.getItem();
          console.log("Thành công");
          Swal.fire("Đã thêm!", "Thêm user thành công.", "success");
        })
        .catch(error => {
          this.getItem();
          Swal.fire("Failed!", error, "warning");
        });
      bvModalEvt.preventDefault();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    onFileChange(e) {
      this.show1 = true;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let formdata = new FormData();
      this.createImage(files[0]);
      formdata.append("img", e.target.files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    getItem() {
      var self = this;
      Vue.axios
        .get("http://127.0.0.1:8000/api/user")
        .then(function(resp) {
          self.user = resp.data;
          console.log("Data:", resp.data.data);
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },
    SubmitEdit() {
      let formDT = new FormData();

      formDT.append("code", this.formedit.code);
      formDT.append("name", this.formedit.name);
      formDT.append("dateofbirth", this.formedit.dateofbirth);
      formDT.append("phone", this.formedit.phone);
      formDT.append("address", this.formedit.address);
      formDT.append("email", this.formedit.email);
      formDT.append("password", this.formedit.password);
      formDT.append("confirmpassword", this.formedit.confirmpassword);
      formDT.append("role", this.formedit.role);
      formDT.append("img", this.formedit.img);
      formDT.append("status", this.formedit.status);
      console.log("id:",this.formedit.id);
      axios
        .put("http://127.0.0.1:8000/api/user/" + this.formedit.id, formDT)
        .then(res => {
          console.log(res.data.data);
          this.getItem();
          console.log("thành công");
          Swal.fire("Đã sửa!", "Sửa User thành công.", "success");
        })
        .catch(function(error) {
          Swal.fire("Failed!", "Lỗi không sửa được", "warning");
        });
    },
    handleEdit(bvModalEvt) {
      let formDT = new Form();

      formDT.append("code", this.formedit.code);
      formDT.append("name", this.formedit.name);
      formDT.append("dateofbirth", this.formedit.dateofbirth);
      formDT.append("phone", this.formedit.phone);
      formDT.append("address", this.formedit.address);
      formDT.append("email", this.formedit.email);
      formDT.append("password", this.formedit.password);
      formDT.append("confirmpassword", this.formedit.confirmpassword);
      formDT.append("role", this.formedit.role);
      formDT.append("img", this.formedit.img);
      formDT.append("status", this.formedit.status);
      console.log("test http://127.0.0.1:8000/api/user/", formDT);
      console.log("lay thu id", this.formedit.id);
      axios
        .put("http://127.0.0.1:8000/api/user/" + this.formedit.id, formDT)
        .then(res => {
          console.log(res.data.data);
          this.getItem();
          console.log("thành công");
          Swal.fire("Đã sửa!", "Sửa User thành công.", "success");
        })
        .catch(function(error) {
          Swal.fire("Failed!", "Lỗi không sửa được", "warning");
        });
      bvModalEvt.preventDefault();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-edit");
      });
    },
    edit(id) {
      this.formedit.id = id;
      // var _this = this;
      console.log("http://127.0.0.1:8000/api/user/" + id);
      axios
        .get("http://127.0.0.1:8000/api/user/" + id)
        .then(res => {
          this.formedit.name = res.data.data.name;
          this.formedit.code = res.data.data.code;
          this.formedit.dateofbirth = res.data.data.dateofbirth;
          this.formedit.phone = res.data.data.phone;
          this.formedit.address = res.data.data.address;
          this.formedit.email = res.data.data.email;
          this.formedit.img = res.data.data.img;
          this.formedit.role = res.data.data.role;
          this.formedit.status = res.data.data.status;
          console.log(this.formedit.img, "Edit IMG");

          console.log("Thành công");
        })
        .catch(function(error) {
          console.log("lỗi:", error);
        });
    },
    clickDelete(id) {
      this.formadd.id = id;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`http://127.0.0.1:8000/api/user/` + id)
            .then(() => {
              Swal.fire("Đã xóa!", "Đã xóa user thành công.", "success");
              this.getItem();
              console.log("Thành công");
            })
            .catch(error => {
              this.getItem();
              Swal.fire("Failed!", error.message, "warning");
              console.log("Lỗi", error);
            });
        }
      });
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();

      return valid;
    },
    resetModal() {
      this.name = "";
    }
  }
};
</script>
<style>
.editcategory {
  border: none;
  padding: 4px 12px;
  margin-left: 1px;
  background-color: #0e6de9;
}
.img1 {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.editcategory:hover {
  color: #212529;
  background-color: #0e6de9;
}
.editcategory:active {
  color: #212529;
  background-color: #189ce9 !important;
}
.b-submit {
  background-color: rgb(248, 23, 23);
  color: black;
  padding: 14px 10px;
  display: inline;
  cursor: pointer;
  border-radius: 5px;
}
.b-close {
  background-color: rgb(160, 160, 158);
  color: black;
  padding: 8px 9px;
  display: inline;
  cursor: pointer;
  border-radius: 5px;
}
</style>
