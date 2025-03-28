<template>
  <div class="virtual-list-demo__container">
    <div class="section item2">
      <div class="head-box">
        <span>数据列表</span>
      </div>
      <div class="search-box">
        <span class="search__label">关键词：</span>
        <el-input
          size="small"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="keyword"
          @change="keywordChange"
          clearable
        >
        </el-input>
      </div>

      <div class="list-box">
        <HVirtualListNew
          :dataList="items"
          :itemHeight="60"
          :containerHeight="410"
          :defaultSelectedKey="selectedKey"
          @on-select="handleChose"
          @on-detail="handleDetail"
          @to-next="handleNext"
        />
      </div>
    </div>

    <div class="section item2">
      <div class="head-box">
        <span>数据列表</span>
      </div>
      <div class="search-box">
        <span class="search__label">关键词：</span>
        <el-input
          size="small"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="keyword"
          @change="keywordChange"
          clearable
        >
        </el-input>
      </div>

      <div class="list-box">
        <HVirtualListNew
          :dataList="items"
          :itemHeight="60"
          :containerHeight="300"
          :defaultSelectedKey="selectedKey"
          @on-select="handleChose"
          @on-detail="handleDetail"
          itemCanClick
        />
      </div>
    </div>

    <div class="section item1">
      <HVirtualList />
    </div>
  </div>
</template>

<script>
import HVirtualList from "@/components/HVirtualList.vue";
import HVirtualListNew from "@/components/HVirtualList_new.vue";
export default {
  name: "VirtualListDemo",
  components: { HVirtualList, HVirtualListNew },
  data() {
    return {
      items: [],
      keyword: "",
      selectedKey: "",
      defaultItems: Array.from({ length: 20 }, (_, i) => {
        return {
          uuid: `uuid-${i}`,
          name: `数据 ${i}`,
          time: `2024-03-18`
        };
      }),
      items: Array.from({ length: 20 }, (_, i) => {
        return {
          uuid: `uuid-${i}`,
          name: `数据 ${i}`,
          time: `2024-03-18`
        };
      }),
      defaultItems2: Array.from({ length: 20 }, (_, i) => {
        return {
          uuid: `uuid-${i}`,
          name: `数据2页 ${i}`,
          time: `2024-03-18`
        };
      }),
      items2: Array.from({ length: 20 }, (_, i) => {
        return {
          uuid: `uuid-${i}`,
          name: `数据2页 ${i}`,
          time: `2024-03-18`
        };
      })
    };
  },
  methods: {
    keywordChange(value) {
      if (value === "") {
        this.items = [...this.defaultItems];
        return;
      }
      console.log("keywordChange ...", value);
      const filterItems = this.defaultItems.filter(
        (i) => i.name.indexOf(value) > -1
      );
      const reg = new RegExp(`(${value})`, "gi"); // 匹配关键字
      console.log(filterItems);
      const hihtlightItems = filterItems.map((item) => {
        return {
          ...item,
          name: item.name.replace(reg, `<span style="color: red;">$1</span>`)
        };
      });
      console.log(hihtlightItems);
      this.items = [...hihtlightItems];
    },
    handleChose() {},
    handleDetail() {},
    handleNext() {
      // this.defaultItems = [...this.defaultItems2];
      // this.items = [...this.items2];
    }
  }
};
</script>
<style lang="scss" scoped>
.virtual-list-demo__container {
  display: flex;
  gap: 20px;
}

.section {
}

.item2 {
  width: 260px;
  /* min-width: 260px; */
  background-color: #fff;
  text-align: left;
}

.head-box {
  position: relative;
  padding: 20px;
}

.head-box span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 20px;
  bottom: 20px;
  width: 3px;
  background-color: #4c84ff;
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

.search__label {
  width: 80px;
  margin-right: 10px;
  font-size: 13px;
  color: #666;
}

.search__input {
  /* width: calc(100% - 100px); */
}

.list-box {
  margin-top: 20px;
  padding: 0 5px;
  height: calc(100% - 100px);
  overflow: hidden;
}
</style>
