<template>
  <el-form-item :label="label">

    <quill-editor v-model="entity[name]" ref="quillEditor" :options="editorOption" @ready="onEditorReady($event)" @change="onEditorChange($event)" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)">
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <span class="ql-formats">
          <el-tooltip content="批量添加图片">
            <!-- <button id="custom-button" @click="customButtonClick"> -->
            <span @click="customButtonClick" class="icon-button">
              <svg-icon icon-class="chart" />
            </span>
            <!-- </button> -->
          </el-tooltip>
        </span>
        <span class="ql-formats">
          <select class="ql-align">
            <option selected>左对齐</option>
            <option value="center">居中对齐</option>
            <option value="right">右对齐</option>
            <option value="justify">两端对齐</option>
          </select>
          <el-tooltip content="有编号的项目">
            <button class="ql-list" value="ordered"></button>
          </el-tooltip>
          <el-tooltip content="无编号的项目">
            <button class="ql-list" value="bullet"></button>
          </el-tooltip>
        </span>
        <span class="ql-formats">
          <select class="ql-color" title="字体颜色"></select>
          <select class="ql-background" title="背景颜色">
          </select>
        </span>
        <span class="ql-formats">
          <el-tooltip content="加粗">
            <button class="ql-bold"></button>
          </el-tooltip>
          <el-tooltip content="斜体">
            <button class="ql-italic"></button>
          </el-tooltip>
          <el-tooltip content="下划线">
            <button class="ql-underline"></button>
          </el-tooltip>
          <el-tooltip content="删除线">
            <button class="ql-strike"></button>
          </el-tooltip>
          <select class="ql-size">
            <option value="small">较小字体</option>
            <option selected>中等字体</option>
            <option value="large">较大字体</option>
            <option value="huge">很大字体</option>
          </select>
          <select class="ql-font">
            <option selected></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
          <el-tooltip content="上标">
            <button class="ql-script" value="super"></button>
          </el-tooltip>
          <el-tooltip content="下标">
            <button class="ql-script" value="sub"></button>
          </el-tooltip>
          <el-tooltip content="引用">
            <button class="ql-blockquote"></button>
          </el-tooltip>
          <el-tooltip content="左缩进">
            <button class="ql-indent" value="-1"></button>
          </el-tooltip>
          <el-tooltip content="右缩进">
            <button class="ql-indent" value="+1"></button>
          </el-tooltip>
        </span>
      </div>
    </quill-editor>
    <el-dialog title="批量上传图片" :visible.sync="insertImagesDialogVisible" width="890px" :close-on-click-modal="false" :show-close="false" center>
      <div class="upload-wrap">
        <el-upload ref="myUploader" multiple drag list-type="picture-card" action="/api/clt/file/upload" :limit="49" :data="uploadParams" :on-exceed="exceed" :on-preview="handlePictureCardPreview" :on-success="handleSuccess" :before-upload="beforeUpload" :on-remove="handleRemove">
          <i class="el-icon-plus">
            <span style="font-size: 12px;">
              <br>拖放或点击上传</span>
          </i>
        </el-upload>
      </div>
      <div v-if="picList.length">已上传 {{picList.length}} 个图片，图片大小共计
        <span v-if="sizeSum / 1024 / 1024 >= 1">{{sizeSum / 1024 / 1024 | numToFixed}} MB.</span>
        <span v-else>{{sizeSum / 1024 | numToFixed}} KB.</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="insertImagesDialogVisible=false;">取 消</el-button>
        <el-button type="primary" @click="insertPics" :disabled="picList<=0">将以上图片插入商品详情中</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="picVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </el-form-item>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

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

  components: { quillEditor },
  data() {
    return {
      dialogImageUrl: "",
      insertImagesDialogVisible: false,
      picVisible: false, 
      editorOption: {
        placeholder: "详情",
        modules: {
          toolbar: "#toolbar"
        }
      },
      uploadParams: {
        id: "",
        name: "",
        type: "",
        lastModifiedDate: "",
        size: ""
      },
      picList: [],
      sizeSum: 0
    };
  },
  methods: {
    beforeRemove(file, fileList) {},
    handleSuccess(res, file, fileList) {
      console.log(101, res);
      for (let fi = 0; fi < fileList.length; fi++) {
        if (!this.picList[fi]) {
          this.picList.splice(fi, 0, {});
        }
        if (fileList[fi]) {
          this.picList[fi].url = fileList[fi].response
            ? fileList[fi].response.url
            : null;
          this.picList[fi].uid = fileList[fi].uid;
        }
      }
      // this.picList.push({ url: file.response.url, uid: file.uid });
      this.sizeSum += file.size;
    },
    isErrorTxt(file, size = 3) {
      const isFileType =
        file.type &&
        "image/jpg,image/jpeg,image/gif,image/png".indexOf(file.type) > -1;
      // console.log(file.type);
      if (!isFileType) {
        this.$message.error("仅支持上传jpg、png和gif格式的图片。");
        return true;
      }
      const isSize = file.size / 1024 / 1024 < size;
      if (!isSize) {
        const _size = size >= 1 ? size + "M" : size * 1000 + "K";
        this.$message.error(`单张图片大小不能超过 ${_size}！`);
        return true;
      }
      return false;
    },
    beforeUpload(file) {
      // console.log('before:', file);
      if (this.isErrorTxt(file, 5)) return false;
      this.uploadParams.id = file.uid;
      this.uploadParams.name = file.name;
      this.uploadParams.type = file.type;
      this.uploadParams.lastModifiedDate = file.lastModifiedDate;
      this.uploadParams.size = file.size;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      let index = this.picList.findIndex(a => a.uid == file.uid);
      if (index != -1) {
        this.picList.splice(index, 1);
      }
      this.sizeSum -= file.size;
    },
    insertPics() {
      // console.log(this.picList);
      let quill = this.$refs.myQuillEditor.quill;
      quill.focus();
      // console.log(quill.getSelection());
      for (let i = 0; i < this.picList.length; i++) {
        let length = quill.getSelection().index;
        // // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", this.picList[i].url);
        // // 调整光标到最后
        quill.setSelection(length + 1);
      }
      this.insertImagesDialogVisible = false;
      this.picList.splice(0, this.picList.length);
      this.$refs.myUploader.clearFiles();
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
      // this.$emit("on-change",editor);
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange(editor) {
      // console.log('editor change!', editor) 
      this.$set(this.entity, this.name, editor.html)
    },
    customButtonClick() {
      this.insertImagesDialogVisible = true;
    },
    exceed(file, fileList) {
      return this.$notify({
        message: "单次批量上次不超过50张，如果还有更多图片，请分批上传。",
        type: "warning"
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.picVisible = true;
    }
  }
};
</script>



<style lang="scss">
.ql-container {
  font-size: 14px;
  i,
  em {
    font-style: italic !important;
  }
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 500px;
}

.ql-snow.ql-toolbar button,
.ql-snow .ql-toolbar button,
.ql-snow .ql-picker {
  margin-right: 10px;
}

.upload-wrap {
  padding: 20px;
  border: 1px solid #eee;
  overflow-y: auto;
  overflow-x: hidden;
  height: 400px;
}
.icon-button {
  cursor: pointer;
  padding: 3px 5px;
  margin-right: 10px;
}
</style>


