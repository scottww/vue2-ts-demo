<template>
  <div class="font-library-selector">
    <div
      class="font-item"
      v-for="(item, index) in fontItems"
      :key="index"
      :style="{ backgroundColor: item.color, color: item.textColor }"
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
      fonts: [
        "上首造字",
        "三级字库",
        "锐字潮牌字库",
        "龚帆字库",
        "A2字库",
        "空心坊",
        "蝉蚂字库",
        "文悦字库",
        "字语字库",
        "仓耳",
        "文道字库",
        "也字工厂",
        "暗字馆",
        "山海字库",
        "字魂字库"
      ],
      colors: [
        "#000000",
        "#FF7F00",
        "#1F77B4",
        "#D62728",
        "#2CA02C",
        "#FFEB3B",
        "#9467BD",
        "#E377C2",
        "#17BECF",
        "#009688",
        "#3F51B5",
        "#757575",
        "#212121",
        "#8BC34A",
        "#795548"
      ],
      fontItems: []
    };
  },
  created() {
    this.fontItems = this.fonts.map(name => {
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      // 如果是空心坊 (#FFEB3B) 用深色文本
      const textColor = randomColor === "#FFEB3B" ? "#333" : "#fff";
      return { name, color: randomColor, textColor };
    });
  },
  methods: {
    handleFontSelect(item) {
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  padding: 0.4rem 0.6rem;
  margin: 2px;
}

.font-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
