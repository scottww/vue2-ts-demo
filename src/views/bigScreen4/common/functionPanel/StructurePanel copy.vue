<template>
  <div class="structure-panel-container">
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

    <div class="structure-tree">
      <!-- L1层 -->
      <div class="tree-node">
        <div class="node-header" @click="toggleNode('l1')">
          <div class="node-icon">{{ isOpen.l1 ? "▼" : "▶" }}</div>
          <div class="folder-icon"></div>
          <span class="node-name">L1层</span>
        </div>
        <div class="node-children" v-if="isOpen.l1">
          <div class="tree-node">
            <div class="node-header" @click="toggleNode('workingBridge')">
              <div class="node-icon">
                {{ isOpen.workingBridge ? "▼" : "▶" }}
              </div>
              <div class="folder-icon"></div>
              <span class="node-name">工作桥</span>
            </div>
            <div class="node-children" v-if="isOpen.workingBridge">
              <div
                class="tree-node leaf-node"
                :class="{ active: selectedNode === 'gate' }"
                @click="selectNode('gate')"
              >
                <div class="file-icon"></div>
                <span class="node-name">闸门</span>
              </div>
              <div
                class="tree-node leaf-node"
                :class="{ active: selectedNode === 'oilCylinder' }"
                @click="selectNode('oilCylinder')"
              >
                <div class="file-icon"></div>
                <span class="node-name">油缸</span>
              </div>
            </div>
          </div>
          <div class="tree-node">
            <div class="node-header" @click="toggleNode('highwayBridge')">
              <div class="node-icon">
                {{ isOpen.highwayBridge ? "▼" : "▶" }}
              </div>
              <div class="folder-icon"></div>
              <span class="node-name">公路桥</span>
            </div>
            <div class="node-children" v-if="isOpen.highwayBridge">
              <div
                class="tree-node leaf-node"
                :class="{ active: selectedNode === 'crane' }"
                @click="selectNode('crane')"
              >
                <div class="file-icon"></div>
                <span class="node-name">起重机</span>
              </div>
              <div
                class="tree-node leaf-node"
                :class="{ active: selectedNode === 'electricControlCabin' }"
                @click="selectNode('electricControlCabin')"
              >
                <div class="file-icon"></div>
                <span class="node-name">电控柜</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 泵组层 -->
      <div class="tree-node">
        <div class="node-header" @click="toggleNode('pumpGroup')">
          <div class="node-icon">{{ isOpen.pumpGroup ? "▼" : "▶" }}</div>
          <div class="folder-icon"></div>
          <span class="node-name">泵组层</span>
        </div>
        <div class="node-children" v-if="isOpen.pumpGroup">
          <div
            class="tree-node leaf-node"
            :class="{ active: selectedNode === 'pumpGroup54' }"
            @click="selectNode('pumpGroup54')"
          >
            <div class="file-icon"></div>
            <span class="node-name">5#泵组</span>
          </div>
          <div
            class="tree-node leaf-node"
            :class="{ active: selectedNode === 'pumpGroup54Cabinet' }"
            @click="selectNode('pumpGroup54Cabinet')"
          >
            <div class="file-icon"></div>
            <span class="node-name">5#泵组机旁柜</span>
          </div>
          <div
            class="tree-node leaf-node"
            :class="{ active: selectedNode === 'pumpGroup6' }"
            @click="selectNode('pumpGroup6')"
          >
            <div class="file-icon"></div>
            <span class="node-name">6#泵组</span>
          </div>
          <div
            class="tree-node leaf-node"
            :class="{ active: selectedNode === 'pumpGroup6Cabinet' }"
            @click="selectNode('pumpGroup6Cabinet')"
          >
            <div class="file-icon"></div>
            <span class="node-name">6#泵组机旁柜</span>
          </div>
          <div
            class="tree-node leaf-node"
            :class="{ active: selectedNode === 'pumpGroup7' }"
            @click="selectNode('pumpGroup7')"
          >
            <div class="file-icon"></div>
            <span class="node-name">7#泵组</span>
          </div>
          <div
            class="tree-node leaf-node"
            :class="{ active: selectedNode === 'pumpGroup7Cabinet' }"
            @click="selectNode('pumpGroup7Cabinet')"
          >
            <div class="file-icon"></div>
            <span class="node-name">7#泵组机旁柜</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StructurePanel",
  data() {
    return {
      searchKeyword: "",
      isOpen: {
        l1: true,
        workingBridge: false,
        highwayBridge: false,
        pumpGroup: false
      },
      selectedNode: ""
    };
  },
  methods: {
    toggleNode(nodeName) {
      this.isOpen[nodeName] = !this.isOpen[nodeName];
    },
    selectNode(nodeName) {
      this.selectedNode = nodeName;
      this.$emit("nodeSelect", nodeName);
    }
  }
};
</script>

