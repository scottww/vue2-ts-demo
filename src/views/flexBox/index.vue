<template>
  <div class="flex-box-demo">
    <flex-box :data="list" />
  </div>
</template>

<script>
import FlexBox from "@/components/flexBox/index.vue";
export default {
  name: "FlexBoxDemo",
  components: { FlexBox },
  data() {
    return {
      list: [
        {
          name: "优菈Eula",
          desc: "浪沫的旋舞"
        },
        {
          name: "优菈Eula",
          desc: "浪沫的旋舞"
        },
        {
          name: "优菈Eula",
          desc: "浪沫的旋舞"
        },
        {
          name: "优菈Eula",
          desc: "浪沫的旋舞"
        },
        {
          name: "优菈Eula",
          desc: "浪沫的旋舞"
        }
      ]
    };
  }
};
</script>

<style scoped>
.flex-box-demo {
}
</style>
