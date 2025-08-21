<template>
  <div class="main__container">
    <div class="content">
      <div class="top-box">
        <div class="item flex-v-h" v-for="(item, index) in topItems" :key="'top-' + index">
          <div class="item-label">{{ item.label }}</div>
          <div class="item-value">{{ item.value }}</div>
        </div>
      </div>

      <div class="middle-box">
        <div class="item" v-for="(item, index) in middleItems" :key="'middle-' + index">
          <div class="item-label">{{ item.label }}</div>
          <div class="item-value">{{ item.value }}</div>
        </div>
      </div>

      <div class="down-box">
        <div class="item" v-for="(item, index) in downItems" :key="'down-' + index">
          <div class="item-label">{{ item.label }}</div>
          <div class="item-value">{{ item.value }}</div>
        </div>
        <div class="total" v-if="total">
          <div class="flex-h-v">
            <div class="total-label">{{ total.label }}</div>
            <div class="total-value">{{ total.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContainer",
  props: {
    topItems: { type: Array, default: () => [] },
    middleItems: { type: Array, default: () => [] },
    downItems: { type: Array, default: () => [] },
    total: { type: Object, default: null }
  }
};
</script>

<style scoped>
.main__container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/bigScreen/risk_item2.png");
  background-size: cover;
  background-position: center;
  padding: 10px 0;
}

.item-label {
  color: #f3f8fd;
  font-size: 14.8px;
}
.item-value {
  color: #33ccff;
  font-size: 20.35px;
}

.top-box, .middle-box, .down-box {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.top-box { padding: 0 40px; }
.middle-box {}
.down-box { padding: 0 30px; position: relative; align-items: flex-end; }

.total {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 10;
}

.total .flex-h-v { flex-direction: column; }

.total-label { color: #fff; font-size: 19.63px; }
.total-value { color: #33ccff; font-size: 32px; }
</style>
