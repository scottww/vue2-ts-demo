<template>
  <div class="structure-panel-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <div class="search-container">
        <input
          type="text"
          placeholder="请输入关键字"
          v-model="searchKeyword"
          class="search-input"
          @keyup.enter="onSearch"
        />
        <div class="search-icon" @click="onSearch"></div>
      </div>
    </div>

    <!-- 树 -->
    <div class="structure-tree">
      <tree-node
        v-for="(node, key) in filteredTree"
        :key="key"
        :node="node"
        :node-key="key"
        :selected-node.sync="selectedNode"
        :is-open.sync="isOpen"
        @nodeSelect="handleNodeSelect"
      />
    </div>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";

export default {
  name: "StructurePanel",
  components: { TreeNode },
  data() {
    return {
      searchKeyword: "",
      selectedNode: "",
      isOpen: {
        l1: true,
        workingBridge: false,
        highwayBridge: false,
        pumpGroup: false
      },
      treeData: {
        l1: {
          name: "L1层",
          children: {
            workingBridge: {
              name: "工作桥",
              children: {
                gate: { name: "闸门" },
                oilCylinder: { name: "油缸" }
              }
            },
            highwayBridge: {
              name: "公路桥",
              children: {
                crane: { name: "起重机" },
                electricControlCabin: { name: "电控柜" }
              }
            }
          }
        },
        pumpGroup: {
          name: "泵组层",
          children: {
            pumpGroup54: { name: "5#泵组" },
            pumpGroup54Cabinet: { name: "5#泵组机旁柜" },
            pumpGroup6: { name: "6#泵组" },
            pumpGroup6Cabinet: { name: "6#泵组机旁柜" },
            pumpGroup7: { name: "7#泵组" },
            pumpGroup7Cabinet: { name: "7#泵组机旁柜" }
          }
        }
      }
    };
  },
  computed: {
    filteredTree() {
      const keyword = this.searchKeyword.trim();
      if (!keyword) return this.treeData;

      const highlight = (name) =>
        name.replace(
          new RegExp(keyword, "gi"),
          (match) => `<span style="color:#ff0">${match}</span>`
        );

      const filterNode = (node, parentKeys = []) => {
        let matched = node.name.includes(keyword);
        const newNode = { ...node, highlightName: highlight(node.name) };

        if (node.children) {
          const newChildren = {};
          for (const key in node.children) {
            const child = filterNode(node.children[key], [...parentKeys, node.key]);
            if (child) {
              newChildren[key] = child;
              matched = true;
            }
          }
          if (Object.keys(newChildren).length) newNode.children = newChildren;
          else delete newNode.children;
        }

        if (matched) {
          // 展开所有父节点
          parentKeys.forEach((k) => this.$set(this.isOpen, k, true));
          return newNode;
        }

        return null;
      };

      const result = {};
      for (const key in this.treeData) {
        const node = { ...this.treeData[key], key };
        const filtered = filterNode(node, []);
        if (filtered) result[key] = filtered;
      }
      return result;
    }
  },
  methods: {
    handleNodeSelect(nodeKey) {
      this.selectedNode = nodeKey;
      this.$emit("nodeSelect", nodeKey);
    },
    onSearch() {
      // 搜索时触发计算属性重新过滤并展开
      this.filteredTree; 
    }
  }
};
</script>

<style scoped>
/* 保留原有样式 */
.structure-panel-container {
  width: 100%;
  height: 100%;
  padding: 15px 10px;
}

.search-box {
  border: 1px solid rgba(245, 245, 245, 0.6);
  border-radius: 6px;
  padding: 2px;
  margin: 0 4px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 38px;
  display: flex;
}

.search-container {
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 6px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.search-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  outline: none;
  font-size: 14px;
  height: 100%;
}

.search-icon {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background-image: url("~@/assets/bigScreen/functionPanel/search_icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

.structure-tree {
  overflow-y: auto;
  max-height: calc(100% - 80px);
  padding: 8px;
}
</style>
