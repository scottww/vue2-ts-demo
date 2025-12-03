class TimeSeriesGenerator {
  /**
   * 构造函数
   * @param {Object} options 配置项
   * @param {number} options.pastHours 过去小时数，默认 3
   * @param {number} options.futureHours 未来小时数，默认 12
   * @param {number} options.interval 时间间隔，单位小时或分钟，默认 3
   * @param {Array<string>} options.keys 生成指标名数组，默认 ['actualLevel','forecastLevel','actualFlow','forecastFlow']
   * @param {Function} options.valueFn 指标值生成函数，默认随机 1.2~2.2
   * @param {number} options.warningLevel 警戒值，默认 2.0
   * @param {boolean} options.includeMinutes 是否精确到分钟，默认 false（按整点生成）
   */
  constructor({
    pastHours = 3,
    futureHours = 12,
    interval = 3,
    keys = ['actualLevel', 'forecastLevel', 'actualFlow', 'forecastFlow'],
    valueFn = () => parseFloat((1.2 + Math.random()).toFixed(2)),
    warningLevel = 2.0,
    includeMinutes = false
  } = {}) {
    this.pastHours = pastHours
    this.futureHours = futureHours
    this.interval = interval
    this.keys = keys
    this.valueFn = valueFn
    this.warningLevel = warningLevel
    this.includeMinutes = includeMinutes
  }

  /**
   * 生成时间序列数据
   * @returns {Object} 包含时间轴、各指标数组及当前时间索引
   */
  generate() {
    const now = new Date()
    if (!this.includeMinutes) {
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)
    }

    const timeData = []
    let currentTimeIndex = 0
    const stepMillis = this.includeMinutes ? this.interval * 60 * 1000 : this.interval * 3600 * 1000

    for (let t = -this.pastHours * 3600 * 1000; t <= this.futureHours * 3600 * 1000; t += stepMillis) {
      const dt = new Date(now.getTime() + t)
      const yyyy = dt.getFullYear()
      const MM = String(dt.getMonth() + 1).padStart(2, '0')
      const dd = String(dt.getDate()).padStart(2, '0')
      const HH = String(dt.getHours()).padStart(2, '0')
      const mm = String(dt.getMinutes()).padStart(2, '0')

      timeData.push(this.includeMinutes ? `${yyyy}-${MM}-${dd} ${HH}:${mm}` : `${yyyy}-${MM}-${dd} ${HH}:00`)

      if (!this.includeMinutes && t === 0) currentTimeIndex = timeData.length - 1
      if (this.includeMinutes && dt.getHours() === now.getHours() && dt.getMinutes() === now.getMinutes()) currentTimeIndex = timeData.length - 1
    }

    const result = { timeData, warningLevel: this.warningLevel, currentTimeIndex }
    this.keys.forEach(key => {
      result[key] = timeData.map(() => this.valueFn())
    })

    return result
  }

  /**
   * 动态更新指标生成函数
   * @param {Function} fn 新的生成函数
   */
  setValueGenerator(fn) {
    this.valueFn = fn
  }
}


export default TimeSeriesGenerator;
