<template>
  <div class="head__container">
    <div class="head-title">空间信息维护</div>
    <div class="head-btn">
      <el-button size="mini" @click="handleSave">保存</el-button>
      <el-button size="mini" @click="handleMap">地图标注</el-button>
      <el-button size="mini" @click="handleReset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSave() {
      this.$emit("on-save");
    },
    handleMap() {
      this.$emit("on-map");
    },
    handleReset() {
      this.$emit("on-reset");
    }
  }
};
</script>

<style lang="scss" scoped>
.head__container {
  padding: 10px;
  display: flex;
}

.head-title {
  width: 200px;
}

.head-btn {
  margin-left: auto;
}
</style>