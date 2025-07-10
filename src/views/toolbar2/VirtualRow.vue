<template>
  <div
    class="virtual-row"
    :style="{
      display: 'flex',
      lineHeight: rowHeight + 'px',
      height: rowHeight + 'px',
      cursor: 'pointer',
      backgroundColor: backgroundColor
    }"
    @click="$emit('row-click', source)"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div
      v-for="(row, i) in columns"
      :key="row.prop || i"
      :class="getColClass(row.prop)"
      :style="{
        width: columnWidths[i] + 'px',
        minWidth: columnWidths[i] + 'px',
        maxWidth: columnWidths[i] + 'px',
        padding: '0 4px',
        boxSizing: 'border-box',
        textAlign: row.align || 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        alignItems: 'center',
        backgroundColor: getColBgColor(row.prop)
      }"
    >
      <template v-if="row.prop === 'index'">
        <div class="index-text">0{{ source.index }}</div>
      </template>

      <template v-else-if="row.prop === 'time'">
        <i
          class="el-icon-caret-right"
          style="color: #0b83f5; padding-right: 4px"
        ></i>
        <span :title="getFormattedValue(row, source.time)">{{
          getFormattedValue(row, source.time)
        }}</span>
      </template>

      <template v-else-if="row.prop === 'status'">
        <span
          class="status-dot"
          :class="{ online: source.status === 'online' }"
        />
      </template>

      <template v-else>
        <span :title="getFormattedValue(row, source[row.prop])">
          {{ getFormattedValue(row, source[row.prop]) }}
        </span>
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
    rowHeight: { type: Number, required: true }
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    backgroundColor() {
      return this.hover ? "#083b6c" : "#0a4183";
    }
  },
  methods: {
    getColClass(prop) {
      if (prop === "index") return "col-index";
      if (prop === "time") return "col-time";
      return "col-others";
    },
    getColBgColor() {
      return "#0a4183";
    },
    getFormattedValue(row, value) {
      if (typeof row.formatter === "function") {
        return row.formatter(value, this.source); // 第二个参数是整行数据
      }
      return value === null || value === undefined || value === ""
        ? "--"
        : value;
    }
  }
};
</script>

<style scoped>
.virtual-row:hover {
  background-color: #083b6c;
}

.col-index {
  background-color: #0a4183;
  justify-content: center;
}

.index-text {
  color: #fff;
  font-weight: bold;
  position: relative;
  padding-left: 10px;
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

.col-time {
  background-color: #0a4183;
  font-size: 12px;
  color: #fff;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #999;
  border-radius: 50%;
}

.status-dot.online {
  background-color: #00ff00;
}

.col-others {
  background-color: #0a4183;
}
</style>
