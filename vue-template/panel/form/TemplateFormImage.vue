<template>
  <el-form-item :label="label" class="template-form-image">
    <el-upload class="avatar-uploader" action="/api/clt/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="entity[name]" :src="entity[name]" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

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
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$set(this.entity, this.name, file.response.pack.path)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>


<style lang="scss">
.template-form-image {
  .image-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>

