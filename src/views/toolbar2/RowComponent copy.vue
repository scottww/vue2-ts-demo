<template>
  <div class="row-wrapper">
    <div
      v-for="(col, colIndex) in columns"
      :key="col.prop || colIndex"
      class="cell-wrapper"
      :class="`col-${col.prop}`"
      :title="data[col.prop]"
    >
      <template v-if="col.prop === 'index'">
        <div class="index-text">0{{ data.index }}</div>
      </template>

      <template v-else-if="col.prop === 'time'">
        <i class="el-icon-caret-right"></i>
        <span class="time-text">{{ data.time }}</span>
      </template>

      <template v-else-if="col.prop === 'status'">
        <span class="status-dot" :class="{ online: data.status === 'online' }"></span>
      </template>

      <template v-else>
        <span class="custom-cell">{{ data[col.prop] }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RowComponent',
  props: {
    data: {
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
    console.log(this.data, this.columns);
  }
};
</script>
<style scoped>
.row-wrapper {
  display: flex;
  background-color: #083b6c;
  font-size: 12px;
  line-height: 1.4;
}

.cell-wrapper {
  padding: 0 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #0f4c8d;
  height: 38px;
}

.index-text {
  font-weight: bold;
  color: #fff;
  position: relative;
  padding-left: 6px;
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

.time-text {
  color: #fff;
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
</style>
