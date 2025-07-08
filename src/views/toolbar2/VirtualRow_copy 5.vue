<template>
  <div
    style="
      display: flex;
      border-bottom: 1px solid #eee;
      height: 30px;
      line-height: 30px;
    "
  >
    <div :style="{ minWidth: '100px', padding: '0 5px' }">{{ source.id }}</div>
    <div :style="{ minWidth: '200px', padding: '0 5px' }">
      {{ source.name }}
    </div>
    <div :style="{ minWidth: '100px', padding: '0 5px' }">
      {{ source.status }}
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualRow",
  props: {
    source: { type: Object, required: true },
    columns: { type: Array },
    columnWidths: { type: Array },
    rowHeight: { type: Number, default: 38 }
  },
  mounted() {}
};
</script>

<style>
</style>