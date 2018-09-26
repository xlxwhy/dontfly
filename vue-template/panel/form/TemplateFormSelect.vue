<template>
  <el-form-item :label="label">
    <el-select v-model="entity[name]" :placeholder="placeholder">
      <el-option :label="o.label" :value="o.value"  v-for="(o,i) in newValues" v-bind:key="i" />
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: {
    entity: {
      type: Object,
      default: () => {
        return {};
      }
    },

    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => {
        return {
          adapter: o => {
            return o;
          },
          values: []
        };
      }
    },
  },
  data() {
    return {
      newValues: []
    };
  },
  created() {
    if (this.options && this.options.values) {
      if (this.options.adapter) {
        this.options.values.forEach(element => {
          this.newValues.push(this.options.adapter(element));
        });
      } else {
        this.newValues = this.options.values;
      }
    }
  }
};
</script>