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
        />
        <div class="search-icon"></div>
      </div>
    </div>

    <!-- 树 -->
    <div class="structure-tree">
      <TreeNode
        v-for="(node, key) in filteredTree"
        :key="key"
        :node="node"
        :node-key="key"
        :selected-node="selectedNode"
        :is-open="isOpen"
        @update:selected-node="(val) => (selectedNode = val)"
        @update:is-open="(val) => (isOpen = val)"
        @nodeSelect="handleNodeSelect"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import TreeNode from './TreeNode.vue'

export default {
  name: 'StructurePanel',
  components: { TreeNode },
  setup(props, { emit }) {
    const searchKeyword = ref('')
    const selectedNode = ref('')
    const isOpen = reactive({
      l1: true,
      workingBridge: false,
      highwayBridge: false,
      pumpGroup: false,
    })

    const treeData = reactive({
      l1: {
        name: 'L1层',
        children: {
          workingBridge: {
            name: '工作桥',
            children: {
              gate: { name: '闸门' },
              oilCylinder: { name: '油缸' },
            },
          },
          highwayBridge: {
            name: '公路桥',
            children: {
              crane: { name: '起重机' },
              electricControlCabin: { name: '电控柜' },
            },
          },
        },
      },
      pumpGroup: {
        name: '泵组层',
        children: {
          pumpGroup54: { name: '5#泵组' },
          pumpGroup54Cabinet: { name: '5#泵组机旁柜' },
          pumpGroup6: { name: '6#泵组' },
          pumpGroup6Cabinet: { name: '6#泵组机旁柜' },
          pumpGroup7: { name: '7#泵组' },
          pumpGroup7Cabinet: { name: '7#泵组机旁柜' },
        },
      },
    })

    const filteredTree = computed(() => {
      const keyword = searchKeyword.value.trim()
      if (!keyword) {
        // 如果没有搜索，返回原始树，并还原默认展开状态
        isOpen.l1 = true
        isOpen.workingBridge = false
        isOpen.highwayBridge = false
        isOpen.pumpGroup = false
        return treeData
      }

      const highlight = (name) =>
        name.includes(keyword)
          ? name.replace(new RegExp(keyword, 'g'), `<span style="color:#ff0">${keyword}</span>`)
          : name

      const newIsOpen = {}

      const filterNode = (node, key) => {
        const { name, children } = node
        const newNode = { ...node, highlightName: highlight(name) }

        if (children) {
          const newChildren = {}
          for (const childKey in children) {
            const child = filterNode(children[childKey], childKey)
            if (child) newChildren[childKey] = child
          }
          if (Object.keys(newChildren).length) {
            newNode.children = newChildren
            newIsOpen[key] = true // 子节点匹配，父节点展开
            return newNode
          }
        }

        return name.includes(keyword) ? newNode : null
      }

      const result = {}
      for (const key in treeData) {
        const node = filterNode(treeData[key], key)
        if (node) result[key] = node
      }

      // 更新展开状态
      Object.assign(isOpen, newIsOpen)

      return result
    })

    const handleNodeSelect = (nodeKey) => {
      selectedNode.value = nodeKey
      emit('nodeSelect', nodeKey)
    }

    return {
      searchKeyword,
      selectedNode,
      isOpen,
      filteredTree,
      handleNodeSelect,
    }
  },
}
</script>

<style scoped>
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
  background-image: url('@/assets/bigScreen/functionPanel/search_icon.png');
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
