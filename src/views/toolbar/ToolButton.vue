<template>
  <div
    class="tool-button"
    :title="title"
    @click="$emit('click')"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <component
      :is="isSvg ? 'SvgImage' : 'img'"
      :src="icon"
      :size="size"
      v-bind="isSvg ? svgProps : {}"
      class="tool-icon"
    />
  </div>
</template>

<script>
import SvgImage from './SvgImage.vue';

export default {
  name: 'ToolButton',
  components: { SvgImage },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 20
    },
    color: {
      type: String,
      default: '#666'
    },
    hoverColor: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    isSvg() {
      return this.icon?.endsWith?.('.svg');
    },
    svgProps() {
      return {
        color: this.color,
        hoverColor: this.hoverColor
      };
    }
  }
};
</script>

<style scoped>
.tool-button {
  width: 36px;
  height: 36px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;
}
.tool-button:hover {
  background-color: #f0f0f0;
}
.tool-icon {
  width: 100%;
  height: 100%;
  max-width: 20px;
  max-height: 20px;
}
</style>
