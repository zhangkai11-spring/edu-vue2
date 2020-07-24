<template>
  <div class="components-container">
    <pan-thumb :image="image" />

    <el-button
      type="primary"
      icon="el-icon-upload"
      style="position: absolute;top: 70px;margin-left: 40px;"
      @click="imagecropperShow = true"
    >
      Change Avatar
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from "@/components/ImageCropper";

import PanThumb from "@/components/PanThumb";

export default {
  name: "AvatarUploadDemo",

  components: { ImageCropper, PanThumb },

  data() {
    return {
      imagecropperShow: false,

      imagecropperKey: 0,

      image: ""
    };
  },

  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;

      this.imagecropperKey = this.imagecropperKey + 1;

      this.image = resData.files.avatar;
    },

    close() {
      this.imagecropperShow = false;
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 200px;

  height: 200px;

  border-radius: 50%;
}
</style>
