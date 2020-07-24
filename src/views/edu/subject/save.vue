<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:9003/eduservice/subject/addExcel"
      :file-list="fileList"
      :on-success='filesucees'
      :auto-upload="false"
      accept=".xlsx,.xls"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传execel文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
        fileList: []
    };
  },
  watch: {},

  methods: {
    submitUpload() {
        this.$refs.upload.submit();
      },
      filesucees(){
        this.$message({
            type: "success",
            message: "成功!"
          })
      }
  }
};
</script>
