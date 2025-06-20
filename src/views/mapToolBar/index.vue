<template>
  <div class="tool-bar-demo">
    <div class="tools-box1">
      <div class="tools-box1_item" @click="selectTool('add')" title="新增">
        <!-- <img class="img-box" :src="require('@/assets/images/mapToolBar/add.png')" alt="" /> -->
        <!-- <img class="img-box" src="@/assets/mapToolBar/add.png" alt="" /> -->
        <img
          class="img-box"
          :src="selectedTool === 'add' ? activeImage1 : defaultImage1"
          alt="动态图片"
        />
      </div>
      <div class="tools-box1_item" @click="selectTool('edit')" title="编辑">
        <img
          class="img-box"
          :src="selectedTool === 'edit' ? activeImageEdit1 : defaultImageEdit1"
          alt="动态图片"
        />
      </div>
    </div>
    <div class="tools-box2">
      <div class="tools-box_item" @click="showAddToolSub('showAddMenu')">
        <div class="item-inner" :class="{ active: showAddSubMenu }">
          <img
            class="img-box"
            :src="showAddSubMenu ? activeImageAdd : defaultImageAdd"
            alt="图片"
          />
          <span class="item-label">新增</span>
        </div>
        <div class="sub-box" v-if="showAddSubMenu">
          <div
            class="sub_item"
            :class="{ active: subActiveIndex === 0 }"
            @click.stop="handleAdd('add')"
          >
            地图标点
          </div>
          <div
            class="sub_item"
            :class="{ active: subActiveIndex === 1 }"
            @click.stop="handleAddBylonglat('longlatAdd')"
          >
            经纬度录入
          </div>
        </div>
      </div>
      <div class="tools-box_item" @click="handleEdit('edit')">
        <div class="item-inner" :class="{ active: mode === 'edit' }">
          <img
            class="img-box"
            :src="mode === 'edit' ? activeImageEdit : defaultImageEdit"
            alt="图片"
          />
          <span class="item-label">编辑</span>
        </div>
      </div>
      <div class="tools-box_item" @click="handleDel('delete')">
        <div class="item-inner" :class="{ active: mode === 'delete' }">
          <img
            class="img-box2"
            :src="mode === 'delete' ? activeImageDelete : defaultImageDelete"
            alt="图片"
          />
          <span class="item-label">删除</span>
        </div>
      </div>
      <div class="tools-box_item" @click="handleMove('modify')">
        <div class="item-inner" :class="{ active: mode === 'modify' }">
          <img
            class="img-box"
            :src="mode === 'modify' ? activeImageMove : defaultImageMove"
            alt="图片"
          />
          <span class="item-label">移动</span>
        </div>
      </div>
      <div class="tools-box_item" @click="mapResetView()">
        <img
          class="img-box2"
          :src="mode === 'resetView' ? activeImageHome : defaultImageHome"
          alt="图片"
        />
        <span class="item-label">视角归位</span>
      </div>
      <div class="tools-box_item" @click="handleImport()">
        <img
          class="img-box"
          :src="mode === 'import' ? activeImageImport : defaultImageImport"
          alt="图片"
        />
        <span class="item-label">批量导入</span>
      </div>
    </div>
  </div>
</template>

<script>
const defaultImage1 = require("@/assets/mapToolBar/add_grey.png"); // 默认图片
const activeImage1 = require("@/assets/mapToolBar/add.png"); // 悬停时的图片
const defaultImageEdit1 = require("@/assets/mapToolBar/edit_grey.png"); // 默认图片
const activeImageEdit1 = require("@/assets/mapToolBar/edit.png"); // 悬停时的图片

//mapToolBarNew
const defaultImageAdd = require("@/assets/mapToolBarNew/add.png");
const activeImageAdd = require("@/assets/mapToolBarNew/add_hover.png");
const defaultImageEdit = require("@/assets/mapToolBarNew/edit.png");
const activeImageEdit = require("@/assets/mapToolBarNew/edit_hover.png");
const defaultImageDelete = require("@/assets/mapToolBarNew/delete.png");
const activeImageDelete = require("@/assets/mapToolBarNew/delete_hover.png");
const defaultImageMove = require("@/assets/mapToolBarNew/move.png");
const activeImageMove = require("@/assets/mapToolBarNew/move_hover.png");
const defaultImageHome = require("@/assets/mapToolBarNew/home.png");
const activeImageHome = require("@/assets/mapToolBarNew/home_hover.png");
const defaultImageImport = require("@/assets/mapToolBarNew/import.png");
const activeImageImport = require("@/assets/mapToolBarNew/import_hover.png");

