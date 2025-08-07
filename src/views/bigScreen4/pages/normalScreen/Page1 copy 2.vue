<!-- NormalScreen/Page1.vue -->
<template>
  <div class="page-content">
    <div class="card">模块A</div>
    <div class="card">模块B</div>
    <div class="card">模块C</div>
  </div>
</template>

<style scoped>
.page-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
}
.card {
  flex: 1 1 30%;
  min-width: 300px;
  height: 200px;
  background: #1e1e1e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

/* 小屏时 */
@media (max-width: 1400px) {
  .card {
    flex: 1 1 100%;
  }
}
</style>
