<template>
  <RelationTypeCheckbox v-model="selected" :options="myOptions" label="选择关系" @change="onChange" />
</template>

<script>
import RelationTypeCheckbox from './CheckCard.vue'

export default {
  components: { RelationTypeCheckbox },
  data() {
    return {
      selected: ['space'],
      myOptions: [
        { label: "空间关系", value: "space" },
        { label: "管理关系", value: "manage" },
        { label: "事件关系", value: "event" },
      ],
    };
  },
  methods: {
    onChange(newSelected) {
      console.log("选中了：", newSelected);
    },
  },
};
</script>
