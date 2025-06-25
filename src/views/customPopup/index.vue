<template>
  <div class="custom-popup-demo">
    <div class="btn-box">
      <CustomButton type="red" @click="showPopup">显示弹窗</CustomButton>
      <CustomButton @click="showPopup2">显示弹窗2</CustomButton>
    </div>

    <CustomPopup
      :visible="visible"
      title="自定义标题1"
      :showFooter="true"
      cancelText="关闭"
      confirmText="提交"
      :closeOnClickMask="true"
      @close="handleClose"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <p>这是弹窗中1的内容。</p>
    </CustomPopup>
    <CustomPopup
      :visible="visible2"
      title="自定义标题2"
      :showFooter="true"
      cancelText="关闭"
      confirmText="提交"
      :closeOnClickMask="true"
      @close="handleClose2"
      @cancel="handleCancel2"
      @confirm="handleConfirm2"
    >
      <p>这是弹窗中2的内容。</p>
    </CustomPopup>
  </div>
</template>

<script>
import CustomPopup from "./CustomPopup.vue";
import CustomButton from "@/components/button/index.vue";

export default {
  components: {
    CustomPopup,
    CustomButton
  },
  data() {
    return {
      visible: false,
      visible2: false,
      title: "自定义弹窗",
      width: 500,
      height: 300,
      draggable: true,
      mask: true,
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    };
  },
  methods: {
    showPopup() {
      this.visible = true;
    },
    handleConfirm() {
      console.log("点击了确认");
      this.visible = false;
    },
    handleCancel() {
      console.log("点击了取消");
      this.visible = false;
    },
    handleClose() {
      console.log("点击了关闭");
      this.visible = false;
    },
    showPopup2() {
      this.visible2 = true;
    },
    handleConfirm2() {
      console.log("点击了确认");
      this.visible2 = false;
    },
    handleCancel2() {
      console.log("点击了取消");
      this.visible2 = false;
    },
    handleClose2() {
      console.log("点击了关闭");
      this.visible2 = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-popup-demo {
  padding: 20px;

  .popup-content {
    padding: 20px;
  }
}
.btn-box {
  margin: 0 auto;
  // text-align: center;
  display: flex;
  gap: 4px;
  // justify-content: center;
}
</style>
