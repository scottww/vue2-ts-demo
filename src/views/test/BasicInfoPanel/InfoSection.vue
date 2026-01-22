<template>
  <div class="data-section">
    <div class="data-section__title">
      <span class="icon">
        <img :src="icon" />
      </span>
      {{ section.title }}
    </div>

    <div class="data-grid">
      <InfoItem
        v-for="item in section.items"
        :key="item.id"
        :item="item"
        :active="selectedItems.includes(item.id)"
        @click="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script>
import InfoItem from "./InfoItem.vue";

export default {
  name: "InfoSection",
  components: { InfoItem },
  props: {
    section: Object,
    selectedItems: Array,
    icon: String
  }
};
</script>

<style lang="scss" scoped>
.data-section {
  margin-bottom: 8px;

  &__title {
    font-family: SourceHanSansCN;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-left: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    .icon {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
</style>
