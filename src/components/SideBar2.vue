<template>
  <div class="sidebar-container" :class="{ isHide: !isOpen2 }">
    <div class="sidebar-toggle" @click="toggleSidebar">
      <!-- <i class="fas fa-bars"></i> -->
      <i>{{ toggleText }}</i>
    </div>
    <div class="sidebar-content" v-if="isOpen2">
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isOpen2: true,
      items: [
        { id: 1, text: "读取文件" },
        { id: 2, text: "表格" },
        { id: 3, text: "函数式组件" },
      ],
    };
  },
  computed: {
    toggleText({ isOpen2 }) {
      return isOpen2 ? "<" : ">";
    },
  },
  methods: {
    toggleSidebar() {
      this.isOpen2 = !this.isOpen2;
      this.$emit("on-change", this.isOpen2);
    },
  },
};
</script>

<style>
.sidebar-container {
  position: relative;
  width: 200px;
  /* width: 100%; */
  height: 100%;
  left: 0;
  background-color: #fff;
  transition: left 0.3s ease;
}

.sidebar-toggle {
  /* position: absolute;
  top: 50%;
  right: -32px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; */

  position: absolute;
  top: 45%;
  right: -17px;
  width: 16px;
  height: 60px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 60px;
  background-color: #fff;
  opacity: 0.6;
  z-index: 1000;
  cursor: pointer;
  transition: all 1s;
}

.sidebar-container.isHide {
  left: -200px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #e5e6eb;
}
li:hover {
  cursor: pointer;
  background-color: #d5d5d5;
}

li:last-child {
  /* border-bottom: none; */
}

.switchBtn {
  position: absolute;
  top: 45%;
  right: -17px;
  width: 16px;
  height: 60px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 60px;
  background: #fff;
  opacity: 0.6;
  z-index: 1000;
  cursor: pointer;
  transition: all 1s;
}
</style>
