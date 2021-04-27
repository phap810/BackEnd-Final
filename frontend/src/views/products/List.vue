<template>
  <a-row>
    <div class="form-search pb-15">
      <a-form :form="form" @submit="handleSubmit">
        <a-row type="flex">
          <a-col :md="12" :sm="24">
            <a-form-item label="Product OID">
              <a-input v-decorator="['oid']" placeholder="Oid" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="Latest Updated Date">
              <a-range-picker
                v-decorator="['updated']"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="Target Language">
              <a-select
                v-decorator="['lenguages']"
                mode="multiple"
                placeholder="Select target languages"
                style="min-width: 150px"
              >
                <a-select-option v-for="(lang, key) in languages" :key="key" :value="key">
                  {{ lang }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="Case Status">
              <a-select
                v-decorator="['status']"
                mode="multiple"
                placeholder="Select status"
                style="min-width: 150px"
              >
                <a-select-option v-for="(s, key) in caseStatus" :key="key" :value="key">
                  {{ s.label.en }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="Machine Translation">
              <a-radio-group v-decorator="['machineTranslate', { initialValue: '1' }]">
                <a-radio value="1">
                  Yes
                </a-radio>
                <a-radio value="0">
                  No
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
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
    <div class="text-right mb-15">
      <a-button size="small">
        Export
      </a-button>
      <a-divider type="vertical" />
      <a-button size="small">
        Import
      </a-button>
    </div>
    <a-table
      class="customTable"
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :row-class-name="() => 'customRow'"
      :pagination="pagination"
      bordered
      @change="handleTableChange"
    >
      <span slot="language" slot-scope="lang">{{ languages[lang] }}</span>
      <span
        slot="machineTranslate"
        slot-scope="auto"
      >
        <a-tag v-if="auto === '0'" color="red">No</a-tag>
        <a-tag v-else color="blue">Yes</a-tag>
      </span>
      <span slot="caseStatus" slot-scope="status">
        <a-tag :color="caseStatus[status].color || '#ddd'">{{ caseStatus[status].label.en }}</a-tag>
      </span>
    </a-table>
  </a-row>
</template>

<script>
import { caseStatus, languages } from '@/config/constants';
const crossRow = (value, row, index) => {
  const langCount = Object.keys(languages).length;
  let rowSpan = 0;
  if (index % langCount === 0) {
    rowSpan = langCount;
  }
  return {
    children: value,
    attrs: {
      rowSpan
    }
  };
};
// temporarily table data
const results = [
  {
    key: '1',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'en',
    status: 's1',
    caseId: '01',
    machineTranslate: '0',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '2',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'vi',
    status: 's2',
    caseId: '02',
    machineTranslate: '0',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '3',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'th',
    status: 's3',
    caseId: '-',
    machineTranslate: '1',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '4',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'zh-cn',
    status: 's4',
    caseId: '-',
    machineTranslate: '1',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '5',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'zh-hk',
    status: 's5',
    caseId: '-',
    machineTranslate: '1',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '6',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'zh-tw',
    status: 's6',
    caseId: '-',
    machineTranslate: '0',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '7',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'ja',
    status: 's7',
    caseId: '-',
    machineTranslate: '1',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '8',
    oid: 123456,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'ko',
    status: 's8',
    caseId: '-',
    machineTranslate: '0',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '9',
    oid: 123457,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'en',
    status: 's9',
    caseId: '01',
    machineTranslate: '0',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  },
  {
    key: '10',
    oid: 123457,
    name: '【曼谷泰式按摩 】Lets Relax Spa 按摩體驗預約（Siam Square One 分店',
    lang: 'vi',
    status: 's10',
    caseId: '02',
    machineTranslate: '0',
    created: '2019-06-17 10:17:27',
    update: '2019-06-17 10:17:27'
  }
];

export default {
  name: 'ProductList',
  data() {
    // setup table column
    const columns = [
      {
        dataIndex: 'oid',
        title: 'Product OID',
        key: 'oid',
        customRender: crossRow
      },
      {
        dataIndex: 'name',
        title: 'Product Name',
        key: 'name',
        customRender: (value, row, index) => {
          const obj = crossRow(value, row, index);
          // return custom component with jsx
          obj.children =
            <router-link to={
              {
                name: 'Editing',
                params: {
                  oid: row.oid
                }
              }
            }>{ row.name }</router-link>;
          return obj;
        }
      },
      {
        dataIndex: 'lang',
        title: 'Target Language',
        key: 'language',
        scopedSlots: { customRender: 'language' }
      },
      {
        dataIndex: 'machineTranslate',
        title: 'Machine Translation',
        key: 'machineTranslate',
        scopedSlots: { customRender: 'machineTranslate' }
      },
      {
        dataIndex: 'caseId',
        title: 'Case ID',
        key: 'caseId'
      },
      {
        dataIndex: 'status',
        title: 'Case Status',
        key: 'caseStatus',
        scopedSlots: { customRender: 'caseStatus' }
      },
      {
        dataIndex: 'created',
        title: 'Product Created Date',
        key: 'created'
      },
      {
        dataIndex: 'update',
        title: 'Latest Updated Date',
        key: 'update',
        customRender: crossRow
      }
    ];

    return {
      caseStatus: caseStatus,
      languages: languages,
      columns,
      data: [...results],
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
        console.log(values);
        if (!err) {
          this.params = { ...values };
          this.getTableList();
        }
      });
    },
    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
  .ant-tag {
    cursor: default;
  }
</style>
