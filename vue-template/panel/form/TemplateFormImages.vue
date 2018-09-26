<template>
  <el-form-item :label="label" class="template-form-image">

    <el-upload action="/api/clt/file/upload" list-type="picture-card" :file-list="getFileList()" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

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
          adapter: {
            toResponseFile(path) {
              return { response: { pack: { path: path } }, url: path };
            },
            getResponseFile(e) {
              return e.response.pack.path;
            }
          }
        };
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    getFileList() {
      if (!this.entity || !this.entity[this.name]) {
        return [];
      }
      let fileList = [];
      let files = this.entity[this.name];
      let adapter = this.options.adapter;
      for (let index = 0; index < files.length; index++) {
        fileList[index] = adapter.toResponseFile(files[index]);
      }
      return fileList;
    },
    handleRemove(file, fileList) {
      let adapter = this.options.adapter;
      let path = this.options.adapter.getResponseFile(file);
      let files = fileList
        .filter(e => {
          return path != adapter.getResponseFile(e);
        })
        .map(e => {
          return adapter.getResponseFile(e);
        });
      files = this.$set(this.entity, this.name, files);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res, file, fileList) {
      let adapter = this.options.adapter;
      this.$set(
        this.entity,
        this.name,
        fileList.map(e => {
          return adapter.getResponseFile(e);
        })
      );
    },
    beforeUpload(file) {
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

