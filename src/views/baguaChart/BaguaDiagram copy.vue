<template>
  <div class="bagua-container">
    <!-- 外圈八卦 -->
    <div class="bagua-circle">
      <!-- 乾卦 - 西北 -->
      <div class="trigram-item trigram-qian">
        <div class="trigram-symbol">☰</div>
        <div class="trigram-name">乾</div>
      </div>
      
      <!-- 兑卦 - 正西 -->
      <div class="trigram-item trigram-dui">
        <div class="trigram-symbol">☱</div>
        <div class="trigram-name">兑</div>
      </div>
      
      <!-- 离卦 - 正南 -->
      <div class="trigram-item trigram-li">
        <div class="trigram-symbol">☲</div>
        <div class="trigram-name">离</div>
      </div>
      
      <!-- 震卦 - 正东 -->
      <div class="trigram-item trigram-zhen">
        <div class="trigram-symbol">☳</div>
        <div class="trigram-name">震</div>
      </div>
      
      <!-- 巽卦 - 东南 -->
      <div class="trigram-item trigram-xun">
        <div class="trigram-symbol">☴</div>
        <div class="trigram-name">巽</div>
      </div>
      
      <!-- 坎卦 - 正北 -->
      <div class="trigram-item trigram-kan">
        <div class="trigram-symbol">☵</div>
        <div class="trigram-name">坎</div>
      </div>
      
      <!-- 艮卦 - 东北 -->
      <div class="trigram-item trigram-gen">
        <div class="trigram-symbol">☶</div>
        <div class="trigram-name">艮</div>
      </div>
      
      <!-- 坤卦 - 西南 -->
      <div class="trigram-item trigram-kun">
        <div class="trigram-symbol">☷</div>
        <div class="trigram-name">坤</div>
      </div>
    </div>
    
    <!-- 中间太极图 -->
    <div class="taiji-container">
      <div class="taiji-circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaguaDiagram',
  data() {
    return {
      // 可以在这里添加任何需要的数据
    };
  }
};
</script>

<style scoped>
.bagua-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

.bagua-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.trigram-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'SimSun', serif;
}

.trigram-symbol {
  font-size: 36px;
  line-height: 1;
  margin-bottom: 0;
  color: #000;
}

.trigram-name {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-align: center;
}

/* 乾卦 - 西北 */
.trigram-qian {
  top: 10%;
  left: 10%;
}

/* 兑卦 - 正西 */
.trigram-dui {
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}

/* 离卦 - 正南 */
.trigram-li {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

/* 震卦 - 正东 */
.trigram-zhen {
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
}

/* 巽卦 - 东南 */
.trigram-xun {
  bottom: 10%;
  right: 10%;
}

/* 坎卦 - 正北 */
.trigram-kan {
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}

/* 艮卦 - 东北 */
.trigram-gen {
  top: 10%;
  right: 10%;
}

/* 坤卦 - 西南 */
.trigram-kun {
  bottom: 10%;
  left: 10%;
}

/* 太极图 */
.taiji-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.taiji-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(to bottom, #ffffff 0%, #ffffff 50%, #000000 50%, #000000 100%);
  position: relative;
}

.taiji-circle::before {
  content: '';
  position: absolute;
  top: 50px;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000000;
}

.taiji-circle::after {
  content: '';
  position: absolute;
  top: 50px;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ffffff;
}
</style>