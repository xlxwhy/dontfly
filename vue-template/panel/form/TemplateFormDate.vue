<template>
  <el-form-item :label="label">
    <el-date-picker type="date" v-model="entity[name]" :placeholder="placeholder" />
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
    }
  },
  data() {
    return {};
  }
};
</script>