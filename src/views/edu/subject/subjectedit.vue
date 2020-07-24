<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="课程列表" name="first">
          <component v-bind:is="list" ></component
        ></el-tab-pane>
        <el-tab-pane label="课程添加" name="two"
          ><component v-bind:is="save" ></component
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import save from "./save";
import list from "./list";

export default {
  components: { save, list },
  data() {
    return {
      save:'save',
      list:'list',
      activeName:'first'
    };
  },
  watch: {},

  methods: {
    
  }
};
</script>
