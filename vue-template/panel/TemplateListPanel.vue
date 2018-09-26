<template>
  <div class="container">

    <template-query-panel :query="template.query" @on-query="onQuery" @on-create="onCreate"/>
    <slot></slot>
    <template-page-panel :pagination="template.pagination" @on-page="onPage" />

  </div>
</template>

<script>
import TemplateQueryPanel from "./list/TemplateQueryPanel.vue";
import TemplatePagePanel from "./list/TemplatePagePanel.vue";

export default {
  props: {
    template: {
      type: Object,
      default: () => {
        return {
          query: {
            properties: [{ property: "num", label: "编号" }],
            filters: [
              {
                property: "",
                operator: "like",
                value: ""
              }
            ]
          },
          pagination: {
            page: 1,
            size: 10,
            sizes: [10, 20, 30, 40],
            total: 1000
          },
          onQuery() {},
          onPage() {}
        };
      }
    }
  },
  components: {
    TemplateQueryPanel,
    TemplatePagePanel
  },
  data() {
    return {
        
    };
  },   
  methods:{
    onCreate(){  
      this.$emit("on-create");
    },
    onQuery(){  
      this.$emit("on-query", this.template.query);
    },
    onPage(){ 
      this.$emit("on-page", this.template.pagination);
    }
  }
};
</script>

 
<style   >
.container {
  padding: 5px 5px;
}

.container .el-table .cell {
  white-space: nowrap;
}

.container .demo-table-expand label {
  color: #99a9bf;
}
.container .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

</style>
 



