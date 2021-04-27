<template>
  <a-row>
    <a-col :span="24" class="mb-15">
      <h4>Search</h4>
      <a-button type="primary" icon="search" class="mr-10">
        Search
      </a-button>
      <a-button type="primary" icon="search" disabled class="mr-10">
        Search
      </a-button>
      <a-button type="primary" icon="search" :loading="true" class="mr-10">
        Search
      </a-button>
    </a-col>
    <a-col :span="24" class="mb-15">
      <!--
        Create: for create product copywriting
        Assign: for case assignment
      -->
      <h4>Create / Assign</h4>
      <a-button type="primary" icon="plus" class="mr-10">
        Create
      </a-button>
      <a-button type="primary" icon="plus" disabled class="mr-10">
        Create
      </a-button>
      <a-button type="primary" icon="plus" :loading="true" class="mr-10">
        Create
      </a-button>
    </a-col>
    <a-col :span="24" class="mb-15">
      <h4>Edit</h4>
      <a-button type="primary" icon="form" class="mr-10">
        Edit
      </a-button>
      <a-button type="primary" icon="form" disabled class="mr-10">
        Edit
      </a-button>
      <a-button type="primary" icon="form" :loading="true" class="mr-10">
        Edit
      </a-button>
    </a-col>
    <a-col :span="24" class="mb-15">
      <h4>Confirm / Save / Submit</h4>
      <a-button type="primary" icon="check" class="mr-10">
        Confirm
      </a-button>
      <a-button type="primary" icon="check" disabled class="mr-10">
        Confirm
      </a-button>
      <a-button type="primary" icon="check" :loading="true" class="mr-10">
        Confirm
      </a-button>
    </a-col>

    <a-col :span="24" class="mb-15">
      <h4>Cancel / Close</h4>
      <a-button type="default" icon="stop" class="mr-10">
        Cancel
      </a-button>
      <a-button type="default" icon="stop" disabled class="mr-10">
        Cancel
      </a-button>
      <a-button type="default" icon="stop" :loading="true" class="mr-10">
        Cancel
      </a-button>
    </a-col>

    <a-col :span="24" class="mb-15">
      <h4>Delete / Remove</h4>
      <a-button type="danger" icon="delete" class="mr-10">
        Delete
      </a-button>
      <a-button type="danger" icon="delete" disabled class="mr-10">
        Delete
      </a-button>
      <a-button type="danger" icon="delete" :loading="true" class="mr-10">
        Delete
      </a-button>
    </a-col>

    <a-col :span="24" class="mb-15">
      <h4>with Notification</h4>
      <a-button
        type="default"
        class="mr-10"
        @click="openNotificationWithIcon('success')"
      >
        Success Notification
      </a-button>
      <a-button
        type="default"
        class="mr-10"
        @click="openNotificationWithIcon('error')"
      >
        Fail Notification
      </a-button>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    openNotificationWithIcon(type) {
      this.$notification[type]({
        message: 'Notification Title',
        description: 'This is the content of the notification.'
      });
    }
  }
};
</script>
