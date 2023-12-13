<template>
    <div>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
  
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
  
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalItems: {
        type: Number,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        default: 10,
      },
    },
    data() {
      return {
        currentPage: 1,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
    },
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.$emit('page-change', this.currentPage);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 可以在这里添加样式 */
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }
  
  button {
    padding: 8px;
    cursor: pointer;
  }
  </style>
  