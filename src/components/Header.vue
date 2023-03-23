<template>
  <div class="header-container">
    <div class="logo">
      <img src="../assets/my-logo.png" alt="logo">
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
};
</script>
<style scoped>
.header-container {
  height: 60px;
  /* background-color: #f8f8f8; */
  display: flex;
  /* border-bottom: 1px solid orange; */
  box-shadow: inset 0 -1px 0 #d8dee4;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 8px; */
}
.logo img{
  height: 80%;
}
</style>
