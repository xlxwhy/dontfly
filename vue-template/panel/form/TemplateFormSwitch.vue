<template>

  <el-form-item :label="label">
    <el-switch v-model="entity[name]"></el-switch>
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
    }
  },
  data() {
    return {};
  }
};
</script>