<template>
  <div
    class="el-table__row"
    :style="rowStyle"
    role="row"
    :data-row-key="source.id"
  >
    <div
      v-for="(col, idx) in columns"
      :key="col.prop || idx"
      class="el-table__cell custom-cell"
      :class="getCellClass(col, source)"
      :title="source[col.prop]"
      :style="getCellStyle(col)"
      role="gridcell"
    >
      <template v-if="col.prop === 'index'">
        <div class="col-index">
          <div class="index-text">0{{ source.index }}</div>
        </div>
      </template>
      <template v-else-if="col.prop === 'time'">
        <div class="col-time">
          <i class="el-icon-caret-right"></i>
          <span class="time-text">{{ source.time }}</span>
        </div>
      </template>
      <template v-else-if="col.prop === 'status'">
        <div class="col-others">
          <span
            class="status-dot"
            :class="{ online: source.status === 'online' }"
          ></span>
        </div>
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
    index: { type: Number, required: true },
  },
  computed: {
    rowStyle() {
      return {
        background: this.index % 2 === 0 ? "#083b6c" : "#074270",
        color: "#fff",
        display: "flex",
        width: "100%",
        boxSizing: "border-box",
      };
    },
  },
  methods: {
    getCellClass(col, data) {
      return col.prop === "index"
        ? "col-index custom-cell"
        : col.prop === "time"
        ? "col-time custom-cell"
        : col.prop === "status"
        ? "col-others custom-cell"
        : "col-others custom-cell";
    },
    getCellStyle(col) {
      let style = {};
      if (col.width) style.width = typeof col.width === "number" ? col.width + "px" : col.width;
      if (col.minWidth) style.minWidth = typeof col.minWidth === "number" ? col.minWidth + "px" : col.minWidth;
      style.flex = col.width ? "none" : "1 1 auto";
      style.textAlign = col.align || "center";
      style.overflow = "hidden";
      style.whiteSpace = "nowrap";
      style.textOverflow = "ellipsis";
      style.padding = "0 6px";
      style.display = "flex";
      style.alignItems = "center";
      return style;
    },
  },
};
</script>
