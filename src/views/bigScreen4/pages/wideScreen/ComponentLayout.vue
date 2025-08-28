<template>
  <div class="layout-wrapper">
    <!-- 左2小 + 右1大 -->
    <template v-if="layout === '2small-1big'">
      <div class="col-layout">
        <!-- 左边两块小 -->
        <div class="left-side">
          <component
            v-for="(mod, idx) in panels.slice(0, 2)"
            :key="mod.type + idx"
            :is="getComponent(mod.type)"
            class="panel half-vertical"
            :title="mod.title"
            :header-extra="mod.headerExtra"
            @site-change="$emit('site-change', $event)"
          />
        </div>

        <!-- 右边一块大 -->
        <div class="right-side">
          <component
            v-bind="panels[2].props"
            :is="getComponent(panels[2].type)"
            class="panel full-height"
            :title="panels[2].title"
            :header-extra="panels[2].headerExtra"
            @site-change="$emit('site-change', $event)"
          />
        </div>
      </div>
    </template>

    <!-- 左1大 + 右2小 -->
    <template v-else-if="layout === '1big-2small'">
      <div class="col-layout">
        <div class="left-side">
          <component
            v-bind="panels[0].props"
            :is="getComponent(panels[0].type)"
            class="panel full-height"
            :title="panels[0].title"
            :header-extra="panels[0].headerExtra"
            @site-change="$emit('site-change', $event)"
          />
        </div>
        <div class="right-side">
          <component
            v-for="(mod, idx) in panels.slice(1)"
            :key="mod.type + idx"
            :is="getComponent(mod.type)"
            class="panel half-vertical"
            :title="mod.title"
            :header-extra="mod.headerExtra"
            @site-change="$emit('site-change', $event)"
          />
        </div>
      </div>
    </template>

    <!-- 2x2 -->
    <template v-else-if="layout === '2x2'"
      ><div
        class="row"
        v-for="rowIdx in 2"
        :key="'row' + rowIdx"
        :style="rowIdx === 2 ? { 'margin-bottom': '20px' } : {}"
      >
        <component
          v-for="(mod, idx) in panels.slice((rowIdx - 1) * 2, rowIdx * 2)"
          :key="mod.type + '-' + idx"
          :is="getComponent(mod.type)"
          class="panel half"
          :title="mod.title"
          :style="{ height: mod.height + 'px' }"
          :header-extra="mod.headerExtra"
        /></div
    ></template>

    <!-- 1x1: 左一个 右一个 -->
    <template v-else-if="layout === '1x1'">
      <div class="row">
        <component
          v-for="(mod, idx) in panels.slice(0, 2)"
          :key="mod.type + idx"
          :is="getComponent(mod.type)"
          class="panel half"
          :title="mod.title"
          :style="{ height: mod.height + 'px' }"
          :header-extra="mod.headerExtra"
        />
      </div>
    </template>

    <!-- 1: 只有一个 -->
    <template v-else-if="layout === '1'">
      <div class="row">
        <component
          v-if="panels[0]"
          :is="getComponent(panels[0].type)"
          class="panel full"
          :title="panels[0].title"
          :style="{ height: panels[0].height + 'px' }"
          :header-extra="panels[0].headerExtra"
        />
      </div>
    </template>

    <template v-else>
      <!-- 默认：纵向堆叠 -->
      <div class="row" v-for="(mod, idx) in panels" :key="mod.type + idx">
        <component
          :is="getComponent(mod.type)"
          class="panel full"
          :title="mod.title"
          :style="{ height: mod.height + 'px' }"
        />
      </div>
    </template>
  </div>
</template>

<script>
import PanelA from '../../components/temp.vue'
import PanelB from '../../components/temp.vue'
import PanelC from '../../components/temp.vue'
import EmergencySupport from '../../components/EmergencySupport.vue'
import FloodForecast from '../../components/FloodForecast.vue'
import FloodControlDispatch from '../../components/FloodControlDispatch.vue'
import RiskHazard from '../../components/RiskHazard.vue'
import ProjectSituation from '../../components/ProjectSituation.vue'
import WaterRainInformation from '../../components/WaterRainInformation.vue'
import WeatherForecast from '../../components/WeatherForecast.vue'

import EquipmentStatisticsManagement from '../../components/pumpGateMananement/EquipmentStatisticsManagement.vue'
import PumpRunHistory from '../../components/pumpGateMananement/PumpRunHistory.vue'
import GateRealTimeMonitor from '../../components/pumpGateMananement/GateRealTimeMonitor.vue'
import SevenDayRainfallOperationTrend from '../../components/pumpGateMananement/SevenDayRainfallOperationTrend.vue'
import SevenDayWaterOperationTrend from '../../components/pumpGateMananement/SevenDayWaterOperationTrend.vue'
import AlarmManagement from '../../components/pumpGateMananement/AlarmManagement.vue'
import VideoMonitor from '../../components/pumpGateMananement/VideoMonitor.vue'

