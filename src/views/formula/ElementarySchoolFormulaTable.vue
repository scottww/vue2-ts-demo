<template>
  <div class="formula-table-wrapper">
    <h2>小学数学常用公式</h2>

    <div class="category" v-for="(items, category) in formulas" :key="category">
      <h3>{{ category }}</h3>
      <table class="formula-table">
        <thead>
          <tr>
            <th>公式/方法</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.formula }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElementarySchoolFormulaTable",
  data() {
    return {
      formulas: {
        "算术基础": [
          { name: "加法/减法", formula: "同类项相加减，例如：5+7=12, 12-7=5" },
          { name: "乘法口诀", formula: "1×1=1, 2×1=2 2×2=4, ..., 9×9=81" },
          { name: "除法", formula: "被除数 ÷ 除数 = 商 ... 余数，例如：17 ÷ 5 = 3…2" },
          { name: "运算规律", formula: "交换律、结合律、分配律" }
        ],
        "几何公式": [
          { name: "正方形周长", formula: "P = 4a" },
          { name: "长方形周长", formula: "P = 2(l + w)" },
          { name: "三角形周长", formula: "P = a + b + c" },
          { name: "正方形面积", formula: "S = a²" },
          { name: "长方形面积", formula: "S = l × w" },
          { name: "三角形面积", formula: "S = 1/2 × 底 × 高" },
          { name: "圆面积", formula: "S = πr²" },
          { name: "长方体体积", formula: "V = l × w × h" },
          { name: "正方体体积", formula: "V = a³" }
        ],
        "单位换算": [
          { name: "长度", formula: "1 m = 100 cm = 1000 mm" },
          { name: "质量", formula: "1 kg = 1000 g" },
          { name: "容量", formula: "1 L = 1000 mL" },
          { name: "时间", formula: "1 h = 60 min, 1 min = 60 s" }
        ],
        "统计与平均数": [
          { name: "平均数", formula: "平均数 = 总和 / 个数" },
          { name: "总和", formula: "总和 = 平均数 × 个数" },
          { name: "中位数", formula: "按大小顺序排列，处于中间的数" },
          { name: "众数", formula: "出现次数最多的数" }
        ],
        "应用题公式": [
          { name: "行程问题", formula: "路程 = 速度 × 时间" },
          { name: "工程问题", formula: "工程量 = 人数 × 时间 × 效率" },
          { name: "盈亏问题", formula: "盈亏 = 卖出价 − 成本价" },
          { name: "百分比/分数问题", formula: "部分量 = 总量 × 分数或百分比" }
        ]
      }
    };
  }
};
</script>

<style scoped>
.formula-table-wrapper {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.category {
  margin-bottom: 30px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.formula-table {
  width: 100%;
  border-collapse: collapse;
}

.formula-table th,
.formula-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

.formula-table th {
  background-color: #f0f0f0;
}

/* 响应式：屏幕小于 600px 时缩小表格 */
@media (max-width: 600px) {
  .formula-table th,
  .formula-table td {
    padding: 4px 6px;
    font-size: 12px;
  }
}
</style>
