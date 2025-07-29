<template>
  <div>
    <MultiCheckbox
      v-model="selectedValues"
      :options="options"
      :minSelected="1"
      @change="handleChange"
    />
    <MultiCheckbox
      :modelValue="selectedValues"
      @update:modelValue="selectedValues = $event"
      :options="options"
      :minSelected="1"
      @change="handleChange"
    />
  </div>
</template>

<script>
import MultiCheckbox from "./MultiCheckbox.vue";

export default {
  components: { MultiCheckbox },
  data() {
    return {
      selectedValues: ["space"], // 初始选中的项
      options: [
        { label: "空间关系", value: "space" },
        { label: "管理关系", value: "manage" },
        { label: "事件关系", value: "event" }
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log("handleChange ...", val);
    }
  }
};
</script>
