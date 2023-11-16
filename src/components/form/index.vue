<template>
  <form class="form">
    <div class="form-item">
      <!-- <div class="form-item__content"> -->
      <input type="text" class="input__inner" name="" required="" />
      <label for="" class="form-item__label">用户名</label>
      <!-- </div> -->
    </div>
    <div class="form-item">
      <!-- <div class="form-item__content"> -->
      <input type="text" class="input__inner" name="" required="" />
      <label for="" class="form-item__label">密码</label>
      <!-- </div> -->
    </div>
    <!-- <center>
      <a>登 录<span></span></a>
    </center> -->
    <div class="form-item">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>