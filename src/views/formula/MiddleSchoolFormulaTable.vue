<template>
  <div class="formula-table-wrapper">
    <h2>初中数学常用公式</h2>

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
  name: "MiddleSchoolFormulaTable",
  data() {
    return {
      formulas: {
        "代数基础": [
          { name: "乘法公式", formula: "平方公式：(a+b)²=a²+2ab+b², (a-b)²=a²-2ab+b²" },
          { name: "立方公式", formula: "(a+b)³=a³+3a²b+3ab²+b³, (a-b)³=a³-3a²b+3ab²-b³" },
          { name: "因式分解", formula: "a²-b²=(a-b)(a+b)" },
          { name: "提公因式", formula: "ax+ay=a(x+y)" }
        ],
        "一次函数与方程": [
          { name: "一次函数", formula: "y=kx+b, k为斜率, b为截距" },
          { name: "一次方程", formula: "ax+b=0 → x=-b/a" },
          { name: "一元一次不等式", formula: "ax+b>0 → x>-b/a (a>0)" }
        ],
        "几何公式": [
          { name: "三角形面积", formula: "S=1/2×底×高" },
          { name: "平行四边形面积", formula: "S=底×高" },
          { name: "梯形面积", formula: "S=(上底+下底)×高/2" },
          { name: "圆面积", formula: "S=πr²" },
          { name: "圆周长", formula: "C=2πr" },
          { name: "长方体体积", formula: "V=l×w×h" },
          { name: "正方体体积", formula: "V=a³" },
          { name: "球体体积", formula: "V=4/3 π r³" },
          { name: "勾股定理", formula: "直角三角形：a²+b²=c²" }
        ],
        "二次函数与方程": [
          { name: "二次函数", formula: "y=ax²+bx+c, a≠0" },
          { name: "二次方程求根公式", formula: "ax²+bx+c=0 → x=[-b±√(b²-4ac)]/(2a)" },
          { name: "完全平方公式", formula: "a²+2ab+b²=(a+b)²" }
        ],
        "统计与概率": [
          { name: "平均数", formula: "平均数 = 总和 / 个数" },
          { name: "中位数", formula: "按大小顺序排列，取中间数" },
          { name: "概率公式", formula: "P=有利事件数/总事件数" }
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
