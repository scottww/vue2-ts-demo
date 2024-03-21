<template>
    <div v-if="show" class="loading-container">
      <div class="loading-spinner"></div>
      <div class="loading-text">{{ text }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        text: '加载中...',
      };
    },
    methods: {
      showLoading(text = '加载中...') {
        this.text = text;
        this.show = true;
      },
      hideLoading() {
        this.show = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
  }
  
  .loading-text {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  