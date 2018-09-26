<template>
  <div class="template-form-panel">
    <el-form :model="entity" :label-width="form.labelWidth">
      <component :is="item.component" :label="item.label" :entity="entity" :name="item.field" :options="item.options" v-for="(item,i) in form.items" v-bind:key="i" />
      <el-form-item v-if="form.submitText && form.cancelText" class="template-button-panel">
        <el-button type="primary" @click="submit">{{form.submitText}}</el-button>
        <el-button @click="cancel">{{form.cancelText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
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
    form: {
      type: Object,
      default: () => {
        return {
          labelWidth: "120px",
          submitText: "立即创建",
          cancelText: "取消",
          items:[]
        };
      }
    },
  },
  methods: {
    submit() {
      this.$emit("on-submit", this.entity);
    },
    cancel() {
      this.$emit("on-cancel");
    }
  }
};
</script>


<style lang="scss">
.template-form-panel{
  padding:10px 10px 10px 10px;
  .template-button-panel{
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: #FFF;
    border-top:1px solid #ddd;
    padding: 5px 0px 5px 0px;
    margin: 0px;
  }
}
</style>


