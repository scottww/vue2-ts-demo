<template>
  <div class="page-container">
    <!-- 左侧树区域 -->
    <div class="left-tree">
      <el-card>
        <el-skeleton :loading="loadingTree" animated>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-skeleton>
      </el-card>
    </div>

    <!-- 右侧内容区域 -->
    <div class="right-content">
      <!-- 表格 -->
      <el-card style="margin-bottom: 10px; height: 200px;">
        <el-skeleton :loading="loadingRight" animated>
          <el-table :data="tableData" v-if="!loadingRight" height="180">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="value" label="值" />
          </el-table>
        </el-skeleton>
      </el-card>

      <!-- chat区域（这里只是占位模拟）-->
      <el-card style="height: 300px;">
        <el-skeleton :loading="loadingRight" animated>
          <div v-if="!loadingRight" class="graph-placeholder">
            chat展示区域
          </div>
        </el-skeleton>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingTree: true,
      loadingRight: false,
      treeData: [],
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() {
    this.fetchInitialData();
  },
  methods: {
    async fetchInitialData() {
      this.loadingTree = true;
      this.loadingRight = true;
      // 模拟加载左树 + 右下图
      setTimeout(() => {
        this.treeData = [
          { label: '节点 1', id: 1 },
          { label: '节点 2', id: 2 }
        ];
        this.loadingTree = false;
      }, 1000);

      setTimeout(() => {
        this.tableData = [
          { name: '初始A', value: 11 },
          { name: '初始B', value: 22 }
        ];
        this.loadingRight = false;
      }, 1500);
    },
    handleNodeClick(node) {
      this.loadingRight = true;
      // 模拟接口加载表格 + 图数据
      setTimeout(() => {
        this.tableData = [
          { name: `${node.label}-数据1`, value: Math.random() * 100 },
          { name: `${node.label}-数据2`, value: Math.random() * 100 }
        ];
        this.loadingRight = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  height: 100%;
}
.left-tree {
  width: 240px;
  margin-right: 10px;
}
.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.graph-placeholder {
  height: 100%;
  background: #f5f5f5;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
