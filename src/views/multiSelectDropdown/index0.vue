<template>
  <div>
    <MultiSelect v-model="selectedValues" :options="options" :maxVisible="3" />
  </div>
</template>

<script>
import MultiSelect from "./MultiSelectDropdown.vue";

export default {
  components: { MultiSelect },
  data() {
    return {
      selectedValues: [],
      options: [
        { label: "选项一", value: "1" },
        { label: "选项二", value: "2" },
        { label: "选项三", value: "3" },
        { label: "选项四", value: "4" },
        { label: "选项五", value: "5" },
      ],
    };
  },
};
</script>
