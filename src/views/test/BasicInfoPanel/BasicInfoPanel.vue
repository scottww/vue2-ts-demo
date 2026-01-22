<template>
  <div class="basic-info-panel">
    <PanelHeader
      title="基本情况"
      :collapsed="collapsed"
      @toggle="collapsed = !collapsed"
    />

    <div class="panel-content" v-if="!collapsed">
      <InfoSection
        v-for="section in sections"
        :key="section.title"
        :section="section"
        :icon="doublexiegangPng"
        :selectedItems="selectedItems"
        @select="selectItem"
      />
    </div>
  </div>
</template>

<script>
import PanelHeader from "./PanelHeader.vue";
import InfoSection from "./InfoSection.vue";
import doublexiegangPng from "@/assets/images/oneMapNew/doublexiegang.png";

export default {
  name: "BasicInfoPanel",
  components: { PanelHeader, InfoSection },
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      collapsed: false,
      doublexiegangPng,
      sections: [
        {
          title: "河流水系",
          items: [
            {
              id: "river",
              icon: require(`@/assets/images/oneMapNew/river.png`),
              value: "2",
              label: "河流(条)",
              alt: "河流"
            },
            {
              id: "mainRiver",
              icon: require(`@/assets/images/oneMapNew/main_river.png`),
              value: "5",
              label: "干渠(条)",
              alt: "干渠"
            },
            {
              id: "branchRiver",
              icon: require(`@/assets/images/oneMapNew/branch_river.png`),
              value: "8",
              label: "支渠(条)",
              alt: "支渠"
            }
          ]
        },
        {
          title: "水利工程",
          items: [
            {
              id: "pump",
              icon: require(`@/assets/images/oneMapNew/pumping_station.png`),
              value: "5",
              label: "泵站(座)",
              alt: "泵站"
            },
            {
              id: "gate",
              icon: require(`@/assets/images/oneMapNew/gate.png`),
              value: "2",
              label: "水闸(座)",
              alt: "水闸"
            },
            {
              id: "reservoir",
              icon: require(`@/assets/images/oneMapNew/reservoir.png`),
              value: "3",
              label: "水库(座)",
              alt: "水库"
            }
          ]
        },
        {
          title: "水利监测信息",
          items: [
            {
              id: "rainfall",
              icon: require(`@/assets/images/oneMapNew/rainfall_station.png`),
              value: "3",
              label: "雨量站(座)",
              alt: "雨量站"
            },
            {
              id: "waterLevel",
              icon: require(`@/assets/images/oneMapNew/water_level_station.png`),
              value: "5",
              label: "水位站(座)",
              alt: "水位站"
            },
            {
              id: "soil",
              icon: require(`@/assets/images/oneMapNew/soil_station.png`),
              value: "10",
              label: "墒情站(座)",
              alt: "墒情站"
            },
            {
              id: "flow",
              icon: require(`@/assets/images/oneMapNew/flow_station.png`),
              value: "6",
              label: "流量站(座)",
              alt: "流量站"
            },
            {
              id: "waterQuality",
              icon: require(`@/assets/images/oneMapNew/water_quality_station.png`),
              value: "12",
              label: "水质站(座)",
              alt: "水质站"
            },
            {
              id: "safety",
              icon: require(`@/assets/images/oneMapNew/safety_monitoring.png`),
              value: "32",
              label: "安全监测(座)",
              alt: "安全监测"
            },
            {
              id: "project",
              icon: require(`@/assets/images/oneMapNew/project_station.png`),
              value: "20",
              label: "工情站(座)",
              alt: "工情站"
            },
            {
              id: "video",
              icon: require(`@/assets/images/oneMapNew/video_monitoring.png`),
              value: "15",
              label: "视频站(座)",
              alt: "视频站"
            }
          ]
        },
        {
          title: "白蚁监测信息",
          items: [
            {
              id: "termite",
              icon: require(`@/assets/images/oneMapNew/termite.png`),
              value: "5",
              label: "白蚁监测站(座)",
              alt: "白蚁监测"
            }
          ]
        }
      ]
    };
  },
  methods: {
    selectItem(id) {
      const list = [...this.selectedItems];
      const idx = list.indexOf(id);
      idx > -1 ? list.splice(idx, 1) : list.push(id);
      this.$emit("selectionChange", list);
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-info-panel {
  width: 400px;
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.3);
  // border-radius: 4px;
  overflow: hidden;
}
.panel-content {
  padding: 10px;
}
</style>
