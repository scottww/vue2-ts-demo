<template>
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto">
    <h2>我的相册预览 — 瀑布流示例</h2>
    <AlbumMasonry :images="imgs" :columns="cols" />
  </div>
</template>

<script>
import AlbumMasonry from "./AlbumMasonry.vue";

export default {
  name: "Photos",
  components: { AlbumMasonry },
  data() {
    return {
      cols: { default: 4, 1200: 4, 900: 3, 600: 2, 0: 1 },
      // 示例图片（替换为你自己的图片数组）
      imgs: Array.from({ length: 18 }).map((_, i) => {
        // 使用 picsum 占位图，size 用随机高宽模拟不等高图片
        const w = 600;
        const h = 300 + Math.floor(Math.random() * 600);
        return {
          id: i,
          src: `https://picsum.photos/id/${100 + i}/${w}/${h}`, // full
          thumb: `https://picsum.photos/id/${100 + i}/400/300`, // thumb 预览
          alt: `示例图片 ${i + 1}`,
          caption: `这是第 ${i + 1} 张图片`
        };
      }),
      // imgs: [
      // { src: require("@/assets/album/z.jpg"), alt: "图片0" },
      //   { src: require("@/assets/album/1.jpeg"), alt: "图片1" },
      //   { src: require("@/assets/album/2.jpeg"), alt: "图片2" },
      //   { src: require("@/assets/album/3.jpeg"), alt: "图片3" },
      //   { src: require("@/assets/album/4.jpeg"), alt: "图片4" }
      // ]
    };
  }
};
</script>
