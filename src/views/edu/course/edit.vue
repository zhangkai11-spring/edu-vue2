<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="main1">
          <el-row :gutter="20">
            <el-col :span="3">课程标题:</el-col>
            <el-col :span="8">{{ course.title }}</el-col>
          </el-row>

          <el-divider></el-divider>
          课程销售价格: {{ course.price }}
          <el-divider></el-divider>
          总课时: {{ course.lessonNum }}
          <el-divider></el-divider>
          销售数量:{{ course.buyCount }}
          <el-divider></el-divider>
          浏览数量:{{ course.viewCount }}
          <el-divider></el-divider>
          发布状态: {{ course.status }}
          <el-divider></el-divider>
          注册时间: {{ course.gmtCreate }}
          <el-divider></el-divider>
          课程描述: {{ coursedescri }}
          <el-divider></el-divider>
          <strong style="margin-left:5px">具体章节:</strong>
          <div>
            <ol>
              <li v-for="item in chapter" :key="item.id" >
                <div style="border:1px solid #DCDFE6">
                  <el-row :gutter="20" type="flex">
                    <el-col :span="15"
                      ><h4 style="margin-left:5px">{{ item.title }}</h4></el-col
                    >
                    <el-col :span="2"
                      ><el-button
                        type="text"
                        style="margin-top:13px"
                        @click="edit(item.id)"
                        >添加小节</el-button
                      ></el-col
                    >
                    <el-col :span="3"
                      ><el-button
                        type="text"
                        style="margin-top:13px"
                        @click="Delete(item.id)"
                        >删除</el-button
                      ></el-col
                    >
                  </el-row>
                </div>
                <ol>
                  <li v-for="i in item.list" :key="i.id" style="margin:8px">{{ i.title }}</li>
                </ol>
              </li>
            </ol>
          </div>
        </el-card></el-col
      >
      <el-col :span="6">
        <el-card class="side1">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>
                与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
              </div>
              <div>
                在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
              </div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>
                控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
              </div>
              <div>
                页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
              </div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>
                清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
              </div>
              <div>
                帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
              </div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>
                用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
              </div>
              <div>
                结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card></el-col
      >
    </el-row>

    <el-dialog
      title="编辑章节"
      :visible.sync="dialogFormVisible"
      destroy-on-close
    >
      <el-form :model="update">
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="update.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="update.sort"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="小节名称" :label-width="formLabelWidth">
          <el-input
            v-model="uploadvedioinfo.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="小节排序" :label-width="formLabelWidth">
          <el-input
            v-model="uploadvedioinfo.sort"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="免费" :label-width="formLabelWidth">
          <el-switch
            v-model="uploadvedioinfo.isFree"
            active-text="收费"
            inactive-text="免费"
            active-value="true"
            inactive-value="false"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="添加小节视频" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="http://localhost:8083/vodService"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            accept=".MP4"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传MP4文件
            </div>
          </el-upload>
        </el-form-item>
        <el-button
          style="margin-top:20px;margin-left:420px"
          @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="upcapter(update)">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as chapterApi from "@/api/capter";
import * as vedioApi from "@/api/vedio";
import * as courseApi from "@/api/course";

export default {
  data() {
    return {
      id: this.$route.params.id,
      course: {},
      coursedescri: "",
      chapter: [],
      activeNames: ["1"],
      activeNames1: ["1"],
      labelPosition: "right",
      dialogFormVisible: false,
      update: {},
      formLabelWidth: "120px",
      fileList: [],
      uploadvedioinfo: {}
    };
  },

  created() {
    this.getcapter();
  },

  methods: {
    handleSuccess(res) {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
      this.uploadvedioinfo.videoSourceId = res.data.upload;
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      this.uploadvedioinfo.size = file.size / 1024 / 1024;
      this.uploadvedioinfo.videoOriginalName = file.name;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt10M;
    },
    handleRemove(file, fileList) {
      this.uploadvedioinfo = {};
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 2 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    saveVedio() {
      this.dialogFormVisible = true;
    },
    getcapter() {
      courseApi.select(this.id).then(res => {
        this.course = res.data.course;
        this.coursedescri = res.data.courseDescription;
        this.chapter = res.data.chapter;
      });
    },
    edit(item) {
      this.dialogFormVisible = true;
      chapterApi.select(item).then(res => {
        this.update = res.data.data;
      });
    },
    Delete(item) {
      console.log(item);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          chapterApi.Delete(item).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            setTimeout(() => {
              this.getcapter();
            }, 200);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    upcapter(capter) {
      this.uploadvedioinfo.courseId = capter.courseId;
      this.uploadvedioinfo.chapterId = capter.id;

      vedioApi.save(this.uploadvedioinfo); //如果想不上传视频不添加小节的话，判断即可
      setTimeout(() => {
        this.getcapter();
      }, 100);

      this.dialogFormVisible = false;
    }
  }
};
</script>
