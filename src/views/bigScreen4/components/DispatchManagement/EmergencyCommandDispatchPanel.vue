<template>
  <div class="panel">
    <!-- 标题带背景图 -->
    <div class="panel-header flex-h-v">
      <span>{{ title }}</span>
      <div class="header-extra" v-if="headerExtra">
        <CustomSelect
          v-if="headerExtra.type === 'customSelect'"
          v-model="headerExtra.modelValue"
          :options="headerExtra.options"
          :placeholder="headerExtra.placeholder"
          @input="handleSelectChange"
        />
        <!-- 其它headerExtra类型... -->
      </div>
    </div>

    <div class="panel-body">
      <div class="main">
        <route></route>
      </div>
    </div>
  </div>
</template>

<script>
import subTitleImg from "@/assets/bigScreen/pumpOperation/subTitle_bg.png";
import warningImg from "@/assets/bigScreen/pumpOperation/warning.png";
import resolvedImg from "@/assets/bigScreen/pumpOperation/resolved.png";
import ImageLabelValue from "../ImageLabelValue.vue";
import CustomSelect from "../CustomSelect.vue";
import AlarmTotal from "../AlarmManagement/AlarmDetailTotal.vue";
import AlarmTable from "../AlarmManagement/AlarmDetailTable.vue";
import Route from "./route.vue";
export default {
  name: "EmergencyCommandDispatchPanel",
  components: {
    ImageLabelValue,
    CustomSelect,
    AlarmTotal,
    AlarmTable,
    Route
  },
  props: {
    title: { type: String, default: "应急指挥调度" },
    headerExtra: { type: Object, default: null }
  },
  data() {
    return {
      subTitleImg,
      warningImg,
      resolvedImg,
      dataList: [
        {
          period: "前天",
          value: "10.0",
          unit: "mm",
          icon: warningImg,
          width: 54,
          height: 54
        },
        {
          period: "昨天",
          value: "25.5",
          unit: "mm",
          icon: warningImg,
          width: 54,
          height: 54
        },
        {
          period: "今天",
          value: "40.5",
          unit: "mm",
          icon: warningImg,
          width: 54,
          height: 54
        }
      ],
      columns: [
        {
          prop: "year",
          label: "年份",
          formatter: (val) => this.formatterValue(val)
        },
        { prop: "planName", label: "计划名称" },
        { prop: "time", label: "接收时间" },
        { prop: "action", label: "详情", width: 60 }
      ],
      tableList: [
        {
          id: 1,
          level: "warning",
          year: "2025",
          planName: "2025年8月运行计划",
          time: "2025-07-31"
        },
        {
          id: 2,
          level: "info",
          year: "2025",
          planName: "2025年8月运行计划",
          time: "2025-07-31"
        },
        {
          id: 3,
          level: "info",
          year: "2025",
          planName: "2025年8月运行计划",
          time: "2025-07-31"
        },
        {
          id: 4,
          tlevel: "info",
          year: "2025",
          planName: "2025年8月运行计划",
          time: "2025-07-31"
        },
        {
          id: 5,
          tlevel: "info",
          year: "2025",
          planName: "2025年8月运行计划",
          time: "2025-07-31"
        },
        {
          id: 6,
          tlevel: "info",
          year: "2025",
          planName: "2025年8月运行计划",
          time: "2025-07-31"
        }
      ],
      panelHeight: 940
    };
  },
  computed: {
    bodyHeightAdjusted() {
      return this.panelHeight - 62 - 45 - 105 - 80; // 45px是表头高度
    }
  },
  methods: {
    handleSelectChange(val) {
      // 先调用配置里的 onChange 函数（如果有）
      if (this.headerExtra && typeof this.headerExtra.onChange === "function") {
        this.headerExtra.onChange(val);
      }
      // 再发事件给上层，方便事件冒泡传递
      this.$emit("site-change", val);
    },
    viewDetail(row) {
      console.log("详情:", row);
    },
    handle(row) {
      console.log("处理:", row);
    },
    getImage() {
      return this.warningImg;
    },
    formatterValue(val, placeholder = "--") {
      console.log("formatterValue ...", val);
      return val === null || val === undefined || val === ""
        ? placeholder
        : val;
    }
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
  font-weight: bold;
  font-size: 16px;
  height: 62px;
  background-image: url("~@/assets/bigScreen/title_bg2.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}

.panel-header span {
  position: relative;
  left: 0px;
}

.header-extra {
  /* 右侧容器 */
  display: flex;
  align-items: center;
  position: relative;
  left: 0px;
}

.panel-body {
  height: calc(100% - 62px);
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: 0 10px;
}

.flex-h-v {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 50px;
}

.main {
  flex: 1;
  margin-top: 10px;
  height: calc(100% - 10px);
}
</style>
