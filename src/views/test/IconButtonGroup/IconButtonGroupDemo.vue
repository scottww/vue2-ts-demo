<template>
  <div class="IconButtonGroupDemo" style="padding: 10px">
    <IconButtonGroup
      v-model="btnActiveIndex"
      :items="btnItems"
      label-mode="always"
      width="152px"
      height="53px"
      :use-id="false"
      @click="handleButtonClick"
    />
  </div>
</template>

<script>
import IconButtonGroup from "./IconButtonGroup.vue";

export default {
  components: { IconButtonGroup },
  data() {
    return {
      btnActiveIndex: -1,
      btnItems: [
        { id: 1, name: "按钮文字1", icon: require('@/assets/IconButtonGroupNew/icon1.png') },
        { id: 2, name: "按钮文字2", icon: require('@/assets/IconButtonGroupNew/icon2.png') },
        { id: 3, name: "按钮文字3", icon: require('@/assets/IconButtonGroupNew/icon1.png'), noActive: true }
      ]
    };
  },
  methods: {
    handleButtonClick(item) {
      console.log("点击了按钮 ...", item);
    }
  }
};
</script>
