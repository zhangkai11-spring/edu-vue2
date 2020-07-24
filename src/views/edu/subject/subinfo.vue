<template>
  <div class="app-container">
    <el-card class="box-card">
         <el-page-header @back="goBack" > </el-page-header>
   {{id}}
    </el-card>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
    id:this.$route.params.id
    };
  },
  watch: {},

  methods: {
      goBack(){
      this.$router.push("/subject/edit")
    }
  }
};
</script>
