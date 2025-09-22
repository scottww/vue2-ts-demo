<template>
  <div class="formula-table-wrapper">
    <h2>高中数学常用公式</h2>

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
  name: "HighSchoolFormulaTable",
  data() {
    return {
      formulas: {
        "代数与函数": [
          { name: "平方差公式", formula: "a²-b²=(a-b)(a+b)" },
          { name: "完全平方公式", formula: "(a±b)²=a²±2ab+b²" },
          { name: "立方公式", formula: "(a±b)³=a³±3a²b+3ab²±b³" },
          { name: "二次函数", formula: "y=ax²+bx+c, 顶点坐标:(-b/2a, f(-b/2a))" },
          { name: "三次与高次方程", formula: "因式分解法、配方法等" }
        ],
        "三角函数": [
          { name: "三角函数定义", formula: "sinθ=对边/斜边, cosθ=邻边/斜边, tanθ=对边/邻边" },
          { name: "诱导公式", formula: "sin(π-θ)=sinθ, cos(π-θ)=-cosθ, tan(π-θ)=-tanθ" },
          { name: "三角恒等式", formula: "sin²θ+cos²θ=1, 1+tan²θ=sec²θ" },
          { name: "和差公式", formula: "sin(A±B)=sinAcosB±cosAsinB, cos(A±B)=cosAcosB∓sinAsinB" }
        ],
        "解析几何": [
          { name: "直线方程", formula: "y=kx+b, k=(y2-y1)/(x2-x1)" },
          { name: "圆的方程", formula: "(x-a)²+(y-b)²=r²" },
          { name: "椭圆方程", formula: "x²/a² + y²/b² = 1" },
          { name: "双曲线方程", formula: "x²/a² - y²/b² = 1" },
          { name: "抛物线方程", formula: "y²=2px 或 x²=2py" }
        ],
        "立体几何与向量": [
          { name: "平面向量加法", formula: "a+b=(x1+x2, y1+y2)" },
          { name: "向量长度", formula: "|a|=√(x²+y²)" },
          { name: "数量积", formula: "a·b=|a||b|cosθ" },
          { name: "空间直线距离公式", formula: "d=|Ax1+By1+Cz1+D|/√(A²+B²+C²)" },
          { name: "球体体积", formula: "V=4/3 π r³" }
        ],
        "概率与统计": [
          { name: "排列数", formula: "P(n,m)=n!/(n-m)!" },
          { name: "组合数", formula: "C(n,m)=n!/[m!(n-m)!]" },
          { name: "概率公式", formula: "P=事件数/总事件数" },
          { name: "期望值", formula: "E=X1p1+X2p2+…+Xnpn" }
        ],
        "微积分基础": [
          { name: "导数定义", formula: "f'(x)=lim(Δx→0)(f(x+Δx)-f(x))/Δx" },
          { name: "常见函数导数", formula: "d/dx x^n=nx^(n-1), d/dx sinx=cosx, d/dx cosx=-sinx" },
          { name: "积分公式", formula: "∫x^n dx=x^(n+1)/(n+1)+C, ∫sinx dx=-cosx+C" }
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

/* 响应式 */
@media (max-width: 600px) {
  .formula-table th,
  .formula-table td {
    padding: 4px 6px;
    font-size: 12px;
  }
}
</style>
