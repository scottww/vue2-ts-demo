<template>
  <div class="row-wrapper">
    <div
      v-for="(col, colIndex) in columns"
      :key="col.prop || colIndex"
      class="cell-wrapper"
      :title="source[col.prop]"
    >
      <template v-if="col.prop === 'index'">
        <div class="index-text">0{{ source.index }}</div>
      </template>
      <template v-else-if="col.prop === 'time'">
        <i class="el-icon-caret-right"></i>
        <span class="time-text">{{ source.time }}</span>
      </template>
      <template v-else-if="col.prop === 'status'">
        <span class="status-dot" :class="{ online: source.status === 'online' }"></span>
      </template>
      <template v-else>
        <span class="custom-cell">{{ source[col.prop] }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "RowComponent",
  props: {
    source: {
      type: Object,
      required: true
    },
    index: Number,
    columns: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log("✅ RowComponent got:", this.source, this.columns, this.index);
  }
};
</script>

<style scoped>
.row-wrapper {
  display: flex;
  background-color: #083b6c;
  font-size: 12px;
}
.cell-wrapper {
  flex: 1;
  padding: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.index-text {
  font-weight: bold;
  color: #fff;
}
.time-text {
  color: #fff;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: gray;
  display: inline-block;
}
.status-dot.online {
  background: #00ff00;
}
</style>
