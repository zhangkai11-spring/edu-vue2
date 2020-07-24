<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left:350px" @click="submit"
      >提交</el-button
    >
    <el-button type="primary" style="margin-left:200px" @click="back"
      >上一步</el-button
    >
    {{ capterinfo }}
    {{ courseinfo }}
  </div>
</template>

<script>
import * as subApi from "@/api/subject";

export default {
  props: ["capterinfo", "courseinfo"],
  data() {
    return {};
  },

  created() {},

  methods: {
    submit() {
      this.$emit("next");
    },
    back() {
      this.$emit("back", "");
    }
  }
};
</script>
