<template>
  <div class="app-container">
    <el-table
      :data="
        list.filter(
          data =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="课程标题" prop="title" width="150">
      </el-table-column>
      <el-table-column label="课程销售价格" prop="price" width="150">
      </el-table-column>

      <el-table-column label="总课时" prop="lessonNum" width="150">
      </el-table-column>
      <el-table-column label="销售数量" prop="buyCount" width="150">
      </el-table-column>
      <el-table-column label="浏览数量" prop="viewCount" width="150">
      </el-table-column>
      <el-table-column label="注册时间" prop="gmtCreate"> </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="150"
        :filters="[
          { text: '未发布', value: 'Draft' },
          { text: '已发布', value: 'Normal' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == 'Draft' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status == "Draft" ? "未发布" : "已发布" }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入课程名称搜索"
          />
        </template>
        <template slot-scope="scope">

          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDelete(scope.row)" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center"
      @current-change="handleCurrentChange"
      :page-size="size"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import * as couApi from "@/api/course";

export default {
  data() {
    return {
      page: 1,
      size: 20,
      list: [],
      search: "",
      total: 0
    };
  },
  created() {
    this.getlist();
  },

  methods: {
    getlist(page = 1) {
      this.page = page;
      couApi.page(this.page, this.size).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    filterTag(value, row) {
      return row.status == value;
    },
    handleCurrentChange(page) {
      this.getlist(page);
    },
    handleClick(row) {
      this.$router.push("/course/edit/"+row.id);
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          teaApi.Delete(row.id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          setTimeout(() => {
            this.getlist();
          }, 200);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
