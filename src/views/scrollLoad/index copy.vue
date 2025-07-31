<template>
  <div>
    <div style="margin-bottom: 12px">
      <input
        v-model="filters.keyword"
        placeholder="请输入关键词"
        @input="onFilterChange"
        style="width: 200px; padding: 6px"
      />
    </div>

    <ScrollLoad
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
import ScrollLoad from "./InfiniteScrollList.vue";

export default {
  components: { ScrollLoad },
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
      fullData: [] // 模拟的全部数据
    };
  },
  created() {
    // 初始化模拟全量数据 100条
    this.fullData = Array.from({ length: 100 }).map((_, i) => {
      return {
        uuid: "id_" + (i + 1),
        name: `示例项目 ${i + 1}`,
        time: new Date(Date.now() - i * 3600 * 1000).toLocaleString()
      };
    });
    this.fetchData(true);
  },
  methods: {
    // 模拟后端接口请求
    fetchData(reset = false) {
      if (this.loading) return;
      this.loading = true;

      if (reset) {
        this.page = 1;
        this.list = [];
        this.hasMore = true;
      }

      setTimeout(() => {
        // 模拟“后端筛选”
        let filtered = this.fullData;
        if (this.filters.keyword.trim()) {
          const kw = this.filters.keyword.trim().toLowerCase();
          filtered = filtered.filter((item) =>
            item.name.toLowerCase().includes(kw)
          );
        }

        this.total = filtered.length;

        // 模拟分页
        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = filtered.slice(start, end);

        if (reset) {
          this.list = pageData;
        } else {
          this.list = [...this.list, ...pageData];
        }

        this.hasMore = this.list.length < this.total;
        this.page++;
        this.loading = false;
      }, 600); // 模拟网络延迟600ms
    },
    loadNextPage() {
      if (this.hasMore && !this.loading) {
        this.fetchData();
      }
    },
    onFilterChange() {
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
