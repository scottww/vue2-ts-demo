<template>
  <div class="info-list">
    <div v-for="(item, index) in items" :key="index" class="info-item">
      <div class="area-value-wrapper">
        <div class="area-value">
          <span class="area-number">{{ item.value }}</span>
          <span class="area-unit">{{ item.unit }}</span>
        </div>
      </div>
      <div class="area-type">{{ item.type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoList",
  props: {
    items: {
      type: Array,
      required: true,
      // 格式示例：[{ value: '21.5', unit: '万亩', type: '类型 A 信息' }]
    },
  },
};
</script>

<style lang="scss" scoped>
.info-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 0;
}

.info-item {
  width: 123px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.area-value-wrapper {
  width: 123px;
  height: 70px;
  background: url("~@/assets/images/oneMap/info_base.png") center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.area-value {
  display: flex;
  align-items: baseline; /* 数字和单位对齐 */
  margin-top: -50px;
}

.area-number {
  font-family: DIN, sans-serif;
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
  color: #33ffff;
  padding: 0 4px;
}

.area-unit {
  margin-left: 4px;
  font-family: "SourceHanSansCN", sans-serif;
  font-size: 14px;
  font-style: normal;
  color: #fff;
}

.area-type {
  font-family: "SourceHanSansCN", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  font-style: normal;
}
</style>
