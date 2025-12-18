<template>
  <el-dialog
    :key="innerTitle"
    v-model="visible"
    :close-on-click-modal="false"
    width="710"
    append-to-body
    modal-class="dialog_content"
    @close="onClose"
  >
    <template #header>
      <div class="dialog_header">
        <h4 class="title">{{ innerTitle }}</h4>
        <span class="history" @click="showHistory()">历史记录</span>
      </div>
    </template>
    <div class="content">11111111111</div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  name: "CustomDialog",
  props: {
    titleName: {
      type: String,
      default: "标题"
    }
  },
  data() {
    return {
      visible: false,
      listLoading: false,
      innerTitle: this.titleName
    };
  },
  watch: {},
  mounted() {},
  beforeUnmount() {},
  methods: {
    init(title) {
      this.visible = true;
      if (title) this.innerTitle = title;
      this.$nextTick(() => {});
    },
    onClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:visible", false);
      // this.$emit('close-dialog', true)
    },
    showHistory() {}
  }
};
</script>
<style lang="scss" scoped>
.dialog_header {
  .history {
    height: 26px;
    line-height: 26px;
    font-size: 16px;
    color: #ffffff;
    // background: #1890ff;
    padding: 0px 10px;
    position: absolute;
    top: 3.8%;
    right: 66px;
    background: #1890ff;
    transform: skewX(-20deg);
    cursor: pointer;
  }
}

.content {
  height: 500px;
  color: #ffffff;
  overflow-y: scroll;
}
</style>
