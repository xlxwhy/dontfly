<!-- 
****************************************************************************************************


****************************************************************************************************
-->
<template>

  <el-pagination @size-change="changeSize" @current-change="changePage" :current-page="pagination.page" :page-sizes="pagination.sizes" :page-size="pagination.size" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" class="template-pagination-panel" />

</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 10,
          sizes: [10, 20, 30, 40],
          total: 1000
        };
      }
    }
  },

  data() {
    return {};
  },
  methods: {
    changeSize(v) {
      this.pagination.size = v;
      this.$emit("on-page", this.pagination);
    },
    changePage(v) {
      this.pagination.page = v;
      this.$emit("on-page", this.pagination);
    }
  }
};
</script>
 
 
 <style>
 .template-pagination-panel{
   float: right;
   margin:5px 0px 30px 0
 }
 </style>
 



