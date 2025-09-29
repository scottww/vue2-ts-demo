<template>
  <div
    class="font-button"
    :style="{ backgroundColor: color, color: textColor }"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FontButton",
  props: {
    color: { type: String, default: "#000" },
    textColor: { type: String, default: "#fff" }
  }
};
</script>

<style scoped>
.font-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  padding: 0.4rem 0.6rem;
  margin: 2px;
}
.font-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
