<!-- 
****************************************************************************************************


****************************************************************************************************
-->

<template>
  <div class="template-filter-panel" v-if="query.filters && query.filters.length>0">
    <div class="filter">
      <div class="filter-form">
        <el-row :gutter="0">
          <el-col :span="24" v-for="(item,index) in query.filters" v-bind:key="index" class="filter-form-row">
            <el-select v-model="item.property" class="property" placeholder="查询字段">
              <el-option :label="p.label" :value="p.property" v-for="(p,i) in query.properties" v-bind:key="i"></el-option>
            </el-select>
            <el-select v-model="item.operator" placeholder="运算符" class="operator">
              <el-option :label="o.label" :value="o.operator" v-for="(o,i) in operators" v-bind:key="i"></el-option>
            </el-select>
            <el-input v-model="item.value" class="value"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="filter-button" v-if="query.filters.length>1">
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button  type="success" plain @click="onCreate">添加</el-button>
      </div>
      <div v-if="query.filters.length==1">
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button  type="success" plain   @click="onCreate">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    operators: {
      type: Array,
      default: () => {
        return [
          { operator: "eq", label: "等于" },
          { operator: "gt", label: "大于" },
          { operator: "lt", label: "小于" },
          { operator: "like", label: "模糊" }
        ];
      }
    },
    query: {
      type: Object,
      default: () => {
        return {
          properties: [{ property: "num", label: "编号" }],
          filters: [
            {
              property: "",
              operator: "like",
              value: ""
            }
          ]
        };
      }
    }
  },

  data() {
    return {};
  },
  methods: {
    onQuery() {
      this.$emit("on-query", this.query);
    },
    onCreate() {
      this.$emit("on-create");
    }
  }
};
</script>

<style lang="scss">
.template-filter-panel {
  padding-left:  21px;
 
}

.template-filter-panel .filter {
  padding: 5px 0px;
  display: flex;
}

.template-filter-panel .filter-form {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 550px;
  .property {
    width: 120px;
  }
  .operator {
    width: 80px;
  }
  .value {
    width: 300px;
  }
  &-row {
    padding: 1px 1px;
  }
}
.template-filter-panel .filter-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.template-filter-panel .filter-button {
  .el-button--medium {
    padding: 1px 1px;
    font-size: 14px;
    border-radius: 40px;
    width: 80px;
    height: 80px;
  }
  .el-form {
    height: 38px;
  }
}
</style>
 
 
 



