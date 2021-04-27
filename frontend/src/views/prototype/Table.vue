<template>
  <a-row>
    <div class="form-search pb-15">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="Product Name">
              <a-input
                v-decorator="[
                  'productName',
                  {rules: [{ required: true, message: 'Please input product name!' }]}
                ]"
                placeholder="Name"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="Product Oid">
              <a-input
                v-decorator="[
                  'productOid',
                  {rules: [{ required: true, message: 'Please input product oid!' }]}
                ]"
                placeholder="Oid"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="Date Picker">
              <a-date-picker
                v-decorator="[
                  'date',
                  {rules: [{ required: true, message: 'Please select the correct date!' }]}
                ]"
                style="width: 100%"
                placeholder="Select date"
              />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="Range Picker">
              <a-range-picker style="width: 100%" />
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="Single">
              <a-select>
                <a-select-option value="true">
                  true
                </a-select-option>
                <a-select-option value="false">
                  false
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="Multiple">
              <a-select mode="multiple">
                <a-select-option value="a1">
                  a1
                </a-select-option>
                <a-select-option value="a2">
                  a2
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :sm="24">
            <div class="text-right">
              <a-button type="primary" icon="search" class="mr-10" html-type="submit">
                Search
              </a-button>
              <a-button type="default" @click="handleReset">
                Reset
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-divider />

    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :row-key="record => record.login.uuid"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <a slot="name" slot-scope="name" href="javascript:;">{{ `${name.first} ${name.last}` }}</a>
      <span slot="action" slot-scope="record">
        <a-button type="primary" icon="form" size="small">編輯</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="data.length"
          title="確定要刪除嗎？"
          @confirm="onDelete(record.login.uuid)"
        >
          <a-button type="danger" icon="delete" size="small">刪除</a-button>
        </a-popconfirm>
      </span>
    </a-table>
  </a-row>
</template>
<script>
// table column setting
const columns = [{
  dataIndex: 'name',
  title: 'Name',
  key: 'name',
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ],
  onFilter: (value, record) => record.gender === value
}, {
  title: 'Action',
  key: 'action',
  width: '200px',
  scopedSlots: { customRender: 'action' }
}];

// temporarily table data
const results = [
  {
    'gender': 'male',
    'name': {
      'title': 'mr',
      'first': 'landon',
      'last': 'cooper'
    },
    'login': {
      'uuid': '92a92e1d-664c-4b4e-b3a5-15c0428ce398',
      'username': 'purplegoose185',
      'password': 'captain',
      'salt': 'AAqVUr3D',
      'md5': 'b7b82d10648b1632a8d89235ef435e49',
      'sha1': '965c3a1147ba9c06b0e53a7387399b3f55e3a611',
      'sha256': 'f5b7950952fca09b609b16cb5af493d881d33d41d591a91cefa4558348b59e8a'
    }
  },
  {
    'gender': 'male',
    'name': {
      'title': 'mr',
      'first': 'willie',
      'last': 'van der leest'
    },
    'login': {
      'uuid': 'a6c76041-16fb-43ec-9ca3-ca46ee26248f',
      'username': 'organicdog871',
      'password': 'zxcvbnm',
      'salt': 'cc03Hbrw',
      'md5': 'dd2372ac5eb6f0e04655c883046b4e56',
      'sha1': 'b97be80636d65291c5cfa557414a849b8e78c747',
      'sha256': 'd0d526deedee552c3be26ccbcbdf501029411281b73ca05e731a27b9e987eb81'
    }
  },
  {
    'gender': 'male',
    'name': {
      'title': 'mr',
      'first': 'matthew',
      'last': 'bowman'
    },
    'login': {
      'uuid': 'f65f665a-db19-4282-8d29-7f81ef4c28ab',
      'username': 'greenbear207',
      'password': 'allmine',
      'salt': 'MpwzeEDk',
      'md5': '5dccae04b3798d676ac9ee3d86d3b7f5',
      'sha1': '179839334f8ae4b72874667f409f2bfe101d80dd',
      'sha256': 'b0c1393b13821334e65a6550fe8c6d87bb1b790b806b21f6a35ccb907d05d74c'
    }
  }
];

export default {
  name: 'Table',
  data() {
    return {
      columns,
      data: [],
      loading: false,
      pagination: { pageSize: 20 },
      form: this.$form.createForm(this),
      params: {}
    };
  },
  methods: {
    getTableList() {
      const { current = 1 } = this.pagination;

      if (!current) return false;
      this.loading = true;

      // api send { ...this.params,  page: current }
      setTimeout(() => {
        const pagination = {
          ...this.pagination,
          total: 100
        };
        this.pagination = pagination;
        this.data = [...results];
        this.loading = false;
      }, 1000);
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getTableList();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.params = {};
      this.form.validateFields((err, values) => {
        if (!err) {
          this.params = { ...values };
          this.getTableList();
        }
      });
    },
    handleReset() {
      this.form.resetFields();
    },
    onDelete(id) {
      const dataSource = [...this.data];
      this.data = dataSource.filter(item => item.login.uuid !== id);
      this.$notification['success']({
        message: '刪除成功',
        description: `刪除 => uuid: ${id}`
      });
    }
  }
};
</script>
