<template>
  <div class="weather-panel-container">
    <!-- <div class="weather-title">天气</div> -->
    <div class="weather-list">
      <div class="weather-item active" @click="handleWeatherClick('sunny')">
        <div class="weather-icon sunny"></div>
        <span class="weather-name">晴天</span>
      </div>
      <div class="weather-item" @click="handleWeatherClick('rainy')">
        <div class="weather-icon rainy"></div>
        <span class="weather-name">雨天</span>
      </div>
      <div class="weather-item" @click="handleWeatherClick('cloudy')">
        <div class="weather-icon cloudy"></div>
        <span class="weather-name">阴天</span>
      </div>
      <div class="weather-item" @click="handleWeatherClick('partlyCloudy')">
        <div class="weather-icon partly-cloudy"></div>
        <span class="weather-name">多云</span>
      </div>
      <div class="weather-item" @click="handleWeatherClick('snowy')">
        <div class="weather-icon snowy"></div>
        <span class="weather-name">下雪</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherPanel',
  data() {
    return {
      activeWeather: 'sunny'
    };
  },
  methods: {
    handleWeatherClick(weatherType) {
      this.activeWeather = weatherType;
      this.$emit('weatherChange', weatherType);
    }
  }
};
</script>

<style scoped>
/* 气象面板容器 */
.weather-panel-container {
  width: 100%;
  height: 100%;
  padding: 22px 12px;
}

/* 标题样式 */
.weather-title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

/* 天气列表样式 */
.weather-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 天气项样式 */
.weather-item {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  /* background: rgba(10, 50, 100, 0.5); */
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 激活的天气项 */
.weather-item.active {
  /* background: rgba(50, 150, 255, 0.3); */
  background: #0F7EC6;
  border: 1px solid rgba(100, 200, 255, 0.5);
}

/* 天气图标样式 */
.weather-icon {
  width: 20px;
  height: 20px;
  /* margin-bottom: 5px; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 各种天气图标 */
.sunny {
  background-image: url('~@/assets/bigScreen/functionPanel/sunny.png');
}

.rainy {
  background-image: url('~@/assets/bigScreen/functionPanel/rainy.png');
}

.cloudy {
  background-image: url('~@/assets/bigScreen/functionPanel/cloudy.png');
}

.partly-cloudy {
  background-image: url('~@/assets/bigScreen/functionPanel/partly_cloudy.png');
}

.snowy {
  background-image: url('~@/assets/bigScreen/functionPanel/snowy.png');
}

/* 天气名称样式 */
.weather-name {
  color: #fff;
  font-size: 18px;
  margin-left: 10px;
}
</style>