// 报警管理
import AlarmStatisticPanel from '../../components/AlarmManagement/AlarmStatisticPanel.vue'
import AlarmDetailPanel from '../../components/AlarmManagement/AlarmDetailPanel.vue'
import AlarmVideoLinkPanel from '../../components/AlarmManagement/AlarmVideoLinkPanel.vue'

// 工程运管
import DataMonitoringPanel from '../../components/ProjectOperationManagement/DataMonitoringPanel.vue'
import InspectionMaintenancePanel from '../../components/ProjectOperationManagement/InspectionMaintenancePanel.vue'
import SafetyMonitoringPanel from '../../components/ProjectOperationManagement/SafetyMonitoringPanel.vue'
import SchedulingManagementPanel from '../../components/ProjectOperationManagement/SchedulingManagementPanel.vue'

//调度管理
import IntelligentDispatchPanel from '../../components/DispatchManagement/IntelligentDispatchPanel.vue'
import OperationPlanPanel from '../../components/DispatchManagement/OperationPlanPanel.vue'
import SchedulingManagementPanel2 from '../../components/DispatchManagement/ScheduleManagementPanel.vue'
import AlarmFaultManagementPanel from '../../components/DispatchManagement/AlarmFaultManagementPanel.vue'
import EmergencyCommandDispatchPanel from '../../components/DispatchManagement/EmergencyCommandDispatchPanel.vue'
import RemoteMonitoringControlSimulationPanel from '../../components/DispatchManagement/RemoteMonitoringControlSimulationPanel.vue'

export default {
  components: {
    PanelA,
    PanelB,
    PanelC,
    EmergencySupport,
    FloodForecast,
    FloodControlDispatch,
    RiskHazard,
    ProjectSituation,
    WaterRainInformation,
    WeatherForecast,
    EquipmentStatisticsManagement,
    PumpRunHistory,
    GateRealTimeMonitor,
    SevenDayRainfallOperationTrend,
    SevenDayWaterOperationTrend,
    AlarmManagement,
    VideoMonitor,
    AlarmStatisticPanel,
    AlarmDetailPanel,
    AlarmVideoLinkPanel,
    DataMonitoringPanel,
    InspectionMaintenancePanel,
    SafetyMonitoringPanel,
    SchedulingManagementPanel,
    IntelligentDispatchPanel,
    OperationPlanPanel,
    SchedulingManagementPanel2,
    AlarmFaultManagementPanel,
    EmergencyCommandDispatchPanel,
    RemoteMonitoringControlSimulationPanel,
  },
  props: {
    layout: String,
    panels: Array,
  },
  methods: {
    getComponent(type) {
      const map = {
        a: PanelA,
        b: PanelB,
        c: PanelC,
        EmergencySupport: EmergencySupport,
        FloodForecast: FloodForecast,
        FloodControlDispatch: FloodControlDispatch,
        RiskHazard: RiskHazard,
        ProjectSituation: ProjectSituation,
        WaterRainInformation: WaterRainInformation,
        WeatherForecast: WeatherForecast,
        EquipmentStatisticsManagement: EquipmentStatisticsManagement,
        PumpRunHistory: PumpRunHistory,
        GateRealTimeMonitor: GateRealTimeMonitor,
        SevenDayRainfallOperationTrend: SevenDayRainfallOperationTrend,
        SevenDayWaterOperationTrend: SevenDayWaterOperationTrend,
        AlarmManagement: AlarmManagement,
        VideoMonitor: VideoMonitor,
        AlarmStatisticPanel: AlarmStatisticPanel,
        AlarmDetailPanel: AlarmDetailPanel,
        AlarmVideoLinkPanel: AlarmVideoLinkPanel,
        DataMonitoringPanel: DataMonitoringPanel,
        InspectionMaintenancePanel: InspectionMaintenancePanel,
        SafetyMonitoringPanel: SafetyMonitoringPanel,
        SchedulingManagementPanel: SchedulingManagementPanel,
        IntelligentDispatchPanel,
        OperationPlanPanel,
        SchedulingManagementPanel2,
        AlarmFaultManagementPanel,
        EmergencyCommandDispatchPanel,
        RemoteMonitoringControlSimulationPanel,
      }
      return map[type] || PanelA
    },
  },
}
</script>

<style scoped>
.layout-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 新增横向布局样式 */
.horizontal-layout {
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
}

.left-small-panels {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 50%;
}

.right-big-panel {
  width: 50%;
}

/* 面板样式复用 */
.panel {
  /* background: rgba(50, 50, 50, 0.8); */
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.col-layout {
  display: flex;
  height: 100%;
  gap: 16px;
}

.left-side,
.right-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  height: calc(100% - 20px);
}

.left-side {
  flex: 1; /* 左边两小面板 */
}

.right-side {
  flex: 1; /* 右边大面板 */
}

.half-vertical {
  height: 50%;
}

.full-height {
  height: 100%;
}

/* 2*2布局 */
.row {
  display: flex;
  gap: 16px;
  width: 100%;
  /* 让每行平分父容器高度（如果父容器是 100% 高的话）*/
  /* height: 50%; */
  box-sizing: border-box;
}

.panel.half {
  flex: 1;
  min-height: 0; /* 避免内容撑开父容器 */
}
</style>
