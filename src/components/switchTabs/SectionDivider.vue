<template>
  <div class="section-divider">
    <i class="divider-mark mark-one"></i>
    <i class="divider-mark mark-two"></i>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.section-divider {
  position: relative;
  height: 10px;
  width: 320px;
  max-width: 100%;
}

.section-divider::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 4px;
  border-bottom: 1px solid #d3e2f5;
}

.divider-mark {
  position: absolute;
  top: 1px;
  display: inline-block;
  width: 18px;
  height: 6px;
  transform: skewX(35deg);
  z-index: 1;
}

.mark-one {
  left: 0;
  background: #1f8bff;
}

.mark-two {
  left: 22px;
  background: #7dbdff;
}
</style>
