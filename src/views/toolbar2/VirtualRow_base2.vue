<template>
  <div class="virtual-row" :style="{ height: rowHeight + 'px' }">
    <div
      v-for="(col, colIndex) in columns"
      :key="col.prop || colIndex"
      class="virtual-cell"
      :title="source[col.prop]"
      :style="{
        width: columnWidths[colIndex] + 'px',
        minWidth: columnWidths[colIndex] + 'px',
        maxWidth: columnWidths[colIndex] + 'px',
        textAlign: col.align || 'center',
        padding: '0 6px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        // display: 'flex',
        alignItems: 'center',
        backgroundColor: '#083b6c',
        color: '#fff',
        fontSize: '12px',
        lineHeight: rowHeight + 'px'
      }"
    >
      <template v-if="col.prop === 'index'">
        <div class="col-index">
          <div class="index-text">0{{ source.index }}</div>
        </div>
      </template>

      <template v-else-if="col.prop === 'time'">
        <i
          class="el-icon-caret-right"
          style="color: #0b83f5; padding-right: 2px"
        ></i>
        <span>{{ source.time }}</span>
      </template>

      <template v-else-if="col.prop === 'status'">
        <span
          class="status-dot"
          :class="{ online: source.status === 'online' }"
          style="
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #999;
          "
        ></span>
      </template>

      <template v-else>
        {{ source[col.prop] }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualRow",
  props: {
    source: { type: Object, required: true },
    columns: { type: Array, required: true },
    columnWidths: { type: Array, required: true },
    rowHeight: { type: Number, default: 38 }
  },
  mounted() {}
};
</script>

<style scoped>
.virtual-row {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  /* border-bottom: 1px solid #2c3e50; */
  min-height: 38px; /* 保证最小高度 */
  max-height: 38px; /* 保证最大高度 */
  overflow: hidden;
}
.group{
  height: 600px;
}
.virtual-cell {
}
.index-text {
  color: #fff;
  font-weight: bold;
  position: relative;
  padding-left: 4px;
}
.index-text::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 18px;
  background-color: #0b83f5;
  border-radius: 2px;
}
.status-dot.online {
  background-color: #00ff00 !important;
}
</style>
