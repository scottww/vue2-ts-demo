<template>
  <div class="avatar-demo">
    <div v-for="(size, index) in sizeList" :key="`c-${index}`">
      <h-avatar :size="size" :shape="'circle'">{{ index + 1 }}</h-avatar>
    </div>
    <div v-for="(size, index) in sizeList" :key="`s-${index}`">
      <h-avatar :size="size" :shape="'square'">{{ index + 1 }}</h-avatar>
    </div>
  </div>
</template>

<script>
import { HAvatar } from "@/components/h-ui";
export default {
  name: "AvatarDemo",
  components: { HAvatar },
  data() {
    return {
      sizeList: [50, "large", "medium", "small"]
    };
  }
};
</script>

<style lang="scss" scoped>
.avatar-demo {
}
</style>
