<template>
  <div class="section__header">
    <span class="title">{{ title }}</span>
    <div class="btn-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;

  position: relative;
}



.title {
  position: relative;
  padding: 10px;
}
span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 3px;
  background-color: #4c84ff;
}

.title {
  font-size: 14px;
  font-weight: bold;
}

.btn-box {
  display: flex;
  gap: 8px;
  padding: 0px 10px;
}
</style>
