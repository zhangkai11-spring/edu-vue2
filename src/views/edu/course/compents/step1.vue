<template>
  <div class="app-container">
    <el-form :model="courseinfo" label-width="80px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseinfo.title"
          placeholder="请输入课程内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程时长">
        <el-input-number
          v-model="courseinfo.lessonNum"
          controls-position="right"
          :min="1"
          :max="20"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="课程讲师">
        <el-select v-model="courseinfo.teacherId">
          <el-option
            v-for="item in tealist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程分类">
        <el-select v-model="courseinfo.subjectParentId" @change="gettwosub">
          <el-option
            v-for="item in onesubject"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select v-model="courseinfo.subjectId">
          <el-option
            v-for="item in twosubject"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input
          v-model="courseinfo.description"
          placeholder="请输入课程简介"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseinfo.price"
          controls-position="right"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="课程封面">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:8082/ossService"
          accept=".jpg,.png"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="courseinfo.cover" :src="courseinfo.cover" class="avatar" />
          
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        {{courseinfo.cover}}
         </el-form-item>
    </el-form>
    <el-button type="primary"  style="margin-left:350px" @click="submit">下一步</el-button>
  </div>
</template>

<script>
import * as courseApi from "@/api/course";
import * as teaApi from "@/api/teacher";
import * as subApi from "@/api/subject";


export default {
  
  data() {
    return {
      courseinfo: {
        lessonNum: 1,
        price: 1,
        cover:''
      },
      edit: "edit",
      courseid: "",
      tealist: [],
      onesubject: [],
      twosubject: []
    };
  },

  created() {
    this.getTea(), this.getSub();
  },

  methods: {
    gettwosub(id) {
      for (let i = 0; i < this.onesubject.length; i++) {
        let one = this.onesubject[i];
        if (one.id == id) {
          this.twosubject = one.list;
        }
      }
    },
    getSub() {
      subApi.tree().then(res => {
        this.onesubject = res.data.tree;
      });
    },
    getTea() {
      teaApi.all().then(res => {
        this.tealist = res.data.list;
       
      });
    },
    submit() {
        this.$emit("next",this.courseinfo)
     
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.courseinfo.cover = res.data.url;
      this.centerDialogVisible=false
    },
    beforeAvatarUpload(file) {
       this.centerDialogVisible=true
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
