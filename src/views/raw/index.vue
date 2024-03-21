<template>
  <div class="raw-demo">
    <button @click="showDlg">Click</button>
  </div>
</template>

<script>
// import showMsg from "@/components/raw/showMsg.js";
export default {
  name: "RawDemo",

  data() {
    return {};
  },

  mounted() {
    //plugins loading
    this.$loading.show("加载中...");
    setTimeout(() => {
      this.$loading.hide();
    }, 2000);
  },

  methods: {
    showDlg() {
      //   showMsg("要显示的内容", this.cb);
    },
    cb(close) {
      console.log("点击了确定按钮");
      close();
    }
  }
};
</script>

<style lang="scss" scoped></style>
