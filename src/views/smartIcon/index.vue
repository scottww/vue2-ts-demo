<template>
  <div class="SmartIcon-demo">
    <SmartIcon src="@/assets/images/oneMapNew/znyj@2x.png" />
    <div class="section">
      <StatIconCard
        title="雨情预警"
        :value="13"
        unit="次"
        :icon="iconPng"
        :iconSize="[36, 40]"
      />

      <StatIconCard
        title="水位预警"
        :value="18"
        unit="次"
        :icon="iconPng"
        :iconSize="36"
      />

      <StatIconCard
        title="流量预警"
        :value="12"
        unit="次"
        :icon="iconPng"
        iconSize="3.5vw"
      />
    </div>
  </div>
</template>

<script>
import SmartIcon from "./SmartIcon";
import StatIconCard from "./StatIconCard.vue";
import iconPng from "@/assets/images/oneMapNew/znyj@2x.png";

export default {
  components: { SmartIcon, StatIconCard },
  data() {
    return {
      iconPng
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>