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
      fontItems: []
    };
  },
  created() {
    // 初始化时给每个字体随机颜色
    this.fontItems = this.fonts.map(name => ({
      name,
      color: this.getRandomColor()
    }));
  },
  methods: {
    getRandomColor() {
      // 随机生成亮一点的颜色
      const letters = "6789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    },
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
  color: #fff;
  margin: 2px;
}

.font-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
