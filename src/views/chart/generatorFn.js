/**
 * 生成雨量 & 蒸发时间序列（含日期或日期+时分）
 * @param {Number} count - 数据点数量
 * @param {String} mode - "day" 按天；"hour" 按小时
 */
export function generateRainEvapData(count = 200, mode = "day") {
  const timeData = [];
  const rainfallData = [];
  const evaporationData = [];

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - count);

  for (let i = 0; i < count; i++) {
    const t = new Date(start);

    // ------ 时间序列 ------
    if (mode === "day") {
      t.setDate(start.getDate() + i);

      // YYYY-MM-DD
      const str = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(t.getDate()).padStart(2, "0")}`;

      timeData.push(str);
    } else {
      // "hour" 模式
      t.setHours(start.getHours() + i);

      // YYYY-MM-DD HH:mm
      const str =
        `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(t.getDate()).padStart(2, "0")} ` +
        `${String(t.getHours()).padStart(2, "0")}:${String(
          t.getMinutes()
        ).padStart(2, "0")}`;

      timeData.push(str);
    }

    // ------ ☔ 雨量模拟 ------
    let rain = Math.random() * 3;
    if (Math.random() < 0.08) {
      rain += Math.random() * 40 + 10;
    }
    rainfallData.push(Number(rain.toFixed(1)));

    // ------ 🌤 蒸发模拟 ------
    // let evap = 5 + Math.sin(i / 30) * 3 + Math.random() * 2;
    // let evap = 5 + Math.sin(i / 10) * 6 + Math.random() * 4;
    // if (rain > 20) {
    //   evap -= 2;
    // }
    // 避免负值
    // evap = Math.max(evap, 0);
    // evaporationData.push(Number(evap.toFixed(1)));

    // 加累积扰动
    let lastEvap = evaporationData[i - 1] || 5;
    let evap = lastEvap + (Math.random() - 0.5) * 2 + Math.sin(i / 10) * 3;
    if (rain > 20) evap -= 2;
    // 避免负值
    evap = Math.max(evap, 0);
    evaporationData.push(Number(evap.toFixed(1)));
  }

  return { timeData, rainfallData, evaporationData };
}
