<template>
  <div class="button-group-container" :style="{ backgroundImage: `url(${backgroundImg})` }">
    <div
      v-for="(btn, index) in buttons"
      :key="index"
      class="group-button"
      :class="{ disabled: btn.disabled }"
      @click.stop="handleButtonClick(btn)"
    >
      <span class="button-text">{{ btn.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import backgroundImg from '@/assets/normalScreen/splitView/split_view_bg_new.png'
// tip: 这个代码会导致运行项目卡在98%，暂时注释掉
// import backgroundImg from ''

// 按钮数组，第一个是功能1，其余是其他类型按钮
const buttons = ref([
  { label: '功能1', type: 'func1', disabled: false },
  { label: '类型1', type: 'type' },
  { label: '类型2', type: 'type' },
  { label: '类型3', type: 'type' },
  { label: '类型4', type: 'type' },
  { label: '类型5', type: 'type' },
  { label: '类型6', type: 'type' },
])

const handleButtonClick = (btn) => {
  if (btn.disabled) return
  if (btn.type === 'split') {
    console.log('点击功能按钮')
  } else if (btn.type === 'type') {
    console.log('点击类型按钮：', btn.label)
  }
}
</script>

<style scoped>
.button-group-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  /* border-radius: 8px; */
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.group-button {
  min-width: 80px;
  min-height: 28px;
  /* padding: 8px 12px; */
  border-radius: 8px;
  cursor: pointer;
  /* background-color: rgba(30, 120, 229, 0.85); */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.group-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.group-button:hover:not(.disabled) {
  /* transform: translateY(-2px); */
  /* opacity: 0.85; */
  background-color: rgba(15, 126, 198, 1);
}

.button-text {
  /* font-weight: bold; */
  font-size: 14px;
}

@media (max-width: 768px) {
  .group-button {
    min-width: 70px;
    min-height: 24px;
  }
}
</style>
