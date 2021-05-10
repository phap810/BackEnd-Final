<template>
  <div class="pagination-1">
    <b-col sm="7" md="6" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
  </div>
</template>

<script>
export default {
    data (){
        return {
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        }
    },
        mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
};
</script>
