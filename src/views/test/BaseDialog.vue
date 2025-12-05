<template>
  <el-dialog
    :visible.sync="visible"
    title="测试弹窗"
    width="400px"
    append-to-body
    @close="onClose"
  >
    <div class="dialog-content">
      这是弹窗内容
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "BigDialog",
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      visible: this.value
    };
  },
  methods: {
    onClose() {
      this.$emit("close");
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style scoped>
.dialog-content {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
