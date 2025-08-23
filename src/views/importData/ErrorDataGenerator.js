// /utils/ErrorDataGenerator.js
export default class ErrorDataGenerator {
  constructor() {
    // 可自定义基础模板数据
    this.baseData = [
      {
        startKnowName: "头实体",
        endKnowName: "尾实体",
        relationName: "汇入",
        attributeOne: "测试属性1",
        attributeTwo: "测试属性2",
        failureReason: "关系已存在"
      },
      {
        startKnowName: "头实体2",
        endKnowName: "尾实体2",
        relationName: "包含",
        attributeOne: "属性A",
        attributeTwo: "属性B",
        failureReason: "属性缺失"
      }
    ];
  }

  /**
   * 生成指定条数的错误数据
   * @param {number} count 数据条数
   * @returns {Array} 错误数据数组
   */
  generate(count = 10) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const template = this.baseData[i % this.baseData.length];
      result.push({
        startKnowName: template.startKnowName + (i > 1 ? i : ""),
        endKnowName: template.endKnowName + (i > 1 ? i : ""),
        relationName: template.relationName,
        attributeOne: template.attributeOne,
        attributeTwo: template.attributeTwo,
        failureReason: template.failureReason
      });
    }
    return result;
  }
}
