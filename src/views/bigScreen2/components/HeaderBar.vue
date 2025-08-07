<template>
  <div class="header-bar">
    <h1>xxx驾驶舱</h1>
    <div class="nav-buttons">
      <button>首页</button>
      <button>工程管理</button>
      <button>监测管理</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar'
}
</script>

<style scoped>
.header-bar {
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, #003366, #001122);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  color: #00cfff;
  font-size: 36px;
}

.nav-buttons button {
  margin-left: 40px;
  font-size: 24px;
  background: #004466;
  border: none;
  padding: 10px 20px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}
</style>
