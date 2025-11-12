<template>
  <div
    class="custom-select"
    ref="selectRef"
    :style="{ width: typeof width === 'number' ? width + 'px' : width }"
  >
    <!-- 选择框 -->
    <div class="selected__value" @click="toggleDropdown">
      <div class="diamond">
        <span
          class="diamond__label"
          :title="selectedLabel"
          :class="{ 'is-placeholder': !selectedLabel }"
        >
          {{ selectedLabel || placeholder }}
        </span>
        <span class="diamond__arrow" :class="{ open: isOpen }">▼</span>
        <span
          v-if="clearable && selectedValue !== undefined && selectedValue !== ''"
          class="diamond__clear-btn"
          @click.stop="clearSelection"
        >
          ✕
        </span>
      </div>
    </div>

    <!-- ✅ 下拉通过 Teleport 挂到 body -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="isOpen" class="dropdown-menu" :style="dropdownStyle" ref="dropdownMenu">
          <div v-if="searchable" class="dropdown-menu__search-box">
            <input type="text" v-model="searchQuery" placeholder="搜索" @click.stop />
          </div>
          <ul :key="selectedValue">
            <li
              v-for="(option, index) in filteredOptions"
              :key="`${index}_${option.value}`"
              :class="{ active: option.value == selectedValue }"
              @click.stop="selectOption(option)"
            >
              {{ option.label }}
            </li>
            <li v-if="!filteredOptions.length" class="no-data">无匹配项</li>
          </ul>
        </div>
      </transition>
    </teleport>
  </div>
</template>


<script>
export default {
  name: 'CustomSelect',
  props: {
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请选择' },
    clearable: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    width: { type: [String, Number], default: 'auto' }, // 自定义宽度
    autoWidth: { type: Boolean, default: false }, // 新增 autoWidth, true → 宽度随最长选项文本扩展, false → 固定宽度等于触发框
    value: [String, Number],
    modelValue: [String, Number],
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      dropdownStyle: {}, // 新增: 用于控制 Teleport 出来的样式
    }
  },
  computed: {
    selectedValue() {
      return this.modelValue ?? this.value
    },
    selectedLabel() {
      const sel = this.options.find((opt) => opt.value == this.selectedValue)
      return sel ? sel.label : ''
    },
    filteredOptions() {
      if (!this.searchQuery) return this.options
      return this.options.filter((opt) =>
        opt.label.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
      this.searchQuery = ''

      if (this.isOpen) {
        this.$nextTick(() => {
          this.updateDropdownPosition()
          document.addEventListener('click', this.handleClickOutside)
          window.addEventListener('scroll', this.updateDropdownPosition, true)
          window.addEventListener('resize', this.updateDropdownPosition)
        })
      } else {
        document.removeEventListener('click', this.handleClickOutside)
        window.removeEventListener('scroll', this.updateDropdownPosition, true)
        window.removeEventListener('resize', this.updateDropdownPosition)
      }
    },
    updateDropdownPosition() {
      const trigger = this.$refs.selectRef
      const rect = trigger.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      // 自动宽度逻辑
      let width = rect.width
      if (this.autoWidth && this.options.length) {
        const span = document.createElement('span')
        span.style.visibility = 'hidden'
        span.style.whiteSpace = 'nowrap'
        span.style.font = window.getComputedStyle(trigger).font
        document.body.appendChild(span)
        let maxW = 0
        this.options.forEach((o) => {
          span.textContent = o.label
          maxW = Math.max(maxW, span.offsetWidth + 24)
        })
        document.body.removeChild(span)
        width = Math.max(width, maxW)
      }

      // 判断上下位置
      const spaceBelow = vh - rect.bottom
      const spaceAbove = rect.top
      const openUp = spaceBelow < 200 && spaceAbove > spaceBelow
      const top = openUp ? rect.top - 4 : rect.bottom + 4

      // 判断左右边界
      let left = rect.left
      if (left + width > vw) left = vw - width - 4
      if (left < 4) left = 4

      this.dropdownStyle = {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        color: '#fff',
        zIndex: 10000,
      }
    },
    handleClickOutside(e) {
      const trigger = this.$refs.selectRef
      if (!trigger || trigger.contains(e.target)) return
      this.isOpen = false
      document.removeEventListener('click', this.handleClickOutside)
      window.removeEventListener('scroll', this.updateDropdownPosition, true)
      window.removeEventListener('resize', this.updateDropdownPosition)
    },
    selectOption(option) {
      this.$emit('input', option.value)
      this.$emit('update:modelValue', option.value)
      this.isOpen = false
      this.searchQuery = ''
    },
    clearSelection() {
      this.$emit('input', '')
      this.$emit('update:modelValue', '')
      this.isOpen = false
      this.searchQuery = ''
    },
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('scroll', this.updateDropdownPosition, true)
    window.removeEventListener('resize', this.updateDropdownPosition)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('scroll', this.updateDropdownPosition, true)
    window.removeEventListener('resize', this.updateDropdownPosition)
  },
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: inline-block;
  color: #fff;
  cursor: pointer;
}

