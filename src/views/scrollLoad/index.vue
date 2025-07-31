<template>
  <div>
    <div style="margin-bottom: 12px">
      <!-- <input
        v-model="filters.keyword"
        placeholder="请输入关键词"
        @input="onFilterChange"
        style="width: 200px; padding: 6px"
      /> -->
      <div class="search-box">
        <span class="search__label">关键词：</span>
        <el-input
          size="small"
          placeholder="请输入关键词"
          suffix-icon="el-icon-search"
          v-model="filters.keyword"
          @change="onFilterChange"
          clearable
        >
        </el-input>
      </div>
    </div>

    <InfiniteScrollList
      :data-list="list"
      :has-more="hasMore"
      :loading-more="loading"
      :default-selected-key="selectedId"
      @to-next="loadNextPage"
      @on-select="handleSelect"
      @on-detail="handleDetail"
      :item-can-click="true"
      style="height: 400px; border: 1px solid #ccc"
    />
  </div>
</template>

<script>
// 这个是你的虚拟滚动展示组件，之前已经写好
import InfiniteScrollList from "./InfiniteScrollList.vue";

export default {
  components: { InfiniteScrollList },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
      total: 0,
      loading: false,
      hasMore: true,
      filters: {
        keyword: ""
      },
      selectedId: null,
      fullData: [] // 模拟全部数据
    };
  },
  created() {
    // 初始化模拟全量数据 100条
    this.fullData = Array.from({ length: 100 }).map((_, i) => ({
      uuid: "id_" + (i + 1),
      name: `示例项目 ${i + 1}`,
      time: new Date(Date.now() - i * 3600 * 1000).toLocaleString()
    }));
    this.fetchData(true);
  },
  methods: {
    // 模拟异步接口：分页 + 筛选 + 网络延迟
    fakeApi({ pageNumber, pageSize, keyword }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filtered = this.fullData;
          if (keyword && keyword.trim()) {
            const kw = keyword.trim().toLowerCase();
            filtered = filtered.filter((item) =>
              item.name.toLowerCase().includes(kw)
            );
          }
          const total = filtered.length;
          const start = (pageNumber - 1) * pageSize;
          const data = filtered.slice(start, start + pageSize);
          resolve({ data, total });
        }, 600);
      });
    },
    async fetchData(reset = false) {
      if (this.loading) return;
      this.loading = true;
      if (reset) {
        this.page = 1;
        this.list = [];
        this.hasMore = true;
      }
      try {
        const res = await this.fakeApi({
          pageNumber: this.page,
          pageSize: this.pageSize,
          keyword: this.filters.keyword
        });
        if (reset) {
          this.list = res.data;
        } else {
          this.list = [...this.list, ...res.data];
        }
        this.total = res.total;
        this.hasMore = this.list.length < this.total;
        this.page++;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    loadNextPage() {
      if (this.hasMore && !this.loading) {
        this.fetchData();
      }
    },
    onFilterChange() {
      // 输入框防抖可以自己加
      this.fetchData(true);
    },
    handleSelect(item) {
      this.selectedId = item.uuid;
      alert(`选中了: ${item.name}`);
    },
    handleDetail(item) {
      alert(`详情: ${item.name} - 发布时间: ${item.time}`);
    }
  }
};
</script>

<style scoped>
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
</style>
