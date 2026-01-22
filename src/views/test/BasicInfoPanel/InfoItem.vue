<template>
  <div
    class="data-item"
    :class="{ active }"
    @click="$emit('click', item.id)"
  >
    <div class="data-circle">
      <img :src="item.icon" :alt="item.alt" />
    </div>
    <div class="data-info">
      <span class="data-value">{{ item.value }}</span>
      <span class="data-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoItem",
  props: {
    item: Object,
    active: Boolean
  }
};
</script>

<style lang="scss" scoped>
.data-item {
  display: flex;
  align-items: center;
  gap: 8px;
  // padding: 10px;
  padding: 2px 4px;
  // border-bottom: 1px dashed #e0e0e0;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background-image: linear-gradient(135deg, #1890ff 0%, #7ae3ff 100%);
    border: 1px solid #1890ff;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    // .data-value, .data-label {
    //   color: #fff;
    // }
  }
}

.data-circle {
  width: 52px;
  height: 52px;
  // border-radius: 50%;
  // background-color: #1e68c1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

.data-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.data-value {
  font-size: 20px;
  font-weight: bold;
  color: #057be8;
}

.data-label {
  font-size: 16px;
  color: #333;
}
</style>