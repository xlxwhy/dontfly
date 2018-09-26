<template>

  <el-form-item :label="label">
    <el-radio-group v-model="entity[name]">
      <el-radio :label="o.label" v-for="(o,i) in newValues" v-bind:key="i" />
    </el-radio-group>
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
    }
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