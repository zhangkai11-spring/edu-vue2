<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import * as subApi from "@/api/subject";

export default {

  data() {
    return {
      filterText: '',
      data2: [
      ],
      defaultProps: {
        children: 'list',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created(){
    this.gettree()
  },


  methods: {
    gettree(){
      subApi.tree().then((res)=>{
        this.data2=res.data.tree
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data){
      console.log(data.id)
      this.$router.push("/subject/info/"+data.id)
    }
  }
}
</script>

