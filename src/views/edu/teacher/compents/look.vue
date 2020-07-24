<template>
  <div class="app-container">
    <el-form  :model="list" class="demo-form-inline" label-width="80px">
      <el-form-item label="讲师头像">
        <el-upload
          :disabled="disable"
          class="avatar-uploader"
          action="http://localhost:8082/ossService"
          accept=".jpg,.png"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="list.avatar" :src="list.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span class="col999" style="vertical-align:bottom;">上传图片</span>
      </el-form-item>
      
      <el-form-item label="讲师名称">
        <el-input
          v-model="list.name"
          placeholder="讲师"
          :disabled="disable"
        ></el-input>
      </el-form-item>
      <el-form-item label="讲师ID">
        <el-input
          v-model="list.id"
          placeholder="讲师"
          :disabled="disable"
        ></el-input>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input
          v-model="list.career"
          placeholder="讲师"
          :disabled="disable"
        ></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select
          :disabled="disable"
          v-model="list.level"
          placeholder="请选择"
        >
          <el-option
            v-for="item in items"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button id="update" type="primary" @click="handleupdate"
      >点击修改</el-button
    >
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>上传中，请稍等</span>
      
    </el-dialog>
  </div>
</template>

<script>
import * as teaApi from "@/api/teacher";

export default {
  props: ["teaid"],
  data() {
    return {
      centerDialogVisible: false,
      list: {},
      value: "",
      disable: true,
      items: [
        {
          value: "1",
          label: "高级讲师"
        },
        {
          value: "2",
          label: "首席讲师"
        }
      ]
    };
  },
  created() {
    teaApi.select(this.teaid).then(res => {
      this.list = res.data.data;
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    },
    handleupdate() {
      let u1 = document.getElementById("update");

      if (u1.innerText == "点击修改") {
        u1.innerText = "提交";
        this.disable = false;
      } else {
        u1.innerText = "点击修改";
        this.disable = true;
        teaApi.update(this.list).then(() => {
          this.$message({
            showClose: true,
            message: "恭喜你，这是一条成功消息",
            type: "success"
          });
        });
      }
    },
    handleAvatarSuccess(res) {
      this.list.avatar = res.data.url;
      this.centerDialogVisible=false
    },
    beforeAvatarUpload() {
        this.centerDialogVisible=true
    }
  }
};
</script>
<style scoped>
.avatar-uploader {
  border: 3px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 180px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
