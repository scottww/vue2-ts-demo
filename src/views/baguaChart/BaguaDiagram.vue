<template>
  <div class="bagua-container">
    <svg viewBox="0 0 400 400" width="400" height="400">
      <!-- 太极图 -->
      <g transform="translate(200,200)">
        <!-- 外圆 -->
        <circle cx="0" cy="0" r="100" fill="none" stroke="black" stroke-width="2"/>

        <!-- 黑半部分S型 -->
        <path
          d="
            M0,-100
            A100,100 0 1,1 0,100
            A50,50 0 1,0 0,-100
            Z
          "
          fill="black"
        />

        <!-- 白半部分S型 -->
        <path
          d="
            M0,100
            A100,100 0 1,1 0,-100
            A50,50 0 1,0 0,100
            Z
          "
          fill="white"
        />

        <!-- 阴阳眼小圆点容器 -->
        <g class="dots-rotating">
          <circle cx="0" cy="-50" r="12.5" fill="white"/>
          <circle cx="0" cy="50" r="12.5" fill="black"/>
        </g>
      </g>

      <!-- 八卦 -->
      <g v-for="(trigram, index) in trigrams" :key="trigram.name"
         :transform="`translate(${getTrigramPosition(index)})`" text-anchor="middle">
        <text x="0" y="-10" font-size="36">{{ trigram.symbol }}</text>
        <text x="0" y="20" font-size="18" font-weight="bold">{{ trigram.name }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "BaguaDiagram",
  data() {
    return {
      trigrams: [
        { name: "乾", symbol: "☰" },
        { name: "兑", symbol: "☱" },
        { name: "离", symbol: "☲" },
        { name: "震", symbol: "☳" },
        { name: "巽", symbol: "☴" },
        { name: "坎", symbol: "☵" },
        { name: "艮", symbol: "☶" },
        { name: "坤", symbol: "☷" },
      ],
    };
  },
  methods: {
    getTrigramPosition(index) {
      const angle = (index * 45 - 90) * (Math.PI / 180);
      const radius = 150;
      const x = 200 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);
      return `${x},${y}`;
    },
  },
};
</script>

<style scoped>
.bagua-container {
  width: 400px;
  height: 400px;
  margin: 50px auto;
}

/* 让阴阳眼小圆旋转 */
.dots-rotating {
  transform-origin: 0 0; /* 相对太极中心 */
  animation: rotate-dots 5s linear infinite;
}

@keyframes rotate-dots {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
