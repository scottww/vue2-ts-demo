<template>
  <div class="dropdown-wrapper" ref="wrapper">
    <!-- 触发按钮 -->
    <button @click="toggle" class="dropdown-btn">
      {{ selected || '请选择城市 / 省份' }}
    </button>

    <!-- 弹出浮层 -->
    <div v-show="visible" class="dropdown-panel" ref="panel">
      <div class="tabs">
        <span :class="{ active: tab === 'city' }" @click="tab = 'city'">按城市</span>
        <span :class="{ active: tab === 'province' }" @click="tab = 'province'">按省份</span>
      </div>

      <!-- 城市 -->
      <div v-if="tab === 'city'">
        <h4>热门城市</h4>
        <div class="list">
          <span v-for="city in hotCities" :key="city" @click="select(city)">{{ city }}</span>
        </div>
        <div v-for="(cities, key) in cityList" :key="key">
          <h4>{{ key }}</h4>
          <div class="list">
            <span v-for="city in cities" :key="city" @click="select(city)">{{ city }}</span>
          </div>
        </div>
      </div>

      <!-- 省份 -->
      <div v-if="tab === 'province'">
        <div class="list">
          <span v-for="province in provinces" :key="province" @click="select(province)">
            {{ province }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hotCities, cityList, provinces } from './cityList';

export default {
  name: 'CitySelectorDropdown',
  data() {
    return {
      visible: false,
      tab: 'city',
      selected: '',
      hotCities,
      cityList,
      provinces
    };
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    select(val) {
      this.selected = val;
      this.visible = false;
      this.$emit('select', val);
    },
    handleClickOutside(e) {
      if (!this.$refs.wrapper.contains(e.target)) {
        this.visible = false;
      }
    }
  }
};
</script>

<style scoped>
.dropdown-wrapper {
  display: inline-block;
  position: relative;
}

.dropdown-btn {
  padding: 6px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-panel {
  position: absolute;
  top: 36px;
  left: 0;
  width: 360px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
}

.tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
}
.tabs span {
  cursor: pointer;
  padding-bottom: 4px;
}
.tabs .active {
  border-bottom: 2px solid #1890ff;
  color: #1890ff;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.list span {
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}
.list span:hover {
  background: #1890ff;
  color: white;
}
</style>
