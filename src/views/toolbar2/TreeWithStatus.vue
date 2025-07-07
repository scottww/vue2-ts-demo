<template>
  <el-tree
    :data="treeData"
    :props="treeProps"
    :render-content="renderContent"
    node-key="id"
    highlight-current
    accordion
    @node-click="handleNodeClick"
  />
</template>

<script>
export default {
  name: "TreeWithStatus",
  props: {
    treeData: {
      type: Array,
      required: true
    },
    iconMap: {
      type: Object,
      default: () => ({
        province: "el-icon-location", // 省
        city: "el-icon-city", // 市
        district: "el-icon-office-building", // 区
        irrigation: "el-icon-s-grid", // 灌区
        point: "el-icon-position" // 点位
      })
    },
    onlineIcon: {
      type: String,
      default: "" // 可以是图片路径，也可以是 el-icon 类名
    },
    offlineIcon: {
      type: String,
      default: ""
    },
    // 数据结构字段映射
    labelField: { type: String, default: "label" },
    childrenField: { type: String, default: "children" },
    countField: { type: String, default: "count" },
    typeField: { type: String, default: "type" },
    statusField: { type: String, default: "status" }
  },
  computed: {
    treeProps() {
      return {
        children: this.childrenField,
        label: this.labelField
      };
    }
  },
  methods: {
    renderContent(h, { node, data }) {
      const type = data[this.typeField];
      const label = data[this.labelField];
      const count = data[this.countField];
      const status = data[this.statusField];
      const isPoint = type === "point";

      // 获取前置图标
      const iconClass = this.iconMap[type] || "el-icon-document";

      // 在线离线图标，可以是图片或者 icon 类名
      let statusIcon = null;
      if (isPoint) {
        if (this.onlineIcon && this.offlineIcon) {
          // 如果传了图片路径
          statusIcon = h("img", {
            attrs: {
              src: status === "online" ? this.onlineIcon : this.offlineIcon,
              alt: status === "online" ? "在线" : "离线"
            },
            style: { width: "16px", height: "16px", marginLeft: "8px" }
          });
        } else {
          // 默认用 el-icon 圆点表示
          statusIcon = h("i", {
            class: [
              "el-icon-circle",
              status === "online" ? "status-online" : "status-offline"
            ],
            style: { marginLeft: "8px" }
          });
        }
      }

      return h(
        "div",
        {
          class: "tree-node-content",
          style: { display: "flex", alignItems: "center" }
        },
        [
          // 图标
          h("i", {
            class: iconClass,
            style: {
              marginRight: "6px",
              color: isPoint ? "#67C23A" : "#409EFF"
            }
          }),
          // 文本和数量（非点位显示数量）
          h(
            "span",
            {},
            `${label}${!isPoint && count !== undefined ? `（${count}）` : ""}`
          ),
          // 状态图标（点位才显示）
          statusIcon
        ]
      );
    },
    handleNodeClick(data) {
      const type = data[this.typeField];
      if (type === "point") {
        this.$emit("point-click", data);
      }
    }
  }
};
</script>

<style scoped>
.status-online {
  color: #67c23a;
}
.status-offline {
  color: #c0c4cc;
}
</style>
