<template>
  <div class="toggle-button" :class="{ active }" @click="$emit('click')">
    <div class="icon"><slot name="icon" /></div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  props: {
    label: String,
    active: Boolean
  }
};
</script>

<style scoped>
.toggle-button {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: rgba(13, 41, 57, 0.6);
  border-radius: 6px 6px 6px 6px;
}

.icon {
  width: 24px;
  height: 24px;
  color: #fff;
}

.label {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #fff;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.toggle-button.active {
  border: 1px solid #ffbd1f;
  box-shadow: 0 0 8px #ffbd1f;
}

.toggle-button.active .icon {
  color: #ffbd1f;
}

.toggle-button.active .label {
  color: #ffbd1f;
}
</style>
