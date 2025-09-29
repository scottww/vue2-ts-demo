<template>
  <div class="selector-container">
    <div class="selector-wrapper">
      <label v-if="label" class="selector-label">{{ label }}</label>
      
      <div class="dropdown-container" :class="{ open: isDropdownOpen }" @click="toggleDropdown">
        <div class="selected-value">{{ selectedOption?.text || placeholder }}</div>
        <div class="dropdown-arrow"></div>

        <transition name="fade">
          <div v-show="isDropdownOpen" class="dropdown-menu">
            <div
              v-for="option in options"
              :key="option.value"
              :class="['dropdown-item', { selected: selectedOption?.value === option.value }]"
              @click.stop="selectOption(option)"
            >
              {{ option.text }}
            </div>
          </div>
        </transition>
      </div>

      <!-- <button v-if="showSave" class="save-button" @click="savePlan">保存方案</button> -->
      <!-- 插槽：父组件决定显示什么按钮 -->
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Selector",
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => [
        { value: "12h", text: "未来12h" },
        { value: "24h", text: "未来24h" },
        { value: "36h", text: "未来36h" },
        { value: "72h", text: "未来72h" }
      ]
    },
    label: {
      type: String,
      default: "预报时间："
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    showSave: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isDropdownOpen: false
    };
  },
  computed: {
    // 直接根据父组件的 value 计算选中的项
    selectedOption() {
      return this.options.find(opt => opt.value === this.value) || null;
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.isDropdownOpen = false;
      this.$emit("input", option.value);          // Vue2 v-model
      this.$emit("update:value", option.value);   // Vue3 兼容
      this.$emit("change", option.value);         // 自定义事件
    },
    savePlan() {
      this.$emit("save", this.value);
    },
    handleClickOutside(event) {
      const dropdownContainer = this.$el.querySelector(".dropdown-container");
      const saveButton = this.$el.querySelector(".save-button");

      if (
        dropdownContainer &&
        !dropdownContainer.contains(event.target) &&
        (!saveButton || !saveButton.contains(event.target))
      ) {
        this.isDropdownOpen = false;
      }
    }
  }
};
</script>


<style scoped>
.selector-container {
  background: linear-gradient(135deg, rgba(0, 40, 90, 0.8), rgba(0, 60, 130, 0.9));
  border: 1px solid #1976d2;
  border-radius: 6px;
  padding: 10px 15px;
  display: inline-block;
}

.selector-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.selector-label {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.dropdown-container {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.selected-value {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #1976d2;
  border-radius: 4px;
  padding: 6px 30px 6px 12px;
  color: #fff;
  font-size: 14px;
  width: 120px;
  min-width: 120px;
  transition: all 0.3s ease;
}

.selected-value:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #42a5f5;
}

.dropdown-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #fff;
  transition: transform 0.3s ease;
}

.dropdown-container.open .dropdown-arrow {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background: rgba(0, 33, 82, 0.95);
  border: 1px solid #1976d2;
  border-radius: 4px;
  min-width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 25, 60, 0.5);
}

.dropdown-item {
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  /* border-bottom: 1px solid rgba(25, 118, 210, 0.2); */
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(25, 118, 210, 0.4);
}

.dropdown-item.selected {
  background: linear-gradient(90deg, rgba(25, 118, 210, 0.5), rgba(13, 71, 161, 0.5));
  font-weight: bold;
}

.save-button {
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  border: 1px solid #42a5f5;
  color: white;
  padding: 6px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.save-button:hover {
  background: linear-gradient(135deg, #1565c0, #0d47a1);
  border-color: #64b5f6;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.4);
}

.save-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.3);
}

/* 下拉动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 滚动条样式 */
.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}
.dropdown-menu::-webkit-scrollbar-track {
  background: rgba(0, 26, 64, 0.3);
  border-radius: 3px;
}
.dropdown-menu::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #1976d2, #0d47a1);
  border-radius: 3px;
}
.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #1565c0, #0d47a1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .selector-wrapper {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .selected-value {
    min-width: auto;
    text-align: center;
  }
  .save-button {
    width: 100%;
    text-align: center;
  }
}
</style>
