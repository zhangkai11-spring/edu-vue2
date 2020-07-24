<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-page-header @back="goBack" > </el-page-header>

        <el-tab-pane label="讲师详情" name="first">
          <component v-bind:is="look" :teaid="teaid"></component
        ></el-tab-pane>
        <el-tab-pane label="添加讲师" name="two"
          ><component v-bind:is="save" :teaid="teaid"></component
        ></el-tab-pane>
        <el-tab-pane label="修改讲师" name="three">
          <component v-bind:is="update" :teaid="teaid"></component>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import * as teaApi from "@/api/teacher";
import save from "./compents/save";
import look from "./compents/look";
import update from "./compents/update";

export default {
  components: { save, look, update },
  data() {
    return {
      activeName: "first",
      save: "save",
      update: "update",
      look: "look",
      teaid: this.$route.params.id
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {},
    goBack() {
     
      this.$router.push("/teacher/edit");
    }
  }
};
</script>
