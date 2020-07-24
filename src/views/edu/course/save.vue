<template>
  <div class="app-container">
    <el-card class="box-card" >
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>

      <component
        v-bind:is="step1"
        v-show="active == 0"
        @next="getcourseinfo"
      ></component>
      <component
        v-bind:is="step2"
        v-show="active == 1"
        @next="getcapterinfo"
        @back="goback"
      ></component>
      <component
        v-bind:is="step3"
        v-show="active == 2"
        @next="pulish"
        @back="goback"
        :courseinfo="courseinfo"
        :capterinfo="capterinfo"
      ></component>
    </el-card>
  </div>
</template>

<script>
import * as subApi from "@/api/subject";
import * as courseApi from "@/api/course";
import * as courseDseApi from "@/api/courseDse";
import * as capterApi from "@/api/capter";
import step1 from "./compents/step1";
import step2 from "./compents/step2";
import step3 from "./compents/step3";

export default {
  components: { step1, step2, step3 },
  data() {
    return {
      active: 0,
      step1: "step1",
      step2: "step2",
      step3: "step3",
      courseinfo: {},
      capterinfo: []
    };
  },
  created() {},
  methods: {
    goback() {
      this.active--;
    },
    getcourseinfo(data) {
      this.courseinfo = data;
      this.active++;
    },
    getcapterinfo(data) {
      this.capterinfo = data;
      this.active++;
    },
    pulish() {
      courseApi.coursebase(this.courseinfo).then(res => {
        if (res.code == 20000) {
          capterApi.save(this.capterinfo,res.data.courseid).then(() => {
            this.$message({
              type: "success",
              message: "成功!"
            });
          });
        }
      });
      setTimeout(()=>{
            this.$router.push("/course/list");
        },50)
      
    },
    pre() {
      this.disable2 = false;
      if (this.active-- < 0) this.disable1 = true;
    }
  }
};
</script>
<style scoped></style>