export default {
  data() {
    return {
      defaultImage1,
      activeImage1,
      defaultImageEdit1,
      activeImageEdit1,

      //mapToolBarNew
      defaultImageAdd,
      activeImageAdd,
      defaultImageEdit,
      activeImageEdit,
      defaultImageDelete,
      activeImageDelete,
      defaultImageMove,
      activeImageMove,
      defaultImageHome,
      activeImageHome,
      defaultImageImport,
      activeImageImport,
      showAddSubMenu: false, //是否激活新增工具
      subActiveIndex: null, //新增工具激活的子项索引
      mode: null, // 当前工具模式：'add', 'delete', 'modify'

      hover: false,
      selectedTool: ""
    };
  },
  methods: {
    selectTool(tool) {
      console.log("selectTool", tool);
      // 切换选中的工具，确保只有一个工具被选中
      this.selectedTool = this.selectedTool === tool ? "" : tool;
    },
    showAddToolSub(tool) {
      console.log("showAddToolSub ...", tool);
      //特殊处理
      if (this.mode === tool || this.showAddSubMenu) {
        this.resetAddToolStatus();
        this.mode = "";
        return;
      }
      this.mode = "showAddMenu";
      this.showAddSubMenu = true;
    },
    handleAdd(tool) {
      if (this.mode === tool) {
        this.subActiveIndex = null;
        this.mode = "";
        return;
      }
      this.subActiveIndex = 0;
      this.mode = "add";
    },
    handleAddBylonglat(tool) {
      this.mode = "longlatAdd";
      this.subActiveIndex = 1;
    },
    handleEdit(tool) {
      this.resetAddToolStatus();
      if (this.mode === tool) {
        this.mode = "";
        return;
      }
      this.mode = "edit";
    },
    handleDel(tool) {
      this.resetAddToolStatus();
      if (this.mode === tool) {
        this.mode = "";
        return;
      }
      this.mode = "delete";
    },
    handleMove(tool) {
      this.resetAddToolStatus();
      if (this.mode === tool) {
        this.mode = "";
        return;
      }
      this.mode = "modify";
    },
    mapResetView(tool) {
      console.log("mapResetView...");
    },
    handleImport(tool) {
      this.resetAddToolStatus();
      console.log("toolbar importDevice...");
      this.mode = "import";
    },
    resetAddToolStatus() {
      this.showAddSubMenu = false;
      this.subActiveIndex = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.tools-box1 {
  background: #fff;
  display: flex;
  border: 1px solid grey;
}
.tools-box1_item {
  padding: 4px;
  cursor: pointer;
}

.tools-box1_item .img-box {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

//tools-box2
.tools-box2 {
  display: flex;
  background: linear-gradient(180deg, rgba(48, 157, 255, 0.8) 0%, #0758d6 100%);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
  height: 45px;

  margin-top: 20px;
}
.tools-box_item {
  padding: 4px 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .item-label {
    color: #fff;
    margin-left: 3px;
    font-size: 12px;
  }

  .item-inner {
    display: flex;
    align-items: center;
    padding: 4px 6px;
    border-radius: 6px;
    transition: all 0.2s;

    &.active {
      background: linear-gradient(180deg, rgba(48, 157, 255, 0.8), #0758d6);
      box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
    }
  }
}

.tools-box_item .img-box {
  // width: 100%;
  // height: 100%;
  width: 25px;
  height: 25px;
  object-fit: contain;
  flex: 1;
}
.tools-box_item .img-box2 {
  // width: 100%;
  // height: 100%;
  width: 23px;
  height: 23px;
  object-fit: contain;
  flex: 1;
}

.tools-box_item .sub-box {
  position: absolute;
  // width: 120px;
  // margin-top: 10px;
  top: 60px;
  left: 0px;
  padding: 0 8px;
  text-align: center;
  background: linear-gradient(180deg, rgba(48, 157, 255, 0.8) 0%, #0758d6 100%);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
}

.sub_item {
  height: 30px;
  border-bottom: 1px solid #ccc;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 12px;
}

.sub_item:last-child {
  border-bottom: none;
}

.sub_item.active {
  // color: #1890ff;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
}
</style>