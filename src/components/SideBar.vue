<template>
  <div class="sidebar-wrapper" :class="{ open: isOpen }">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        { id: 1, text: "读取文件" },
        { id: 2, text: "表格" },
        { id: 3, text: "函数式组件" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style scoped>
.sidebar-wrapper {
  /* position: fixed; */
  position: relative;
  top: 0;
  left: -200px;
  height: 100%;
  width: 200px;
  background-color: #eee;
  transition: left 0.3s ease;
}

.sidebar-wrapper.open {
  left: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
li:hover {
  cursor: pointer;
  background-color: #d5d5d5;
}

li:last-child {
  /* border-bottom: none; */
}
</style>
