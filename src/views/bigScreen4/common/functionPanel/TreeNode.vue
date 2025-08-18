<template>
  <div class="tree-node">
    <div
      class="node-header"
      @click="toggleNode(nodeKey)"
      :class="{ leaf: !hasChildren }"
    >
      <div class="node-icon" v-if="hasChildren">{{ isOpen[nodeKey] ? "▼" : "▶" }}</div>
      <div class="folder-icon" v-if="hasChildren"></div>
      <div class="file-icon" v-else></div>
      <span
        class="node-name"
        v-html="node.highlightName || node.name"
        @click.stop="selectNode(nodeKey)"
      ></span>
    </div>

    <div class="node-children" v-if="hasChildren && isOpen[nodeKey]">
      <tree-node
        v-for="(childNode, key) in node.children"
        :key="key"
        :node="childNode"
        :node-key="key"
        :selected-node.sync="selectedNode"
        :is-open.sync="isOpen"
        @nodeSelect="$emit('nodeSelect', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeNode",
  props: {
    node: { type: Object, required: true },
    nodeKey: { type: String, required: true },
    selectedNode: { type: String, required: true },
    isOpen: { type: Object, required: true }
  },
  computed: {
    hasChildren() {
      return this.node.children && Object.keys(this.node.children).length > 0;
    }
  },
  methods: {
    toggleNode(key) {
      if (this.hasChildren) this.$set(this.isOpen, key, !this.isOpen[key]);
    },
    selectNode(key) {
      this.$emit("nodeSelect", key);
    }
  }
};
</script>

<style scoped>
.tree-node {
  margin-bottom: 5px;
}

.node-header {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.node-header:hover {
  background: rgba(50, 150, 255, 0.2);
}

.node-icon {
  color: #ff9f00;
  font-size: 12px;
  margin-right: 5px;
  width: 16px;
  text-align: center;
}

.folder-icon {
  width: 21px;
  height: 15px;
  margin-right: 5px;
  background-image: url("~@/assets/bigScreen/functionPanel/folder_icon.png");
  background-size: contain;
  background-repeat: no-repeat;
}

/* 不显示leaf节点图标 */
.file-icon1 {
  width: 21px;
  height: 15px;
  margin-right: 5px;
  background-image: url("~@/assets/bigScreen/functionPanel/file_icon.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.node-name {
  color: #fff;
  font-size: 14px;
}

.node-children {
  padding-left: 20px;
  margin-top: 3px;
}

.node-header.leaf {
  cursor: default;
}
</style>
