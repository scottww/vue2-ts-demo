<template>
  <div class="Icon-Button-Group-Demo">
    <h1>Icon Button Group</h1>
    <IconButtonGroup
      :items="[
        {
          id: 1,
          name: !show ? '显示' : '隐藏',
          icon: !show ? hideImg : showImg,
          noActive: true
        }
      ]"
      :active-index="showPanels ? 0 : -1"
      @click="handleButtonClick"
    />
    <IconButtonGroup
      :items="[
        {
          id: 1,
          name: !show ? '显示' : '隐藏',
          icon: !show ? hideImg : showImg,
          noActive: false
        }
      ]"
      :active-index="show ? 0 : -1"
      @click="handleButtonClick"
    />
  </div>
</template>

<script>
import showImg from "@/assets/iconButtonGroup/show.png";
import hideImg from "@/assets/iconButtonGroup/hide.png";
import IconButtonGroup from "./IconButtonGroup.vue";
export default {
  components: {
    IconButtonGroup
  },
  data() {
    return { showImg, hideImg, show: false };
  },
  methods: {
    handleButtonClick(index, item) {
      console.log("handleButtonClick ...", index, item);
      this.show = !this.show;
      // this.$emit('click', index, item);
    }
  }
};
</script>

<style scoped>
.Icon-Button-Group-Demo {
}
</style>