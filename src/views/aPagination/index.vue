<template>
    <div>
      <!-- 其他内容 -->
  
      <MyPagination :total-items="totalItems" :items-per-page="itemsPerPage" @page-change="handlePageChange" />
  
      <!-- 其他内容 -->
    </div>
  </template>
  
  <script>
  import MyPagination from '@/components/re-antdv/APagination.vue';
  
  export default {
    components: {
      MyPagination,
    },
    data() {
      return {
        totalItems: 100,
        itemsPerPage: 10,
      };
    },
    methods: {
      handlePageChange(page) {
        // 处理页码变化事件
        console.log(`Current Page: ${page}`);
        // 可以在这里触发获取新数据的操作
      },
    },
  };
  </script>
  