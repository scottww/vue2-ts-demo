<template>
  <div class="font-library-selector">
    <div
      class="font-item"
      v-for="(item, index) in fontItems"
      :key="index"
      :style="{ backgroundColor: item.color }"
      @click="handleFontSelect(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FontLibrarySelector",
  data() {
    return {
      fontItems: [
        { name: "上首造字", color: "#000000" },
        { name: "三级字库", color: "#FF7F00" },
        { name: "锐字潮牌字库", color: "#1F77B4" },
        { name: "龚帆字库", color: "#D62728" },
        { name: "A2字库", color: "#2CA02C" },
        { name: "空心坊", color: "#FFEB3B" },
        { name: "蝉蚂字库", color: "#9467BD" },
        { name: "文悦字库", color: "#E377C2" },
        { name: "字语字库", color: "#17BECF" },
        { name: "仓耳", color: "#009688" },
        { name: "文道字库", color: "#3F51B5" },
        { name: "也字工厂", color: "#757575" },
        { name: "暗字馆", color: "#212121" },
        { name: "山海字库", color: "#8BC34A" },
        { name: "字魂字库", color: "#795548" }
      ]
    };
  },
  methods: {
    handleFontSelect(item) {
      // 可以在这里添加选中字体库的处理逻辑
      this.$emit("fontSelect", item);
      console.log("Selected font:", item.name);
    }
  }
};
</script>

<style scoped>
.font-library-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.font-item {
  /* width: 120px;
  height: 40px; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: white; */
  /* font-weight: bold; */
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 12px;

  padding: 0.4rem;
  border-radius: 5px;
  margin-bottom: 0.4rem;
  display: inline-block;
  color: #fff;
  margin: 2px 2px;
}

.font-item:nth-child(6) {
  color: #333; /* #333空心坊文本颜色设为深色，提高可读性 */
}

.font-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>