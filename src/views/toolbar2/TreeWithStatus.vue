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
    iconPngMap: Object,
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
        label: this.labelField,
        // lazy: true生效
        isLeaf: (data, node) => {
          return data[this.typeField] === "point";
        }
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

      // 优先使用 PNG 图标
      const pngIcon = this.iconPngMap?.[type];
      const classIcon = this.iconMap?.[type] || "el-icon-document";

      // 渲染前置图标
      const iconVNode = pngIcon
        ? h("img", {
            attrs: {
              src: pngIcon,
              alt: type
            },
            style: {
              width: "16px",
              height: "16px",
              marginRight: "6px"
            }
          })
        : h("i", {
            class: classIcon,
            style: {
              marginRight: "6px",
              color: isPoint ? "#67C23A" : "#409EFF"
            }
          });

      // 渲染状态图标（仅 point）
      let statusIcon = null;
      if (isPoint) {
        const isOnline = status === "online";
        const icon = isOnline ? this.onlineIcon : this.offlineIcon;

        if (
          icon?.endsWith(".png") ||
          icon?.endsWith(".jpg") ||
          icon?.includes("/")
        ) {
          // 是图片路径
          statusIcon = h("img", {
            attrs: {
              src: icon,
              alt: status
            },
            style: { width: "16px", height: "16px", marginLeft: "8px" }
          });
        } else if (icon) {
          // 是 el-icon 类名
          statusIcon = h("i", {
            class: [icon],
            style: { marginLeft: "8px" }
          });
        } else {
          // 默认 el-icon-circle
          statusIcon = h("i", {
            class: [
              "el-icon-circle",
              isOnline ? "status-online" : "status-offline"
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
          iconVNode,
          h(
            "span",
            {},
            `${label}${!isPoint && count !== undefined ? `（${count}）` : ""}`
          ),
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

/* 所有展开箭头默认黄色 */
::v-deep .el-tree-node__expand-icon {
  color: #f4b400;
}

/* 隐藏点位节点的展开图标 */
::v-deep .el-tree-node__expand-icon.is-leaf {
  color: transparent;
}
</style>
