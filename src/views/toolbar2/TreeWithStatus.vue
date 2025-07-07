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
    treeData: { type: Array, required: true },
    onlineIcon: String,
    offlineIcon: String,
    labelField: { type: String, default: "label" },
    childrenField: { type: String, default: "children" },
    countField: { type: String, default: "count" },
    typeField: { type: String, default: "type" },
    statusField: { type: String, default: "status" }
  },
  data() {
    return {
      cleanedTreeData: []
    };
  },
  created() {
    // this.cleanedTreeData = this.cleanTreeData(this.treeData);
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
    //去除子节点的children属性
    cleanTreeData(nodes) {
      return nodes.map((node) => {
        const newNode = { ...node };
        if (newNode[this.typeField] === "point") {
          delete newNode[this.childrenField];
        } else if (Array.isArray(newNode[this.childrenField])) {
          newNode[this.childrenField] = this.cleanTreeData(
            newNode[this.childrenField]
          );
        }
        return newNode;
      });
    },
    renderContent(h, { node, data }) {
      const type = data[this.typeField];
      const label = data[this.labelField];
      const count = data[this.countField];
      const status = data[this.statusField];
      const isPoint = type === "point";

      const iconClass = isPoint
        ? "el-icon-position"
        : node.expanded
        ? "el-icon-folder-opened"
        : "el-icon-folder";

      return h(
        "div",
        {
          class: "tree-node-content",
          attrs: {
            "data-type": type // ⭐⭐关键
          },
          style: { display: "flex", alignItems: "center" }
        },
        [
          h("i", {
            class: iconClass,
            style: {
              marginRight: "6px",
              color: isPoint ? "#67C23A" : "#f4b400"
            }
          }),
          h(
            "span",
            {},
            `${label}${!isPoint && count !== undefined ? `（${count}）` : ""}`
          ),
          isPoint &&
            h("img", {
              attrs: {
                src: status === "online" ? this.onlineIcon : this.offlineIcon,
                alt: status
              },
              style: { width: "16px", height: "16px", marginLeft: "8px" }
            })
        ]
      );
    },
    handleNodeClick(data) {
      if (data[this.typeField] === "point") {
        this.$emit("point-click", data);
      }
    }
  }
};
</script>
<style scoped>
/* 所有展开箭头默认黄色 */
::v-deep .el-tree-node__expand-icon {
  color: #f4b400;
}

/* 隐藏点位节点的展开图标 */
::v-deep .el-tree-node__expand-icon.is-leaf {
  color: transparent;
}
</style>