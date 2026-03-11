<template>
  <div class="demo-block">
    <h3>0. 竖向导航选择</h3>
    <VerticalNavSelect
      v-model="activeNavValue"
      title="演示标题"
      :options="navOptions"
      :height="620"
      :width="312"
      @change="onNavChange"
    />
  </div>
</template>

<script>
import VerticalNavSelect from "@/components/VerticalNavSelect/index.vue";
export default {
  components: { VerticalNavSelect },
  data() {
    return {
      activeNavValue: "item-7",
      navOptions: [
        { label: "选项一", value: "item-1" },
        { label: "选项二", value: "item-2" },
        { label: "选项三", value: "item-3" },
        { label: "选项四", value: "item-4" },
        { label: "选项五", value: "item-5" },
        { label: "选项六", value: "item-6" },
        { label: "选项七", value: "item-7" },
        { label: "选项八", value: "item-8" },
        { label: "选项九", value: "item-9" },
        { label: "选项十", value: "item-10" },
        { label: "选项十一", value: "item-11" },
        { label: "选项十二", value: "item-12" },
        { label: "选项十三", value: "item-13" }
      ]
    };
  },
  methods: {
    onNavChange(value) {
      this.activeNavValue = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-block {
  width: 650px;
  margin-bottom: 28px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 14px 16px;
  background: #fff;
}
</style>
