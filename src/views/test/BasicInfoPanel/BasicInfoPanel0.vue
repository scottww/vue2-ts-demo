<template>
  <div class="basic-info-panel">
    <div class="panel-header">
      <span>基本情况</span>
      <button class="collapse-btn" @click="toggleCollapse">
        {{ collapsed ? "展开" : "收起" }}
      </button>
    </div>
    <div class="panel-content" v-if="!collapsed">
      <div
        v-for="section in sections"
        :key="section.title"
        class="data-section"
      >
        <div class="data-section__title">
          <span class="icon"
            ><img :src="doublexiegangPng" alt="double slash"
          /></span>
          {{ section.title }}
        </div>
        <div class="data-grid">
          <div
            v-for="item in section.items"
            :key="item.id"
            class="data-item"
            :class="{ active: selectedItems.includes(item.id) }"
            @click="selectItem(item.id)"
          >
            <div class="data-circle">
              <img :src="item.icon" :alt="item.alt" />
            </div>
            <div class="data-info">
              <span class="data-value">{{ item.value }}</span>
              <span class="data-label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import doublexiegangPng from "@/assets/images/oneMapNew/doublexiegang.png";
export default {
  name: "BasicInfoPanel",
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      doublexiegangPng,
      collapsed: false,
      sections: [
        {
          title: "河流水系",
          items: [
            {
              id: "river",
              icon: require(`@/assets/images/oneMapNew/river.png`),
              value: "12",
              label: "河流(条)",
              alt: "河流",
            },
            {
              id: "mainRiver",
              icon: require(`@/assets/images/oneMapNew/main_river.png`),
              value: "12",
              label: "干渠(条)",
              alt: "干渠",
            },
            {
              id: "branchRiver",
              icon: require(`@/assets/images/oneMapNew/branch_river.png`),
              value: "12",
              label: "支渠(条)",
              alt: "支渠",
            },
          ],
        },
        {
          title: "水利工程",
          items: [
            {
              id: "pump",
              icon: require(`@/assets/images/oneMapNew/pumping_station.png`),
              value: "12",
              label: "泵站(座)",
              alt: "泵站",
            },
            {
              id: "gate",
              icon: require(`@/assets/images/oneMapNew/gate.png`),
              value: "12",
              label: "水闸(座)",
              alt: "水闸",
            },
            {
              id: "reservoir",
              icon: require(`@/assets/images/oneMapNew/reservoir.png`),
              value: "12",
              label: "水库(座)",
              alt: "水库",
            },
          ],
        },
        {
          title: "水利监测信息",
          items: [
            {
              id: "rainfall",
              icon: require(`@/assets/images/oneMapNew/rainfall_station.png`),
              value: "12",
              label: "雨量站(座)",
              alt: "雨量站",
            },
            {
              id: "waterLevel",
              icon: require(`@/assets/images/oneMapNew/water_level_station.png`),
              value: "12",
              label: "水位站(座)",
              alt: "水位站",
            },
            {
              id: "soil",
              icon: require(`@/assets/images/oneMapNew/soil_station.png`),
              value: "12",
              label: "墒情站(座)",
              alt: "墒情站",
            },
            {
              id: "flow",
              icon: require(`@/assets/images/oneMapNew/flow_station.png`),
              value: "12",
              label: "流量站(座)",
              alt: "流量站",
            },
            {
              id: "waterQuality",
              icon: require(`@/assets/images/oneMapNew/water_quality_station.png`),
              value: "12",
              label: "水质站(座)",
              alt: "水质站",
            },
            {
              id: "safety",
              icon: require(`@/assets/images/oneMapNew/safety_monitoring.png`),
              value: "12",
              label: "安全监测(座)",
              alt: "安全监测",
            },
            {
              id: "project",
              icon: require(`@/assets/images/oneMapNew/project_station.png`),
              value: "12",
              label: "工情站(座)",
              alt: "工情站",
            },
            {
              id: "video",
              icon: require(`@/assets/images/oneMapNew/video_monitoring.png`),
              value: "12",
              label: "视频站(座)",
              alt: "视频站",
            },
          ],
        },
        {
          title: "白蚁监测信息",
          items: [
            {
              id: "termite",
              icon: require(`@/assets/images/oneMapNew/termite.png`),
              value: "74",
              label: "白蚁监测站(座)",
              alt: "白蚁监测",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    selectItem(item) {
      // 复制一份 selectedItems，避免直接修改 prop
      const newSelectedItems = [...this.selectedItems];
      const index = newSelectedItems.indexOf(item);
      if (index > -1) {
        newSelectedItems.splice(index, 1);
      } else {
        newSelectedItems.push(item);
      }
      // 向父组件发送选中项目的变化通知
      this.$emit('selectionChange', newSelectedItems);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/custom.scss";
.basic-info-panel {
  width: 400px;
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.3);
  // border-radius: 4px;
  overflow: hidden;
}

.panel-header {
  width: 100%;
  height: 50px;
  background-color: #1890ff;
  box-shadow: 4px 0px 8px 0px #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;

  span {
    font-weight: bold;
    padding: 0 4px;
    @include custom-panel-title($size: 20px, $style: italic, $start: #7ae3ff);
  }

  .collapse-btn {
    all: unset;
    color: #fff;
    font-family: SourceHanSansCN;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.panel-content {
  padding: 10px;
}

.data-section {
  margin-bottom: 8px;

  &__title {
    font-family: SourceHanSansCN;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-left: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    .icon {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 8px;
  // padding: 10px;
  padding: 2px 4px;
  // border-bottom: 1px dashed #e0e0e0;
  // border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    // background-image: linear-gradient(135deg, #1890ff 0%, #7ae3ff 100%);
    background-image: linear-gradient(0deg, #b7dafa 0%, #ffffff 100%);
    // border: 1px solid #1890ff;
    border-radius: 10px;
    // box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    // .data-value, .data-label {
    //   color: #fff;
    // }
  }
}

.data-circle {
  width: 52px;
  height: 52px;
  // border-radius: 50%;
  // background-color: #1e68c1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

.data-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.data-value {
  font-size: 20px;
  font-weight: bold;
  color: #057be8;
}

.data-label {
  font-size: 16px;
  color: #333;
}
</style>