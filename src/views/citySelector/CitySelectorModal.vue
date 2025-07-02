<template>
  <a-modal
    v-model="visible"
    title="选择城市 / 省份"
    width="600px"
    @cancel="onCancel"
    :footer="null"
  >
    <a-tabs v-model="activeTab">
      <a-tab-pane key="city" tab="按城市">
        <div class="section">
          <h4>热门城市</h4>
          <div class="list">
            <span
              v-for="city in hotCities"
              :key="city"
              @click="select(city)"
            >
              {{ city }}
            </span>
          </div>
        </div>
        <div class="section" v-for="(cities, letter) in cityList" :key="letter">
          <h4>{{ letter }}</h4>
          <div class="list">
            <span
              v-for="city in cities"
              :key="city"
              @click="select(city)"
            >
              {{ city }}
            </span>
          </div>
        </div>
      </a-tab-pane>

      <a-tab-pane key="province" tab="按省份">
        <div class="section">
          <div class="list">
            <span
              v-for="province in provinces"
              :key="province"
              @click="select(province)"
            >
              {{ province }}
            </span>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import { hotCities, cityList, provinces } from './cityList';

export default {
  name: 'CitySelectorModal',
  data() {
    return {
      visible: false,
      activeTab: 'city',
      hotCities,
      cityList,
      provinces
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    onCancel() {
      this.visible = false;
    },
    select(name) {
      this.$emit('select', name);
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.section {
  margin-bottom: 16px;
}
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
span {
  padding: 6px 12px;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
}
span:hover {
  background: #1890ff;
  color: white;
}
</style>
