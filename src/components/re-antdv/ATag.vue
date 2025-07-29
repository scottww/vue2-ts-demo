<template>
  <a-tag :style="computedStyle" :closable="closable" @close="handleClose">
    <slot>{{ label }}</slot>
  </a-tag>
</template>

<script>
export default {
  name: 'CustomTag',
  props: {
    label: {
      type: String,
      default: '标签'
    },
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'level' // 可为 'level' 或 'event'
    },
    closable: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      styles: {
        level: {
          1: { color: '#E55A5A', background: '#E55A5A1A', borderColor: '#E55A5A5A' },
          2: { color: '#FF5500', background: '#FF55001A', borderColor: '#FF55005A' },
          3: { color: '#FFAB00', background: '#FFAB001A', borderColor: '#FFAB005A' },
          4: { color: '#4C84FF', background: '#4C84FF1A', borderColor: '#4C84FF5A' }
        },
        event: {
          0: { color: '#FF5500', background: '#FF55001A', borderColor: '#FF55005A' },
          1: { color: '#FFAB00', background: '#FFAB001A', borderColor: '#FFAB005A' },
          2: { color: '#D9C269', background: '#D9C2691A', borderColor: '#D9C2695A' },
          3: { color: '#4C84FF', background: '#4C84FF1A', borderColor: '#4C84FF5A' },
          4: { color: '#00A870', background: '#00A8701A', borderColor: '#00A8705A' },
          5: { color: '#E55A5A', background: '#E55A5A1A', borderColor: '#E55A5A5A' }
        }
      }
    };
  },
  computed: {
    computedStyle() {
      const styleSet = this.type === 'event' ? this.styles.event : this.styles.level;
      const defaultStyle = { color: '#999', background: '#f5f5f5', borderColor: '#d9d9d9' };
      return Object.assign({}, styleSet[this.value] || defaultStyle, this.customStyle);
    }
  },
  methods: {
    handleClose() {
      this.$emit('close', this.value);
    }
  }
};
</script>

<style scoped lang="scss">
.custom-tag__level1 {
  color: #E55A5A;
  background: #E55A5A1A;
  border-color: #E55A5A5A;
}
.custom-tag__level2 {
  color: #FF5500;
  background: #FF55001A;
  border-color: #FF55005A;
}
.custom-tag__level3 {
  color: #FFAB00;
  background: #FFAB001A;
  border-color: #FFAB005A;
}
.custom-tag__level4 {
  color: #4C84FF;
  background: #4C84FF1A;
  border-color: #4C84FF5A;
}
// event 狀態
.custom-tag__event0 {
  color: #FF5500;
  background: #FF55001A;
  border-color: #FF55005A;
}
.custom-tag__event1 {
  color: #FFAB00;
  background: #FFAB001A;
  border-color: #FFAB005A;
}
.custom-tag__event2 {
  color: #D9C269;
  background: #D9C2691A;
  border-color: #D9C2695A;
}
.custom-tag__event3 {
  color: #4C84FF;
  background: #4C84FF1A;
  border-color: #4C84FF5A;
}
.custom-tag__event4 {
  color: #00A870;
  background: #00A8701A;
  border-color: #00A8705A;
}
.custom-tag__event5 {
  color: #E55A5A;
  background: #E55A5A1A;
  border-color: #E55A5A5A;
}
</style>
