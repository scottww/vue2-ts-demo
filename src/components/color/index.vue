<template>
  <div class="color">
    <div class="color__row">
      <div
        class="color__col--span-3"
        v-for="(item, index) in data"
        :key="`color-${index}`"
        :style="{ '--bgColor': item.desc }"
      >
        <div class="color__item">
          <div
            class="color__item-content"
            :class="isShowLabel ? 'is-show-label' : ''"
          >
            <div class="color__item-name">{{ item.name }}</div>
            <div class="color__item-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Color",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showLabel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    isShowLabel({ showLabel }) {
      return showLabel;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
