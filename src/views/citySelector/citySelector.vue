<template>
  <div class="city-selector">
    <!-- 热门城市 -->
    <div class="hot-section">
      <h3>热门城市</h3>
      <div class="city-grid">
        <span
          v-for="city in hotCities"
          :key="city"
          class="city-item"
          @click="selectCity(city)"
        >
          {{ city }}
        </span>
      </div>
    </div>

    <!-- 所有城市 -->
    <div class="all-section">
      <div
        v-for="(cities, letter) in cityList"
        :key="letter"
        class="city-group"
      >
        <h4>{{ letter }}</h4>
        <div class="city-grid">
          <span
            v-for="city in cities"
            :key="city"
            class="city-item"
            @click="selectCity(city)"
          >
            {{ city }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cityList, hotCities } from './cityList';

const emit = defineEmits(['select']);

function selectCity(city) {
  emit('select', city);
}
</script>

<style scoped>
.city-selector {
  max-height: 400px;
  overflow-y: auto;
  padding: 12px;
}

.hot-section h3,
.city-group h4 {
  font-weight: bold;
  margin-bottom: 8px;
}

.city-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.city-item {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.city-item:hover {
  background-color: #1890ff;
  color: white;
}
</style>
