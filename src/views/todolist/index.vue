<template>
  <div class="todo-list-container">
    <!-- 头部标题 -->
    <div class="header">
      <h1>待办清单</h1>
      <p>一步一步完成任务。</p>
      <div class="divider"></div>
    </div>
    
    <!-- 任务列表 -->
    <div class="todo-items">
      <div 
        v-for="(item, index) in displayItems" 
        :key="item.id"
        class="todo-item"
      >
        <div class="item-content">
          <input 
            type="checkbox" 
            :checked="item.completed"
            @change="toggleComplete(item.id)"
            class="checkbox"
          />
          <span :class="{ completed: item.completed }">
            {{ item.text }}
          </span>
        </div>
        <button 
          @click="deleteItem(item.id)"
          class="delete-button"
          title="删除任务"
        >
          🗑️
        </button>
      </div>
    </div>
    
    <!-- 排序开关 -->
    <div class="sort-toggle">
      <span>已完成的任务移到最后？</span>
      <label class="switch">
        <input 
          type="checkbox" 
          v-model="moveCompletedToEnd"
          @change="onSortToggleChange"
        >
        <span class="slider"></span>
      </label>
    </div>
    
    <!-- 添加任务区域 -->
    <div class="add-todo">
      <h3>添加新任务</h3>
      <div class="add-form">
        <input 
          type="text" 
          v-model="newTodoText"
          @keyup.enter="addItem"
          placeholder="输入新的待办事项..."
          class="todo-input"
        >
        <button @click="addItem" class="add-button">
          添加任务
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      todos: [
        { id: 1, text: '学习 Vue.js', completed: true },
        { id: 2, text: '写一个待办清单', completed: false },
        { id: 3, text: '学点新东西', completed: false }
      ],
      newTodoText: '',
      moveCompletedToEnd: false,
      nextId: 4
    }
  },
  computed: {
    displayItems() {
      if (this.moveCompletedToEnd) {
        // 已完成的放到最后
        const activeItems = this.todos.filter(item => !item.completed);
        const completedItems = this.todos.filter(item => item.completed);
        return [...activeItems, ...completedItems];
      } else {
        // 保持原始顺序
        return [...this.todos];
      }
    }
  },
  methods: {
    addItem() {
      if (this.newTodoText.trim()) {
        this.todos.push({
          id: this.nextId++, 
          text: this.newTodoText.trim(),
          completed: false
        });
        this.newTodoText = '';
      }
    },
    
    toggleComplete(id) {
      const todo = this.todos.find(item => item.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    
    deleteItem(id) {
      this.todos = this.todos.filter(item => item.id !== id);
    },
    
    onSortToggleChange() {
      // 计算属性会自动更新，无需额外处理
    }
  }
}
</script>


<style scoped>
.todo-list-container {
  background-color: #ffffff;
  color: #333333;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

/* 头部样式 */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 600;
  color: #222222;
}

.header p {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #666666;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 15px;
}

/* 任务项样式 */
.todo-items {
  margin-bottom: 20px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.todo-item:hover {
  background-color: #f9f9f9;
}

.item-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
  accent-color: #1976d2;
}

.item-content span {
  font-size: 16px;
  color: #333333;
}

.item-content span.completed {
  text-decoration: line-through;
  color: #999999;
}

.delete-button {
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #f5f5f5;
  color: #d32f2f;
}

/* 排序开关样式 */
.sort-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
  color: #555555;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc;
  transition: .4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #1976d2;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* 添加任务区域样式 */
.add-todo h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.add-form {
  display: flex;
  gap: 10px;
}

.todo-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  color: #333333;
}

.todo-input:focus {
  border-color: #1976d2;
}

.add-button {
  background-color: #1976d2;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background-color: #1565c0;
}

.add-button:active {
  background-color: #0d47a1;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .todo-list-container {
    margin: 0 10px;
    padding: 15px;
  }

  .header h1 {
    font-size: 20px;
  }

  .add-form {
    flex-direction: column;
  }

  .add-button {
    width: 100%;
  }
}
</style>