<style scoped>
.structure-panel-container {
  width: 100%;
  height: 100%;
  padding: 15px 10px;
}

/* 外层边框 */
.search-box {
  /* width: 150px; */
  border: 1px solid rgba(245, 245, 245, 0.6);
  border-radius: 6px;
  padding: 2px; /* 内缩一点，避免遮挡背景 */
  margin: 0 4px;
  box-sizing: border-box; /* 保证边框不会撑大 */
  margin-top: 20px;
  margin-bottom: 10px;
  height: 38px;
  display: flex;   
}

/* 内部容器保持原有背景 */
.search-container {
  display: flex;
  align-items: center;
  /* background: rgba(10, 30, 60, 0.7); */
  border-radius: 4px;
  /* padding: 5px; */
  padding: 0 6px;              /* 左右内边距 */
  width: 100%;                 /* 让它撑满 search-box */
  height: 100%;                /* 高度撑满父容器 */
  box-sizing: border-box;
}

.search-input {
  flex: 1;
  min-width: 0; 
  background: transparent;
  border: none;
  /* color: #fff; */
  color: rgba(255, 255, 255, 0.6);
  outline: none;
  font-size: 14px;
  /* max-width: 100px; */
  height: 100%; 
}

/* 搜索框样式 */
.search-container1 {
  display: flex;
  align-items: center;
  background: rgba(10, 30, 60, 0.7);
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 10px;
  width: 150px; /* 限制搜索容器宽度 */
}

.search-input1 {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  outline: none;
  font-size: 14px;
  max-width: 100px; /* 限制输入框宽度 */
}

.search-icon {
  flex: 0 0 20px;   
  width: 20px;
  height: 20px; 
  margin-left: 5px;
  /* 提供备用方案，如果图片不存在则显示文本图标 */
  background-image: url("~@/assets/bigScreen/functionPanel/search_icon.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

/* 如果搜索图标图片不存在，使用以下样式 */
.search-icon1:before {
  content: "🔍";
  display: block;
  width: 15px;
  height: 15px;
}

/* 结构树样式 */
.structure-tree {
  overflow-y: auto;
  max-height: calc(100% - 80px);
  padding: 8px;
}

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
  /* color: #4da6ff; */
  color: #ff9f00;
  font-size: 12px;
  margin-right: 5px;
  width: 16px;
  text-align: center;
}

/* 文件夹图标样式 */
.folder-icon {
  width: 21px;
  height: 15px;
  margin-right: 5px;
  background-image: url("~@/assets/bigScreen/functionPanel/folder_icon.png");
  background-size: contain;
  background-repeat: no-repeat;
}

/* 文件图标样式 */
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

.leaf-node {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: background 0.2s;
  width: calc(100% - 20px); /* 调整宽度，减去 node-children 的 padding-left */
}

.leaf-node:hover {
  background: rgba(50, 150, 255, 0.2);
  margin-left: -20px; /* 补偿 node-children 的 padding-left */
  padding-left: 25px; /* 调整左侧 padding，确保内容对齐 */
  width: calc(100% + 20px); /* 增加宽度以补偿负 margin */
}

.leaf-node.active {
  background: #0f7ec6;
  border: 1px solid rgba(100, 200, 255, 0.5);
  margin-left: -20px; /* 补偿 node-children 的 padding-left */
  padding-left: 25px; /* 调整左侧 padding，确保内容对齐 */
  width: calc(100% + 20px); /* 增加宽度以补偿负 margin */
}
</style>