<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header">
      <span>{{ title }}</span>
      <slot name="header-extra"></slot>
    </div>

    <div class="panel-body">
      <!-- 上部：图片 + 描述 -->
      <div class="top">
        <div class="left">
          <img v-if="image" :src="image" alt="图片" class="panel-img" />
          <slot v-else name="image">暂无图片</slot>
        </div>
        <div class="right">
          <p class="description">{{ description }}</p>
        </div>
      </div>

      <!-- 中部统计 -->
      <div class="center">
        <div class="top">
          <div class="left" v-for="(item, idx) in topStats" :key="idx">
            {{ item }}
          </div>
        </div>
        <div class="down">
          <div
            class="item"
            :class="idx % 2 === 0 ? 'even' : 'odd'"
            v-for="(stat, idx) in downStats"
            :key="idx"
          >
            <span class="item-label">{{ stat.label }}</span>
            <span class="item-value">{{ stat.value }}</span>
            <span class="item-unit">{{ stat.unit }}</span>
          </div>
        </div>
      </div>

      <!-- 底部时间轴 -->
      <div class="down2">
        <slot name="timeline">
          <!-- 默认占位 -->
          <!-- <div v-for="(event, idx) in timeline" :key="idx" class="timeline-item">
            {{ event }}
          </div> -->
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectSituation",
  props: {
    title: { type: String, default: "工程情况" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    topStats: { type: Array, default: () => [] }, // ["闸门5孔", "泵组6台"]
    downStats: { type: Array, default: () => [] }, // [{label:"机组累计运行总台时", value:"71703 h"}]
    timeline: { type: Array, default: () => [] }
  }
};
</script>

<style scoped>
.panel {
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
}

.panel-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;

  /* 新增背景图 */
  background-image: url("../../../assets/bigScreen/title_bg.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;

  height: 94px;

  /* 文字颜色 */
  color: #fff;

  /* 内边距，避免文字紧贴边缘 */
  /* padding: 10px 40px; */

  /* 如果需要半透明遮罩提升文字对比度，可以加个背景色叠加 */
  /* background-color: rgba(0, 0, 0, 0.3); */
}

.panel-header span {
  position: absolute;
  left: 50px;
  top: 14px;
}

.panel-body {
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  margin-top: -46px;
  padding: 0 10px;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 0px;
  padding: 0 10px;
}

.left {
  flex: 3;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.right {
  flex: 7;
  display: flex;
  /* align-items: center; */
}

.panel-img {
  max-width: 100%;
  max-height: 100px;
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
}

.center .top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item {
  display: flex;
  /* justify-content: space-between; */
  margin: 20px 0;
  /* padding: 0 80px; */
  padding: 0 20px 0 40px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  height: 46px;
  line-height: 46px;
}

.item.odd {
  background-image: url("../../../assets/bigScreen/info_bg1.png");
  /* background-size: cover; */
  /* background-position: center;
  background-repeat: no-repeat; */

  background-size: cover;
  background-repeat: no-repeat; /* 不重复 */
  background-position: center; /* 居中显示 */
}

.item.even {
  background-image: url("../../../assets/bigScreen/info_bg0.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.item-label {
  font-size: 18px;
}

.item-value {
  font-weight: bold;
  font-size: 26px;
  color: #33ccff;
  font-style: italic;
  margin-left: auto;
}

.item-unit {
  min-width: 32px;
  margin-left: 12px;
}

.down2 {
  margin-top: 10px;
}

.timeline-item {
  font-size: 12px;
  color: #66ccff;
  margin-bottom: 4px;
}

p.description {
  margin-bottom: 0;
  text-indent: 2em;
}
</style>
