// src/utils/dateTool.js
import moment from "moment";

/**
 * 时间工具类
 * 支持快速获取月份、年份、日期范围等
 */
class DateTool {
  /**
   * 获取当前年份（默认格式 YYYY）
   */
  static getCurrentYear(format = "YYYY") {
    return moment().format(format);
  }
  /**
   * 获取当前月份（默认格式 YYYY-MM）
   */
  static getCurrentMonth(format = "YYYY-MM") {
    return moment().format(format);
  }

  /**
   * 获取前 N 个月份（可选是否包含当前月）
   * @param {number} count - 向前推的月份数量（默认5）
   * @param {boolean} includeCurrent - 是否包含当前月（默认true）
   * @param {string} format - 输出格式（默认YYYY-MM）
   * @param {'asc'|'desc'} sort - 排序方式，asc升序、desc降序（默认asc）
   * @returns {{label:string,value:string}[]} 返回月份数组
   */
  static getPastMonths(
    count = 5,
    format = "YYYY-MM",
    includeCurrent = true,
    sort = "asc"
  ) {
    const months = [];
    const total = includeCurrent ? count + 1 : count;
    for (let i = total - 1; i >= 0; i--) {
      const date = moment().subtract(i, "month");
      months.push({
        label: date.format(format),
        value: date.format("YYYY-MM")
      });
    }
    return sort === "desc" ? months.reverse() : months;
  }

  /**
   * 获取前 N 年（可选是否包含当前年）
   * @param {number} count - 向前推的年份数量（默认5）
   * @param {boolean} includeCurrent - 是否包含当前年（默认true）
   * @param {string} format - 输出格式（默认YYYY年）
   * @param {'asc'|'desc'} sort - 排序方式（默认asc）
   * @returns {{label:string,value:string}[]} 返回年份数组
   */
  static getPastYears(
    count = 5,
    format = "YYYY年",
    includeCurrent = true,
    sort = "asc"
  ) {
    const years = [];
    const total = includeCurrent ? count + 1 : count;
    for (let i = total - 1; i >= 0; i--) {
      const date = moment().subtract(i, "year");
      years.push({
        label: date.format(format),
        value: date.format("YYYY")
      });
    }
    return sort === "desc" ? years.reverse() : years;
  }

  /**
   * 获取当前月份的开始与结束日期
   * @param {string} format - 输出的月份格式（默认YYYY-MM）
   * @returns {{label:string,value:{start:string,end:string}}}
   */
  static getCurrentMonthRange(format = "YYYY-MM") {
    const label = moment().format(format);
    const value = {
      start: moment().startOf("month").format("YYYY-MM-DD"),
      end: moment().endOf("month").format("YYYY-MM-DD")
    };
    return { label, value };
  }

  /**
   * 格式化任意时间
   * @param {string|Date} date - 时间对象或字符串
   * @param {string} format - 输出格式
   */
  static format(date, format = "YYYY-MM-DD HH:mm:ss") {
    return moment(date).format(format);
  }
}

export default DateTool;
