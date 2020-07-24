<template>
  <div class="app-container">
    <el-button @click="add" style="margin:20px;display:block"
      >添加章节</el-button
    >

    <el-card
      class="box-card"
      v-for="item in capters"
      :key="item.title + ''"
      style="margin:20px;"
    >
      {{ item.title }}
      <el-button type="text" @click="edit(item.id)" style="position:absolute;right:200px;"
        >编辑</el-button
      >
      <el-button type="text" @click="Delete(item.id)" style="position:absolute;right:100px"
        >删除</el-button
      >
    </el-card>

    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="capter">
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="capter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" :label-width="formLabelWidth">
          <el-input v-model="capter.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input-number v-model="capter.sort" controls-position="right"  :min="1" :max="10"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subcapter">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改章节" :visible.sync="dialogFormVisible1">
      <el-form :model="update">
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="update.title" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="章节描述" :label-width="formLabelWidth">
          <el-input v-model="update.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input-number v-model="update.sort" controls-position="right"  :min="1" :max="10"></el-input-number>
          
            <el-button style="margin-top:20px;margin-left:420px" @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="upcapter(update.id)">确 定</el-button>
          
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-button
      type="primary"
      style="margin-left:350px;margin-top:20px"
      @click="submit"
      >下一步</el-button
    >
    <el-button
      type="primary"
      style="margin-left:200px;margin-top:20px"
      @click="back"
      >上一步</el-button
    >
  </div>
</template>

<script>
import * as subApi from "@/api/subject";

export default {
  data() {
    return {
      capters: [],
      defaultProps: {
        children: "list",
        label: "title"
      },
      dialogFormVisible: false,
      capter: {},
      formLabelWidth: "120px",
      total: 1,
      id: 0,
      dialogFormVisible1: false,
      update: {}
    };
  },
  created() {},

  methods: {
    upcapter(id) {
     // this.capters.splice(this.capters.findIndex(item => item.id==id),1)
     // this.capters.push(this.update)
     this.capter={}
      this.dialogFormVisible1=false
    },
    edit(id) {
      this.dialogFormVisible1 = true;
      let i = this.capters.filter(item => {
        return item.id == id;
      });
      this.update = i[0];
    },
    Delete(id) {
      this.capters.splice(this.capters.findIndex(item => item.id==id),1)
      this.capter={}
    },
    submit() {
      this.$emit("next", this.capters);
    },
    back() {
      this.$emit("back", "");
    },
    handleNodeClick() {},
    add() {
      this.dialogFormVisible = true;
    },
    subcapter() {
      this.videos = 0;
      if (Object.keys(this.capter).length == 0) {
        this.dialogFormVisible = false;
      } else {
        this.capter.id = this.id;
        this.capters.push(this.capter);
        this.capter = {};
        this.id++;
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>
<style scoped>
.s1 {
  float: left;
  top: 30px;
}
</style>