.selected__value {
  padding: 6px 10px;
}

/* 选择框部分 */
.diamond {
  display: flex;
  align-items: center;
  justify-content: space-between; // 关键：让内容分散对齐
  width: 100%; // 占满父容器
  padding: 2px 10px;
  box-sizing: border-box; // 包含 padding
  // background: linear-gradient(135deg, #1890ff, #1762c0);
  background: #1890ff;
  transform: skewX(-10deg);
  border-radius: 2px;
  // box-shadow: 0 2px 6px rgba(24, 144, 255, 0.4);
  transition: all 0.2s ease;

  max-width: 200px; /* 保证不会被撑破 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.diamond:hover {
  // background: linear-gradient(135deg, #40a9ff, #1677ff);
  // box-shadow: 0 4px 10px rgba(24, 144, 255, 0.6);
}
.diamond__label {
  font-style: italic;
  margin-right: 8px;
}

/* 选中显示区的 label：避免被长文本撑破，也显示省略号 */
.diamond__label {
  padding-right: 10px;
  display: inline-block;
  // max-width: 200px; /* 可根据触发器宽度调整 */
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: skewX(10deg);
}

/* 占位符颜色 */
.diamond__label.is-placeholder {
  // color: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
}

.diamond__arrow {
  transform: skewX(10deg);
  font-size: 12px;
  transition: transform 0.2s ease;
  color: rgba(255, 255, 255, 0.55);
}
.diamond__arrow.open {
  transform: skewX(10deg) rotate(180deg);
}
.diamond__clear-btn {
  transform: skewX(10deg);
  font-size: 12px;
  margin-left: 8px;
  opacity: 0.8;
  transition: 0.2s;
}
.diamond__clear-btn:hover {
  opacity: 1;
  color: #ffdada;
}

/* 下拉列表 */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  // width: 100%; /* 与触发器等宽 */
  // width: max-content;
  width: auto;
  // min-width: 120px; /* 可按需调整最小宽度 */
  max-width: 200px; /* 防止无限撑大 */
  /* background: #082658; */
  /* background: linear-gradient(to bottom, #3277a4 0%, #0f4678 100%); */
  background: linear-gradient(to bottom, #3277a4 0%, #0f4678 35%, #0f4678 65%, #173871 100%);
  backdrop-filter: blur(6px);
  border: 1px solid #3fa5fb;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 1000;
}

/* 搜索框 */
.dropdown-menu__search-box {
  padding: 8px;
  input {
    width: 100%;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #3fa5fb;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    outline: none;
    font-size: 14px;
    transition: 0.2s;
  }
  input:focus {
    border-color: #40a9ff;
    background: rgba(255, 255, 255, 0.25);
  }
  input::placeholder {
    // color: #d0d0d0;
    color: rgba(255, 255, 255, 0.6);
  }
}

/* 列表项 */
.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 6px;
  max-height: 230px;
  overflow-y: auto;
  box-sizing: border-box;
}

.dropdown-menu li {
  display: block; /* 确保占满可用宽度 */
  width: 100%;
  box-sizing: border-box;
  padding: 4px 8px;
  margin-bottom: 4px;
  cursor: pointer;
  text-align: left; /* 左对齐更常见也更美观 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 超出显示省略号 */
  font-size: 16px;
  border-radius: 4px;
  transition: background 0.15s ease;
}

.dropdown-menu li:hover {
  background: #1890ff;
}
.dropdown-menu li.active {
  background: #1890ff;
  color: #fff;
}

/* 禁用项（如果有 disabled 支持） */
.dropdown-menu li.disabled {
  color: #99a3b3;
  cursor: not-allowed;
  background: transparent !important;
  pointer-events: none;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
