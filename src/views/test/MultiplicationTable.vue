<template>
  <div class="mul-table-wrapper">
    <h2>九九乘法表（9×9）</h2>
    <table class="mul-table">
      <tbody>
        <tr v-for="i in 9" :key="i">
          <td v-for="j in i" :key="j">
            {{ i }}×{{ j }}={{ i*j }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MultiplicationTable"
};
</script>

<style scoped>
.mul-table-wrapper {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #fff;
}

.mul-table {
  border-collapse: collapse;
}

.mul-table td {
  padding: 6px 12px;
  text-align: center;
  border: 1px solid #ccc;
  color: #fff;
}

/* 响应式：屏幕小于 600px 时，文字和间距缩小 */
@media (max-width: 600px) {
  .mul-table td {
    padding: 4px 6px;
    font-size: 12px;
  }
}
</style>
