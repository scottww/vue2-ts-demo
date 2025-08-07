<template>
  <div class="center-map">
    <iframe
      src="https://your-unity-url.com"
      frameborder="0"
      class="ue-frame"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'CenterMap'
}
</script>

<style scoped>
.center-map {
  width: 4200px;
  height: 100%;
  background-color: #000;
  position: relative;
}

.ue-frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
