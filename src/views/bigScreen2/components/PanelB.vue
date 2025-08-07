<template>
  <div class="block">
    <h3>{{ title }}</h3>
    <div class="content">内容占位（后续组件替换）</div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.block {
  background: #123456;
  border: 1px solid #00cfff;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 16px;
  color: #fff;
}

.block h3 {
  margin: 0 0 12px;
  font-size: 24px;
  color: #00cfff;
}

.block .content {
  height: 160px;
  background: #001122;
}
</style>
