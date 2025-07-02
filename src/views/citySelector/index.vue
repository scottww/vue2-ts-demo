<template>
  <div class="citySelectorDemo">
    <div class="item">
      <a-button @click="openModal">
        {{ selectedCity || "请选择城市 / 省份" }}
      </a-button>

      <CitySelectorModal ref="selector" @select="onCitySelect" />
    </div>
    <!-- dropdown -->
    <div class="item">
      <CitySelectorDropdown @select="onSelect" />
      <p>已选：{{ selected }}</p>
    </div>
  </div>
</template>

<script>
import CitySelectorModal from "./CitySelectorModal.vue";
import CitySelectorDropdown from "./CitySelectorDropdown.vue";

export default {
  name: "YourPage",
  components: { CitySelectorModal, CitySelectorDropdown },
  data() {
    return {
      selectedCity: "",
      selected: ""
    };
  },
  methods: {
    openModal() {
      this.$refs.selector.open();
    },
    onCitySelect(name) {
      this.selectedCity = name;
    },
    //dropdown
    onSelect(val) {
      this.selected = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.citySelectorDemo {
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.item {
}
</style>
