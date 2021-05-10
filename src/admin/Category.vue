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
              <h4 class="card-title">Category list</h4>
              <p class="card-category">Here is a category</p>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-info btn-fill float-right"
                  v-b-modal.add-modal
                >
                  Add new
                </button>
              </div>
              <table class="table category"      id="my-table">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr
                    v-for="category in category1.data"
                    v-bind:key="category.id"
                  >
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                      <b-badge variant="success" v-if="category.status == 1"
                        >Active</b-badge
                      >
                      <b-badge variant="danger" v-else>Inactive</b-badge>
                    </td>
                    <td>
                      <b-button
                        class="btn editcategory"
                        variant="warning"
                        v-b-modal.modal-center
                        @click="edit(category.id)"
                        >Edit</b-button
                      >
                    </td>
                  </tr>
                </tbody>
                <b-modal
                  id="add-modal"
                  ref="modal"
                  title="Add category"
                  @show="resetModal"
                  @hidden="resetModal"
                  @ok="handleAdd"
                  cancel-title="Close"
                >
                  <form @submit.prevent="SubmitAdd">
                    <b-form-group
                      label="Name"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                    >
                      <b-form-input
                        id="name-input"
                        v-model="formadd.name"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                    <!-- <b-buton variant="success" @click="SubmitAdd()" class="b-submit"
                        >Add</b-buton
                      > -->
                  </form>
                </b-modal>

                <b-modal
                  id="modal-center"
                  ref="modal"
                  title="Edit category"
                  @show="resetModal"
                  @hidden="resetModal"
                  @ok="handleOk"
                >
                  <form @submit.prevent="update">
                    <b-form-group
                      label="Name"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                    >
                      <b-form-input
                        id="name-input"
                        v-model="formedit.name"
                        required
                      >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group label="Status">
                      <b-form-select
                        v-model="formedit.status"
                        :options="options"
                      ></b-form-select>
                    </b-form-group>
                    <!-- <b-button variant="secondary" @click="update()" class="b-close">Update</b-button> -->
                  </form>
                </b-modal>
                <pagination
                  :data="category1.data"
                  @pagination-change-page="getResults"
                ></pagination>
                    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
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
import _ from "lodash";
// import pagination from "laravel-vue-pagination";
Vue.use(VueAxios, axios);
export default {
  name: "add-category",
  data() {
    return {
              perPage: 2,
        currentPage: 1,
      search: "",
      isEdit: false,
      category1: {},
      formadd: {
        name: "",
      },
      formedit: {
        id: null,
        name: "",
        status: ""
      },
      options: [
        { value: 1, text: "Active" },
        { value: 2, text: "Inactive" }
      ]
    };
  },
  name: "c-table",
  mounted() {
          this.totalRows = this.category1.length
  },
  created() {
    this.getItem();
  },
    computed: {
      rows() {
        return this.category1
      }
    },
  methods: {
    searchUnit() {
      axios.get("http://127.0.0.1:8000/api/category?name=" + this.search).then(response => {
        this.category1 = response.data;
      });
    },
    getResults(page = 1) {
      axios
        .get("http://127.0.0.1:8000/api/category?page=" + page)
        .then(response => {
          this.category1 = response.data;
        });
    },
    // logOut(){
    //   var axa = "asda";
    //   console.log(axa);
    // },
    getItem() {
      var self = this;
      Vue.axios
        .get("http://127.0.0.1:8000/api/category")
        .then(function(resp) {
          self.category1 = resp.data;
          console.log("Data:", resp.data.data);
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    },

    edit(id) {
      this.formedit.id = id;
      // var _this = this;
      console.log("http://127.0.0.1:8000/api/category/" + id);
      axios
        .get("http://127.0.0.1:8000/api/category/" + id)
        .then(res => {
          this.formedit.name = res.data.data.name;
          console.log(res.data.data.name);
          this.formedit.status = res.data.data.status;
          console.log("Thành công");
        })
        .catch(function(error) {
          console.log("lỗi:", error);
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
    },
    handleOk(bvModalEvt) {
      var _this = this;
      var isEdit = _this.formedit;
      console.log("http://127.0.0.1:8000/api/category/", isEdit);
      console.log("lay thu id", isEdit.id);
      axios
        .put("http://127.0.0.1:8000/api/category/" + isEdit.id, isEdit)
        .then(res => {
          console.log(res.data.data);
          this.getItem();
          Swal.fire("Đã sửa!", "Sửa category thành công.", "success");
        })
        .catch(function(error) {
          console.log("lỗi:", error);
          this.getItem();
        });
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-center");
      });
    },
    handleAdd(bvModalEvt) {
      var _this=this;
      var isAdd = _this.formadd;
      if(this.formadd.name == ""){
        Swal.fire("Failed!", "Bạn phải nhập tên", "warning");
      }else{
      axios
        .post(`http://127.0.0.1:8000/api/category`, isAdd)
        .then(res => {
          this.getItem();
          console.log("Thành công");
          Swal.fire("Đã thêm!", "Thêm category thành công.", "success");
        })
        .catch(error => {
          this.getItem();
          console.log("Lỗi", error);
          Swal.fire("Failed!", "Lỗi không thêm được", "warning");
        });
      bvModalEvt.preventDefault();
      this.$nextTick(() => {
        this.$bvModal.hide("add-modal");
      });}
    }
  }
};
</script>
<style scoped>
.editcategory {
  border: none;
  padding: 4px 12px;
  margin-left: 1px;
  background-color: #0e6de9;
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
